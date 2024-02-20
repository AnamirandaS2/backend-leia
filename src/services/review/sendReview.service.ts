import 'dotenv/config';
import * as fs from 'fs/promises';

import { google } from 'googleapis';

import type { Review, User } from '../../@types/express/custom';
import supabase from '../../database/bucket';
import prisma from '../../database/db';
import transporter from '../../utils/nodemailer';
import parseFilename from '../../utils/parseFilename';

import createReviewPdfService from './createReviewPdf.service';

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

interface SupportEmailServiceProps {
  emails: string[];
  user: User;
  review: Review;
}

export default async function sendReviewService({ emails, review, user }: SupportEmailServiceProps) {
  const { name } = user as { name: string };
  const { title: reviewTitle, bookId, id } = review as { title: string; bookId: string; id: string };

  const { data } = await supabase.storage.from('reviews').download(parseFilename('', id as string));
  
  const content = await data!.text();

  const { title: bookTitle, author: bookAuthor } = await prisma.book.findUnique({ where: { id: bookId } }) as { title: string; author: string };

  const date = new Date();
  
  await createReviewPdfService({ reviewTitle, name, bookTitle, bookAuthor, content, date });
  
  console.log(emails);
  await transporter.sendMail(
    {
      from: process.env.SMTP_USER,
      to: emails,
      subject: `Conclusão de resenha - ${review.title} - ${ user.name }`,
      attachments: [
        {
          filename: parseFilename('pdf', name, reviewTitle),
          content: `./src/templates/${parseFilename('pdf', name, reviewTitle)}`
        }
      ],
      html: `
        <h1>${reviewTitle}</h2>
        <h2>Autoria de: ${name}</h3>
    `,

    },
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

  await fs.rm(`src/templates/${parseFilename('pdf', name, reviewTitle)}`);
  await prisma.review.update({ where: { id: review.id }, data: { finished: true } });
}

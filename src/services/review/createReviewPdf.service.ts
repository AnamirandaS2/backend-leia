import fs from 'fs';

import pdf from 'pdf-creator-node';

import parseFilename from '../../utils/parseFilename';

interface ReviewProps {
    reviewTitle: string;
    name: string;
    bookTitle: string;
    bookAuthor: string;
    content: string;
    date: Date;
}

export default async function createReviewPdfService({ bookTitle, content, date, name, reviewTitle, bookAuthor }: ReviewProps) {
  const html = fs.readFileSync('src/templates/reviewPdf.html', 'utf8');
  const options = {
    format: 'A4',
    orientation: 'portrait',
    border: '10mm',
    env: {
      OPENSSL_CONF: '/dev/null',
    },
  };

  const document = {
    html: html,
    data: {
      bookTitle,
      bookAuthor, 
      content, 
      date: date.toLocaleDateString('pt-BR'),
      name, 
      reviewTitle
    },
    path: `./src/templates/${parseFilename('pdf', name, reviewTitle)}`,
    type: ''
  };

  const review = await pdf.create(document, options);
  console.error(review, 'aaaaaaaaaaaaaa');
  return review;
}
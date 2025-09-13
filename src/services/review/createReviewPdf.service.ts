import fs from 'fs';

let pdf: any;
try {
  // Alguns ambientes (linux/arm64) não possuem phantomjs; evita crash
  // ao tentar importar em runtime.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  pdf = require('pdf-creator-node');
} catch (err) {
  pdf = null;
}

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
  if (!pdf) {
    // Pula geração de PDF quando a dependência não está disponível
    return { skipped: true } as any;
  }
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

  return review;
}
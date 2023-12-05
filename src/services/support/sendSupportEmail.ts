import 'dotenv/config';

import transporter from '../../utils/nodemailer';

interface SupportEmailServiceProps {
  name: string;
  email: string;
  message: string;
}

export default async function sendSupportEmailService({ name, email, message }: SupportEmailServiceProps) {

  await transporter.sendMail(
    {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: 'E-mail de suporte - Clube da Leitura',
      html: `
        <p>Nome: <b>${name}</b></p>
        <p>Email: ${email}</p>
        <p>Mensagem:</p>
        <p>${message}</p>
      `,
    },
    (err) => {
      if (err) {
        throw new Error('Erro ao enviar o email');
      }
    }
  );

  return { message: 'E-mail de suporte enviado com sucesso!' };
}

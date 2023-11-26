import nodeMailer from "nodemailer";
import "dotenv/config";
import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

interface SupportEmailServiceProps {
  name: string;
  email: string;
  message: string;
}

export default async function sendSupportEmailService({ name, email, message }: SupportEmailServiceProps) {
    
  const ACCESS_TOKEN = await oAuth2Client.getAccessToken();
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.SMTP_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: ACCESS_TOKEN,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  await transporter.sendMail(
    {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "E-mail de Suporte - Clube da Leitura",
      html: `
        <p>Nome: <b>${name}</b></p>
        <p>Email: ${email}</p>
        <p>Mensagem:</p>
        <p>${message}</p>
      `,
    },
    (err, info) => {
      if (err) {
        throw new Error("Erro ao enviar o email");
      }
    }
  );

  return { message: "E-mail de suporte enviado com sucesso!" };
}

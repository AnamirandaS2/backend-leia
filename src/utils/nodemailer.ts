import nodeMailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodeMailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  debug: true
});

export default transporter;
import transporter from '../../utils/nodemailer';

export default async function forgotPasswordService(token: string, email: string) {
  await transporter.sendMail(
    {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Recuperação de senha - Clube da Leitura',
      html: `
            <p>Olá. Recebemos um pedido de recuperação de senha para este e-mail cadastrado na plataforma Clube da Leitura</p>
            <p>Clique no link abaixo para redefinir sua senha:</p>
            <a href="${process.env.WEBSITE_URL}/user/recuperar-senha/${token}"><b>CLIQUE AQUI</b></a>
            <p>Se você não solicitou a recuperação de senha, por favor, ignore este e-mail.</p>
          `,
    },
    (err) => {
      if (err) {
        throw new Error('Erro ao enviar o email');
      }
    }
  );
}
import transporter from "../../utils/nodemailer";

export default async function forgotPasswordService(
  token: string,
  email: string
) {
  const frontendUrl =
    process.env.FRONTEND_URL ||
    process.env.WEBSITE_URL ||
    "http://localhost:5173";
  const resetLink = `${frontendUrl}/redefinir-senha/${token}`;

  await transporter.sendMail(
    {
      from: process.env.SMTP_USER,
      to: email,
      subject: "Recuperação de senha - Clube da Leitura",
      html: `
            <p>Olá. Recebemos um pedido de recuperação de senha para este e-mail cadastrado na plataforma Clube da Leitura</p>
            <p>Clique no link abaixo para redefinir sua senha:</p>
            <a href="${resetLink}"><b>CLIQUE AQUI</b></a>
            <p>Se você não solicitou a recuperação de senha, por favor, ignore este e-mail.</p>
          `,
    },
    (err) => {
      if (err) {
        throw new Error("Erro ao enviar o email");
      }
    }
  );
}

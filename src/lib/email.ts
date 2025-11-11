import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `https://tuapp.com/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  try {
    await transporter.sendMail({
      from: '"Soporte - TuApp" <no-reply@tuapp.com>',
      to: email,
      subject: "Recuperación de contraseña",
      html: `
      <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>Este enlace expira en 1 hora.</p>
    `,
    });
  } catch (error) {
    console.log(error)
    throw new Error("Error de envio");
  }
}
import nodemailer from "nodemailer";

export const sendVerificationEmail = async (userEmail, token) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    family: 4,
    connectionTimeout: 10000,
  });

  const verificationUrl = `${process.env.CLIENT_URL}/auth/verify-email?token=${token}&email=${userEmail}`;

  await transporter.sendMail({
    from: `"Authentication & Authorization MERN" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Verify your email address',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Email Verification Required</h2>
        <p>Please click the button below to activate your account. This link expires in 24 hours.</p>
        <a href="${verificationUrl}" style="background-color: #0070f3; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify Email
        </a>
      </div>
    `,
  });
}
import nodemailer from "nodemailer"

export const sendOTP = async (email, otp) => {
    try {
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
        })

        const mailOptions = {
            from: `"Support Team" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Password Reset OTP Code",
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #4A90E2;">Password Reset Request</h2>
          <p>Aapne password reset karne ke liye request ki hai. Aapka OTP code neeche diya gaya hai:</p>
          <div style="background-color: #f4f4f4; padding: 10px 20px; width: fit-content; border-radius: 5px; margin: 20px 0;">
            <h1 style="letter-spacing: 5px; color: #111; margin: 0;">${otp}</h1>
          </div>
          <p>Ye OTP code <strong>10 minutes</strong> ke liye valid hai.</p>
          <p style="font-size: 12px; color: #777;">Agar aapne ye request nahi ki, to is email ko ignore karein.</p>
        </div>
      `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully: %s", info.messageId);

        return true;
    } catch (error) {
        console.error("Error sending OTP email:", error);
        throw new Error("Failed to send OTP email.");
    }
}
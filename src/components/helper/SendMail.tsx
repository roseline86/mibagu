import nodemailer from "nodemailer";

export default async function sendVerificationEmail(
  email: string,
  verificationCode: string,
) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: parseInt(process.env.SMTP_PORT ?? "587", 10),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailData = {
      from: process.env.SMTP_SENDER,
      to: email,
      subject: "Verify Your Account - Mibagu",
      text: `Your verification code is: ${verificationCode}`,
      html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #000000; color: #ffffff;">
        <div style="background-color: #1a1a1a; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);">
          <h2 style="text-align: center; color: #e74c3c;">Welcome to Mibagu</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for signing up with Mibagu! Please use the following verification code to complete your registration.
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 24px; color: #000000; background-color: #e74c3c; padding: 10px 20px; border-radius: 4px; display: inline-block;">
              ${verificationCode}
            </p>
          </div>
          <p style="font-size: 16px; line-height: 1.6;">
            If you didn’t request this, you can safely ignore this email.
          </p>

            <a href="https://mibagu.com" style="color: #374c3c;">
              Visit Mibagu
            </a>

        </div>
        <p style="text-align: center; font-size: 12px; color: #999999; margin-top: 20px;">
          &copy; 2024 Mibagu. All rights reserved.
        </p>
      </div>
      `,
    };

    const info = await transporter.sendMail(mailData);
    console.log(`Email sent successfully: ${info.messageId}`);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
}

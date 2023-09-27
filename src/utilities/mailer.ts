import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { tokenType } from "@/types/enums";

export async function sendEmail(email: string, emailType: tokenType) {
  try {
    // generating token by hashing the email
    const token = await bcryptjs.hash(email, 10);

    if (emailType === tokenType.VERIFY_USER) {
      await User.findOneAndUpdate(
        { email },
        {
          verifyToken: token,
          verifyTokenExpiration: Date.now() + 3600000,
        }
      );
    } else if (emailType === tokenType.RESET_PASSWORD) {
      await User.findOneAndUpdate(
        { email },
        {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiration: Date.now() + 3600000,
        }
      );
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.DENOTES_EMAIL,
      to: email,
      subject:
        emailType === tokenType.VERIFY_USER
          ? "Verify Your Email"
          : "Reset Your Password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/emailVerification?token=${token}">here</a> to ${
        emailType === tokenType.VERIFY_USER
          ? "verify your email"
          : "reset your password"
      } or copy and paste the link below in your browser.<br/>
      ${process.env.DOMAIN}/emailVerification?token=${token}
      </p>`,
    };

    return await transport.sendMail(mailOptions);
  } catch (err: any) {
    console.error("Error occured while sending email");
    throw new Error(err.message);
  }
}

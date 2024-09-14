// import { resend } from "@/lib/resend";
// import VerificationEmail from "../../emails/VerificationEmail";
// import { ApiResponse } from '@/types/ApiResponse';

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<ApiResponse> {
//   try {
//     await resend.emails.send({
//       from: 'onboarding@resend.dev',
//       to: email,
//       subject: 'Mystery Message Verification Code',
//       react: VerificationEmail({ username, otp: verifyCode }),
//     });
//     return { success: true, message: 'Verification email sent successfully.' };
//   } catch (emailError) {
//     console.error('Error sending verification email:', emailError);
//     return { success: false, message: 'Failed to send verification email.' };
//   }
// }

// import { ApiResponse } from "@/types/ApiResponse";
// import nodemailer from "nodemailer";

// export async function sendVerificationEmail(
//   email: string,
//   username: string,
//   verifyCode: string
// ): Promise<ApiResponse> {
//   try {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 465,
//       secure: true,
//       auth: {
//         user: "himanshunageshwar444@gmail.com",
//         pass: "ehlqatynhjhjorhj",
//       },
//     });

//     const MailOptions = {
//       from: "himanshunageshwar444@gmail.com",
//       to: email,
//       subject: "Verification Code: " + verifyCode,
//       html: `<h1>Hello, ${username}</h1>
//       <p>Thank you for registering. Please use the following verification code to complete your registration</p>
//      <strong>${verifyCode}</strong>
//      <p>If you did not request this code, please ignore this email.</p> `,
//     };
//     const mailResponse = await transporter.sendMail(MailOptions);
//     console.log("Email sent: ", mailResponse);
//     return {
//       success: true,
//       message: "Verification Code sent successfully",
//     };
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return {
//       success: false,
//       message: "Failed to send verification email"
//     };
//   }
// }

import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  username: string,
  email: string,
  verifyCode: string
): Promise<ApiResponse> {
  // Log the email to verify if it's being passed correctly
  console.log("Sending email to:", email);
  console.log("Username:", username)
  console.log("verifyCode:", verifyCode)
  // Validate email parameter
  if (!email || !email.includes('@')) {
    console.error("Error: No valid recipient email defined.");
    return {
      success: false,
      message: "No valid recipient email defined.",
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "himanshunageshwar444@gmail.com", // your Gmail address
        // pass: "ehlqatynhjhjorhj", // your app-specific password (not your Gmail password)
        pass: process.env.NODEMAILER_PASS, // your app-specific password (not your Gmail password)
      },
    });

    const mailOptions = {
      from: "himanshunageshwar444@gmail.com", // sender address
      to: email, // recipient email
      subject: "Verification Code: " + verifyCode, // subject line
      html: `<h1>Hello, ${username}</h1>
             <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
             <strong>${verifyCode}</strong>
             <p>If you did not request this code, please ignore this email.</p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", mailResponse);

    return {
      success: true,
      message: "Verification code sent successfully.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      message: "Failed to send verification email.",
    };
  }
}

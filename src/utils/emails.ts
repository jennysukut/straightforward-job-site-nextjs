// // File: /utils/email.ts
// import nodemailer from "nodemailer";

// // Configure your email service (example using Gmail)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const verificationUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: "Verify Your Email Address",
//     html: `
//       <h1>Email Verification</h1>
//       <p>Thanks for signing up! Please verify your email address by clicking the link below:</p>
//       <a href="${verificationUrl}">Verify My Email</a>
//       <p>This link will expire in 24 hours.</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Verification email sent successfully");
//   } catch (error) {
//     console.error("Error sending verification email:", error);
//     throw new Error("Failed to send verification email");
//   }
// };

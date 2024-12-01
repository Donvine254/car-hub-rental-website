"use server";
import { generateToken } from "@/lib/generatetoken";
import nodemailer from "nodemailer";
import { passwordResetTemplate, verificationTemplate } from "./templates";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sender = `"CarHub Kenya" <admin@carhubke.vercel.app>`;

export const sendEmail = async (emailOptions: {
  subject: string;
  from: string;
  to: string;
  html: any;
}) => {
  await transporter.sendMail(emailOptions);
};

export async function sendVerificationEmail(
  email: string,
  id: number,
  name: string
) {
  const baseUrl = "https://carhubke.vercel.app/verify_email";
  const url = generateToken(email, id, baseUrl);
  try {
    const response = await sendEmail({
      subject: `Verify your email address`,
      to: email,
      from: sender,
      html: verificationTemplate(name, url),
    });
    console.log("Email sent successfully");
    return { message: "Email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
}

export async function sendResetPasswordEmail(
  email: string,
  id: number,
  name: string
) {
  const baseUrl = "https://carhubke.vercel.app/reset_password";
  const url = generateToken(email, id, baseUrl);
  try {
    const response = await sendEmail({
      subject: `Reset your Carhub account password`,
      to: email,
      from: sender,
      html: passwordResetTemplate(name, url),
    });
    console.log("Email sent successfully");
    return { message: "Check your email account to reset your password" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
}

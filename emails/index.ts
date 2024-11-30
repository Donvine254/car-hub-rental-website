"use server";
import { generateToken } from "@/lib/generatetoken";
import nodemailer from "nodemailer";
import { verificationTemplate } from "./templates";

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
  userId: number,
  name: string
) {
  console.log(email, userId, name);
  const url = generateToken(email, userId);
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

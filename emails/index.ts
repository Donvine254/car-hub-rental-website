"use server";
import { generateToken } from "@/lib/utils/generatetoken";
import nodemailer from "nodemailer";
import {
  passwordResetTemplate,
  welcomeTemplate,
  verificationTemplate,
  accountDeletionTemplate,
  orderConfirmationEmail,
} from "./templates";
import { formatISODate } from "@/lib/helpers";

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
export async function sendWelcomeEmail(email: string, name: string) {
  const url = "https://carhubke.vercel.app/me";
  try {
    const response = await sendEmail({
      subject: `Welcome to Carhub Kenya! Your Journey Begins Here 🚗✨`,
      to: email,
      from: sender,
      html: welcomeTemplate(name, url),
    });
    console.log("Email sent successfully");
    return { message: "email sent successfully" };
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
  const baseUrl = "https://carhubke.vercel.app/new_password";
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

export async function sendAccountDeletionEmail(email: string, name: string) {
  try {
    const response = await sendEmail({
      subject: `Your Carhub Kenya Account Has Been Deleted`,
      to: email,
      from: sender,
      html: accountDeletionTemplate(name),
    });
    console.log("Email sent successfully");
    return { message: "email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
}

export async function sendOrderConfirmationEmail(
  email: string,
  name: string,
  bookingId: number,
  vehicleModel: string,
  startDate: string,
  endDate: string,
  pickupLocation: string,
  totalAmount: number
) {
  try {
    const response = await sendEmail({
      subject: `Your Booking Has Been Confirmed! `,
      to: email,
      from: sender,
      html: orderConfirmationEmail(
        name,
        bookingId,
        vehicleModel,
        formatISODate(startDate),
        formatISODate(endDate),
        pickupLocation,
        totalAmount
      ),
    });
    console.log("Email sent successfully");
    return { message: "email sent successfully" };
  } catch (error) {
    console.error("Email delivery failed:", error);
    return { message: "Email delivery failed" };
  }
}

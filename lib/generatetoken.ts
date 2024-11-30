import * as jose from "jose";
const baseUrl = "https://carhubke.vercel.app/verify";
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const user = {
  email: "donvinemugendi@gmail.com",
  id: "2",
};
export async function generateToken(email: string, id: string) {
  // Generate JWT token with a 1-day expiration time
  const token = await new jose.SignJWT({ userId: id, email: email })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("24h")
    .sign(JWT_SECRET);
  const verificationUrl = `${baseUrl}?token=${encodeURIComponent(token)}`;
  return verificationUrl;
}
generateToken(user.email, user.id).then((url) => {
  console.log(url);
});

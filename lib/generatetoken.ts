const baseUrl = "http://localhost:3000/verify"; // Verification URL

// Function to base64 encode the data
function encodeData(email: string, id: number) {
  const data = JSON.stringify({ email, id });
  const encodedData = btoa(data); // base64 encode the data
  return encodedData;
}

// Function to generate the verification URL
export function generateToken(email: string, id: number) {
  const encodedData = encodeData(email, id);
  const verificationUrl = `${baseUrl}?t=${encodeURIComponent(encodedData)}`;
  return verificationUrl;
}

// Example usage
const user = {
  email: "donvinemugendi@gmail.com",
  id: 2,
};
const verificationUrl = generateToken(user.email, user.id);
console.log(verificationUrl); // URL with base64-encoded email and userId

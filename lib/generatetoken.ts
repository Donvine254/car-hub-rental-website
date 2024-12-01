// Function to base64 encode the data
function encodeData(email: string, id: number) {
  const data = JSON.stringify({ email, id });
  const encodedData = btoa(data); // base64 encode the data
  return encodedData;
}
export function decodeData(encodedData: string) {
  try {
    const decodedData = atob(encodedData);
    const parsedData = JSON.parse(decodedData);
    console.log("parsed data:" + parsedData);
    return parsedData;
  } catch (error) {
    return null; // If decoding fails, return null
  }
}
// Function to generate the verification URL
export function generateToken(email: string, id: number, baseUrl: string) {
  const encodedData = encodeData(email, id);
  const verificationUrl = `${baseUrl}?t=${encodeURIComponent(encodedData)}`;
  return verificationUrl;
}

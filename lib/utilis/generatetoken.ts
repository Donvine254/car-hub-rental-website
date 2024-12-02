// Function to base64 encode the data
function encodeData(email: string, id: number) {
  const expiryTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now in milliseconds
  const data = JSON.stringify({ email, id, expiryTime });
  const encodedData = btoa(data); // Base64 encode the data
  return encodedData;
}

export function decodeData(encodedData: string) {
  try {
    const decodedData = atob(encodedData);
    const parsedData = JSON.parse(decodedData);
    const currentTime = Date.now();
    if (parsedData.expiryTime && currentTime > parsedData.expiryTime) {
      console.error("Data has expired");
      return null;
    }
    return parsedData;
  } catch (error) {
    console.error("Failed to decode data:", error);
    return null;
  }
}

// Function to generate the verification URL
export function generateToken(email: string, id: number, baseUrl: string) {
  const encodedData = encodeData(email, id);
  const verificationUrl = `${baseUrl}?t=${encodeURIComponent(encodedData)}`;
  return verificationUrl;
}

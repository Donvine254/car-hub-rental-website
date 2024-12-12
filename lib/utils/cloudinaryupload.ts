import axios from "axios";
import { toast } from "sonner";

export async function uploadToCloudinary(
  image: File,
  folder: string,
  setImage: (url: string) => void
) {
  const newImage = new FormData();
  newImage.append("file", image);
  newImage.append("cloud_name", "dipkbpinx");
  newImage.append("upload_preset", "ekomtspw");
  newImage.append("folder", folder);

  try {
    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dipkbpinx/image/upload",
      newImage
    );
    const data = await response.data;
    console.log(data);
    setImage(data.secure_url);
    toast.success("Uploaded successfully!");
  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Upload failed");
  }
}

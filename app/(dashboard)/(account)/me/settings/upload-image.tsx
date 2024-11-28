import React, { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  image_url: string;
};

export function UploadImage({ image_url }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [image, setImage] = useState<File | null>(null);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const maxAllowedSize = 5 * 1024 * 1024;
    if (!e.target.files || e.target.files.length === 0) {
      toast.error("No file selected");
      return false;
    }
    const file = e.target.files[0];
    if (file.size > maxAllowedSize) {
      toast.error("Image is too big, max allowed size is 5MB");
      fileInputRef.current = null;
      return false;
    }
    setImage(file);
  }

  function clearFileInput() {
    if (fileInputRef.current) {
      (fileInputRef.current as HTMLInputElement).value = "";
    }
    setImage(null);
  }

  async function handleImageUpload() {
    setIsLoading(true);
  }
  return (
    <div className="flex flex-col md:flex-row md:gap-6 w-full items-center">
      <div className="space-y-2">
        <label htmlFor="picture">Profile Picture</label>
        <div className="flex items-center gap-4">
          {/* Avatar Preview */}
          {image ? (
            <Image
              src={URL.createObjectURL(image)}
              alt="Profile Preview"
              width={40}
              height={40}
              className="object-contain h-10 w-10 rounded-full"
            />
          ) : (
            <Image
              src={image_url}
              alt="Profile Preview"
              width={40}
              height={40}
              className="object-contain h-10 w-10 rounded-full"
            />
          )}
          {/* File Input */}
          <div className="flex flex-col sm:flex-row gap-2 p-2 sm:items-center sm:gap-5">
            <div className="relative flex-1">
              <input
                className={`p-2 rounded border w-full border-solid border-blue-600 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-black transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-white bg-gray-100 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]  focus:border-primary focus:outline-none ${
                  image === null
                    ? "file:bg-gray-600 "
                    : "file:bg-green-500 bg-blue-300 bg-opacity-50"
                }`}
                type="file"
                name="image"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleChange}
              />
              <span
                className={`absolute right-0 transform translate-y-1/2 my-auto ${
                  image === null ? "hidden" : ""
                }`}>
                <svg
                  className="fill-current h-4 w-4 hover:fill-red-500 text-gray-600"
                  role="button"
                  onClick={clearFileInput}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20">
                  <title>Clear Input</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
            <button
              type="button"
              title={
                isLoading || image === null
                  ? "No image selected"
                  : "Upload Image"
              }
              onClick={handleImageUpload}
              disabled={isLoading || image === null}
              className="bg-blue-500  xsm:w-full min-w-[150px] w-fit py-[0.32rem] rounded border  border-blue-600 bg-clip-padding px-5 text-white flex items-center justify-center disabled:bg-gray-100 disabled:text-gray-400">
              {isLoading ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 4335 4335"
                  width="20"
                  className="animate-spin"
                  height="20">
                  <path
                    fill="#2563eb"
                    d="M3346 1077c41,0 75,34 75,75 0,41 -34,75 -75,75 -41,0 -75,-34 -75,-75 0,-41 34,-75 75,-75zm-1198 -824c193,0 349,156 349,349 0,193 -156,349 -349,349 -193,0 -349,-156 -349,-349 0,-193 156,-349 349,-349zm-1116 546c151,0 274,123 274,274 0,151 -123,274 -274,274 -151,0 -274,-123 -274,-274 0,-151 123,-274 274,-274zm-500 1189c134,0 243,109 243,243 0,134 -109,243 -243,243 -134,0 -243,-109 -243,-243 0,-134 109,-243 243,-243zm500 1223c121,0 218,98 218,218 0,121 -98,218 -218,218 -121,0 -218,-98 -218,-218 0,-121 98,-218 218,-218zm1116 434c110,0 200,89 200,200 0,110 -89,200 -200,200 -110,0 -200,-89 -200,-200 0,-110 89,-200 200,-200zm1145 -434c81,0 147,66 147,147 0,81 -66,147 -147,147 -81,0 -147,-66 -147,-147 0,-81 66,-147 147,-147zm459 -1098c65,0 119,53 119,119 0,65 -53,119 -119,119 -65,0 -119,-53 -119,-119 0,-65 53,-119 119,-119z"
                  />
                </svg>
              ) : (
                <p className="flex items-center gap-2">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    width="20"
                    height="20"
                    fill="currentColor">
                    <path d="M537.6 226.6c4.1-10.7 6.4-22.4 6.4-34.6 0-53-43-96-96-96-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32c-88.4 0-160 71.6-160 160 0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336c0 79.5 64.5 144 144 144h368c70.7 0 128-57.3 128-128 0-61.9-44-113.6-102.4-125.4zM393.4 288H328v112c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V288h-65.4c-14.3 0-21.4-17.2-11.3-27.3l105.4-105.4c6.2-6.2 16.4-6.2 22.6 0l105.4 105.4c10.1 10.1 2.9 27.3-11.3 27.3z" />
                  </svg>
                  Upload
                </p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

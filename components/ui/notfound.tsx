import Image from "next/image";
export function NotFound({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl shadow-sm">
      <Image
        src="https://res.cloudinary.com/dipkbpinx/image/upload/v1733851085/illustrations/mwlrtbxngzscqs8xvoar.png"
        alt="No coupons found"
        width={120}
        height={120}
        className="mb-6"
        priority
      />
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}

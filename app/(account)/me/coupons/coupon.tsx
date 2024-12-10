import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface CouponProps {
  code: string;
  expiresAt: string;
  value: number;
  description: string;
  status?: "unused" | "used" | "expired";
}

export function Coupon({
  code,
  expiresAt,
  status = "unused",
  value,
  description,
}: CouponProps) {
  return (
    <div className="relative w-full max-w-3xl mx-auto mb-4">
      <div
        className={`relative rounded-xl overflow-hidden ${
          status === "unused"
            ? "bg-green-400 text-white"
            : status === "used"
            ? "bg-green-50 cursor-not-allowed"
            : "bg-red-50 cursor-not-allowed"
        }`}>
        {/* Left circle cutout */}
        <div className="absolute left-[-10px] top-[60%] transform -translate-y-1/2 w-[20px] h-[20px]  bg-white rounded-full z-50" />
        {/* Right circle cutout */}
        <div className="absolute right-[-10px] top-[60%] transform -translate-y-1/2 w-[20px] h-[20px] bg-white rounded-full z-50" />
        <div className="px-6 py-4">
          <div className="flex justify-start items-center gap-4">
            <h3 className="text-xl md:text-2xl font-bold">{code}</h3>
            {status === "unused" && (
              <Badge variant="default" className="bg-white">
                Exclusive
              </Badge>
            )}
          </div>
          <p className="text-base md:text-xl font-extralight">{description}</p>
        </div>
        <div className="absolute left-0 right-0 top-[60%] border-t-2 border-dotted border-black/20 z-0 overflow-x-hidden" />
        <div className="flex justify-between items-center flex-wrap px-6 py-4 gap-2 xsm:mt-4 ">
          <p className="text-sm">Validity: {expiresAt}</p>
          {status === "unused" ? (
            <a
              href="/cars"
              className="px-6 py-1  bg-white border-black text-black hover:text-white rounded-md hover:bg-black/90 transition-colors xsm:w-full xsm:text-center">
              Use Now
            </a>
          ) : (
            <button
              className="px-6 py-1 bg-black text-white rounded-md hover:bg-black/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors capitalize"
              disabled>
              {status}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

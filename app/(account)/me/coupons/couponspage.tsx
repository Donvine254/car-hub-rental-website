"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coupon } from "./coupon";
import { NotFound } from "@/components/ui/notfound";

const coupons = {
  unused: [
    {
      code: "EARLYBIRD25",
      value: 25,
      description: "25% OFF for bookings made 30 days in advance.",
      expiresAt: "14/08/24 - 26/04/25",
    },
    {
      code: "FIRST10",
      value: 10,
      description: "10% OFF on selected vehicle models",
      expiresAt: "14/08/24 - 26/04/25",
    },
  ],
  used: [
    {
      code: "WELCOME20",
      value: 20,
      description: "20% OFF on your first order",
      expiresAt: "14/08/24 - 26/04/25",
    },
  ],
  expired: [
    {
      code: "ADVENTURE20",
      value: 20,
      description: "20% OFF on selected offroad vehicles",
      expiresAt: "14/08/24 - 26/04/25",
    },
  ],
};

export default function CouponCenter() {
  return (
    <section className="space-y-4">
      <div className="p-4 bg-white shadow rounded-md border">
        <Tabs defaultValue="unused" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="unused"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 pb-2">
              Unused
            </TabsTrigger>
            <TabsTrigger
              value="used"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 pb-2">
              Used
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 pb-2">
              Expired
            </TabsTrigger>
          </TabsList>
          <div className="mt-8">
            <TabsContent value="unused">
              {coupons.unused.length > 0 ? (
                coupons.unused.map((coupon, index) => (
                  <Coupon key={index} {...coupon} status="unused" />
                ))
              ) : (
                <NotFound
                  title="No Coupons Found"
                  description="It looks like there are no coupons available at the moment. Check back
        later for new offers!"
                />
              )}
            </TabsContent>
            <TabsContent value="used">
              {coupons.used.length > 0 ? (
                coupons.used.map((coupon, index) => (
                  <Coupon key={index} {...coupon} status="used" />
                ))
              ) : (
                <NotFound
                  title="No Coupons Found"
                  description="It looks like there are no coupons available at the moment. Check back
                later for new offers!"
                />
              )}
            </TabsContent>
            <TabsContent value="expired">
              {coupons.expired?.length > 0 ? (
                coupons?.expired?.map((coupon, index) => (
                  <Coupon key={index} {...coupon} status="expired" />
                ))
              ) : (
                <NotFound
                  title="No Coupons Found"
                  description="It looks like there are no coupons available at the moment. Check back
                later for new offers!"
                />
              )}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import CarCard from "@/components/ui/car-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Locations } from "@/constants";
import { Car } from "@/lib/actions/car-actions/fetchCars";
import { getSession } from "@/lib/actions/session";
import { Clock, Mail, MapPinnedIcon, Phone } from "lucide-react";
import { toast } from "sonner";
import { NotFound } from "@/components/ui/notfound";

type Props = {
  Cars: Car[];
};

interface Location {
  id: number;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
}

export default function LocationsPage({ Cars }: Props) {
  const router = useRouter();
  async function handleBooking(car: Car) {
    const session = await getSession();
    if (!session) {
      toast.error("Login required to perform this action! ", {
        position: "top-center",
      });
      setTimeout(() => {
        router.push(
          `/login?post_login_redirect_url=/booking?id=${car.id}&car_model=${car.modelName}&price=${car.pricePerDay}`
        );
      }, 1000);
    } else {
      router.push(
        `/booking?id=${car.id}&car_model=${car.modelName}&price=${car.pricePerDay}`
      );
    }
  }
  return (
    <div className="min-h-screen mx-2  md:w-3/4 md:mx-auto p-2 bg-[#f8f9fa] ">
      <Tabs defaultValue={Locations[0].name} className="w-full">
        <TabsList className="flex justify-start gap-2 md:gap-4 overflow-x-auto w-full border-b rounded-none h-auto p-0 bg-transparent">
          {Locations.map((location) => (
            <TabsTrigger
              key={location.id}
              value={location.name}
              className="capitalize font-medium text-xl data-[state=active]:border-b-2 data-[state=active]:border-green-500 rounded-none px-6 ">
              {location.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {Locations.map((location) => (
          <TabsContent key={location.id} value={location.name}>
            <LocationCard location={location} />
          </TabsContent>
        ))}
        <hr />
        {Locations.map((location) => (
          <TabsContent key={location.id} value={location.name}>
            <div>
              <h2 className="text-2xl xsm:text-lg font-semibold">
                Available Vehicles in{" "}
                <span className="capitalize">{location.name}</span>
              </h2>
              <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 py-2 ">
                {Cars &&
                Cars.filter((car) => car.location === location.name).length >
                  0 ? (
                  Cars.filter((car) => car.location === location.name).map(
                    (car) => (
                      <div
                        key={car.id}
                        className="transition-shadow duration-300 hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)]">
                        <CarCard car={car} handleBooking={handleBooking} />
                      </div>
                    )
                  )
                ) : (
                  <div className="bg-white col-span-full">
                    <NotFound
                      title="No Cars Available in this Location"
                      description="We currently have no cars available in this location. If this is a mistake, kindly let us know by contacting us."
                    />
                  </div>
                )}
              </section>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

const LocationCard = ({ location }: { location: Location }) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 py-2 md:pb-4">
      {/* first child */}
      <div className="border shadow rounded-md bg-white py-6 px-4 space-y-4 flex-shrink">
        <h2 className="text-2xl xsm:text-lg font-semibold mb-4 capitalize">
          {location.name}
          {""} Rental Office
        </h2>
        <div className="flex items-center space-x-2 mb-2">
          <MapPinnedIcon fill="none" className="text-green-500 mr-2" />
          <span>{location.address}</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Phone className="mr-2 fill-green-500 stroke-none" />
          <a href={`tel:${location.phone}`}>{location.phone}</a>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Mail className="mr-2" fill="#22C55E" stroke="white" />
          <a
            href="mailto:info@carhubke.vercel.app"
            className="text-blue-600 hover:underline">
            info@carhubke.com
          </a>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <Clock fill="none" className="text-green-500 mr-2" />
          <p>Mon - Fri 08.00 - 18.00</p>
        </div>
        <a
          href="mailto:support@carbubke.vercel.app"
          className="flex items-center xsm:justify-center gap-2 w-full xsm:w-full bg-white text-green-600 px-6 py-2 rounded-md border hover:bg-green-500 hover:text-white border-green-600 transition-colors">
          <Mail /> Get in Touch
        </a>
      </div>
      {/* second child */}
      <div className="h-[300px] flex-1 ">
        <iframe
          src={location.mapUrl}
          width="100%"
          height="100%"
          className="border shadow rounded-md xsm:min-h-[350px]"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          loading="lazy"></iframe>
      </div>
    </div>
  );
};

import fetchCars, { Car } from "@/lib/actions/car-actions/fetchCars";
import AdminDashboard from "./dashboardpage";

type Props = {};

export default async function Page({}: Props) {
  const cars = (await fetchCars()) as Car[];
  return (
    <section>
      <AdminDashboard cars={cars} />
    </section>
  );
}

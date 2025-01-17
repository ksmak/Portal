import ServiceList from "./components/ui/ServiceList";
import { getServices } from "./components/lib/data";

export default async function Home() {
  const services = await getServices();

  return (
    <div className="mt-10 container mx-auto">
      <ServiceList services={services} />
    </div>
  );
}

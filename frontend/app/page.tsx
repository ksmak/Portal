import ServiceList from "./components/ui/ServiceList";
import { getServices } from "./components/lib/data";
import RightPanel from "./components/ui/RightPanel";

export default async function Home() {
  const services = await getServices();

  return (
    <div className="mt-10 flex justify-between">
      <div>
        <ServiceList services={services} />
      </div>
      <div className="basis-1/3 flex flex-col items-center">
        <RightPanel />
      </div>
    </div>
  );
}

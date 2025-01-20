import ServiceList from "./components/ui/ServiceList";
import { getServices } from "./components/lib/data";
import RightPanel from "./components/ui/RightPanel";
import { ServiceType } from "./components/lib/definitions";

export default async function Page() {
  const services = await getServices() as ServiceType[];

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

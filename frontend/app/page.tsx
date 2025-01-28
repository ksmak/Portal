import ServiceList from "./components/ui/ServiceList";
import RightPanel from "./components/ui/RightPanel";

export default async function Page() {
  return (
    // <div className="mt-10 flex justify-between">
    <div className="container mx-auto mt-10">
      <ServiceList />
    </div>
    // <div className="w-1/4 flex flex-col items-center">
    // <RightPanel />
    // </div>
    // </div>
  );
}

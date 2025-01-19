import { getDepartments, getDivisions, getManagements } from "@/app/components/lib/data"
import ContactList from "@/app/components/ui/ContactList";

export default async function Page() {
    const deparments = await getDepartments();
    const managements = await getManagements();
    const divisions = await getDivisions();

    return (
        <div className="container mx-auto">
            <ContactList
                deparments={deparments}
                managements={managements}
                divisions={divisions}
            />
        </div>
    )
}
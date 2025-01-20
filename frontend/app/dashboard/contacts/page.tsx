import { getDepartments, getDivisions, getManagements } from "@/app/components/lib/data";
import { DictType } from "@/app/components/lib/definitions";
import ContactList from "@/app/components/ui/ContactList";

export default async function Page() {
    const deparments = await getDepartments() as DictType[]
    const managements = await getManagements() as DictType[]
    const divisions = await getDivisions() as DictType[]
    return (
        <div>
            <ContactList
                deparments={deparments}
                managements={managements}
                divisions={divisions}
            />
        </div>
    )
}
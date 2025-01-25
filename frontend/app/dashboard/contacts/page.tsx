import ContactList from "@/app/components/ui/ContactList";

export default async function Page() {
    return (
        <div className="container mx-auto">
            <h1 className="text-2xl text-center text-blue-600 font-bold">Контактные данные сотрудников</h1>
            <ContactList />
        </div>
    )
}
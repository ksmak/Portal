import { Datepicker, Card } from "flowbite-react";

export default function RightPanel() {
    return (
        <div className="flex flex-col gap-3">
            <Datepicker language="ru" defaultValue={new Date()} color="info" inline />
            <Card>

            </Card>
        </div>
    )
}
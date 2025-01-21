'use client'

import { Datepicker, Card } from "flowbite-react";

export default function RightPanel() {
    return (
        <div className="w-full flex flex-col gap-3">
            <Datepicker language="ru" defaultValue={new Date()} color="info" inline className="self-center" />
            <Card>

            </Card>
        </div>
    )
}
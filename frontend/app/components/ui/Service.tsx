import Link from "next/link"
import { ServiceType } from "../lib/definitions"
import { Card } from "flowbite-react";

export default function Service({
    service
}: {
    service: ServiceType
}) {
    return (
        <Link
            href={service.target}
            target="_blank"
        >
            <Card
                className="max-w-sm p-2 h-20 shadow-blue-200"
                renderImage={() => <img width={75} height={50} src={service.image} alt="logo" />}
                horizontal>
                <div
                    className="text-primary font-medium"
                >{service.name}</div>
            </Card>
        </Link>
    )
}
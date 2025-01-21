'use client'

import Link from "next/link"
import { ServiceType } from "../lib/definitions"
import { Card } from "flowbite-react";
import Image from "next/image";

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
                renderImage={() => <Image width={80} height={50} src={service.image} alt="logo" />}
                horizontal>
                <div
                    className="text-primary font-medium"
                >{service.name}</div>
            </Card>
        </Link>
    )
}
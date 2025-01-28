'use client'

import Link from "next/link"
import { ServiceType } from "../lib/definitions"
import { Card } from "flowbite-react";
import Image from "next/image";
import { useLocale } from "next-intl";

export default function Service({
    service
}: {
    service: ServiceType
}) {
    const locale = useLocale();

    return (
        <Link
            href={service.target}
            target="_blank"
        >
            <Card
                className="max-w-sm p-2 h-20 shadow-blue-200"
                renderImage={() => <Image width={70} height={50} src={service.image} alt="logo" />}
                horizontal>
                <div
                    className="text-primary font-medium text-sm"
                >{service[`name_${locale}` as keyof typeof service]}</div>
            </Card>
        </Link>
    )
}
'use client'

import { Tabs } from "flowbite-react";
import { ServiceType } from "../lib/definitions";
import Service from "./Service";

export default function ServiceList({
    services
}: {
    services: ServiceType[]
}) {
    return (
        <Tabs aria-label="Default tabs" variant="underline" className="self-center">
            <Tabs.Item
                key={1}
                className=""
                active title="Основные сервисы МВД и ГП РК"
            >
                <div className="grid lg:grid-cols-3 gap-4 flex-wrap">
                    {services.filter(item => item.category === 1).map(item => (
                        <Service key={item.id} service={item} />
                    ))}
                </div>
            </Tabs.Item>
            <Tabs.Item
                key={2}
                className=""
                active title="Сервисы ДП Карагандинской области"
            >
                <div className="grid lg:grid-cols-3 gap-3 flex-wrap">
                    {services.filter(item => item.category === 2).map(item => (
                        <Service key={item.id} service={item} />
                    ))}
                </div>
            </Tabs.Item>
            <Tabs.Item
                key={3}
                className=""
                title="Сервисы других государственных органов"
            >
                <div className="grid lg:grid-cols-3 gap-3 flex-wrap">
                    {services.filter(item => item.category === 3).map(item => (
                        <Service key={item.id} service={item} />
                    ))}
                </div>
            </Tabs.Item>
        </Tabs>
    );
}
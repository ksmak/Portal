'use client'

import { Tabs } from "flowbite-react";
import { ServiceType } from "../lib/definitions";
import Service from "./Service";
import { CustomFlowbiteTheme } from "flowbite-react";

export default function ServiceList({
    services
}: {
    services: ServiceType[]
}) {
    const themeTabs: CustomFlowbiteTheme["tabs"] = {
        "tablist": {
            "tabitem": {
                "base": "flex item-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus-ouline-none disabled:cursor-not-allowed disabled: text-gray-400 disabled:dark:text-gray-500",
                "variant": {
                    "default": {
                        "active": {
                            "on": "bg-primary text-white border-none"
                        }
                    }
                }
            }
        }
    }
    return (
        <Tabs theme={themeTabs} aria-label="Default tabs" variant="default" className="self-center">
            <Tabs.Item
                key={1}
                className=""
                active title="Основные сервисы МВД и ГП РК"
            >
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap">
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
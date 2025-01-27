'use client'

import { Tabs } from "flowbite-react";
import { ServiceType } from "../lib/definitions";
import Service from "./Service";
import { CustomFlowbiteTheme } from "flowbite-react";
import useSWR from "swr";
import { fetcher_no_auth } from "@/app/fetcher";
import { useLocale } from "next-intl";

export default function ServiceList() {
    const locale = useLocale();

    const { data: services } = useSWR("/api/services/", fetcher_no_auth);

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
    const categories = [
        {
            id: 1,
            title_ru: "Основные сервисы МВД и ГП РК",
            title_kk: "ҚР ІІМ және БП негізгі қызметтері"
        },
        {
            id: 2,
            title_ru: "Сервисы ДП Карагандинской области",
            title_kk: "Қарағанды облысының ПД қызметтері",
        },
        {
            id: 3,
            title_ru: "Сервисы других государственных органов",
            title_kk: "Басқа мемлекеттік органдардың қызметтері",
        }
    ]
    return (
        <Tabs theme={themeTabs} aria-label="Default tabs" variant="default" className="self-center">
            {categories.map(category => (
                <Tabs.Item
                    key={category.id}
                    className="text-lg"
                    title={category[`title_${locale}` as keyof typeof category]}
                >
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 flex-wrap">
                        {services?.filter((item: ServiceType) => item.category === category.id).map((item: ServiceType) => (
                            <Service key={item.id} service={item} />
                        ))}
                    </div>
                </Tabs.Item>
            ))}
        </Tabs>
    );
}
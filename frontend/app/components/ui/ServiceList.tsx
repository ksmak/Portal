'use client'

import { Tabs } from "flowbite-react";
import { ServiceType } from "../lib/definitions";
import Service from "./Service";
import { CustomFlowbiteTheme, TabsRef } from "flowbite-react";
import useSWR from "swr";
import { fetcher_no_auth } from "@/app/fetcher";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from 'react';

export default function ServiceList() {
    const locale = useLocale();

    const { data: services } = useSWR("/api/services/", fetcher_no_auth);

    const tabsRef = useRef<TabsRef>(null);

    const [activeTab, setActiveTab] = useState(0);

    const themeTabs: CustomFlowbiteTheme["tabs"] = {
        "tabitemcontainer": {
            "base": "h-72 overflow-y-auto px-2",
        },
        "tablist": {
            "tabitem": {
                "base": "flex item-center justify-center rounded-t-lg p-2 text-sm font-medium first:ml-0 focus-ouline-none disabled:cursor-not-allowed disabled: text-gray-400 disabled:dark:text-gray-500",
                "variant": {
                    "fullWidth": {
                        "base": "ml-0 flex w-full rounded-none first:ml-0 text-sm",
                        "active": {
                            "on": "active rounded-none bg-primary p-2 text-white",
                            "off": "p-2 rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white"
                        }
                    }
                }
            }
        }
    }
    const categories = [
        {
            id: 1,
            title_ru: "Cервисы МВД, ГП РК",
            title_kk: "ҚР ІІМ және БП қызметтері"
        },
        {
            id: 2,
            title_ru: "Сервисы государственных органов",
            title_kk: "Mемлекеттік органдардың қызметтері",
        },
        {
            id: 3,
            title_ru: "Мои ссылки",
            title_kk: "Менің сілтемелерім",
        }
    ]

    useEffect(() => {
        tabsRef.current?.setActiveTab(-1)
    }, [])

    return (
        <div className="relative">
            <Tabs className="self-center" theme={themeTabs} variant="fullWidth" ref={tabsRef} onActiveTabChange={(tab) => setActiveTab(tab)}>
                {categories.map(category => (
                    <Tabs.Item
                        key={category.id}
                        title={category[`title_${locale}` as keyof typeof category]}
                    >
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 flex-wrap">
                            {services?.filter((item: ServiceType) => item.category === category.id).map((item: ServiceType) => (
                                <Service key={item.id} service={item} />
                            ))}
                        </div>
                    </Tabs.Item>
                ))}
            </Tabs>
            {activeTab === -1 && <div className="absolute top-11 border rounded-md p-2 w-full h-[40rem] overflow-y-auto">
                111
            </div>}
        </div>
    );
}
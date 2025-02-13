'use client'

import { useState } from "react"
import ServiceList from "./ServiceList"
import StatReportList from "./StatReportList"
import Link from "next/link"
import { MdContactPhone } from "react-icons/md"
import { useTranslations } from "next-intl"

export default function MainPanel() {
    const t = useTranslations("Contacts")

    const [activeTab, setActiveTab] = useState<number>(-1)

    return (
        <div className="relative">
            <ServiceList setActiveTab={setActiveTab} />
            {activeTab === -1 && <div className="absolute top-11 rounded-md p-2 w-full h-[40rem] overflow-y-auto">
                <div className="flex justify-between">
                    <StatReportList />
                    <div className="mt-5">
                        <Link href="/contacts" className="flex items-center gap-3 text-md p-3 text-primary border-2 border-primary font-medium rounded-lg">
                            <MdContactPhone className="w-10 h-10" />
                            <div>{t("site_name")}</div>
                        </Link>
                    </div>
                </div>
            </div>}
        </div>
    )
}
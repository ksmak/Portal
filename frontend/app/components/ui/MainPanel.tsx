'use client'

import { useState } from "react"
import ServiceList from "./ServiceList"
import StatReportList from "./StatReportList"

export default function MainPanel() {
    const [activeTab, setActiveTab] = useState<number>(-1)

    return (
        <div className="relative">
            <ServiceList setActiveTab={setActiveTab} />
            {activeTab === -1 && <div className="absolute top-11 border rounded-md p-2 w-full h-[40rem] overflow-y-auto">
                <StatReportList />
            </div>}
        </div>
    )
}
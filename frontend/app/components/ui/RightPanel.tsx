'use client'

import { CustomFlowbiteTheme, Datepicker, Card } from "flowbite-react";

export default function RightPanel() {
    const customTheme: CustomFlowbiteTheme["datepicker"] = {
        popup: {
            footer: {
                button: {
                    today: "invisible",
                    clear: "invisible"
                }
            },
        },
    }


    return (
        <div className="w-full flex flex-col gap-3">
            <Datepicker
                theme={customTheme}
                language="ru"
                defaultValue={new Date()}
                inline
                className="self-center"
                labelTodayButton="Сегодня"
                labelClearButton=""
                disabled={true}
            />
            <Card>

            </Card>
        </div>
    )
}
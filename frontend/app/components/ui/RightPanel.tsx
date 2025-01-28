'use client'

import { CustomFlowbiteTheme, Datepicker } from "flowbite-react";
import { useLocale } from "next-intl";

export default function RightPanel() {
    const locale = useLocale()

    const customTheme: CustomFlowbiteTheme["datepicker"] = {
        popup: {
            root: {
                inner: "inline-block rounded-lg bg-white p-4 shadow-lg shadow-blue-200 dark:bg-gray-700",
            },
            footer: {
                button: {
                    today: "invisible",
                    clear: "invisible"
                }
            },
        },
        views: {
            days: {
                items: {
                    item: {
                        selected: "bg-primary text-white"
                    }
                }
            }
        }
    }


    return (
        <div className="w-full flex flex-col gap-3">
            <Datepicker
                className="self-center"
                theme={customTheme}
                language={locale}
                defaultValue={new Date()}
                inline
            />

        </div>
    )
}
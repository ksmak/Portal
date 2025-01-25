'use client'

import { fetcher_no_auth } from "@/app/fetcher";
import { CustomFlowbiteTheme, Datepicker } from "flowbite-react";
import useSWR from "swr";
import { ListOfMonths, UserType } from "../lib/definitions";

export default function RightPanel() {
    const { data: users_born_today } = useSWR("/api/birth_users/?q=today", fetcher_no_auth);

    let currentMonth = ListOfMonths[new Date().getMonth()];

    const { data: users_born_this_month } = useSWR(`/api/birth_users/?q=${currentMonth}`)

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
                theme={customTheme}
                language="ru"
                defaultValue={new Date()}
                inline
                className="self-center"
                labelTodayButton="Сегодня"
                labelClearButton=""
                disabled={true}
            />
            <div className="px-5 text-sm text-primary">
                <div>
                    {users_born_today && (
                        <div key="born_1">
                            <h2>Сегодня день рождения у следующих сотрудников:</h2>
                            {users_born_today.map((item: UserType) => (
                                <div key={item.email} className="underline">{item.last_name} {item.first_name} {item.middle_name}</div>
                            ))}
                        </div>)}
                </div>
                <div>
                    {users_born_this_month && (
                        <div key="born_2">
                            <h2>В этом месяце у следующих сотрудников:</h2>
                            {users_born_this_month.map((item: UserType) => (
                                <div key={item.email} className="underline">{item.last_name} {item.first_name} {item.middle_name}</div>
                            ))}
                        </div>)}
                </div>
            </div>
        </div>
    )
}
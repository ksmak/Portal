'use client'

import useSWR from "swr"
import { fetcher, fetcher_no_auth } from "@/app/fetcher"
import { DictType, UserType } from "../lib/definitions"
import Contact from "./Contact"
import { useLocale, useTranslations } from "next-intl"

export default function ContactList() {
    const t = useTranslations('Contacts')

    const locale = useLocale()

    const { data: deparments } = useSWR("/api/departments/", fetcher_no_auth)
    const { data: managements } = useSWR("/api/managements/", fetcher_no_auth)
    const { data: divisions } = useSWR("/api/divisions/", fetcher_no_auth)
    const { data: users } = useSWR("/api/users/", fetcher)

    return (
        <div className="mt-5  border border-gray-200 rounded text-sm">
            <h1 className="text-2xl text-center text-blue-600 font-bold mb-10">{t('site_name')}</h1>
            {deparments?.map((department: DictType) => (
                <div key={department.id}>
                    <div className="p-2 bg-primary text-white font-medium uppercase">{department[`name_${locale}` as keyof typeof department]}</div>
                    <div>{managements?.map((management: DictType) => (
                        <div key={management.id}>
                            <div className="p-2 text-blue-600  font-medium uppercase ">{management[`name_${locale}` as keyof typeof management]}</div>
                            <div>
                                {divisions?.map((division: DictType) => (
                                    <div key={division.id}>
                                        <div className="p-2 text-gray-600 mt-2 font-medium uppercase ">{division[`name_${locale}` as keyof typeof division]}</div>
                                        <div>
                                            {users && users
                                                .filter((item: UserType) => item.department === department?.id && item.management === management?.id && item.division === division?.id)
                                                .map((user: UserType) => (<Contact key={user.email} user={user} />))}
                                        </div>
                                    </div>
                                ))}</div>
                        </div>
                    ))}</div>
                </div>
            ))}
        </div>
    )
}
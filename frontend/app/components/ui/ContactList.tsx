'use client'

import useSWR from "swr"
import { fetcher_no_auth } from "@/app/fetcher"
import { ContactType, DictType } from "../lib/definitions"
import Contact from "./Contact"
import { useLocale, useTranslations } from "next-intl"
import { TextInput } from "flowbite-react"
import { HiOutlineSearch } from "react-icons/hi"
import { useFilterContacts } from "../lib/hooks"
import { useState } from "react"

export default function ContactList() {
    const t = useTranslations('Contacts')

    const locale = useLocale()

    const [filter, setFilter] = useState<string>("")

    const { data: departments } = useSWR("/api/departments/", fetcher_no_auth)
    const { data: managements } = useSWR("/api/managements/", fetcher_no_auth)
    const { data: divisions } = useSWR("/api/divisions/", fetcher_no_auth)
    const { data: jobs } = useSWR("/api/jobs/", fetcher_no_auth)
    const { data: contacts_raw } = useSWR("/api/contacts/", fetcher_no_auth)

    const groupByDepartment = ({ department }: { department: number }) => {
        return department
    }

    const groupByManagement = ({ management }: { management: number }) => {
        return management
    }

    const groupByDivision = ({ division }: { division: number }) => {
        return division
    }

    const contacts = useFilterContacts(contacts_raw, filter)

    return (
        <div className="mt-5 text-sm">
            <h1 className="text-xl text-center text-primary font-bold">{t('site_name')}</h1>
            <TextInput className="py-3" type="text" icon={HiOutlineSearch} placeholder={t('search_by_fio')} onChange={(e) => setFilter(e.target.value)} />
            {contacts && Object.keys(Object.groupBy(contacts, groupByDepartment)).map((department: string, index: number) => (
                <div key={index}>
                    <div className="w-full bg-primary text-white uppercase p-2 font-medium">
                        {departments?.find((item: DictType) => item.id === parseInt(department))[`name_${locale}`]}
                    </div>
                    {contacts && Object.keys(Object.groupBy(contacts
                        .filter((item: ContactType) => item.department === parseInt(department)), groupByManagement))
                        .map((management: string, index: number) => (
                            <div key={index}>
                                <div className="w-full uppercase text-primary font-bold p-2">
                                    {managements?.find((item: DictType) => item.id === parseInt(management))[`name_${locale}`]}
                                </div>
                                {contacts && Object.keys(Object.groupBy(contacts
                                    .filter((item: ContactType) => item.department === parseInt(department)
                                        && item.management === parseInt(management)), groupByDivision))
                                    .map((division: string, index: number) => (
                                        <div key={index}>
                                            <div className="w-full text-primary p-2 uppercase font-medium">
                                                {divisions?.find((item: DictType) => item.id === parseInt(division))[`name_${locale}`]}
                                            </div>
                                            {contacts && contacts.filter((item: ContactType) => item.department === parseInt(department)
                                                && item.management === parseInt(management)
                                                && item.division === parseInt(division))
                                                .map((contact: ContactType, index: number) => (
                                                    <Contact key={index} contact={contact} jobs={jobs} />
                                                ))}
                                        </div>
                                    ))}
                            </div>
                        ))}
                </div>
            ))}
        </div>
    )
}
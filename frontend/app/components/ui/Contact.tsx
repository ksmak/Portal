'use client'

import { useLocale } from "next-intl"
import { ContactType, DictType } from "../lib/definitions"

export default function Contact({
    contact,
    jobs,
}: {
    contact: ContactType,
    jobs: DictType[] | undefined,
}) {
    const locale = useLocale()

    const getJobName = () => {
        let jobName = ""
        let job = jobs?.find(item => item.id === contact.job)

        if (job) {
            jobName = String(job[`name_${locale}` as keyof typeof job])
        }

        return jobName
    }

    return (
        <div className="p-2 font-medium text-gray-700 flex  border-t">
            <span className="w-1/3">{contact.last_name} {contact.first_name} {contact.middle_name}</span>
            <span className="w-1/3">{getJobName()}</span>
            <span className="w-1/3">{contact.phone}</span>
        </div>
    )
}
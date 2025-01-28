import { fetcher_no_auth } from "@/app/fetcher";
import useSWR from "swr";
import { ListOfMonths, UserType } from "../lib/definitions";
import { useTranslations } from "next-intl";
import moment from "moment";

export default function BirthDay() {
    const t = useTranslations('BirthDay')

    const { data: users_born_today } = useSWR("/api/birth_users/?q=today", fetcher_no_auth);

    let currentMonth = ListOfMonths[new Date().getMonth()];

    const { data: users_born_this_month } = useSWR(`/api/birth_users/?q=${currentMonth}`)

    return (
        <div className="px-5 text-sm text-primary">
            <div>
                {users_born_today?.length > 0 && (
                    <div key="born_1">
                        <h2>{t('today')}</h2>
                        {users_born_today.map((item: UserType) => (
                            <div key={item.email} className="underline">{item.last_name} {item.first_name} {item.middle_name}</div>
                        ))}
                    </div>)}
            </div>
            <div>
                {users_born_this_month?.length > 0 && (
                    <div key="born_2">
                        <h2>{t('month')}</h2>
                        {users_born_this_month.map((item: UserType) => (
                            <div key={item.email} className="underline">{item.last_name} {item.first_name} {item.middle_name} {moment(item.date_of_birth).format("MMM")}</div>
                        ))}
                    </div>)}
            </div>
        </div>
    )
}
import { fetcher_no_auth } from "@/app/fetcher"
import { useTranslations } from "next-intl"
import useSWR from "swr"
import { ListOfMonths, StatReport } from "../lib/definitions"
import { useState } from "react"
import { ImEject } from "react-icons/im"
import { HiDownload } from "react-icons/hi"
import moment from "moment"

export default function StatReportList() {
    const t = useTranslations("StatReport")

    const [show, setShow] = useState<any>({
        "s": true,
        [`y_${new Date().getFullYear()}`]: true,
        [`m_${new Date().getFullYear()}_${new Date().getMonth()}`]: true
    })

    const { data: reports } = useSWR("/api/statreports/", fetcher_no_auth)

    const groupByYear = ({ date_of_create }: { date_of_create: string }) => {
        return new Date(date_of_create).getFullYear()
    }

    const groupByMonth = ({ date_of_create }: { date_of_create: string }) => {
        return new Date(date_of_create).getMonth()
    }

    return (
        <div
            className="text-md font-medium"
        >
            <h4
                className="hover:cursor-pointer hover:underline flex items-center gap-2"
                onClick={() => setShow({ ...show, "s": !show["s"] })}
            >
                <ImEject className={show["s"] ? "rotate-180 w-3 text-primary" : "w-3 text-primary"} />{t("stat_reports")}
            </h4>
            {show["s"] && reports && Object.keys(Object.groupBy(reports, groupByYear)).map((year: string) => (
                <div
                    key={year}
                    className="ml-5"
                >
                    <div
                        className="hover:cursor-pointer hover:underline flex items-center gap-1"
                        onClick={() => setShow({ ...show, [`y_${year}`]: !show[`y_${year}`] })}
                    >
                        <ImEject className={show[`y_${year}`] ? "rotate-180 w-3 text-primary" : "w-3 text-primary"} />{year}
                    </div>
                    {
                        show[`y_${year}`] && Object.keys(Object.groupBy(
                            reports.filter((item: StatReport) => new Date(item.date_of_create).getFullYear() === parseInt(year)),
                            groupByMonth)).map((month: string, index: number) => (
                                <div
                                    key={index}
                                    className="ml-5"
                                >
                                    <div
                                        className="hover:cursor-pointer hover:underline flex items-center gap-1"
                                        onClick={() => setShow({ ...show, [`m_${year}_${month}`]: !show[`m_${year}_${month}`] })}
                                    >
                                        <ImEject className={show[`m_${year}_${month}`] ? "rotate-180 w-3 text-primary" : "w-3 text-primary"} />{t(`${ListOfMonths[parseInt(month)]}`)}
                                    </div>
                                    {show[`m_${year}_${month}`] && reports.filter((item: StatReport) => new Date(item.date_of_create).getFullYear() === parseInt(year) &&
                                        new Date(item.date_of_create).getMonth() === parseInt(month))
                                        .map((report: StatReport, index: number) => (
                                            <div key={index} className="ml-5">
                                                <a
                                                    href={report.file}
                                                    className="hover:cursor-pointer hover:underline flex items-center gap-1"
                                                >
                                                    <HiDownload className="text-primary" />{report.title} ({moment(report.date_of_create).format('D.MM.YYYY')})
                                                </a>
                                            </div>
                                        ))}
                                </div>
                            ))
                    }
                </div>
            ))
            }
        </div >
    )
}
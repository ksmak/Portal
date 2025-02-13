'use client'

import { useEffect, useState } from "react"
import { WeatherDayType, WeatherType } from "../lib/definitions"
import { useLocale } from "next-intl"
import { HiOutlineArrowUp } from "react-icons/hi"
import moment from "moment"
import 'moment/locale/ru'
import 'moment/locale/kk'

export default function WeatherPanel({
    weatherData,
}: {
    weatherData: WeatherType | undefined,
}) {
    const locale = useLocale()

    const [data, setData] = useState<WeatherDayType>()

    const getData = () => {
        let txtDate = moment().format("YYYY-MM-DD")
        const h = new Date().getHours()
        switch (h) {
            case 0:
            case 1:
            case 2: txtDate = `${txtDate} 00:00:00`; break
            case 3:
            case 4:
            case 5: txtDate = `${txtDate} 03:00:00`; break
            case 6:
            case 7:
            case 8: txtDate = `${txtDate} 06:00:00`; break
            case 9:
            case 10:
            case 11: txtDate = `${txtDate} 09:00:00`; break
            case 12:
            case 13:
            case 14: txtDate = `${txtDate} 12:00:00`; break
            case 15:
            case 16:
            case 17: txtDate = `${txtDate} 15:00:00`; break
            case 18:
            case 19:
            case 20: txtDate = `${txtDate} 18:00:00`; break
            case 21:
            case 22:
            case 23: txtDate = `${txtDate} 21:00:00`; break
        }
        setData(weatherData?.list?.find((item: WeatherDayType) => item.dt_txt === txtDate))
    }

    useEffect(() => {
        getData()
    })

    return (
        <div className="text-xs text-primary">
            <div>Караганда, {moment().locale(locale).format('LL, dddd')}</div>
            {data && <div className="flex items-center gap-1">
                <i className={`owf owf-${data?.weather[0].id} owf-3x`}></i>
                <div className="flex items-center gap-1">
                    {data?.main?.temp} °C,<HiOutlineArrowUp />{data?.wind?.speed} м\сек
                </div>
            </div>}
        </div>
    )
}
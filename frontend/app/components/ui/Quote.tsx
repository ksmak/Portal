'use client'
import { lobster } from "@/app/fonts"
import { WeatherType } from "../lib/definitions"

export default function Quote({
    text,
    author,
}: {
    text: string,
    author: string,
}) {

    return (
        <div className={`${lobster.className} text-primary text-sm text-end`}>
            <div>{text}</div>
            <div>{author}</div>
        </div>
    )
}
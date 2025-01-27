'use client'

import { useLocale } from "next-intl"
import { QuoteType } from "../lib/definitions"

export default function Quote({
    quoteObj
}: {
    quoteObj: QuoteType
}) {
    const locale = useLocale()

    return (
        <div className="mt-4 self-end px-10 text-primary text-end italic font-normal text-lg">
            <div>{quoteObj[`text_${locale}` as keyof typeof quoteObj]}</div>
            <div>{quoteObj[`author_${locale}` as keyof typeof quoteObj]}</div>
        </div>
    )
}
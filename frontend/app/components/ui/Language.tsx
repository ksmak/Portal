import { Locale } from "@/i18n/config"
import { setUserLocale } from "../lib/locale"
import { useLocale } from "next-intl"
import { Dropdown, TabItem } from "flowbite-react"
import { useTransition } from 'react';
import { CustomFlowbiteTheme } from "flowbite-react";
import { title } from "process";

export default function Language() {
    const [isPending, startTransition] = useTransition();

    const locale = useLocale()

    const langs = [
        {
            title: "рус",
            label: "ru"
        },
        {
            title: "қаз",
            label: "kk"
        }
    ]

    function onChange(value: string) {
        const locale = value as Locale;
        startTransition(() => {
            setUserLocale(locale);
        });
    }

    const dropdownTheme: CustomFlowbiteTheme['dropdown'] = {
    }


    return (
        <div>
            <Dropdown theme={dropdownTheme} renderTrigger={() =>
                <div className="text-sm uppercase font-bold text-white border border-white p-2 rounded-lg hover:cursor-pointer">
                    {langs.filter(item => item.label === locale)[0].title}
                </div>}>
                {langs.filter(item => item.label != locale).map(item => (
                    <Dropdown.Item
                        key={item.label}
                        onClick={() => onChange(item.label)}>
                        {item.title}
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    )
}
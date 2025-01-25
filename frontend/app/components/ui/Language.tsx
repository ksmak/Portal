import { Locale } from "@/i18n/config"
import { setUserLocale } from "../lib/locale"
import { useLocale } from "next-intl"
import { Dropdown } from "flowbite-react"
import { useTransition } from 'react';
import { CustomFlowbiteTheme } from "flowbite-react";

export default function Language() {
    const [isPending, startTransition] = useTransition();

    const locale = useLocale()

    const langs = [
        "ru",
        "kk"
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
            <Dropdown theme={dropdownTheme} renderTrigger={() => <div className="text-sm uppercase font-bold text-white border border-white p-2 rounded-lg hover:cursor-pointer">{locale}</div>}>
                {langs.filter(item => item != locale).map(item => (
                    <Dropdown.Item
                        key={item}
                        onClick={() => onChange(item)}>
                        {item}
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    )
}
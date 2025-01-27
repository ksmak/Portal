'use client'

import { Footer } from "flowbite-react";
import { useLocale } from "next-intl";
import { useState } from "react";

export default function FooterComponent() {
    const locale = useLocale()

    const [isOpen, setIsOpen] = useState(false)

    const footer_software = {
        title_ru: "Программное обеспечение",
        title_kk: "Бағдарламалық қамтамасыз ету",
        items: [
            {
                title_ru: "NCALayer(64 бит)",
                title_kk: "NCALayer(64 бит)",
                link: "http://192.168.10.100/ibdrqs/files/NCALayerInstall_x64.exe"
            },
            {
                title_ru: "NCALayer(32 бит)",
                title_kk: "NCALayer(32 бит)",
                link: "http://192.168.10.100/ibdrqs/files/NCALayerInstall_x86.exe"
            },
            {
                title_ru: "CryptoSocket",
                title_kk: "CryptoSocket",
                link: "http://10.61.209.47:8888/erdr/CryptoSocket/SetupCryptoSocket.zip"
            },
        ]
    }

    const footer_contacts = {
        title_ru: "Техническая поддержка",
        title_kk: "Техникалық көмек көрсету",
        department_ru: "УИиС ДП Карагандинской области",
        department_kk: "Қарағанды облысның ПД АжББ",
        address_ru: "г.Караганда, улица Ерубаева 37",
        address_kk: "Қарағанды қ., Ерубаева көшесі 37",
        items: [
            {
                division_ru: "отдел связи:",
                division_kk: "байланыс бөлімі:",
                phone: "8(7212)-42-90-00",
            },
            {
                division_ru: "отдел компьютеризации:",
                division_kk: "компьютерлеу бөлімі",
                phone: "8(7212)-42-90-66",
            },
        ]
    }

    return (
        <Footer className="hover:cursor-pointer bg-gray-50 p-1 text-sm" container onClick={() => setIsOpen(!isOpen)}>
            <div className="w-full">
                <div className="w-full grid grid-cols-2 justify-items-center">
                    <div>
                        <Footer.Title title={footer_software[`title_${locale}` as keyof typeof footer_software] as string} />
                        {isOpen && <Footer.LinkGroup col>
                            {footer_software.items.map((item, index) => (
                                <Footer.Link href={item.link} key={index}>
                                    {item[`title_${locale}` as keyof typeof item]}
                                </Footer.Link>
                            ))}
                        </Footer.LinkGroup>}
                    </div>
                    <div>
                        <Footer.Title title={footer_contacts[`title_${locale}` as keyof typeof footer_contacts] as string} />
                        {isOpen && <div className="flex flex-col gap-2 text-gray-500">
                            <span>{footer_contacts[`department_${locale}` as keyof typeof footer_contacts] as string}</span>
                            <span>{footer_contacts[`address_${locale}` as keyof typeof footer_contacts] as string}</span>
                            <div>
                                {footer_contacts.items.map((item, index) => (
                                    <div className="flex justify-between gap-2" key={index}>
                                        <div>{item[`division_${locale}` as keyof typeof item]}</div>
                                        <div>{item.phone}</div>
                                    </div>
                                ))}
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </Footer>
    )
}
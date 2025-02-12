'use client'

import Link from "next/link"
import { ServiceType } from "../lib/definitions"
import { Card, Dropdown } from "flowbite-react"
import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"
import { Dispatch, SetStateAction } from "react"
import { HiChevronDown } from "react-icons/hi"

export default function Service({
    service,
    isFavorite,
    setFavorites,
}: {
    service: ServiceType,
    isFavorite: boolean,
    setFavorites: Dispatch<SetStateAction<ServiceType[]>>
}) {
    const locale = useLocale()

    const t = useTranslations("Service")

    const handleAddFavorite = (service: ServiceType) => {
        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
        const findObj = favorites.find((item: ServiceType) => item.id === service.id)
        if (!findObj) {
            favorites.push(service)
            localStorage.setItem("favorites", JSON.stringify(favorites))
            setFavorites(favorites)
        }
    }

    const handleDeleteFavorite = (service: ServiceType) => {
        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]")
        favorites = favorites.filter((item: ServiceType) => item.id !== service.id)
        localStorage.setItem("favorites", JSON.stringify(favorites))
        setFavorites(favorites)
    }

    return (
        <div className="relative">
            <div className="absolute w-full">
                <Link
                    href={service.target}
                    target="_blank"
                >
                    <Card
                        className="max-w-sm p-2 h-20 shadow-blue-200"
                        renderImage={() => <Image width={70} height={50} src={service.image} alt="logo" />}
                        horizontal>
                        <div
                            className="text-primary font-medium text-sm"
                        >{service[`name_${locale}` as keyof typeof service]}</div>
                    </Card>
                </Link>
            </div>
            <div className="absolute right-0">
                <Dropdown renderTrigger={() =>
                    <div className="rounded-md p-1 hover:cursor-pointer hover:bg-gray-50 hover:border-t hover:border-r">
                        <HiChevronDown className="w-5 h-5" />
                    </div>}>
                    {isFavorite
                        ? <Dropdown.Item onClick={() => handleDeleteFavorite(service)}>
                            {t("delete_favorite")}
                        </Dropdown.Item>
                        : <Dropdown.Item onClick={() => handleAddFavorite(service)}>
                            {t("add_favorite")}
                        </Dropdown.Item>}
                </Dropdown>
            </div>
        </div>
    )
}
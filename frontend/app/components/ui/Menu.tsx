'use client'

import { useTranslations } from 'next-intl';
import { MegaMenu, Navbar, Dropdown, CustomFlowbiteTheme } from 'flowbite-react';
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/components/lib/utils";
import Link from 'next/link';
import Image from 'next/image';
import { HiCog } from "react-icons/hi";
import Language from './Language';

export default function Menu() {
    const t = useTranslations('HomePage');

    const SITE_NAME = "Информационный портал Департамента полиции Карагандинской области"

    const router = useRouter();

    const { data: user } = useSWR("/auth/users/me", fetcher);

    const { logout, removeTokens } = AuthActions();

    const handleLogout = () => {
        logout()
            .res(() => {
                removeTokens();

                router.push("/");
            })
            .catch(() => {
                removeTokens();
                router.push("/");
            });
    };

    return (
        <div className='w-full p-0 m-0'>
            <MegaMenu className='p-0 m-0'>
                <div className="w-full bg-primary flex flex-wrap items-center justify-between p-2 pl-10 m-0">
                    <Navbar.Brand href="/">
                        <Image width={90} height={70} alt="logo" src="/logo.png" />
                        <span className="pl-5 self-center whitespace-nowrap text-xl font-semibold text-white">{SITE_NAME}</span>
                    </Navbar.Brand>
                    <div className="order-2 hidden items-center gap-4 md:flex pr-5">
                        <Dropdown label="" dismissOnClick={false} renderTrigger={() => <div className='flex gap-2 items-center'><span className='text-white p-2 text-sm hover:cursor-pointer'>{user?.email}</span><HiCog className='w-5 h-5 text-white' /></div>}>
                            {!user && <Dropdown.Item><Link href="/auth/login">Вход</Link></Dropdown.Item>}
                            {user && <Dropdown.Item onClick={handleLogout}>Выход</Dropdown.Item>}
                        </Dropdown>
                        <Language />
                    </div>
                </div>
            </MegaMenu>
        </div>
    )
}
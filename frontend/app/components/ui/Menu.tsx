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
    const t = useTranslations('Menu');

    const router = useRouter();

    const { data: user } = useSWR("/auth/users/me", fetcher);

    const { logout, removeTokens } = AuthActions();

    const handleLogout = () => {
        logout()
            .res(() => {
                removeTokens();
                router.push("/");
                window.location.reload()
            })
            .catch(() => {
                removeTokens();
                router.push("/");
                window.location.reload()
            });
    };

    const menuTheme: CustomFlowbiteTheme['megaMenu'] = {
        "root": {
            "base": "shadow shadow-md shadow-[#d1e8fa]",
        },
    }

    return (
        <MegaMenu theme={menuTheme}>
            <div className="w-full bg-gradient-to-r from-[#178de8] to-[#1271ba] flex flex-wrap items-center justify-between p-2 pl-10 m-0">
                <Navbar.Brand href="/">
                    <Image width={60} height={60} alt="logo" src="/logo.png" />
                    <div className='ml-5 flex flex-col gap-2'>
                        <div className="pl-5 whitespace-nowrap text-xs uppercase font-medium text-white tracking-wider">
                            {t('site_name')}
                        </div>
                        <div className="pl-5 whitespace-nowrap text-xs uppercase font-medium text-white tracking-wider">
                            {t('dp_name')}
                        </div>
                    </div>
                </Navbar.Brand>
                <div className="order-2 hidden items-center gap-4 md:flex pr-5">
                    {/* <Dropdown label="" dismissOnClick={false} renderTrigger={() => <div className='flex gap-2 items-center'><span className='text-white p-2 text-sm hover:cursor-pointer'>{user?.email}</span><HiCog className='w-5 h-5 text-white' /></div>}>
                        {!user && <Dropdown.Item><Link href="/auth/login">Вход</Link></Dropdown.Item>}
                        {user && <Dropdown.Item onClick={handleLogout}>Выход</Dropdown.Item>}
                    </Dropdown> */}
                    <Language />
                </div>
            </div>
        </MegaMenu>
    )
}
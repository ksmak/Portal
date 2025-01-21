'use client'

import { MegaMenu, Navbar, Dropdown, CustomFlowbiteTheme } from 'flowbite-react';
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/fetcher";
import { AuthActions } from "@/app/components/lib/utils";
import Link from 'next/link';
import Image from 'next/image';
import { HiCog } from "react-icons/hi";

export default function Menu() {
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

    const dropdownTheme: CustomFlowbiteTheme["dropdown"] = {
        content: "bg-primary"
    }

    return (
        <MegaMenu className='p-0 m-0'>
            <div className="w-full bg-primary flex flex-wrap items-center justify-between p-4">
                <Navbar.Brand href="/">
                    <Image width={70} height={50} alt="logo" src="/logo.png" className="mr-3 h-16" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Информационный портал ДП Карагандинской области</span>
                </Navbar.Brand>
                <div className=" order-2 hidden items-center gap-2 md:flex">
                    <Dropdown label="" dismissOnClick={false} renderTrigger={() => <div className='flex gap-2 items-center'><span className='text-white p-2 text-sm hover:cursor-pointer'>{user?.email}</span><HiCog className='w-5 h-5 text-white' /></div>}>
                        {!user && <Dropdown.Item><Link href="/auth/login">Вход</Link></Dropdown.Item>}
                        {user && <Dropdown.Item onClick={handleLogout}>Выход</Dropdown.Item>}
                    </Dropdown>
                </div>
            </div>
        </MegaMenu>
    )
}
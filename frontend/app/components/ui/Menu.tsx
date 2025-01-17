'use client'

import { Button, MegaMenu, Navbar } from 'flowbite-react';

export default function Menu() {
    return (
        <MegaMenu className='p-0'>
            <div className="w-full bg-primary flex flex-wrap items-center justify-between p-4">
                <Navbar.Brand href="/">
                    <img alt="" src="logo.png" className="mr-3 h-16" />
                    <span className="self-center whitespace-nowrap text-xl font-semibold text-white">Информационный портал ДП Карагандинской области</span>
                </Navbar.Brand>
                <div className=" order-2 hidden items-center gap-2 md:flex">
                    <span className='text-white text-sm'></span>
                    <Button className='bg-primary hover:underline' href="#">Вход</Button>
                </div>
            </div>
        </MegaMenu>
    )
}
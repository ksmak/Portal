'use client'

import { Footer } from "flowbite-react";
import { useState } from "react";

export default function FooterComponent() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Footer className="hover:cursor-pointer" container onClick={() => setIsOpen(!isOpen)}>
            <div className="w-full">
                <div className="w-full grid grid-cols-2 justify-items-center">
                    <div>
                        <Footer.Title title="Программное обеспечение" />
                        {isOpen && <Footer.LinkGroup col>
                            <Footer.Link href="#">NCALayer</Footer.Link>
                            <Footer.Link href="#">CryptoSocket</Footer.Link>
                        </Footer.LinkGroup>}
                    </div>
                    <div>
                        <Footer.Title title="Техническая поддержка" />
                        {isOpen && <div className="flex flex-col gap-2 text-gray-500">
                            <span>УИиС ДП Карагандинской области</span>
                            <span>г.Караганда, улица Ерубаева 37</span>
                            <span>8(7212)-42-90-66</span>
                            <span>8(7212)-42-92-83</span>
                            <span>8(7212)-42-92-63</span>
                        </div>}
                    </div>
                </div>
                {/* <Footer.Divider /> */}
                <Footer.Copyright href="#" by="Департамент полиции Карагандинской области" year={2025} />
            </div>
        </Footer>
    )
}
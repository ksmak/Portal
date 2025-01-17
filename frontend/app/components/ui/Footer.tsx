import { Footer } from "flowbite-react";

export default function FooterComponent() {
    return (
        <Footer container className="justify-self-end">
            <div className="w-full text-center">
                <Footer.Copyright href="#" by="Департамент полиции Карагандинской области" year={2025} />
            </div>
        </Footer>
    )
}
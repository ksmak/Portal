import type { Metadata } from "next";
import "./globals.css";
import Menu from "./components/ui/Menu";
import Footer from "./components/ui/Footer";

export const metadata: Metadata = {
  title: "Информационный портал ДП Карагандинской области",
  description: "Информационный портал ДП Карагандинской области",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="h-screen flex flex-col">
        <Menu />
        <div className="px-4 grow">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

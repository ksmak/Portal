import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import Menu from "./components/ui/Menu";
import Footer from "./components/ui/Footer";
import Quote from "./components/ui/Quote";
import { lobster } from "./fonts";

export const metadata: Metadata = {
  title: "Портал",
  description: "Информационный портал Департамента полиции Карагандинской области",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className="h-screen flex flex-col">
          <Menu />
          <div className={lobster.className}>
            <Quote text={process.env.QUOTE_TEXT || ""} author={process.env.QUOTE_AUTHOR || ""} />
          </div>
          <div className="px-4 grow">
            {children}
          </div>
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}

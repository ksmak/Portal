import type { Metadata } from "next";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import "./globals.css";
import Menu from "./components/ui/Menu";
import Footer from "./components/ui/Footer";
import Quote from "./components/ui/Quote";
import { lobster } from "./fonts";
import { QuoteType } from "./components/lib/definitions";

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

  const quoteObj: QuoteType = {
    text_ru: process.env.QUOTE_TEXT_RU ? `\" ${process.env.QUOTE_TEXT_RU} \"` : "",
    text_kk: process.env.QUOTE_TEXT_KK ? `\" ${process.env.QUOTE_TEXT_KK} \"` : "",
    author_ru: process.env.QUOTE_AUTHOR_RU || "",
    author_kk: process.env.QUOTE_AUTHOR_KK || "",
  }

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className="h-screen flex flex-col" suppressHydrationWarning>
          <Menu />
          <div className={lobster.className}>
            <Quote quoteObj={quoteObj} />
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

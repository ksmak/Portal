import type { Metadata } from "next"
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import Menu from "./components/ui/Menu"
import Quote from "./components/ui/Quote"
import { API_HOST, ConfigType } from "./components/lib/definitions"
import WeatherPanel from "./components/ui/WeatherPanel"
import "./globals.css"
import "@/owfont-master/css/owfont-regular.css"

export const metadata: Metadata = {
  title: "Портал ДП области",
  description: "Информационный портал Департамента полиции Карагандинской области",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  const messages = await getMessages()

  const data = await fetch(`${API_HOST}/api/configs`)

  const cfg = await data.json() as ConfigType[]

  return (
    <html lang={locale}>
      <NextIntlClientProvider messages={messages}>
        <body className="h-screen flex flex-col" suppressHydrationWarning>
          <Menu />
          <div className="mt-4 px-10 flex justify-between">
            <WeatherPanel weatherData={cfg[0].weather} />
            <Quote
              text={String(cfg[0][`quote_text_${locale}` as keyof typeof cfg[0]]) || ""}
              author={String(cfg[0][`quote_author_${locale}` as keyof typeof cfg[0]]) || ""}
            />
          </div>
          <div className="px-4 grow">
            {children}
          </div>
        </body>
      </NextIntlClientProvider>
    </html>
  )
}

// import ClientCommons from "./ClientCommons";
import "./globals.css";
import { notFound } from "next/navigation";
import { createTranslator, NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
// import ToastProvider from "./toastProvider";
// import "react-toastify/dist/ReactToastify.css";
// import viLocale from "antd/locale/vi_VN";
// import enLocale from "antd/locale/en_US";
// import krLocale from "antd/locale/ko_KR";
// import { ConfigProvider } from "antd";
// import { primaryColor } from "@/libs/appconst";
// import AcceptCookies from "@/components/PopupAcceptCookies";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

async function getMessages(locale: string) {
  try {
    return (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  return ["en", "vi", "ko"].map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getMessages(locale);

  // You can use the core (non-React) APIs when you have to use next-intl
  // outside of components. Potentially this will be simplified in the future
  // (see https://next-intl-docs.vercel.app/docs/next-13/server-components).
  const t = createTranslator({ locale, messages });

  return {
    title: t("LocaleLayout.title"),
    icons: [{ rel: "icon", url: "" }],
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  const messages = await getMessages(locale);

  let currentLocaleObj = "viLocale";
  switch (locale) {
    case "vi":
      currentLocaleObj = "viLocale";
      break;
    case "en":
      currentLocaleObj = "enLocale";
      break;
    case "kr":
      currentLocaleObj = "krLocale";
      break;
    default:
      currentLocaleObj = "viLocale";
      break;
  }

  return (
    <html lang={locale}>
      <body className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* <ConfigProvider
            locale={currentLocaleObj}
            theme={{
              token: {
                colorPrimary: primaryColor,
              },
            }}
          >
            <ToastProvider>
              <AcceptCookies /> */}
          {children}
          {/* </ToastProvider>
          </ConfigProvider> */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

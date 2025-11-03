import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import FloatingActions from "@/components/site/FloatingActions";

const SUPPORTED_LOCALES = ["fr", "en"] as const;
type Locale = typeof SUPPORTED_LOCALES[number];

export const metadata: Metadata = {
  title: "Archidiocèse de Yaoundé",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!SUPPORTED_LOCALES.includes(locale as Locale)) return notFound();
  const l = locale as Locale;
  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={l} />
  <main className="flex-1 w-full p-0 m-0">{children}</main>
  <FloatingActions locale={l} />
      <Footer locale={l} />
    </div>
  );
}

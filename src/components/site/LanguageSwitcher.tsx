import Link from "next/link";

export default function LanguageSwitcher({ locale }: { locale: "fr" | "en" }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href="/fr"
        className={`text-black hover:underline ${locale === "fr" ? "font-semibold" : ""}`}
      >
        FR
      </Link>
      <span>/</span>
      <Link
        href="/en"
        className={`text-black hover:underline ${locale === "en" ? "font-semibold" : ""}`}
      >
        EN
      </Link>
    </div>
  );
}

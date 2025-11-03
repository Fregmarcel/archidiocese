import Link from 'next/link';
import SectionReveal from './SectionReveal';

export default function NewsTeaser({ locale }: { locale: string }) {
  const t = (fr: string, en: string) => (locale === 'fr' ? fr : en);
  const items = [
    { id: 1, title: t("Grande célébration à la cathédrale", "Great celebration at the cathedral"), href: `/${locale}/actualites` },
    { id: 2, title: t("Nouveau programme pastoral", "New pastoral program"), href: `/${locale}/actualites` },
    { id: 3, title: t("Ouverture des inscriptions", "Opening of registrations"), href: `/${locale}/actualites` },
  ];
  return (
    <SectionReveal className="bg-white">
      <div className="container mx-auto px-4 py-10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl md:text-2xl font-bold">{t("Actualités", "News")}</h2>
          <Link href={`/${locale}/actualites`} className="text-[#BE2722] hover:underline text-sm font-semibold">
            {t("Voir toutes", "See all")}
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {items.map((it) => (
            <Link
              key={it.id}
              href={it.href}
              className="group rounded border border-neutral-200 p-4 shadow-sm hover:shadow-md transition bg-white"
            >
              <div className="h-32 rounded bg-neutral-200" />
              <h3 className="mt-3 font-semibold group-hover:text-[#BE2722]">{it.title}</h3>
              <span className="mt-2 inline-block text-[#2E9B51] text-sm font-bold">{t("Lire", "Read")}</span>
            </Link>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}

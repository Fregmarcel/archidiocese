import Link from 'next/link';

export default function Page({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-extrabold uppercase text-[#25282E]">Bibliographie</h1>
      <p className="text-neutral-600 mt-2">Sélection d’ouvrages et de références.</p>
      <div className="mt-6">
        <Link href={`/${locale}`} className="text-[#BE2722] font-semibold hover:underline">Retour à l’accueil</Link>
      </div>
    </main>
  );
}

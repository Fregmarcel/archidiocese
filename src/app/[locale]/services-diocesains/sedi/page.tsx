import Link from "next/link";

export default async function SediPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-6 md:py-10">
        {/* Title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#25282E]">LE SEDI</h1>
            <p className="text-sm text-neutral-600">
              Service Diocésain de l’Information (structure et activités)
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main content */}
          <div className="lg:col-span-9 space-y-6">
            {/* Présentation */}
            <div className="border border-neutral-200 rounded bg-white">
              <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
                <h2 className="text-base md:text-lg font-extrabold text-[#0F172A]">Présentation du SEDI</h2>
                <button aria-label="Editer" className="text-neutral-500 hover:text-[#BE2722]">
                  {/* pencil icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9"/>
                    <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/>
                  </svg>
                </button>
              </div>
              <div className="px-4 py-4">
                <h2 className="text-base md:text-lg font-extrabold text-[#0F172A]">Présentation du SEDI</h2>
                <button aria-label="Editer" className="text-neutral-500 hover:text-[#BE2722]">
                  {/* pencil icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                </button>
              </div>
              <div className="px-4 py-4">
                <p className="text-sm leading-6 text-neutral-700">
                  Le Service Diocésain de l’Information (SEDI) est chargé de la communication interne et externe de
                  l’Archidiocèse de Yaoundé. Il coordonne la production des contenus (textuels, photos, vidéos,
                  multimédias) et facilite la diffusion auprès des fidèles, des partenaires et du grand public.
                </p>
              </div>
            </div>

            {/* Actualités */}
            <div className="border border-neutral-200 rounded bg-white">
              <div className="px-4 py-3 border-b border-neutral-200">
                <h2 className="text-base md:text-lg font-extrabold text-[#0F172A]">Actualités SEDI</h2>
                <p className="text-xs text-neutral-500">Images, vidéos, PDF, interviews</p>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2,3,4].map((i) => (
                  <article key={i} className="border border-neutral-200 rounded overflow-hidden bg-white">
                    <div className="h-40 md:h-48 bg-neutral-100" />
                    <div className="p-3 space-y-2">
                      <h3 className="text-sm font-semibold text-[#0F172A]">Titre de l’actualité {i}</h3>
                      <p className="text-xs text-neutral-600 line-clamp-2">Bref descriptif de l’actualité {i} pour voir les ressources…</p>
                      <div className="flex flex-wrap gap-2">
                        {['SEDI','Actu','Média'].map((t) => (
                          <span key={t} className="px-2 py-0.5 text-[11px] rounded border border-neutral-300 text-neutral-600">{t}</span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Équipe SEDI */}
            <div className="border border-neutral-200 rounded bg-white">
              <div className="px-4 py-3 border-b border-neutral-200">
                <h2 className="text-base md:text-lg font-extrabold text-[#0F172A]">Équipe SEDI</h2>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="flex items-center gap-3 border border-neutral-200 rounded p-3">
                    <div className="w-12 h-12 rounded bg-neutral-200" />
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">Nom Prénom</p>
                      <p className="text-xs text-neutral-600">Fonction au SEDI</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Écoles */}
            <div className="border border-neutral-200 rounded bg-white">
              <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
                <h2 className="text-base md:text-lg font-extrabold text-[#0F172A]">Écoles</h2>
                <Link href={`/${locale}/ecoles`} className="text-xs text-[#BE2722] hover:underline">Voir toutes</Link>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">Collège Catholique Saint Joseph</p>
                    <Link href={`/${locale}/ecoles/saint-joseph`} className="text-xs text-[#BE2722] hover:underline">Voir détails</Link>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">École Primaire Saint Vincent Pallotti</p>
                    <Link href={`/${locale}/ecoles/saint-vincent-pallotti`} className="text-xs text-[#BE2722] hover:underline">Voir détails</Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">Lycée Catholique Sainte Thérèse</p>
                    <Link href={`/${locale}/ecoles/sainte-therese`} className="text-xs text-[#BE2722] hover:underline">Voir détails</Link>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#0F172A]">Institut Supérieur d’Agronomie (ISA)</p>
                    <Link href={`/${locale}/ecoles/isa`} className="text-xs text-[#BE2722] hover:underline">Voir détails</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Partenaires */}
            <div className="border border-neutral-200 rounded bg-white">
              <div className="px-4 py-3 border-b border-neutral-200">
                <h2 className="text-base md:text-lg font-extrabold text-[#0F172A]">Partenaires</h2>
              </div>
              <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-16 rounded border border-neutral-200 bg-neutral-50 flex items-center justify-center text-xs text-neutral-500">
                    Logo partenaire
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-3 space-y-6">
            <div className="border border-neutral-200 rounded bg-white">
              <div className="px-4 py-3 border-b border-neutral-200">
                <h3 className="text-sm font-extrabold text-[#0F172A]">Newsletter</h3>
              </div>
              <div className="p-4 space-y-2">
                <label className="sr-only" htmlFor="newsletter-email">Votre email</label>
                <input id="newsletter-email" type="email" placeholder="Votre email" className="w-full rounded border border-neutral-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#BE2722]/30" />
                <button className="w-full bg-[#BE2722] text-white rounded px-3 py-2 text-sm font-semibold hover:opacity-95">S’inscrire</button>
              </div>
            </div>

            <div className="border border-neutral-200 rounded bg-white">
              <div className="px-4 py-3 border-b border-neutral-200">
                <h3 className="text-sm font-extrabold text-[#0F172A]">Dons</h3>
              </div>
              <div className="p-4 space-y-3">
                <p className="text-sm text-neutral-700">Soutenez les actions de l’Archidiocèse. Chaque don compte.</p>
                <Link href={`/${locale}/dons`} className="inline-flex items-center justify-center bg-neutral-900 text-white rounded px-3 py-2 text-sm font-semibold hover:opacity-95">Faire un don</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

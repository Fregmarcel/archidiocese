import Image from "next/image";
import Link from "next/link";

type Props = { locale: string };

type CurieMember = {
  id: string;
  name: string;
  role: string;
  subtitle?: string;
  image: string;
  href: string;
};

const sample: Omit<CurieMember, "href">[] = [
  {
    id: "t1",
    name: "Rév. Père Pr Thomas Bienvenu TCHOUNGUI",
    role: "Professeur",
    subtitle: "Recteur/UCAC",
    image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "t2", 
    name: "Rév. Père Pr Yvon Christian ELENGA, sj.",
    role: "Doyen",
    subtitle: "FSSG",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "t3",
    name: "Rév. Père Pr Stéphane Gaston BOBONGAUD",
    role: "Doyen a.i",
    subtitle: "Faculté de Philosophie",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "t4",
    name: "Rév. Père Pr François NDZANA",
    role: "Doyen",
    subtitle: "Faculté de Théologie",
    image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "t5",
    name: "Dr Pulchérie AMOUGUI",
    role: "Doyen, a.i",
    subtitle: "FSJP",
    image: "https://images.unsplash.com/photo-1531123414780-f7424f18b56b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "t6",
    name: "Sr. Pr. Angèle MAKJANG",
    role: "DIRECTEUR",
    subtitle: "DDC",
    image: "https://images.unsplash.com/photo-1545696968-1c3b0a0f2e2c?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function CurieDiocesaine({ locale }: Props) {
  const items: CurieMember[] = sample.map((t) => ({ ...t, href: `/${locale}/enseignants` }));

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-10">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[#25282E]">Curie Diocésaine</h2>
          <p className="text-neutral-500 text-sm md:text-base mt-1">Présentation et annuaire</p>
          <div className="relative my-4 flex items-center justify-center">
            <span className="h-px w-24 bg-neutral-200" />
            <span className="mx-3 grid place-items-center w-8 h-8 rounded bg-[#BE2722] text-white">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12l-10-5-10 5 10 5 10-5z"/>
                <path d="M6 12v5c2.5 2 9.5 2 12 0v-5"/>
              </svg>
            </span>
            <span className="h-px w-24 bg-neutral-200" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {items.map((p) => (
            <div key={p.id} className="text-center">
              <figure className="group relative overflow-hidden rounded bg-white border border-neutral-200">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={p.image} 
                    alt={p.name} 
                    fill 
                    sizes="(min-width:1024px) 16vw, (min-width:640px) 33vw, 50vw" 
                    className="object-cover transition-transform duration-300 group-hover:scale-105 group-focus-within:scale-105" 
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />
                  <figcaption className="absolute left-0 right-0 bottom-0 p-3 text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 transition-all duration-300">
                    <Link 
                      href={p.href} 
                      className="inline-flex items-center bg-white text-[#0F172A] rounded px-3 py-1 text-xs font-semibold hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" 
                      aria-label={`Voir le profil de ${p.name}`}
                    >
                      Voir le profil
                    </Link>
                  </figcaption>
                </div>
              </figure>
              <figcaption className="mt-2">
                <p className="text-[#BE2722] text-[13px] font-extrabold leading-tight">{p.name}</p>
                <p className="text-[12px] text-[#25282E] leading-tight">{p.role}</p>
                {p.subtitle && (
                  <p className="text-[12px] text-neutral-600 leading-tight">{p.subtitle}</p>
                )}
              </figcaption>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 text-center">
          <Link 
            href={`/${locale}/enseignants`} 
            className="inline-flex items-center gap-2 bg-white border-2 border-[#2E9B51] text-[#2E9B51] rounded px-3 py-2 text-sm font-semibold hover:bg-[#2E9B51]/5"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 12l-10-5-10 5 10 5 10-5z"/>
              <path d="M6 12v5c2.5 2 9.5 2 12 0v-5"/>
            </svg>
            Voir toute la curie
          </Link>
        </div>
      </div>
    </section>
  );
}

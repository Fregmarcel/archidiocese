import Image from "next/image";
import Link from "next/link";

type Props = { locale: string };

type CurieMember = {
  id: string;
  name: string;
  role: string;
  subtitle: string;
  image: string;
  href?: string;
};

const sample: Omit<CurieMember, "href">[] = [
  {
    id: "1",
    name: "Mgr. JEAN-BOSCO",
    role: "ARCHEVÊQUE",
    subtitle: "Archevêque de Yaoundé",
    image: "https://images.unsplash.com/photo-1531123414780-f7424f18b56b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "2", 
    name: "Abbé MARTIN MVONDO",
    role: "VICAIRE GÉNÉRAL",
    subtitle: "VG",
    image: "https://images.unsplash.com/photo-1596495578065-8a2a06d1a3d5?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Abbé PIERRE ESSAMA", 
    role: "CHANCELIER",
    subtitle: "Chancellerie",
    image: "https://images.unsplash.com/photo-1542626991-588b8fb1b2b98?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Abbé FRANÇOIS NDONGO",
    role: "ÉCONOME DIOCÉSAIN", 
    subtitle: "ED",
    image: "https://images.unsplash.com/photo-1527960471264-932f39eb5840?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Abbé JEAN MARIE ATANGANA",
    role: "SECRÉTAIRE GÉNÉRAL",
    subtitle: "SG", 
    image: "https://images.unsplash.com/photo-1558980664-10eaaff7a0c6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "M. PAUL OWONA",
    role: "DIRECTEUR",
    subtitle: "DDC",
    image: "https://images.unsplash.com/photo-1545696968-1c3b0a0f2e2c?q=80&w=1600&auto=format&fit=crop",
  },
];

export default function CurieDiocesaine({ locale }: Props) {
  const items: CurieMember[] = sample.map((t) => ({ ...t, href: `/${locale}/enseignants` }));

  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase text-[#25282E]">Curie Diocésaine</h2>
          <p className="text-neutral-500 text-sm md:text-base mt-1">Présentation et annuaire</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {items.map((item) => (
            <div key={item.id} className="group">
              <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300">
                <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 text-sm md:text-base">{item.name}</h3>
                  <p className="text-xs text-neutral-600 uppercase tracking-wide mt-1">{item.role}</p>
                  <p className="text-xs text-neutral-500 mt-1">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href={`/${locale}/administration`}
            className="inline-flex items-center gap-2 bg-[#BE2722] text-white px-6 py-3 rounded-lg hover:bg-[#a51f1a] transition-colors duration-200 font-medium"
          >
            Voir l&apos;administration complète
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

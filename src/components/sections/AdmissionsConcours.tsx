import Link from "next/link";
import SectionReveal from "./SectionReveal";

type Props = { locale: string };

export default function AdmissionsConcours({ locale }: Props) {
  return (
    <SectionReveal className="bg-[#BE2722]">
      <div className="container mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-white text-center">
          {/* Bloc Admissions */}
          <div className="flex flex-col items-center mx-auto w-full max-w-[520px]">
            {/* Icone carte d'ID */}
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mb-3" aria-hidden>
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M7 9h6M7 13h4" />
              <circle cx="17" cy="13" r="2" />
            </svg>
            <h3 className="uppercase tracking-wide text-[11px] md:text-xs font-semibold max-w-[36ch]">
              Conditions d’inscription à l’Université Catholique
            </h3>
            <Link href={`/${locale}/inscription/admissions`} className="mt-3 w-full bg-white text-[#25282E] rounded-md h-9 md:h-10 grid place-items-center text-xs font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60">
              Admissions
            </Link>
          </div>

          {/* Bloc Concours */}
          <div className="flex flex-col items-center mx-auto w-full max-w-[520px]">
            {/* Icone groupe */}
            <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white mb-3" aria-hidden>
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <h3 className="uppercase tracking-wide text-[11px] md:text-xs font-semibold max-w-[42ch]">
              Concours d’entrée dans nos différentes facultés et centres de formation
            </h3>
            <Link href={`/${locale}/inscription/concours`} className="mt-3 w-full bg-white text-[#25282E] rounded-md h-9 md:h-10 grid place-items-center text-xs font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/60">
              Concours
            </Link>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

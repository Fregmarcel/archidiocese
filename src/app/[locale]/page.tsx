import ArchbishopMessage from "@/components/sections/ArchbishopMessage";
import CurieDiocesaineEnhanced from "@/components/sections/CurieDiocesaineEnhanced";
import AdmissionsConcours from "@/components/sections/AdmissionsConcours";
import HomeClientSections from "@/components/home/HomeClientSections";

export default async function LocaleHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <>
      {/* Juste après la navbar */}
      <ArchbishopMessage locale={locale} />
      <CurieDiocesaineEnhanced locale={locale} />

      {/* Puis les sections interactives (inclut Hero) */}
      <HomeClientSections locale={locale} />

      {/* Autres blocs */}
      <AdmissionsConcours locale={locale} />
    </>
  );
}

import { Suspense } from "react";
import ClientSectionsWrapper from "./ClientSectionsWrapper";

export default function HomeClientSections({ locale }: { locale: string }) {
  return (
    <Suspense fallback={<div className="animate-pulse bg-gray-100 min-h-screen"></div>}>
      <ClientSectionsWrapper locale={locale} />
    </Suspense>
  );
}

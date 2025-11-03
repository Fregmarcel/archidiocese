"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ParishRedirectPage() {
  const params = useParams();
  const router = useRouter();
  const parishId = (params as any)?.parishId as string;
  const locale = ((params as any)?.locale as string) || "fr";

  useEffect(() => {
    if (parishId && locale) {
      router.replace(`/${locale}/paroisses/hub/${parishId}`);
    }
  }, [parishId, locale, router]);

  return null;
}

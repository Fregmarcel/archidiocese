import fs from 'node:fs/promises';
import path from 'node:path';

export const dynamic = 'force-dynamic';

interface Commission {
  title: string;
  president?: string;
  members: string[];
}

async function parseCommissionsFromTxt(): Promise<Commission[]> {
  const root = process.cwd();
  const filePath = path.join(root, 'Commission diocésaine.txt');
  const raw = await fs.readFile(filePath, 'utf8');

  const lines = raw.split(/\r?\n/);
  const commissions: Commission[] = [];

  let current: Commission | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Nouveau bloc commission: commence par nombre + point + titre ou par 'COMMISSION'
    const m = line.match(/^\d+\.\s*(.+)$/i) || line.match(/^COMMISSION.+$/i) || line.match(/^COMMIS.+$/i);
    if (m) {
      // Sauvegarder l'actuelle
      if (current) commissions.push(current);
      const title = typeof m === 'string' ? m : (m[1] || line);
      current = { title: title.replace(/\s+/g, ' ').trim(), members: [] };
      continue;
    }

    if (line.toLowerCase().startsWith('président') || line.toLowerCase().startsWith('president') || line.toLowerCase().startsWith('présidente')) {
      if (!current) {
        current = { title: 'Commission', members: [] };
      }
      const prez = line.split(':').slice(1).join(':').trim();
      current.president = prez || current.president;
      continue;
    }

    // Lignes de membres (commencent souvent par A., Mgr, P., Sr, Mme, etc.)
    if (/^(A\.|Mgr|P\.|Sr|Mme|M\.|Ab\.|Fr\.|\+|\d+\)|\*)/.test(line)) {
      if (!current) {
        current = { title: 'Commission', members: [] };
      }
      current.members.push(line.replace(/^\+\s*/, '').trim());
      continue;
    }
  }
  if (current) commissions.push(current);

  // Nettoyage simple: retirer l’en-tête diocèse et NB
  return commissions.filter(c => /commission/i.test(c.title));
}

export default async function CommissionsDiocesaines() {
  const commissions = await parseCommissionsFromTxt();

  return (
    <section className="bg-white">
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#25282E]">Commissions diocésaines</h1>
          <p className="text-sm text-neutral-600">Organisation, responsables et membres</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-6">
            {/* Actualités - placeholder */}
            <div className="rounded border border-neutral-200">
              <div className="px-4 py-3 border-b border-neutral-200 flex items-center justify-between">
                <h2 className="text-base font-bold">Actualités des commissions</h2>
                <span className="text-xs text-neutral-500">Bientôt</span>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 rounded bg-neutral-50 border border-neutral-200" />
                ))}
              </div>
            </div>

            {/* Liste des commissions */}
            <div className="rounded border border-neutral-200">
              <div className="px-4 py-3 border-b border-neutral-200">
                <h2 className="text-base font-bold">Liste des commissions</h2>
              </div>
              <div className="divide-y divide-neutral-200">
                {commissions.map((c, idx) => (
                  <div key={idx} className="p-4">
                    <h3 className="text-sm font-extrabold text-[#0F172A] mb-1">{c.title}</h3>
                    {c.president && (
                      <p className="text-xs text-neutral-700 mb-2"><span className="font-semibold">Président:</span> {c.president}</p>
                    )}
                    {c.members.length > 0 && (
                      <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-700">
                        {c.members.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            <div className="rounded border border-neutral-200 p-4">
              <h3 className="text-sm font-bold mb-2">Newsletter</h3>
              <p className="text-xs text-neutral-600 mb-3">Recevez les nouvelles des commissions.</p>
              <form action={`/${''}/newsletter`}>
                <input type="email" placeholder="Votre email" className="w-full border border-neutral-300 rounded px-3 py-2 text-sm mb-2"/>
                <button className="w-full rounded bg-[#BE2722] text-white text-sm font-semibold px-3 py-2">S’abonner</button>
              </form>
            </div>
            <div className="rounded border border-neutral-200 p-4">
              <h3 className="text-sm font-bold mb-2">Dons</h3>
              <p className="text-xs text-neutral-600 mb-3">Soutenez les activités des commissions.</p>
              <a href="/fr/dons" className="inline-flex items-center rounded border border-[#BE2722] text-[#BE2722] px-3 py-2 text-sm font-semibold">Faire un don</a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

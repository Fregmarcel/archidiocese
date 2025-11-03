import Link from "next/link";

export default function Footer({ locale }: { locale: "fr" | "en" }) {
  const l = locale;
  return (
    <footer className="bg-[#25282E] text-neutral-200">
  <div className="container mx-auto px-4 pt-4 pb-10 grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 bg-red-700 rounded" aria-hidden />
            <span className="text-lg font-semibold">Archidiocèse de Yaoundé</span>
          </div>
          <p className="text-sm text-neutral-300">
            Présentation brève de l’Archidiocèse. Texte de présentation à remplacer par le contenu éditorial.
          </p>
          <div className="flex gap-2 pt-2">
            <a href="#" className="w-8 h-8 bg-blue-600" aria-label="Facebook" />
            <a href="#" className="w-8 h-8 bg-sky-500" aria-label="Twitter" />
            <a href="#" className="w-8 h-8 bg-red-600" aria-label="YouTube" />
          </div>
        </div>
        <div>
          <h3 className="uppercase tracking-wide text-sm font-semibold mb-3">Nous contacter</h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li>BP 11628 Yaoundé, Cameroun</li>
            <li>Tél: (+237) 222 23 74 00</li>
            <li>Email: contact@archidiocese-yaounde.cm</li>
          </ul>
        </div>
        <div>
          <h3 className="uppercase tracking-wide text-sm font-semibold mb-3">Informations pratiques</h3>
          <ul className="space-y-2 text-sm text-neutral-300">
            <li><Link href={`/${l}/a-propos`}>L’Archidiocèse en quelques mots</Link></li>
            <li><Link href={`/${l}/agenda`}>Agenda</Link></li>
            <li><Link href={`/${l}/actualites`}>Actualités</Link></li>
            <li><Link href={`/${l}/contact`}>Plan d’accès</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="uppercase tracking-wide text-sm font-semibold mb-3">Newsletter</h3>
          <form className="flex gap-2">
            <input
              type="email"
              required
              placeholder="Votre email"
              className="flex-1 rounded px-3 py-2 text-sm text-black bg-white border border-neutral-400 placeholder-neutral-500 shadow-sm"
            />
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">S’inscrire</button>
          </form>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 py-4 text-xs text-neutral-400 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Archidiocèse de Yaoundé. Tous droits réservés.</p>
          <nav className="flex gap-4">
            <Link href={`/${l}/about-us`}>About Us</Link>
            <Link href={`/${l}/terms`}>Terms</Link>
            <Link href={`/${l}/delivery`}>Delivery</Link>
            <Link href={`/${l}/services`}>Services</Link>
            <Link href={`/${l}/contact`}>Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";

export default function Footer({ locale }: { locale: "fr" | "en" }) {
  const l = locale;
  return (
    <footer className="bg-[#25282E] text-neutral-200">
      <div className="container mx-auto px-4 pt-8 pb-10 grid gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpeg"
              alt="Logo Archidiocèse de Yaoundé"
              width={56}
              height={56}
              className="rounded-lg object-contain"
            />
            <div>
              <span className="text-lg font-bold text-white block">Archidiocèse</span>
              <span className="text-sm text-neutral-400">de Yaoundé</span>
            </div>
          </div>
          <p className="text-sm text-neutral-300 leading-relaxed">
            L&apos;Archidiocèse de Yaoundé, au cœur du Cameroun, rassemble les fidèles catholiques 
            dans la foi, l&apos;espérance et la charité.
          </p>
          {/* Réseaux sociaux */}
          <div className="flex gap-3 pt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#1877F2] hover:bg-[#166FE5] rounded-full flex items-center justify-center transition-colors" 
              aria-label="Facebook"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#000000] hover:bg-[#333333] rounded-full flex items-center justify-center transition-colors" 
              aria-label="X (Twitter)"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#FF0000] hover:bg-[#CC0000] rounded-full flex items-center justify-center transition-colors" 
              aria-label="YouTube"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:opacity-90 rounded-full flex items-center justify-center transition-opacity" 
              aria-label="Instagram"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 bg-[#000000] hover:bg-[#333333] rounded-full flex items-center justify-center transition-colors" 
              aria-label="TikTok"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
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
            <li><Link href={`/${l}/a-propos`}>L&apos;Archidiocèse en quelques mots</Link></li>
            <li><Link href={`/${l}/agenda`}>Agenda</Link></li>
            <li><Link href={`/${l}/actualites`}>Actualités</Link></li>
            <li><Link href={`/${l}/contact`}>Plan d&apos;accès</Link></li>
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
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">S&apos;inscrire</button>
          </form>
        </div>
      </div>
      <div className="border-t border-neutral-800">
        <div className="container mx-auto px-4 py-4 text-xs text-neutral-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Archidiocèse de Yaoundé. Tous droits réservés.</p>
          <nav className="flex flex-wrap justify-center gap-4">
            <Link href={`/${l}/a-propos`} className="hover:text-white transition-colors">À propos</Link>
            <Link href={`/${l}/mentions-legales`} className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href={`/${l}/accessibilite`} className="hover:text-white transition-colors">Accessibilité</Link>
            <Link href={`/${l}/contact`} className="hover:text-white transition-colors">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

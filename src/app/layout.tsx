import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300","400","700","900"],
});

export const metadata: Metadata = {
  title: "Archidiocèse de Yaoundé",
  description: "Site officiel de l'Archidiocèse de Yaoundé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={`${lato.variable} antialiased font-serif`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

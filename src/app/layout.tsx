import type { Metadata } from "next";
import "./globals.css";

// Tipografia: Instrument Sans (titoli) + Inter (testo), auto-ospitati con i
// pacchetti @fontsource-variable importati in globals.css. Rispetto a
// next/font/google i file arrivano da npm invece che da un download in fase
// di build: la build funziona anche senza rete verso Google e, soprattutto,
// il sito pubblicato non fa nessuna richiesta ai server di Google — dettaglio
// non secondario per un cliente della pubblica amministrazione.

export const metadata: Metadata = {
  title: "Ideapubblica — Servizi, formazione e software per gli enti",
  description:
    "Ideapubblica affianca gli enti locali su contabilità, controllo di gestione, privacy, anticorruzione, tributi e bilancio consolidato, con servizi, formazione e software dedicati.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

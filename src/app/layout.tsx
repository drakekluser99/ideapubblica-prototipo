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
      <head>
        {/*
          Script inline, eseguito durante il parsing dell'HTML (quindi prima
          del primo disegno): marca <html> con la classe "js". Le sezioni che
          appaiono allo scroll partono invisibili SOLO se questa classe c'è.
          Senza, il contenuto è visibile da subito — niente pagina bianca su
          connessione lenta, e chi non esegue JavaScript legge comunque tutto.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

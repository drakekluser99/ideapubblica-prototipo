import type { Metadata } from "next";
import "./globals.css";
import ScrollManager from "@/components/ui/scroll-manager";

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
          del primo disegno). Fa due cose:

          1. marca <html> con la classe "js": le sezioni che appaiono allo
             scroll partono invisibili SOLO se questa classe c'è, così senza
             JavaScript il contenuto resta comunque leggibile;
          2. rilegge il tema salvato e lo applica subito. Deve stare qui,
             inline e sincrono: se aspettassimo React, l'utente che ha scelto
             il tema chiaro vedrebbe un lampo di pagina scura a ogni
             caricamento. È il classico "flash of wrong theme".

          Il try/catch serve perché localStorage lancia un'eccezione se i
          cookie di sito sono bloccati: in quel caso si resta sul tema
          predefinito invece di rompere la pagina.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");try{var t=localStorage.getItem("ip-theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        {/* Non disegna niente: rimette la pagina in cima (o sull'àncora) a ogni
            cambio di rotta. Sta nel layout perché deve valere ovunque — vedi il
            commento lungo dentro il componente. */}
        <ScrollManager />
        {children}
      </body>
    </html>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogIn, Menu, X } from "lucide-react";
import { nav, filodiretto } from "@/data/content";
import ShinyButton from "@/components/ui/shiny-button";
import Logo from "@/components/ui/logo";
import ThemeToggle from "@/components/ui/theme-toggle";

/*
  Header sticky con due stati.

  In cima alla pagina è trasparente e "alto", così l'hero respira. Appena si
  scrolla oltre 24px diventa più compatto, prende un fondo sfocato e una
  linea di separazione.

  Il listener sullo scroll è passivo (`{ passive: true }`): dice al browser
  che non chiameremo mai preventDefault, così può continuare a scrollare
  senza aspettare il nostro codice.

  --- Perché <Link> e non <a> ----------------------------------------------

  Da quando esistono pagine interne, la navigazione avviene fra rotte diverse.
  `<a href="/servizi">` funziona, ma scarica e ricostruisce l'intera pagina.
  `<Link>` di Next fa una navigazione lato client: sostituisce solo ciò che
  cambia, mantiene lo stato di React, e precarica in sottofondo la rotta
  quando il link entra nello schermo. Gestisce anche le àncore ("/#software"):
  naviga alla home e poi scorre.

  I link ESTERNI (il portale Filodiretto) restano <a>: Next non può
  precaricare né gestire lato client un altro sito.
*/

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Quando il menu mobile è aperto blocchiamo lo scroll del body,
  // altrimenti la pagina scorre "sotto" all'overlay.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-surface/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className={`shell flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}
      >
        {/* Il logo è già l'etichetta del link, quindi l'SVG viene nascosto
            ai lettori di schermo (aria-hidden) e il nome lo dà l'anchor:
            altrimenti verrebbe annunciato due volte.
            Punta a "/" e non più a "#top": dalle pagine interne deve
            riportare alla home, non a inizio pagina corrente. */}
        <Link href="/" className="flex items-center" aria-label="Ideapubblica, vai alla home">
          <Logo
            gradientId="ip-logo-header"
            withPayoff={false}
            aria-hidden
            role="presentation"
            /* Il marchio si dimensiona sulla LARGHEZZA, non sull'altezza:
               il simbolo è molto più alto della parola, quindi fissare
               l'altezza rimpicciolisce troppo la scritta. */
            className={`h-auto transition-all duration-300 ${scrolled ? "w-36" : "w-40"}`}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigazione principale">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative rounded-full px-4 py-3 text-sm font-medium text-fg-soft transition-colors hover:text-fg focus-visible:text-fg"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {/* Link esterno: apre il portale in una nuova scheda, così chi sta
              leggendo il sito non perde il segno. `rel="noopener"` impedisce
              alla pagina aperta di manipolare quella di partenza. */}
          <a
            href={filodiretto.accessoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium text-fg-soft transition-colors hover:text-fg"
          >
            <LogIn size={15} aria-hidden />
            Area riservata
            <span className="sr-only">(si apre in una nuova scheda)</span>
          </a>
          <ThemeToggle />
          <ShinyButton href="/#contatti" className="!px-6 !py-3 !text-sm">
            Contattaci
          </ShinyButton>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg"
            aria-label={open ? "Chiudi il menu" : "Apri il menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Pannello mobile: reso sempre nel DOM ma con altezza 0 quando chiuso,
          così la transizione è animabile. */}
      {/* `inert` è la parte importante: senza, i link del pannello chiuso
          restano nell'ordine di tabulazione, e chi naviga da tastiera finisce
          su elementi invisibili. */}
      <div
        inert={!open}
        className={`overflow-hidden border-t border-line bg-surface/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="shell flex flex-col gap-1 py-5" aria-label="Navigazione mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={filodiretto.accessoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
          >
            <LogIn size={16} aria-hidden />
            Area riservata
            <span className="sr-only">(si apre in una nuova scheda)</span>
          </a>
          <Link
            href="/#contatti"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-accent px-5 py-3 text-center text-sm font-semibold text-accent-ink"
          >
            Contattaci
          </Link>
        </nav>
      </div>
    </header>
  );
}

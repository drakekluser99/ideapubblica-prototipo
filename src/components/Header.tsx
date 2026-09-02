"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { nav } from "@/data/content";
import { esterno, AVVISO_NUOVA_SCHEDA } from "@/lib/link";
import { serviceCategories, serviziDiCategoria, linkServizio } from "@/data/services";
import ShinyButton from "@/components/ui/shiny-button";
import Logo from "@/components/ui/logo";
import ThemeToggle from "@/components/ui/theme-toggle";

/*
  Header con menu a tendina sui Servizi.

  --- Perché al click e non al passaggio del mouse -------------------------

  Il menu del sito attuale si apre in hover. È comodo col mouse e inutilizzabile
  senza: chi naviga da tastiera non può "passare sopra" a niente, e su touch il
  primo tocco viene interpretato come hover, il secondo come click — da cui i
  menu che su telefono si aprono e si chiudono da soli.

  Al click funziona per tutti allo stesso modo. Il bottone dichiara il proprio
  stato con `aria-expanded`, così un lettore di schermo annuncia "compresso" o
  "espanso" invece di lasciare l'utente a indovinare.

  Due chiusure obbligatorie in qualunque menu di questo tipo:
    · Escape — e il focus torna al bottone, altrimenti chi naviga da tastiera
      si ritrova a inizio pagina;
    · click fuori — registrato sul document, e rimosso quando il menu si chiude.
*/

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false); // menu mobile
  const [megaOpen, setMegaOpen] = useState(false); // tendina servizi (desktop)
  const [serviziApertiMobile, setServiziApertiMobile] = useState(false);

  const megaRef = useRef<HTMLDivElement>(null);
  const megaButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Chiusura della tendina: Escape e click fuori.
  // I listener si registrano SOLO quando è aperta, e la funzione restituita
  // li rimuove: senza quella pulizia resterebbero attivi per sempre,
  // accumulandosi a ogni apertura.
  useEffect(() => {
    if (!megaOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        megaButtonRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!megaRef.current?.contains(t) && !megaButtonRef.current?.contains(t)) {
        setMegaOpen(false);
      }
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  /*
    Chiude la tendina, e basta.

    Qui c'era anche un `window.scrollTo` in `requestAnimationFrame`, messo
    quando l'atterraggio a fondo pagina sembrava un effetto collaterale del
    menu. Non lo era: la pagina non veniva riportata in cima da NESSUN link
    interno, tendina o no. La causa e la correzione stanno in
    `components/ui/scroll-manager.tsx`, montato nel layout.

    Quella riga andava tolta, non solo resa superflua: senza `behavior`
    esplicito ereditava lo `scroll-behavior: smooth` di <html>, quindi
    avviava un'animazione che il nuovo gestore avrebbe dovuto interrompere.
  */
  const chiudiTendina = () => setMegaOpen(false);

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
        <Link href="/" className="flex items-center" aria-label="Ideapubblica, vai alla home">
          <Logo
            gradientId="ip-logo-header"
            withPayoff={false}
            aria-hidden
            role="presentation"
            className={`h-auto transition-all duration-300 ${scrolled ? "w-36" : "w-40"}`}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigazione principale">
          {nav.map((item) =>
            /* La voce Servizi non è un link ma il bottone della tendina.
               Il confronto sull'href tiene la decisione nei dati: cambiando
               content.ts cambia il menu, senza toccare questo file. */
            item.href === "/servizi" ? (
              <button
                key={item.href}
                ref={megaButtonRef}
                type="button"
                onClick={() => setMegaOpen((v) => !v)}
                aria-expanded={megaOpen}
                aria-controls="mega-servizi"
                className={`relative flex items-center gap-1.5 rounded-full px-4 py-3 text-sm font-medium transition-colors ${
                  megaOpen ? "text-fg" : "text-fg-soft hover:text-fg"
                }`}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  aria-hidden
                  className={`transition-transform duration-200 ${megaOpen ? "rotate-180" : ""}`}
                />
              </button>
            ) : esterno(item.href) ? (
              /* Voce che porta fuori dal sito (oggi solo Filodiretto).
                 La freccia in diagonale è la convenzione visiva del "si apre
                 altrove"; per chi non la vede c'è l'avviso testuale. */
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center gap-1 rounded-full px-4 py-3 text-sm font-medium text-fg-soft transition-colors hover:text-fg focus-visible:text-fg"
              >
                {item.label}
                <ArrowUpRight size={14} aria-hidden className="opacity-60" />
                <span className="sr-only">{AVVISO_NUOVA_SCHEDA}</span>
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="relative rounded-full px-4 py-3 text-sm font-medium text-fg-soft transition-colors hover:text-fg focus-visible:text-fg"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {/* Qui stava "Area riservata", che portava allo stesso dominio della
              voce Filodiretto: due pulsanti per la stessa destinazione
              costringono a scegliere senza motivo. Ne resta uno solo. */}
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

      {/* ─── Tendina Servizi (desktop) ─────────────────────────────────── */}
      {/* Resa sempre nel DOM per poter animare l'apertura; `inert` quando è
          chiusa la toglie da focus e lettori di schermo. È lo stesso
          accorgimento del pannello mobile. */}
      <div
        id="mega-servizi"
        ref={megaRef}
        inert={!megaOpen}
        /*
          `overflow-hidden` va SEMPRE, non solo da chiuso.

          Prima stava solo nello stato chiuso, e da aperto il pannello aveva
          `overflow: visible`: il contenuto più alto di `max-h` non veniva
          ritagliato ma traboccava sopra la pagina — ultime categorie
          sospese sul contenuto della home, senza sfondo dietro.

          Ora il pannello ritaglia sempre, e da aperto si limita all'altezza
          della finestra meno l'header: se le voci non ci stanno, scorre
          dentro invece di uscire. `calc(100vh-5rem)` regge anche su portatili
          bassi, dove 36rem fissi sfondavano.
        */
        className={`hidden overflow-hidden border-t border-line bg-surface/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:block ${
          megaOpen
            ? "max-h-[calc(100vh-5rem)] overflow-y-auto opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="shell py-8">
          {/*
            `columns-3` invece di `grid-cols-3`: sono colonne di testo, che
            distribuiscono i blocchi bilanciandone l'altezza. Con la griglia
            ogni riga era alta quanto la categoria più lunga — e la prima ne
            ha undici — perciò restavano enormi buchi accanto a "Personale",
            che di voci ne ha una. `break-inside-avoid` impedisce che una
            categoria venga spezzata a metà tra due colonne.
          */}
          <div className="columns-3 gap-8">
            {serviceCategories.map((categoria) => (
              <div key={categoria.slug} className="mb-7 break-inside-avoid">
                <Link
                  href={`/servizi#${categoria.slug}`}
                  onClick={chiudiTendina}
                  className="eyebrow mb-3 block text-accent-soft transition-colors hover:text-fg"
                >
                  {categoria.nome}
                </Link>
                <ul className="flex flex-col gap-0.5">
                  {serviziDiCategoria(categoria.slug).map((servizio) => (
                    <li key={servizio.slug}>
                      <Link
                        href={linkServizio(servizio)}
                        onClick={chiudiTendina}
                        className="block rounded-lg px-2 py-1.5 text-sm text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
                      >
                        {servizio.nome}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-line pt-5">
            <Link
              href="/servizi"
              onClick={chiudiTendina}
              className="text-sm font-semibold text-accent-soft"
            >
              Tutte le aree di competenza →
            </Link>
          </div>
        </div>
      </div>

      {/* ─── Pannello mobile ───────────────────────────────────────────── */}
      <div
        inert={!open}
        className={`overflow-y-auto border-t border-line bg-surface/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="shell flex flex-col gap-1 py-5" aria-label="Navigazione mobile">
          {nav.map((item) =>
            item.href === "/servizi" ? (
              <div key={item.href}>
                {/* Su mobile il menu diventa una fisarmonica, e mostra le sei
                    AREE, non tutti i 29 servizi: un elenco lungo in un
                    pannello che scorre è peggio di due tocchi. */}
                <button
                  type="button"
                  onClick={() => setServiziApertiMobile((v) => !v)}
                  aria-expanded={serviziApertiMobile}
                  className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-base font-medium text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
                >
                  {item.label}
                  <ChevronDown
                    size={16}
                    aria-hidden
                    className={`transition-transform duration-200 ${serviziApertiMobile ? "rotate-180" : ""}`}
                  />
                </button>

                {serviziApertiMobile && (
                  <ul className="mt-1 mb-2 flex flex-col gap-0.5 border-l border-line pl-3">
                    {serviceCategories.map((categoria) => (
                      <li key={categoria.slug}>
                        <Link
                          href={`/servizi#${categoria.slug}`}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-sm text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
                        >
                          {categoria.nome}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/servizi"
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-accent-soft"
                      >
                        Tutte le aree →
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            ) : esterno(item.href) ? (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-medium text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
              >
                {item.label}
                <ArrowUpRight size={15} aria-hidden className="opacity-60" />
                <span className="sr-only">{AVVISO_NUOVA_SCHEDA}</span>
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
              >
                {item.label}
              </Link>
            ),
          )}

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

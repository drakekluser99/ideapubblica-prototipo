"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogIn, Menu, X } from "lucide-react";
import { nav, filodiretto } from "@/data/content";
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

      {/* ─── Tendina Servizi (desktop) ─────────────────────────────────── */}
      {/* Resa sempre nel DOM per poter animare l'apertura; `inert` quando è
          chiusa la toglie da focus e lettori di schermo. È lo stesso
          accorgimento del pannello mobile. */}
      <div
        id="mega-servizi"
        ref={megaRef}
        inert={!megaOpen}
        className={`hidden border-t border-line bg-surface/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:block ${
          megaOpen ? "max-h-[36rem] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="shell py-8">
          <div className="grid grid-cols-3 gap-x-8 gap-y-7">
            {serviceCategories.map((categoria) => (
              <div key={categoria.slug}>
                <Link
                  href={`/servizi#${categoria.slug}`}
                  onClick={() => setMegaOpen(false)}
                  className="eyebrow mb-3 block text-accent-soft transition-colors hover:text-fg"
                >
                  {categoria.nome}
                </Link>
                <ul className="flex flex-col gap-0.5">
                  {serviziDiCategoria(categoria.slug).map((servizio) => (
                    <li key={servizio.slug}>
                      <Link
                        href={linkServizio(servizio)}
                        onClick={() => setMegaOpen(false)}
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

          <div className="mt-7 border-t border-line pt-5">
            <Link
              href="/servizi"
              onClick={() => setMegaOpen(false)}
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

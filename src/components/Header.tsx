"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/data/content";
import ShinyButton from "@/components/ui/shiny-button";
import Logo from "@/components/ui/logo";

/*
  Header sticky con due stati.

  In cima alla pagina è trasparente e "alto", così l'hero respira. Appena si
  scrolla oltre 24px diventa più compatto, prende un fondo sfocato e una
  linea di separazione. È un dettaglio piccolo ma è quello che fa percepire
  il sito come "applicativo" e non come brochure statica.

  Il listener sullo scroll è passivo (`{ passive: true }`): dice al browser
  che non chiameremo mai preventDefault, così può continuare a scrollare
  senza aspettare il nostro codice.
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
          ? "border-b border-white/8 bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className={`shell flex items-center justify-between transition-all duration-300 ${scrolled ? "h-16" : "h-20"}`}>
        <a href="#top" className="flex items-center gap-2.5" aria-label="Ideapubblica, torna in cima">
          <Logo className="h-7 w-7" />
          <span className="display text-lg tracking-tight text-white">
            idea<span className="text-brand-400">pubblica</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Navigazione principale">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative rounded-full px-4 py-2 text-sm font-medium text-mute transition-colors hover:text-white focus-visible:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ShinyButton href="#contatti" className="!px-6 !py-3 !text-sm">
            Contattaci
          </ShinyButton>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
          aria-label={open ? "Chiudi il menu" : "Apri il menu"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Pannello mobile: reso sempre nel DOM ma con altezza 0 quando chiuso,
          così la transizione è animabile. */}
      <div
        className={`overflow-hidden border-t border-white/8 bg-ink-950/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="shell flex flex-col gap-1 py-5" aria-label="Navigazione mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-base font-medium text-mute transition-colors hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contatti"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-brand-500 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Contattaci
          </a>
        </nav>
      </div>
    </header>
  );
}

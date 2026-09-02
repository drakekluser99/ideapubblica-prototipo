"use client";

// "use client" perché questo componente ha stato locale (il menu mobile
// aperto/chiuso): in Next.js i componenti sono Server Components di default
// (renderizzati solo sul server, zero JS spedito al browser), e diventano
// Client Components solo quando serve interattività — come qui con useState.

import { useState } from "react";
import Link from "next/link";
import { nav } from "@/data/content";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="#top" className="text-lg font-extrabold tracking-tight text-blue-900">
          idea<span className="text-amber-500">pubblica</span>
        </Link>

        {/* Nav da desktop: nascosta sotto md, mostrata da md in su */}
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contatti"
          className="hidden rounded-full bg-blue-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-800 md:inline-block"
        >
          Contattaci
        </a>

        {/* Bottone hamburger, visibile solo su mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Apri il menu"
          className="inline-flex flex-col gap-1.5 p-2 md:hidden"
        >
          <span className="h-0.5 w-6 bg-slate-900" />
          <span className="h-0.5 w-6 bg-slate-900" />
          <span className="h-0.5 w-6 bg-slate-900" />
        </button>
      </div>

      {/* Pannello mobile: renderizzato solo se open è true */}
      {open && (
        <nav className="flex flex-col gap-1 border-t border-black/5 bg-white px-6 py-4 md:hidden">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-slate-700"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contatti"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-blue-900 px-5 py-2.5 text-center text-sm font-semibold text-white"
          >
            Contattaci
          </a>
        </nav>
      )}
    </header>
  );
}

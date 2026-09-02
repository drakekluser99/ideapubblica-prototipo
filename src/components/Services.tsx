import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/content";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";
import { tinte } from "@/components/ui/tints";

/*
  Servizi — l'unica sezione chiara della pagina.

  Serve a due cose. Prima: ritmo. Dieci schermate di blu notte di fila
  stancano; una fascia chiara a metà pagina fa "respirare" e segna un
  capitolo nuovo. Seconda: leggibilità. Qui c'è l'elenco più denso di testo
  del sito, e il testo scuro su fondo chiaro resta più comodo da scorrere.

  Il layout è una lista, non una griglia di card: sei card tutte uguali
  sembrano un catalogo anonimo, mentre righe con numerazione grande hanno un
  taglio editoriale e si scorrono più in fretta.

  Da quando esiste /servizi questa sezione è un'ANTEPRIMA: ogni riga porta
  alla scheda corrispondente sulla pagina interna, non più al form contatti.
  La regola è che un link mantenga la promessa del titolo — chi clicca
  "PEF rifiuti" si aspetta di leggere del PEF rifiuti, non un modulo.
*/
export default function Services() {
  return (
    <section id="servizi" className="fascia-invertita bg-band py-24 text-band-fg sm:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="band"
            eyebrow="Servizi"
            title={
              <>
                Gli adempimenti complessi,
                <br className="hidden sm:block" /> gestiti con voi
              </>
            }
            description="Non consegniamo un modello e ci salutiamo: seguiamo l'ente lungo tutta la scadenza, dai dati grezzi al documento firmato."
          />

          <Reveal delay={120}>
            <Link
              href="/servizi"
              className="inline-flex items-center gap-2 rounded-full border border-band-line px-6 py-3 text-sm font-semibold text-band-fg transition-colors hover:bg-band-fg hover:text-band"
            >
              Tutte le aree di competenza
              <ArrowUpRight size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-band-line">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 70}>
              <li className={`group border-b border-band-line ${tinte[service.tint]}`}>
                <Link
                  href={`/servizi#${service.slug}`}
                  className="grid items-start gap-4 py-7 transition-colors sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6"
                >
                  {/* Numerazione: String(i+1).padStart(2,"0") dà 01, 02, ...
                      Piccolo dettaglio che rende la lista un "indice". */}
                  <span className="display text-2xl text-band-fg/45 transition-colors group-hover:tinta-testo">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="display text-xl text-band-fg sm:text-2xl">{service.name}</h3>
                      <span className="tinta-fondo tinta-testo rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase">
                        {service.tag}
                      </span>
                    </div>
                    <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-band-fg-soft">
                      {service.description}
                    </p>
                  </div>

                  <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-band-line text-band-fg transition-all duration-300 group-hover:tinta-bordo group-hover:tinta-fondo group-hover:tinta-testo sm:flex">
                    <ArrowUpRight size={16} aria-hidden />
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

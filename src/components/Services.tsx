import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/content";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

/*
  Servizi — l'unica sezione chiara della pagina.

  Serve a due cose. Prima: ritmo. Dieci schermate di blu notte di fila
  stancano; una fascia chiara a metà pagina fa "respirare" e segna un
  capitolo nuovo. Seconda: leggibilità. Qui c'è l'elenco più denso di testo
  del sito, e il testo scuro su fondo chiaro resta più comodo da scorrere.

  Il layout è una lista, non una griglia di card: sei card tutte uguali
  sembrano un catalogo anonimo, mentre righe con numerazione grande hanno un
  taglio editoriale e si scorrono più in fretta.
*/
export default function Services() {
  return (
    <section id="servizi" className="bg-paper py-24 text-ink-950 sm:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="light"
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
            <a
              href="#contatti"
              className="inline-flex items-center gap-2 rounded-full border border-ink-950/15 px-6 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-ink-950 hover:text-white"
            >
              Richiedi una consulenza
              <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-ink-950/10">
          {services.map((service, i) => (
            <Reveal key={service.name} delay={i * 70}>
              <li className="group border-b border-ink-950/10">
                <a
                  href="#contatti"
                  className="grid items-start gap-4 py-7 transition-colors sm:grid-cols-[3.5rem_1fr_auto] sm:gap-6"
                >
                  {/* Numerazione: String(i+1).padStart(2,"0") dà 01, 02, ...
                      Piccolo dettaglio che rende la lista un "indice". */}
                  <span className="display text-2xl text-ink-950/25 transition-colors group-hover:text-brand-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="display text-xl text-ink-950 sm:text-2xl">{service.name}</h3>
                      <span className="rounded-full bg-brand-600/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-brand-700 uppercase">
                        {service.tag}
                      </span>
                    </div>
                    <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-mute-ink">
                      {service.description}
                    </p>
                  </div>

                  <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-ink-950/12 text-ink-950 transition-all duration-300 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white sm:flex">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

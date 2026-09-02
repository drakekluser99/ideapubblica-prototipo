import { ArrowUpRight, CalendarDays, Clock, Radio } from "lucide-react";
import { webinars } from "@/data/content";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

/*
  Formazione / prossimi webinar.

  Il "blocco data" grande a sinistra di ogni riga è il pattern classico degli
  eventi: permette di scansionare le date senza leggere i titoli.

  Le date sono oggi statiche in content.ts: quando ci sarà un calendario o un
  CMS, cambia solo la sorgente dei dati, non questo componente.
*/
export default function Webinars() {
  return (
    <section id="formazione" className="relative py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Formazione"
            title={
              <>
                I prossimi <span className="text-gradient">appuntamenti</span>
              </>
            }
            description="Sessioni brevi e operative, tenute da chi segue gli stessi adempimenti nella pratica quotidiana. In diretta, con spazio per le domande."
          />

          <Reveal delay={120}>
            <a
              href="#contatti"
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-fg transition-colors hover:bg-fg hover:text-surface"
            >
              Formazione su misura in ente
              <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {webinars.map((w, i) => (
            <Reveal key={w.title} delay={i * 110} className="h-full">
              <article className="group glass flex h-full flex-col rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                <div className="flex items-center justify-between">
                  <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
                    <span className="display text-2xl leading-none text-fg">{w.day}</span>
                    <span className="mt-1 text-[10px] font-semibold tracking-widest text-accent-soft">
                      {w.month}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-positive/30 bg-positive/10 px-2.5 py-1 text-[11px] font-medium text-positive">
                    <Radio size={11} />
                    {w.format}
                  </span>
                </div>

                <h3 className="mt-6 text-lg leading-snug font-semibold text-fg">{w.title}</h3>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-fg-soft">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays size={13} />
                    {w.day} settembre 2026
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={13} />
                    {w.time}
                  </span>
                </div>

                <a
                  href="#contatti"
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-accent-soft transition-transform duration-300 group-hover:translate-x-1"
                >
                  Iscriviti
                  <ArrowUpRight size={16} />
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ArrowUpRight, Boxes, Check, GraduationCap, LayoutGrid } from "lucide-react";
import { pillars } from "@/data/content";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

/*
  I tre pilastri dell'offerta, in stile "bento": card di uguale peso ma con la
  prima leggermente più larga su desktop, così la griglia non sembra un
  tabellone di celle identiche.

  La mappa `icons` traduce la chiave testuale che sta nei dati in un
  componente icona. È il modo pulito di tenere `content.ts` fatto di soli dati
  serializzabili — se domani i contenuti arrivassero da un CMS, il file dei
  dati non dovrebbe cambiare di una riga.
*/
const icons = {
  services: LayoutGrid,
  training: GraduationCap,
  software: Boxes,
} as const;

export default function Pillars() {
  return (
    <section id="chi-siamo" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="Cosa facciamo"
          title={
            <>
              Un unico interlocutore per <span className="text-gradient">tre bisogni</span> diversi
            </>
          }
          description="Consulenza, aggiornamento e strumenti digitali non sono tre fornitori da coordinare: sono tre modi di risolvere lo stesso problema quotidiano dell'ente."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = icons[pillar.icon];
            return (
              <Reveal key={pillar.title} delay={i * 110} className="h-full">
                <a
                  href={pillar.href}
                  className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/40"
                >
                  {/* Alone che compare in hover: dà "vita" alla card senza
                      cambiarne il layout (quindi senza far saltare il testo). */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: "radial-gradient(circle, rgba(47,107,255,0.35), transparent 70%)" }}
                  />

                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-brand-500/12 text-brand-300">
                    <Icon size={20} />
                  </span>

                  <h3 className="display mt-6 text-2xl text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">{pillar.description}</p>

                  <ul className="mt-6 space-y-2.5">
                    {pillar.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm text-white/80">
                        <Check size={14} className="shrink-0 text-acqua" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-300 transition-transform duration-300 group-hover:translate-x-1">
                    Approfondisci
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

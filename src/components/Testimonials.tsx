import { Quote } from "lucide-react";
import { testimonials } from "@/data/content";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

/*
  Testimonianze.

  Scelta grafica: la citazione è grande e il nome dell'ente piccolo, non il
  contrario. Chi legge deve incontrare prima il contenuto della frase e poi
  la fonte — la fonte serve a validare, non ad aprire.

  Le virgolette decorative sono un'icona in `aria-hidden`: sono grafica, non
  informazione, e un lettore di schermo non deve annunciarle.
*/
export default function Testimonials() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Dicono di noi"
          title={
            <>
              La misura del lavoro è <span className="text-gradient">l&apos;ente che torna</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.author + i} delay={i * 110} className="h-full">
              <figure className="glass flex h-full flex-col rounded-3xl p-7">
                <Quote aria-hidden size={22} className="text-accent-soft/60" />
                <blockquote className="mt-5 text-base leading-relaxed text-fg/90">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-7">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent-soft">
                    {/* Iniziali: prima lettera delle prime due parole
                        ("Comune di Parma" → "CP"). */}
                    {t.author
                      .split(" ")
                      .filter((w) => w.length > 2)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-fg">{t.author}</span>
                    <span className="block text-xs text-fg-soft">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-center text-xs text-fg-faint">
            Testimonianze in fase di validazione con il cliente prima della pubblicazione.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

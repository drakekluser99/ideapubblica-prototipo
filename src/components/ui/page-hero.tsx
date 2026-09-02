import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "./reveal";

/*
  Intestazione delle pagine interne.

  Esiste per lo stesso motivo di SectionHeading: dare a tutte le pagine
  interne lo stesso attacco — briciole di pane, occhiello, titolo,
  sommario — così Servizi, Formazione, Software e Contatti non finiscono per
  divergere. È il primo componente da riusare quando si aggiunge una pagina.

  Differenza importante rispetto a SectionHeading: qui il titolo è un <h1>.
  Ogni pagina deve avere uno e un solo h1, ed è il titolo della pagina; le
  sezioni interne partono da h2. In home l'h1 sta nell'Hero, quindi le
  sezioni usano SectionHeading che genera h2 — le due cose non si pestano.

  Il padding superiore è generoso perché l'header è `fixed`: senza, il titolo
  finirebbe sotto la barra.
*/

type Briciola = { label: string; href?: string };

type PageHeroProps = {
  briciole: Briciola[];
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
};

export default function PageHero({ briciole, eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="glow-a relative overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      {/* La griglia di sfondo è decorativa: `aria-hidden` la toglie dai
          lettori di schermo, che altrimenti annuncerebbero un elemento vuoto. */}
      <div className="grid-bg absolute inset-0" aria-hidden />

      <div className="shell relative">
        {/*
          Briciole di pane. `aria-label` distingue questa nav dalle altre
          due della pagina (principale e mobile): tre <nav> senza etichetta
          sono indistinguibili per chi naviga per landmark.
        */}
        <nav aria-label="Percorso di navigazione" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-fg-faint">
            {briciole.map((briciola, i) => {
              const ultima = i === briciole.length - 1;
              return (
                <li key={briciola.label} className="flex items-center gap-1.5">
                  {briciola.href && !ultima ? (
                    <Link
                      href={briciola.href}
                      className="rounded px-1 py-1 transition-colors hover:text-fg"
                    >
                      {briciola.label}
                    </Link>
                  ) : (
                    /* L'ultima briciola è la pagina corrente: non è un link,
                       e `aria-current` lo dice esplicitamente. */
                    <span aria-current="page" className="px-1 py-1 text-fg-soft">
                      {briciola.label}
                    </span>
                  )}
                  {!ultima && <ChevronRight size={14} aria-hidden />}
                </li>
              );
            })}
          </ol>
        </nav>

        <Reveal>
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="eyebrow mb-4 flex items-center gap-2 text-accent-soft">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                {eyebrow}
              </p>
            ) : null}

            <h1 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-fg">{title}</h1>

            {description ? (
              <p className="mt-6 text-base leading-relaxed text-fg-soft sm:text-lg">
                {description}
              </p>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

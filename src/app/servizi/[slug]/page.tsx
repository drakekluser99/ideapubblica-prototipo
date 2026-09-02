import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, Download, FileText, Users } from "lucide-react";
import {
  serviziConPagina,
  servizioPerSlug,
  categoriaPerSlug,
  serviziDiCategoria,
  linkServizio,
} from "@/data/services";
import { tinte, type Tinta } from "@/components/ui/tints";
import PageHero from "@/components/ui/page-hero";
import ServiceRequest from "@/components/ui/service-request";
import Reveal from "@/components/ui/reveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/*
  /servizi/[slug] — la pagina di un singolo servizio.

  Le parentesi quadre nel nome della cartella indicano un segmento DINAMICO:
  un solo file serve tutte le pagine di dettaglio. Non esiste un
  contabilita-economico-patrimoniale/page.tsx da qualche parte — c'è questo
  file, e i dati decidono quante pagine nascono.

  --- generateStaticParams --------------------------------------------------

  Dice a Next quali slug esistono. In fase di build Next li scorre e genera
  un file HTML per ciascuno: le pagine sono statiche, servite da CDN, veloci
  come se fossero scritte a mano. Uno slug non presente in questa lista
  finisce in notFound() → pagina 404.

  Passiamo `serviziConPagina`, non tutti i servizi: le voci senza dettaglio
  non devono generare pagine vuote.
*/
export function generateStaticParams() {
  return serviziConPagina.map((s) => ({ slug: s.slug }));
}

/*
  Metadata calcolata per pagina.

  È `generateMetadata` e non `metadata` perché il titolo dipende dallo slug,
  che si conosce solo a runtime. `params` è una Promise: nell'App Router va
  atteso con await.
*/
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const servizio = servizioPerSlug(slug);
  if (!servizio) return {};

  return {
    title: `${servizio.nome} — Ideapubblica`,
    description: servizio.dettaglio?.inquadramento.slice(0, 155) ?? servizio.sommario,
  };
}

export default async function ServizioPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const servizio = servizioPerSlug(slug);

  // Doppio controllo: lo slug deve esistere E avere un dettaglio.
  // notFound() interrompe il render e mostra la pagina 404.
  if (!servizio?.dettaglio) notFound();

  const dettaglio = servizio.dettaglio;
  const categoria = categoriaPerSlug(servizio.categoria);
  const tinta = tinte[(categoria?.tint ?? "blu") as Tinta];

  // Gli altri servizi della stessa categoria, per la navigazione laterale.
  const fratelli = serviziDiCategoria(servizio.categoria).filter((s) => s.slug !== servizio.slug);

  return (
    <>
      <a href="#contenuto" className="salta-al-contenuto">
        Salta al contenuto
      </a>
      <Header />

      <main id="contenuto">
        <PageHero
          briciole={[
            { label: "Home", href: "/" },
            { label: "Servizi", href: "/servizi" },
            { label: servizio.nome },
          ]}
          eyebrow={categoria?.nome}
          title={servizio.nome}
          description={dettaglio.claim}
        />

        <section className="pb-8">
          <div className="shell grid gap-12 lg:grid-cols-[1fr_17rem] lg:gap-16">
            <div className={tinta}>
              {/* Inquadramento: il "perché esiste questo adempimento".
                  Un ente che arriva qui da una ricerca deve capire in tre
                  righe se sta leggendo la pagina giusta. */}
              <Reveal>
                <p className="tinta-bordo border-l-2 pl-5 text-base leading-relaxed text-fg-soft sm:text-lg">
                  {dettaglio.inquadramento}
                </p>
              </Reveal>

              <div className="mt-12 flex flex-col gap-10">
                {dettaglio.blocchi.map((blocco, i) => (
                  <Reveal key={blocco.titolo} delay={i * 80}>
                    <article>
                      <h2 className="display text-xl text-fg sm:text-2xl">{blocco.titolo}</h2>
                      {blocco.testo ? (
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-soft sm:text-base">
                          {blocco.testo}
                        </p>
                      ) : null}
                      {blocco.elenco ? (
                        <ul className="mt-5 flex flex-col gap-2.5">
                          {blocco.elenco.map((voce) => (
                            <li
                              key={voce}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-soft"
                            >
                              <Check size={15} className="tinta-testo mt-0.5 shrink-0" aria-hidden />
                              {voce}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </article>
                  </Reveal>
                ))}
              </div>

              {/* Due blocchi che il sito attuale non ha, e che sono la
                  ragione principale per cui questa pagina è migliore:
                  a chi serve, e cosa resta in mano all'ente alla fine. */}
              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                <Reveal>
                  <div className="glass h-full rounded-3xl p-6">
                    <h2 className="eyebrow mb-4 flex items-center gap-2 tinta-testo">
                      <Users size={14} aria-hidden />
                      A chi serve
                    </h2>
                    <ul className="flex flex-col gap-2.5">
                      {dettaglio.destinatari.map((voce) => (
                        <li key={voce} className="text-sm leading-relaxed text-fg-soft">
                          {voce}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>

                <Reveal delay={100}>
                  <div className="glass h-full rounded-3xl p-6">
                    <h2 className="eyebrow mb-4 flex items-center gap-2 text-fg-faint">
                      <FileText size={14} aria-hidden />
                      Cosa resta all&apos;ente
                    </h2>
                    <ul className="flex flex-col gap-2.5">
                      {dettaglio.risultati.map((voce) => (
                        <li key={voce} className="text-sm leading-relaxed text-fg-soft">
                          {voce}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </div>

              {/*
                Locandina in PDF.

                Il file sta ancora sul sito attuale, quindi è un link esterno:
                `target="_blank"` per non far perdere il segno a chi sta
                leggendo, e `rel="noopener noreferrer"` come per ogni link
                che esce dal nostro dominio.

                Niente attributo `download`: funziona solo sui file dello
                stesso dominio, e su un file altrui verrebbe ignorato in
                silenzio — meglio dire apertamente che si apre il PDF.
                Il peso non lo dichiariamo perché non lo conosciamo: scriverlo
                a caso è peggio che ometterlo.
              */}
              {dettaglio.pdf ? (
                <Reveal>
                  <a
                    href={dettaglio.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tinta-bordo tinta-fondo mt-10 inline-flex items-center gap-2.5 rounded-full border px-6 py-3.5 text-sm font-semibold text-fg transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    <Download size={16} aria-hidden className="tinta-testo" />
                    Scarica la scheda in PDF
                    <span className="sr-only">(si apre in una nuova scheda)</span>
                  </a>
                </Reveal>
              ) : null}

              {dettaglio.riferimenti ? (
                <p className="mt-8 border-t border-line pt-5 text-xs text-fg-faint">
                  <span className="font-semibold">Riferimenti normativi: </span>
                  {dettaglio.riferimenti}
                </p>
              ) : null}
            </div>

            {/* Colonna laterale: gli altri servizi della stessa area.
                Chi cerca il DUP spesso ha davanti anche il bilancio di
                previsione — tenerli a portata evita di tornare all'indice. */}
            {fratelli.length > 0 && (
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <h2 className="eyebrow mb-4 text-fg-faint">{categoria?.nome}</h2>
                <nav aria-label="Altri servizi della stessa area">
                  <ul className="flex flex-col gap-1">
                    {fratelli.map((f) => (
                      <li key={f.slug}>
                        <Link
                          href={linkServizio(f)}
                          className="block rounded-xl px-3 py-2.5 text-sm text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
                        >
                          {f.nome}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                <Link
                  href="/servizi"
                  className="mt-4 inline-flex items-center gap-1.5 px-3 text-sm font-semibold text-accent-soft transition-transform duration-300 hover:translate-x-1"
                >
                  Tutte le aree
                  <ArrowUpRight size={15} aria-hidden />
                </Link>
              </aside>
            )}
          </div>
        </section>

        <ServiceRequest servizio={servizio.nome} />
      </main>

      <Footer />
    </>
  );
}

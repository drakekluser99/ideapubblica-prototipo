import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  serviceCategories,
  serviziDiCategoria,
  servicesPage,
  linkServizio,
} from "@/data/services";
import { tinte, type Tinta } from "@/components/ui/tints";
import PageHero from "@/components/ui/page-hero";
import Reveal from "@/components/ui/reveal";
import Header from "@/components/Header";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

/*
  /servizi — indice per aree.

  Non è più un elenco piatto di sei voci ma la mappa dell'offerta: sei
  categorie, ciascuna con i propri servizi. Rispecchia il menu a tendina, e
  chi ci arriva da una ricerca vede subito l'ampiezza del catalogo.

  Le voci che hanno una pagina di dettaglio ci portano; le altre restano
  righe informative dell'indice. Lo decide `linkServizio` in data/services.ts,
  non questo componente: qui non c'è nessun `if` sulla presenza del
  dettaglio, e il giorno in cui una voce ne acquista uno il link cambia da
  solo.
*/

export const metadata: Metadata = {
  title: "Servizi per gli enti locali — Ideapubblica",
  description:
    "Contabilità e programmazione, bilancio consolidato e partecipate, privacy e anticorruzione, ARERA e tributi, performance del personale, ottimizzazione dell'ente.",
};

export default function ServiziPage() {
  return (
    <>
      <a href="#contenuto" className="salta-al-contenuto">
        Salta al contenuto
      </a>
      <Header />

      <main id="contenuto">
        <PageHero
          briciole={[{ label: "Home", href: "/" }, { label: "Servizi" }]}
          eyebrow={servicesPage.eyebrow}
          title={
            <>
              {servicesPage.titleLead}{" "}
              <span className="text-gradient">{servicesPage.titleAccent}</span>
            </>
          }
          description={servicesPage.description}
        />

        <section className="pb-24 sm:pb-32">
          <div className="shell grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-16">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="eyebrow mb-4 text-fg-faint">Aree di competenza</h2>
              <nav aria-label="Indice delle aree di competenza">
                <ol className="flex flex-col gap-1">
                  {serviceCategories.map((categoria, i) => (
                    <li key={categoria.slug}>
                      <a
                        href={`#${categoria.slug}`}
                        className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
                      >
                        <span className="text-xs tabular-nums text-fg-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {categoria.nome}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="flex flex-col gap-6">
              {serviceCategories.map((categoria, i) => {
                const servizi = serviziDiCategoria(categoria.slug);

                return (
                  <Reveal key={categoria.slug} delay={i * 60}>
                    {/* scroll-mt-28: l'header è fisso, senza questo il titolo
                        finirebbe nascosto sotto la barra saltando all'àncora. */}
                    <section
                      id={categoria.slug}
                      className={`${tinte[categoria.tint as Tinta]} glass scroll-mt-28 rounded-3xl p-7 sm:p-9`}
                    >
                      <div className="flex flex-wrap items-baseline gap-3">
                        <span className="display text-2xl tabular-nums text-fg-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h2 className="display text-2xl text-fg sm:text-3xl">{categoria.nome}</h2>
                      </div>

                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-soft sm:text-base">
                        {categoria.sommario}
                      </p>

                      <ul className="mt-7 grid gap-2 sm:grid-cols-2">
                        {servizi.map((servizio) => (
                          <li key={servizio.slug}>
                            <Link
                              href={linkServizio(servizio)}
                              className="group flex h-full items-start gap-3 rounded-2xl border border-line bg-card/40 p-4 transition-colors hover:tinta-bordo"
                            >
                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-fg">
                                  {servizio.nome}
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-fg-soft">
                                  {servizio.sommario}
                                </span>
                              </span>
                              {servizio.dettaglio ? (
                                <ArrowUpRight
                                  size={15}
                                  aria-hidden
                                  className="tinta-testo mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                                />
                              ) : null}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </Reveal>
                );
              })}

              <p className="mt-2 text-xs leading-relaxed text-fg-faint">{servicesPage.nota}</p>
            </div>
          </div>
        </section>

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}

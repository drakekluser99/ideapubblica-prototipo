import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, FileText } from "lucide-react";
import { services, servicesPage } from "@/data/content";
import { tinte, type Tinta } from "@/components/ui/tints";
import PageHero from "@/components/ui/page-hero";
import Reveal from "@/components/ui/reveal";
import Header from "@/components/Header";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

/*
  /servizi — pagina unica con un'àncora per ciascuna delle sei aree.

  Perché una pagina sola e non sei: con il materiale disponibile ogni area
  riempie mezza schermata. Sei pagine da mezza schermata sono peggio di una
  pagina densa, sia da leggere sia per i motori di ricerca, che premiano una
  pagina autorevole e penalizzano il contenuto sottile ripetuto.

  Lo slug però è già nei dati: il giorno in cui un'area avrà contenuto
  proprio, /servizi#pef-rifiuti diventa /servizi/pef-rifiuti senza dover
  reinventare gli indirizzi.
*/

/*
  `metadata` esportato da un file di pagina dice a Next cosa mettere in
  <head> per QUESTA rotta: sovrascrive i valori del layout radice. Senza,
  ogni pagina erediterebbe titolo e descrizione della home — e nei risultati
  di ricerca comparirebbero tutte uguali.
*/
export const metadata: Metadata = {
  title: "Servizi per gli enti locali — Ideapubblica",
  description:
    "Bilancio consolidato e partecipate, PEF rifiuti con metodo ARERA, privacy e DPO, contabilità economico-patrimoniale, controllo di gestione, anticorruzione e trasparenza.",
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
            {/*
              Indice laterale.

              `sticky top-28` lo tiene visibile mentre si scorre: su una
              pagina lunga è il modo più economico per non far perdere
              l'orientamento. Sotto lg diventa una lista normale in cima,
              perché una colonna appiccicata su schermo stretto ruba spazio
              al contenuto.
            */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="eyebrow mb-4 text-fg-faint">{servicesPage.indiceTitolo}</h2>
              <nav aria-label="Indice delle aree di competenza">
                <ol className="flex flex-col gap-1">
                  {services.map((servizio, i) => (
                    <li key={servizio.slug}>
                      <a
                        href={`#${servizio.slug}`}
                        className="flex items-start gap-3 rounded-xl px-3 py-2.5 text-sm text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
                      >
                        <span className="text-xs text-fg-faint tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {servizio.name}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="flex flex-col gap-6">
              {services.map((servizio, i) => (
                <Reveal key={servizio.slug} delay={i * 60}>
                  {/*
                    `scroll-mt-28` è il dettaglio che quasi sempre si dimentica:
                    l'header è fisso, quindi saltando a un'àncora il titolo
                    finirebbe NASCOSTO sotto la barra. Questa utility dice al
                    browser di fermarsi 7rem più in alto.
                  */}
                  <article
                    id={servizio.slug}
                    className={`${tinte[servizio.tint as Tinta]} glass scroll-mt-28 rounded-3xl p-7 sm:p-9`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="display text-2xl text-fg-faint tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="tinta-fondo tinta-testo rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase">
                        {servizio.tag}
                      </span>
                    </div>

                    {/* h2: l'h1 della pagina è nel PageHero. */}
                    <h2 className="display mt-3 text-2xl text-fg sm:text-3xl">{servizio.name}</h2>

                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-fg-soft">
                      {servizio.intro}
                    </p>

                    <div className="mt-8 grid gap-8 sm:grid-cols-2">
                      <div>
                        <h3 className="eyebrow mb-4 tinta-testo">{servicesPage.attivitaTitolo}</h3>
                        <ul className="flex flex-col gap-2.5">
                          {servizio.attivita.map((voce) => (
                            <li key={voce} className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-soft">
                              <Check size={15} className="tinta-testo mt-0.5 shrink-0" aria-hidden />
                              {voce}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="eyebrow mb-4 text-fg-faint">{servicesPage.risultatiTitolo}</h3>
                        <ul className="flex flex-col gap-2.5">
                          {servizio.risultati.map((voce) => (
                            <li key={voce} className="flex items-start gap-2.5 text-sm leading-relaxed text-fg-soft">
                              <FileText size={15} className="mt-0.5 shrink-0 text-fg-faint" aria-hidden />
                              {voce}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                      <p className="text-xs text-fg-faint">
                        <span className="sr-only">{servicesPage.riferimentiTitolo}: </span>
                        {servizio.riferimenti}
                      </p>
                      <Link
                        href="/#contatti"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-soft transition-transform duration-300 hover:translate-x-1"
                      >
                        Parlane con noi
                        <ArrowUpRight size={15} aria-hidden />
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}

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

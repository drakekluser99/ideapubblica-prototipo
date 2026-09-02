import type { Metadata } from "next";
import { Headset, RefreshCw, Rocket, SlidersHorizontal } from "lucide-react";
import { softwarePage } from "@/data/content";
import PageHero from "@/components/ui/page-hero";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";
import Header from "@/components/Header";
import SoftwareShowcase from "@/components/SoftwareShowcase";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

/*
  /software — cosa vuol dire "software come servizio", poi il catalogo.

  Il catalogo è <SoftwareShowcase />, lo stesso componente che sta in home e
  legge `softwareProducts`: un applicativo si aggiunge o si modifica in
  content.ts e cambia in tutte e due le pagine. Duplicarne il markup qui
  avrebbe voluto dire due griglie da tenere allineate a mano — la scorciatoia
  che dopo tre mesi produce due pagine che dicono cose diverse.

  L'ordine è voluto: prima si spiega la formula (abbonamento, niente
  installazioni, aggiornamenti inclusi), poi si mostrano i prodotti. Chi
  arriva da una ricerca vuole sapere in che cosa si sta impegnando prima di
  leggere cinque schede.
*/

export const metadata: Metadata = {
  title: "Software per la pubblica amministrazione — Ideapubblica",
  description:
    "Applicativi in abbonamento per gli enti locali: bilancio consolidato e partecipate, privacy e GDPR, contabilità economico-patrimoniale, ricerca finanziamenti, cruscotti di controllo.",
};

const icons = {
  pronto: Rocket,
  personalizzato: SlidersHorizontal,
  aggiornato: RefreshCw,
  assistenza: Headset,
} as const;

export default function SoftwarePage() {
  const { vantaggi } = softwarePage;

  return (
    <>
      <a href="#contenuto" className="salta-al-contenuto">
        Salta al contenuto
      </a>
      <Header />

      <main id="contenuto">
        <PageHero
          briciole={[{ label: "Home", href: "/" }, { label: "Software" }]}
          eyebrow={softwarePage.eyebrow}
          title={
            <>
              {softwarePage.titleLead}{" "}
              <span className="text-gradient">{softwarePage.titleAccent}</span>
            </>
          }
          description={softwarePage.claim}
        />

        {/* ─── Come funziona ───────────────────────────────────────────── */}
        <section
          id="come-funziona"
          className="relative scroll-mt-28 overflow-hidden border-y border-line bg-surface-2 py-24 sm:py-32"
        >
          <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="glow-a pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[45rem] -translate-x-1/2 rounded-full blur-3xl"
          />

          <div className="shell relative">
            <SectionHeading eyebrow={vantaggi.eyebrow} title={vantaggi.title} />

            <div className="mt-14 grid gap-5 sm:grid-cols-2">
              {vantaggi.voci.map((voce, i) => {
                const Icona = icons[voce.icon];
                return (
                  <Reveal key={voce.titolo} delay={i * 90} className="h-full">
                    <article className="glass flex h-full gap-5 rounded-3xl p-7">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-fg/[0.04] text-accent-soft">
                        <Icona size={20} aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold text-fg sm:text-lg">
                          {voce.titolo}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-fg-soft">{voce.testo}</p>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Catalogo (sezione condivisa con la home) ────────────────── */}
        <SoftwareShowcase />

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}

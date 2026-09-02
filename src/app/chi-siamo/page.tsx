import type { Metadata } from "next";
import {
  ClipboardCheck,
  HeartHandshake,
  Landmark,
  Lightbulb,
  Scissors,
  ShieldCheck,
  Stamp,
} from "lucide-react";
import { chiSiamo } from "@/data/content";
import { tinte, type Tinta } from "@/components/ui/tints";
import PageHero from "@/components/ui/page-hero";
import Counter from "@/components/ui/counter";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";
import Header from "@/components/Header";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

/*
  /chi-siamo — l'azienda e il manifesto.

  Sostituisce la pagina "Il nostro manifesto" del sito attuale, che teneva
  insieme due cose diverse: la presentazione della società e le quattro
  colonne di valori. Qui restano insieme, ma con una gerarchia: prima chi
  siamo e da quando, poi il manifesto come capitolo a sé.

  Struttura ripresa dalle altre pagine interne, per non far divergere il
  sito: PageHero (briciole + h1) → sezioni → ContactCTA → Footer. Se un
  giorno servisse una quarta pagina interna, si parte copiando questa.

  Come in Pillars e nell'indice servizi, `icons` traduce la chiave testuale
  dei dati in un componente, e `tinte` la traduce in classe. I dati in
  content.ts restano puri.
*/

export const metadata: Metadata = {
  title: "Chi siamo — Ideapubblica",
  description:
    "Dal 2015 professionisti del settore pubblico al servizio degli enti locali. Il nostro manifesto: innovazione, soluzioni su misura, qualità ed etica nelle relazioni.",
};

const icons = {
  innovazione: Lightbulb,
  soluzioni: Scissors,
  qualita: ShieldCheck,
  relazioni: HeartHandshake,
} as const;

// Le icone dei tre interlocutori stanno in una mappa separata da quella del
// manifesto: sono due insiemi indipendenti, e tenerli distinti evita che
// aggiungendo una colonna al manifesto si debba pensare anche a questa.
const iconeRuoli = {
  amministratori: Landmark,
  segretari: Stamp,
  responsabili: ClipboardCheck,
} as const;

export default function ChiSiamoPage() {
  const { storia, numeri, manifesto, destinatari } = chiSiamo;

  return (
    <>
      <a href="#contenuto" className="salta-al-contenuto">
        Salta al contenuto
      </a>
      <Header />

      <main id="contenuto">
        <PageHero
          briciole={[{ label: "Home", href: "/" }, { label: "Chi siamo" }]}
          eyebrow={chiSiamo.eyebrow}
          title={
            <>
              {chiSiamo.titleLead}{" "}
              <span className="text-gradient">{chiSiamo.titleAccent}</span>
            </>
          }
          description={chiSiamo.claim}
        />

        {/* ─── Storia + numeri ─────────────────────────────────────────── */}
        <section className="pb-24 sm:pb-32">
          {/*
            Due colonne asimmetriche: il testo prende lo spazio che gli serve
            per righe leggibili, i numeri stanno in una colonna stretta e
            appiccicata (`sticky`) mentre si scorre il racconto. Sotto il
            breakpoint lg tornano uno sotto l'altro, nell'ordine del markup —
            che è già quello giusto da leggere.
          */}
          <div className="shell grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
            <div>
              <SectionHeading eyebrow={storia.eyebrow} title={storia.title} />

              <div className="mt-8 flex max-w-2xl flex-col gap-5">
                {storia.paragrafi.map((testo, i) => (
                  <Reveal key={testo.slice(0, 24)} delay={i * 80}>
                    <p className="text-base leading-relaxed text-fg-soft sm:text-lg">{testo}</p>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={120} className="lg:sticky lg:top-28 lg:self-start">
              <dl className="glass flex flex-col gap-6 rounded-3xl p-7">
                {numeri.map((n) => (
                  <div key={n.label}>
                    {/*
                      <dt> è il numero e <dd> l'etichetta: una lista di
                      descrizione è la struttura semantica giusta per delle
                      coppie valore/didascalia, e un lettore di schermo le
                      annuncia accoppiate invece che come testo sparso.
                    */}
                    <dt className="display text-4xl text-fg">
                      {n.raw ? (
                        n.value
                      ) : (
                        <Counter to={n.value} suffix={n.suffix} />
                      )}
                    </dt>
                    <dd className="mt-1 text-sm leading-relaxed text-fg-soft">{n.label}</dd>
                  </div>
                ))}
                <p className="border-t border-line pt-4 text-xs leading-relaxed text-fg-faint">
                  Dati indicativi, da validare con il cliente.
                </p>
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ─── Manifesto ───────────────────────────────────────────────── */}
        {/*
          Il manifesto ha uno sfondo proprio (`surface-2` + reticolo + alone):
          serve a staccarlo dal racconto precedente e a dire "qui comincia un
          altro capitolo", lo stesso ruolo che in home ha la fascia invertita
          dei Servizi. Gli sfondi sono decorativi, quindi `aria-hidden`.
        */}
        <section
          id="manifesto"
          className="relative scroll-mt-28 overflow-hidden border-y border-line bg-surface-2 py-24 sm:py-32"
        >
          <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
          <div
            aria-hidden
            className="glow-a pointer-events-none absolute -top-40 left-1/2 h-[30rem] w-[45rem] -translate-x-1/2 rounded-full blur-3xl"
          />

          <div className="shell relative">
            <SectionHeading
              eyebrow={manifesto.eyebrow}
              title={
                <>
                  {manifesto.titleLead}{" "}
                  <span className="text-gradient">{manifesto.titleAccent}</span>
                </>
              }
              description={manifesto.description}
            />

            <ol className="mt-14 grid gap-5 md:grid-cols-2">
              {manifesto.colonne.map((colonna, i) => {
                const Icona = icons[colonna.icon];
                return (
                  <Reveal key={colonna.titolo} delay={i * 90} className="h-full">
                    {/*
                      Una <ol> perché nella pagina originale le colonne sono
                      numerate: l'ordine fa parte del contenuto, non è
                      decorazione. Il numero grande è quindi ridondante per un
                      lettore di schermo, che annuncia già "1 di 4" — per
                      questo è `aria-hidden`.
                    */}
                    <li
                      className={`group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:tinta-bordo ${tinte[colonna.tint as Tinta]}`}
                    >
                      <span
                        aria-hidden
                        className="tinta-alone pointer-events-none absolute -top-24 -right-16 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                      />

                      <div className="flex items-center gap-4">
                        <span className="tinta-fondo tinta-testo tinta-bordo flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border">
                          <Icona size={20} />
                        </span>
                        <span
                          aria-hidden
                          className="display text-2xl tabular-nums text-fg-faint"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <h3 className="display mt-5 text-xl text-fg sm:text-2xl">{colonna.titolo}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-fg-soft sm:text-base">
                        {colonna.testo}
                      </p>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          </div>
        </section>

        {/* ─── A chi ci rivolgiamo ─────────────────────────────────────── */}
        <section className="py-24 sm:py-32">
          <div className="shell">
            <SectionHeading
              eyebrow="Interlocutori"
              title={destinatari.title}
              description="Tre ruoli diversi con lo stesso problema di fondo: poco tempo, responsabilità piena e norme che cambiano."
            />

            <div className="mt-14 grid gap-5 sm:grid-cols-3">
              {destinatari.voci.map((voce, i) => {
                const Icona = iconeRuoli[voce.icon];
                return (
                <Reveal key={voce.ruolo} delay={i * 90} className="h-full">
                  <div className="glass flex h-full flex-col rounded-3xl p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-fg/[0.04] text-accent-soft">
                      <Icona size={18} aria-hidden />
                    </span>
                    <h3 className="mt-4 text-base font-semibold text-fg">{voce.ruolo}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-soft">{voce.testo}</p>
                  </div>
                </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Il "Conosciamoci" della pagina originale: invece di un bottone
            isolato, riusiamo la sezione contatti completa già presente in
            home — stesso form, stesso comportamento, un componente solo da
            collegare quando l'invio sarà attivo. */}
        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}

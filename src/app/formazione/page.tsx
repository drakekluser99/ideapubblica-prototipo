import type { Metadata } from "next";
import { FlaskConical, MonitorPlay, Presentation, UserCog, Users } from "lucide-react";
import { formazionePage } from "@/data/content";
import { tinte, type Tinta } from "@/components/ui/tints";
import PageHero from "@/components/ui/page-hero";
import Reveal from "@/components/ui/reveal";
import SectionHeading from "@/components/ui/section-heading";
import Header from "@/components/Header";
import Webinars from "@/components/Webinars";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

/*
  /formazione — il metodo, i cinque formati, i prossimi appuntamenti, i docenti.

  Sulla riuso di <Webinars />: la sezione dei prossimi appuntamenti è la
  stessa che sta in home, e non c'era ragione di riscriverne il markup. Un
  componente condiviso significa che il giorno in cui i webinar arriveranno
  da un calendario vero si cambia un file solo, e le due pagine restano
  allineate senza che nessuno se ne debba ricordare.

  Il suo link "Iscriviti" punta a `#contatti`, un'àncora della stessa pagina:
  funziona qui perché in fondo montiamo <ContactCTA />, che quella sezione la
  porta con sé. È il motivo per cui va tenuta, non è decorazione.
*/

export const metadata: Metadata = {
  title: "Formazione per gli enti locali — Ideapubblica",
  description:
    "Formazione pratica e su misura per la pubblica amministrazione: percorsi personalizzati, webinar, seminari aperti e in house, laboratori. Docenti che lavorano dentro gli enti.",
};

const icons = {
  personalizzato: UserCog,
  webinar: MonitorPlay,
  seminario: Presentation,
  inhouse: Users,
  laboratorio: FlaskConical,
} as const;

export default function FormazionePage() {
  const { approccio, formati, docenti } = formazionePage;

  return (
    <>
      <a href="#contenuto" className="salta-al-contenuto">
        Salta al contenuto
      </a>
      <Header />

      <main id="contenuto">
        <PageHero
          briciole={[{ label: "Home", href: "/" }, { label: "Formazione" }]}
          eyebrow={formazionePage.eyebrow}
          title={
            <>
              {formazionePage.titleLead}{" "}
              <span className="text-gradient">{formazionePage.titleAccent}</span>
            </>
          }
          description={formazionePage.claim}
        />

        {/* ─── Il metodo ───────────────────────────────────────────────── */}
        <section className="pb-24 sm:pb-32">
          <div className="shell">
            <SectionHeading eyebrow={approccio.eyebrow} title={approccio.title} />

            <div className="mt-8 flex max-w-2xl flex-col gap-5">
              {approccio.paragrafi.map((testo, i) => (
                <Reveal key={testo.slice(0, 24)} delay={i * 80}>
                  <p className="text-base leading-relaxed text-fg-soft sm:text-lg">{testo}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ─── I cinque formati ────────────────────────────────────────── */}
        <section
          id="formati"
          className="relative scroll-mt-28 overflow-hidden border-y border-line bg-surface-2 py-24 sm:py-32"
        >
          <div aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-60" />

          <div className="shell relative">
            <SectionHeading
              eyebrow="Formati"
              title={
                <>
                  Cinque modi di <span className="text-gradient">stare in aula</span>
                </>
              }
              description="Stessa materia, contenitori diversi: si sceglie in base a quante persone coinvolgere, quanto tempo hanno e se serve lavorare sui documenti dell'ente."
            />

            {/*
              Quattro card in due righe, più la quinta che occupa l'intera
              ultima riga: i laboratori sono il formato più impegnativo, e
              dargli tutta la larghezza evita anche la casella vuota che
              lascerebbe un numero dispari di schede.
            */}
            <div className="mt-14 grid gap-5 md:grid-cols-2">
              {formati.map((formato, i) => {
                const Icona = icons[formato.icon];
                const ultimo = i === formati.length - 1;
                return (
                  <Reveal
                    key={formato.nome}
                    delay={i * 90}
                    className={`h-full ${ultimo ? "md:col-span-2" : ""}`}
                  >
                    <article
                      className={`group glass flex h-full flex-col rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:tinta-bordo ${tinte[formato.tint as Tinta]}`}
                    >
                      <span className="tinta-fondo tinta-testo tinta-bordo flex h-11 w-11 items-center justify-center rounded-xl border">
                        <Icona size={20} />
                      </span>
                      <h3 className="display mt-5 text-xl text-fg sm:text-2xl">{formato.nome}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-soft sm:text-base">
                        {formato.testo}
                      </p>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Prossimi appuntamenti (sezione condivisa con la home) ───── */}
        <Webinars />

        {/* ─── Docenti ─────────────────────────────────────────────────── */}
        <section id="docenti" className="scroll-mt-28 border-t border-line py-24 sm:py-32">
          <div className="shell">
            <SectionHeading
              eyebrow={docenti.eyebrow}
              title={docenti.title}
              description={docenti.description}
            />

            {/*
              Una <ul> e non una griglia di <div>: è un elenco di persone, e
              chi naviga con un lettore di schermo sente "elenco di 11
              elementi" invece di undici blocchi scollegati. L'iniziale grande
              serve solo all'occhio per separare le schede, quindi è
              `aria-hidden`: il nome viene già letto subito dopo.
            */}
            <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {docenti.elenco.map((docente, i) => (
                <Reveal key={docente.nome} delay={(i % 3) * 90} className="h-full">
                  <li className="glass flex h-full gap-4 rounded-3xl p-6">
                    <span
                      aria-hidden
                      className="display flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-fg/[0.04] text-base text-accent-soft"
                    >
                      {docente.nome.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-fg">{docente.nome}</h3>
                      <ul className="mt-2 flex flex-col gap-1">
                        {docente.ruoli.map((ruolo) => (
                          <li key={ruolo} className="text-sm leading-relaxed text-fg-soft">
                            {ruolo}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <ContactCTA />
      </main>

      <Footer />
    </>
  );
}

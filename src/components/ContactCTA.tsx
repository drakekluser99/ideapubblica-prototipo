import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/data/content";
import ShinyButton from "@/components/ui/shiny-button";
import Reveal from "@/components/ui/reveal";

/*
  Sezione contatti: recapiti a sinistra, form a destra.

  Il form è ancora solo interfaccia — non invia nulla. Il passo successivo
  sarà un Route Handler in `app/api/contatti/route.ts` che riceve il POST e
  gira il messaggio a un provider email (Resend, per esempio), oppure una
  Server Action. Nel frattempo i campi hanno già `name`, `type` e
  `autoComplete` corretti: sono gli attributi che il browser usa per il
  riempimento automatico e che serviranno identici quando collegheremo l'invio.

  Ogni input ha una <label> collegata via htmlFor/id. Non è un vezzo: senza,
  il campo è invisibile a chi naviga con lettore di schermo — e per un sito
  della PA l'accessibilità è un requisito, non un extra.
*/

const fieldClass =
  "w-full rounded-xl border border-line bg-fg/[0.04] px-4 py-3 text-sm text-fg placeholder:text-fg-faint transition-colors focus:border-accent focus:bg-fg/[0.06]";

export default function ContactCTA() {
  return (
    <section id="contatti" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 grid-bg opacity-50" />
      <div
        aria-hidden
        className="glow-a pointer-events-none absolute top-0 left-1/2 -z-10 h-[34rem] w-[48rem] -translate-x-1/2 rounded-full blur-3xl"
      />

      <div className="shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow mb-4 flex items-center gap-2 text-accent-soft">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
              Contatti
            </p>
            <h2 className="display text-[clamp(2rem,4.4vw,3.25rem)] text-fg">
              Raccontateci la <span className="text-gradient">scadenza</span> che avete davanti
            </h2>
            <p className="mt-5 text-base leading-relaxed text-fg-soft">
              Rispondiamo entro un giorno lavorativo con una persona, non con un preventivo
              automatico.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-10 space-y-4">
              <a
                href={contact.phoneHref}
                className="glass flex items-center gap-3.5 rounded-2xl p-4 transition-colors hover:border-accent/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent-soft">
                  <Phone size={17} />
                </span>
                <span>
                  <span className="block text-xs text-fg-soft">Telefono</span>
                  <span className="block text-sm font-semibold text-fg">{contact.phone}</span>
                </span>
              </a>

              <a
                href={`mailto:${contact.email}`}
                className="glass flex items-center gap-3.5 rounded-2xl p-4 transition-colors hover:border-accent/40"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent-soft">
                  <Mail size={17} />
                </span>
                <span>
                  <span className="block text-xs text-fg-soft">Email</span>
                  <span className="block text-sm font-semibold text-fg">{contact.email}</span>
                </span>
              </a>

              <div className="glass rounded-2xl p-4">
                <div className="flex items-center gap-3.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent-soft">
                    <MapPin size={17} />
                  </span>
                  <span className="text-xs text-fg-soft">Sedi</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {contact.addresses.map((a) => (
                    <li key={a.label} className="text-sm text-fg/85">
                      <span className="text-fg-soft">{a.label}:</span> {a.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal from="right" delay={120}>
          <form className="glass rounded-3xl p-7 sm:p-9">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nome" className="mb-2 block text-xs font-medium text-fg-soft">
                  Nome e cognome
                </label>
                <input id="nome" name="nome" autoComplete="name" className={fieldClass} placeholder="Mario Rossi" />
              </div>
              <div>
                <label htmlFor="ente" className="mb-2 block text-xs font-medium text-fg-soft">
                  Ente
                </label>
                <input id="ente" name="ente" autoComplete="organization" className={fieldClass} placeholder="Comune di…" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-medium text-fg-soft">
                  Email
                </label>
                <input id="email" name="email" type="email" autoComplete="email" className={fieldClass} placeholder="nome@comune.it" />
              </div>
              <div>
                <label htmlFor="telefono" className="mb-2 block text-xs font-medium text-fg-soft">
                  Telefono
                </label>
                <input id="telefono" name="telefono" type="tel" autoComplete="tel" className={fieldClass} placeholder="071 …" />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="messaggio" className="mb-2 block text-xs font-medium text-fg-soft">
                Come possiamo aiutarvi?
              </label>
              <textarea
                id="messaggio"
                name="messaggio"
                rows={4}
                className={`${fieldClass} resize-none`}
                placeholder="Descrivete brevemente l'esigenza o la scadenza…"
              />
            </div>

            <div className="mt-5 flex items-start gap-3">
              <input
                id="privacy"
                name="privacy"
                type="checkbox"
                className="mt-0.5 h-5 w-5 shrink-0 rounded border-line-strong bg-fg/5 accent-accent"
              />
              <label htmlFor="privacy" className="text-xs leading-relaxed text-fg-soft">
                Ho letto l&apos;informativa e acconsento al trattamento dei dati per essere
                ricontattato.
              </label>
            </div>

            <div className="mt-7">
              <ShinyButton type="submit">Invia la richiesta</ShinyButton>
            </div>

            <p className="mt-4 text-[11px] text-fg-faint">
              Prototipo: il modulo non invia ancora messaggi.
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

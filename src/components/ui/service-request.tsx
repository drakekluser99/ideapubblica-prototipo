import { Phone } from "lucide-react";
import { contact } from "@/data/content";
import ShinyButton from "@/components/ui/shiny-button";
import Reveal from "@/components/ui/reveal";

/*
  Form "Richiedi informazioni" contestuale a un servizio.

  Differenza rispetto al form generale in fondo alla home: qui l'oggetto è
  già noto. Chi sta leggendo la pagina del PEF rifiuti non deve spiegare di
  cosa vuole parlare, e chi riceve la richiesta sa già da dove arriva.

  Lo trasmette un campo NASCOSTO (`servizio`): non occupa spazio, non si può
  sbagliare a compilarlo, e arriva insieme al resto del messaggio. È lo stesso
  meccanismo del `redirect_to` che abbiamo visto nel login WordPress — un dato
  che il modulo si porta dietro senza chiederlo all'utente.

  Un campo nascosto NON è una misura di sicurezza: chiunque può cambiarlo dagli
  strumenti sviluppatore. Va bene per un'informazione di contesto come questa;
  non andrebbe bene per un prezzo o per un permesso.

  Il form è ancora solo interfaccia: non invia nulla. I campi hanno già `name`,
  `type` e `autoComplete` corretti, che serviranno identici quando ci sarà il
  Route Handler che raccoglie il POST.

  `honeypot`: un campo che gli umani non vedono e che i robot compilano.
  Quando l'invio sarà attivo, una richiesta con quel campo pieno si scarta
  senza rispondere. È il filtro antispam più economico che esista, e non
  chiede nulla all'utente — a differenza di un CAPTCHA.
*/

const fieldClass =
  "w-full rounded-xl border border-line bg-fg/[0.04] px-4 py-3 text-sm text-fg placeholder:text-fg-faint transition-colors focus:border-accent focus:bg-fg/[0.06]";

export default function ServiceRequest({ servizio }: { servizio: string }) {
  return (
    <section id="richiedi-informazioni" className="scroll-mt-28 py-20 sm:py-24">
      <div className="shell">
        <div className="glass grid gap-10 rounded-3xl p-7 sm:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <Reveal>
            <div>
              <p className="eyebrow mb-4 flex items-center gap-2 text-accent-soft">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
                Richiedi informazioni
              </p>
              <h2 className="display text-2xl text-fg sm:text-3xl">
                Parliamo di <span className="text-gradient">{servizio}</span>
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-fg-soft">
                Scriveteci la situazione dell&apos;ente e la scadenza che avete davanti.
                Rispondiamo entro un giorno lavorativo con una persona, non con un preventivo
                automatico.
              </p>

              <a
                href={contact.phoneHref}
                className="mt-6 inline-flex items-center gap-2.5 text-sm font-semibold text-fg"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/12 text-accent-soft">
                  <Phone size={16} aria-hidden />
                </span>
                {contact.phone}
              </a>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form className="grid gap-4 sm:grid-cols-2">
              {/* Il servizio di provenienza viaggia con la richiesta. */}
              <input type="hidden" name="servizio" value={servizio} />

              {/* Trappola antispam: nascosta agli utenti, non ai robot.
                  `aria-hidden` e tabIndex={-1} la tolgono anche a chi naviga
                  da tastiera o con lettore di schermo. */}
              <div className="hidden" aria-hidden>
                <label htmlFor="sr-azienda">Non compilare questo campo</label>
                <input id="sr-azienda" name="azienda" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="sr-nome" className="mb-1.5 block text-xs font-medium text-fg-soft">
                  Nome e cognome
                </label>
                <input
                  id="sr-nome"
                  name="nome"
                  type="text"
                  autoComplete="name"
                  className={fieldClass}
                  placeholder="Mario Rossi"
                />
              </div>

              <div>
                <label htmlFor="sr-ente" className="mb-1.5 block text-xs font-medium text-fg-soft">
                  Ente di appartenenza
                </label>
                <input
                  id="sr-ente"
                  name="ente"
                  type="text"
                  autoComplete="organization"
                  className={fieldClass}
                  placeholder="Comune di…"
                />
              </div>

              <div>
                <label htmlFor="sr-email" className="mb-1.5 block text-xs font-medium text-fg-soft">
                  Email
                </label>
                <input
                  id="sr-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={fieldClass}
                  placeholder="nome@comune.it"
                />
              </div>

              <div>
                <label htmlFor="sr-tel" className="mb-1.5 block text-xs font-medium text-fg-soft">
                  Telefono
                </label>
                <input
                  id="sr-tel"
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  className={fieldClass}
                  placeholder="071 …"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="sr-messaggio"
                  className="mb-1.5 block text-xs font-medium text-fg-soft"
                >
                  Messaggio
                </label>
                <textarea
                  id="sr-messaggio"
                  name="messaggio"
                  rows={4}
                  className={fieldClass}
                  placeholder="La scadenza che abbiamo davanti è…"
                />
              </div>

              <div className="sm:col-span-2 flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-xs text-xs leading-relaxed text-fg-faint">
                  Prototipo: il modulo non invia ancora messaggi.
                </p>
                <ShinyButton href="#richiedi-informazioni" className="!px-6 !py-3 !text-sm">
                  Invia la richiesta
                </ShinyButton>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

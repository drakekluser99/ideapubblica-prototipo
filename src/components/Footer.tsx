import Link from "next/link";
import { contact, nav } from "@/data/content";
import { esterno, AVVISO_NUOVA_SCHEDA } from "@/lib/link";
import Logo from "@/components/ui/logo";
import { socialIcons } from "@/components/ui/social-icons";

/*
  Footer. Tre blocchi: identità, navigazione, contatti; poi una riga legale.
  Sul footer si perde spesso cura, ma è il posto dove gli utenti della PA
  cercano PEC e partita IVA — quindi devono essere trovabili subito.
*/
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-surface-2">
      <div className="shell grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* Nel footer c'è spazio per la versione completa, payoff incluso. */}
          <Logo gradientId="ip-logo-footer" className="h-auto w-56" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-soft">
            Diamo nuove forme ai servizi e alla formazione per gli enti. Dal 2015.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {contact.social.map((s) => {
              const Icon = socialIcons[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  // noreferrer implica noopener, ma li scriviamo entrambi:
                  // è la forma che funziona anche sui browser più vecchi e
                  // impedisce alla pagina aperta di manipolare la nostra.
                  rel="noopener noreferrer"
                  // Il link contiene solo un'icona: senza aria-label chi usa
                  // un lettore di schermo sentirebbe "link" e basta.
                  aria-label={`${s.label} — si apre in una nuova scheda`}
                  title={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/10 hover:text-fg"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Navigazione footer">
          <h3 className="eyebrow mb-4 text-fg-faint">Naviga</h3>
          <ul className="space-y-2.5">
            {nav.map((item) => {
              // Stessa lista dell'header, stessa distinzione: la voce che
              // esce dal sito apre una scheda nuova e lo dichiara.
              const fuori = esterno(item.href);
              const classe = "inline-block py-1 text-sm text-fg-soft transition-colors hover:text-fg";

              return (
                <li key={item.href}>
                  {fuori ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={classe}
                    >
                      {item.label}
                      <span className="sr-only"> {AVVISO_NUOVA_SCHEDA}</span>
                    </a>
                  ) : (
                    /* Dentro il sito si naviga con <Link>: niente ricarica
                       del documento, e la destinazione viene precaricata
                       mentre il link è in vista. */
                    <Link href={item.href} className={classe}>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow mb-4 text-fg-faint">Contatti</h3>
          <ul className="space-y-2.5 text-sm text-fg-soft">
            <li>
              <a href={contact.phoneHref} className="transition-colors hover:text-fg">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-fg">
                {contact.email}
              </a>
            </li>
            <li>
              PEC:{" "}
              <a href={`mailto:${contact.pec}`} className="transition-colors hover:text-fg">
                {contact.pec}
              </a>
            </li>
            {contact.addresses.map((a) => (
              <li key={a.label}>
                <span className="text-fg-faint">{a.label}:</span> {a.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-fg-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ideapubblica srl — P.IVA e C.F. 02590670416</p>
          <p>Prototipo — contenuti da validare con il cliente.</p>
        </div>
      </div>
    </footer>
  );
}

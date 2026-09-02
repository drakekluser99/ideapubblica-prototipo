import { contact, nav } from "@/data/content";
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
    <footer className="border-t border-white/8 bg-ink-900/60">
      <div className="shell grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          {/* Nel footer c'è spazio per la versione completa, payoff incluso. */}
          <Logo tone="onDark" gradientId="ip-logo-footer" className="h-auto w-56" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
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
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mute transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500/50 hover:bg-brand-500/10 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>

        <nav aria-label="Navigazione footer">
          <h3 className="eyebrow mb-4 text-white/50">Naviga</h3>
          <ul className="space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-sm text-mute transition-colors hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow mb-4 text-white/50">Contatti</h3>
          <ul className="space-y-2.5 text-sm text-mute">
            <li>
              <a href={contact.phoneHref} className="transition-colors hover:text-white">
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white">
                {contact.email}
              </a>
            </li>
            <li>
              PEC:{" "}
              <a href={`mailto:${contact.pec}`} className="transition-colors hover:text-white">
                {contact.pec}
              </a>
            </li>
            {contact.addresses.map((a) => (
              <li key={a.label}>
                <span className="text-white/50">{a.label}:</span> {a.value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="shell flex flex-col gap-2 py-6 text-xs text-mute/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Ideapubblica srl — P.IVA e C.F. 02590670416</p>
          <p>Prototipo di homepage — contenuti da validare con il cliente.</p>
        </div>
      </div>
    </footer>
  );
}

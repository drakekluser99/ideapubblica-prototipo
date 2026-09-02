import { contact, nav } from "@/data/content";
import Logo from "@/components/ui/logo";

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
          <div className="flex items-center gap-2.5">
            <Logo className="h-7 w-7" />
            <span className="display text-lg text-white">
              idea<span className="text-brand-400">pubblica</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">
            Diamo nuove forme ai servizi e alla formazione per gli enti. Dal 2015.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {contact.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 px-4 py-2 text-xs font-medium text-mute transition-colors hover:border-brand-500/40 hover:text-white"
              >
                {s.label}
              </a>
            ))}
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

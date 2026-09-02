import { clients } from "@/data/content";
import Marquee from "@/components/ui/marquee";
import { Landmark } from "lucide-react";

/*
  Fascia di riprova sociale, subito sotto all'hero.

  Sta qui e non a metà pagina per un motivo preciso: chi arriva da una
  ricerca su "bilancio consolidato partecipate" deve capire entro due secondi
  che altri enti come il suo si fidano già. È la sezione che fa più lavoro in
  rapporto allo spazio che occupa.

  I "loghi" sono oggi testuali: vanno sostituiti con i marchi reali quando il
  cliente conferma le liberatorie.
*/
export default function Clients() {
  return (
    <section className="border-y border-white/8 bg-ink-900/60 py-10">
      <p className="shell mb-7 text-center text-xs font-medium tracking-wide text-mute">
        Comuni, province e società partecipate che lavorano con noi
      </p>

      <Marquee durationSeconds={45}>
        {clients.map((name) => (
          <div
            key={name}
            className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/[0.03] px-5 py-3 whitespace-nowrap"
          >
            {/* Icona neutra da "ente pubblico": qui il marchio di
                Ideapubblica sarebbe fuorviante — questi sono i clienti.
                Va sostituita con i loghi reali una volta ottenute le
                liberatorie. */}
            <Landmark size={15} className="text-brand-300/70" />
            <span className="text-sm font-medium text-white/70">{name}</span>
          </div>
        ))}
      </Marquee>
    </section>
  );
}

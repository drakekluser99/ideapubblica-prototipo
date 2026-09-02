"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/*
  Reveal — il mattone di tutti gli effetti di scroll del sito.

  Idea: invece di legare l'animazione all'evento `scroll` (che spara decine di
  volte al secondo e obbliga a calcolare le posizioni a mano), usiamo
  IntersectionObserver: è il browser a dirci "questo elemento è entrato nel
  viewport". Costo prestazionale quasi zero.

  Dettaglio importante sul "come": l'animazione NON passa da uno stato React.
  Scriviamo direttamente su `element.style`. Due motivi:
  1) l'apparizione è un effetto visivo, non un dato dell'applicazione — non
     deve far ri-renderizzare React;
  2) chiamare setState dentro un useEffect provoca un secondo render a catena,
     ed è esattamente ciò che la regola `react-hooks/set-state-in-effect`
     segnala come anti-pattern.
  Questo è il caso da manuale di "sincronizzare React con un sistema esterno"
  — qui il sistema esterno è il DOM.

  Con `once` (default) l'osservatore si disconnette dopo la prima apparizione:
  l'elemento non ri-anima tornando indietro, che evita l'effetto discoteca.
*/

type RevealProps = {
  children: ReactNode;
  /** Ritardo in ms: crea l'effetto "a cascata" tra card vicine. */
  delay?: number;
  /** Direzione da cui entra l'elemento. */
  from?: "bottom" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
};

const offsets: Record<NonNullable<RevealProps["from"]>, string> = {
  bottom: "translateY(28px)",
  left: "translateX(-28px)",
  right: "translateX(28px)",
  none: "none",
};

export function Reveal({
  children,
  delay = 0,
  from = "bottom",
  className = "",
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Non scriviamo colori o valori: mettiamo/togliamo un attributo, e il
    // resto lo decide il CSS (`html.js .reveal:not([data-shown])`).
    const show = () => el.setAttribute("data-shown", "");
    const hide = () => el.removeAttribute("data-shown");

    // Se l'utente ha chiesto meno animazioni, mostriamo tutto subito.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          if (once) observer.disconnect();
        } else if (!once) {
          hide();
        }
      },
      // rootMargin negativo in basso = l'elemento deve essere entrato di
      // qualche punto percentuale nel viewport, non appena sfiora il bordo.
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [from, once]);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      // Ritardo e direzione viaggiano come custom property CSS: il
      // comportamento sta tutto nel foglio di stile, qui passiamo solo i due
      // parametri che cambiano da un'istanza all'altra.
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-offset": offsets[from],
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export default Reveal;

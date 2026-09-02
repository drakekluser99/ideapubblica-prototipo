"use client";

import { useEffect, useRef } from "react";

/*
  Counter — numero che "sale" quando la statistica entra nel viewport.

  Come per Reveal, scriviamo direttamente nel DOM (`el.textContent`) invece di
  passare da uno stato React: qui l'aggiornamento avviene ~60 volte al
  secondo, e farlo passare da setState significherebbe 60 render al secondo
  per un effetto puramente visivo.

  Altri due dettagli che separano un contatore fatto bene da uno fatto male:
  1) requestAnimationFrame invece di setInterval — l'animazione è sincronizzata
     con il refresh dello schermo e si mette in pausa se la tab è nascosta;
  2) un "easing" (easeOutCubic): il numero parte veloce e rallenta alla fine.
     Un conteggio lineare sembra meccanico.
*/

type CounterProps = {
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function Counter({
  to,
  duration = 1600,
  suffix = "",
  prefix = "",
  className = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const render = (n: number) => {
      el.textContent = `${prefix}${n.toLocaleString("it-IT")}${suffix}`;
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      render(to);
      return;
    }

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          // progress va da 0 a 1 nel corso della durata scelta.
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
          render(Math.round(eased * to));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [to, duration, prefix, suffix]);

  // Il valore finale è già nell'HTML servito dal server: se JavaScript non
  // parte (o per un crawler) il numero corretto è comunque visibile.
  return (
    <span ref={ref} className={className}>
      {prefix}
      {to.toLocaleString("it-IT")}
      {suffix}
    </span>
  );
}

export default Counter;

"use client";

import type React from "react";

/*
  ShinyButton — il CTA principale del sito.

  Come funziona il bordo animato, in breve:
  il bottone ha DUE sfondi sovrapposti. Uno pieno (il nero/blu notte) che si
  ferma al `padding-box`, e sotto un `conic-gradient` che arriva fino al
  `border-box`. Il bordo è trasparente, quindi da lì "spunta" il gradiente
  conico: ruotando l'angolo del gradiente sembra che una luce corra lungo il
  perimetro. `@property --gradient-angle` serve proprio a questo: dichiara al
  browser che quella variabile è un <angle>, così può interpolarla in una
  animazione (senza @property le custom properties non sono animabili).
*/

type Variant = "brand" | "ghost";

interface ShinyButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: Variant;
  type?: "button" | "submit";
}

export function ShinyButton({
  children,
  href,
  onClick,
  className = "",
  variant = "brand",
  type = "button",
}: ShinyButtonProps) {
  const content = <span>{children}</span>;

  return (
    <>
      <style jsx>{`
        @property --gradient-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @property --gradient-angle-offset {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }
        @property --gradient-percent {
          syntax: "<percentage>";
          initial-value: 5%;
          inherits: false;
        }
        @property --gradient-shine {
          syntax: "<color>";
          initial-value: #ffffff;
          inherits: false;
        }

        .shiny-cta {
          --shiny-cta-bg: #0b1120;
          --shiny-cta-bg-subtle: #17243d;
          --shiny-cta-fg: #ffffff;
          --shiny-cta-highlight: #2f6bff;
          --shiny-cta-highlight-subtle: #93b4ff;
          --animation: gradient-angle linear infinite;
          --duration: 3s;
          --shadow-size: 2px;
          --transition: 800ms cubic-bezier(0.25, 1, 0.5, 1);

          isolation: isolate;
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          overflow: hidden;
          cursor: pointer;
          outline-offset: 4px;
          padding: 0.95rem 1.9rem;
          font-size: 0.95rem;
          line-height: 1.2;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          border: 1px solid transparent;
          border-radius: 360px;
          color: var(--shiny-cta-fg);
          background:
            linear-gradient(var(--shiny-cta-bg), var(--shiny-cta-bg)) padding-box,
            conic-gradient(
                from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
                transparent,
                var(--shiny-cta-highlight) var(--gradient-percent),
                var(--gradient-shine) calc(var(--gradient-percent) * 2),
                var(--shiny-cta-highlight) calc(var(--gradient-percent) * 3),
                transparent calc(var(--gradient-percent) * 4)
              )
              border-box;
          box-shadow: inset 0 0 0 1px var(--shiny-cta-bg-subtle);
          transition: var(--transition);
          transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine;
        }

        /* Variante "ghost": stesso meccanismo, superficie quasi invisibile. */
        .shiny-cta.ghost {
          --shiny-cta-bg: rgba(255, 255, 255, 0.03);
          --shiny-cta-bg-subtle: rgba(255, 255, 255, 0.12);
          --shiny-cta-highlight: rgba(255, 255, 255, 0.55);
          --shiny-cta-highlight-subtle: rgba(255, 255, 255, 0.8);
          font-weight: 500;
        }

        .shiny-cta::before,
        .shiny-cta::after,
        .shiny-cta :global(span)::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset-inline-start: 50%;
          inset-block-start: 50%;
          translate: -50% -50%;
          z-index: -1;
        }

        .shiny-cta:active {
          translate: 0 1px;
        }

        /* Trama a puntini interna (richiama i "pallini connessi" del logo). */
        .shiny-cta::before {
          --size: calc(100% - var(--shadow-size) * 3);
          --position: 2px;
          --space: calc(var(--position) * 2);
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
              circle at var(--position) var(--position),
              white calc(var(--position) / 4),
              transparent 0
            )
            padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.4;
          z-index: -1;
        }

        /* Riflesso che ruota dentro al bottone. */
        .shiny-cta::after {
          --animation: shimmer linear infinite;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(-50deg, transparent, var(--shiny-cta-highlight), transparent);
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
        }

        /* Lo <span> interno deve essere una riga flessibile: senza questo,
           un'icona messa accanto al testo va a capo invece di allinearsi. */
        .shiny-cta :global(span) {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        /* Sulla variante ghost il riflesso bianco è troppo aggressivo:
           lo teniamo appena accennato. */
        .shiny-cta.ghost::after {
          opacity: 0.18;
        }

        .shiny-cta :global(span)::before {
          --size: calc(100% + 1rem);
          width: var(--size);
          height: var(--size);
          box-shadow: inset 0 -1ex 2rem 4px var(--shiny-cta-highlight);
          opacity: 0;
          transition: opacity var(--transition);
          animation: calc(var(--duration) * 1.5) breathe linear infinite;
        }

        .shiny-cta,
        .shiny-cta::before,
        .shiny-cta::after {
          animation:
            var(--animation) var(--duration),
            var(--animation) calc(var(--duration) / 0.4) reverse paused;
          animation-composition: add;
        }

        .shiny-cta:is(:hover, :focus-visible) {
          --gradient-percent: 20%;
          --gradient-angle-offset: 95deg;
          --gradient-shine: var(--shiny-cta-highlight-subtle);
        }

        .shiny-cta:is(:hover, :focus-visible),
        .shiny-cta:is(:hover, :focus-visible)::before,
        .shiny-cta:is(:hover, :focus-visible)::after {
          animation-play-state: running;
        }

        .shiny-cta:is(:hover, :focus-visible) :global(span)::before {
          opacity: 1;
        }

        @keyframes gradient-angle {
          to {
            --gradient-angle: 360deg;
          }
        }
        @keyframes shimmer {
          to {
            rotate: 360deg;
          }
        }
        @keyframes breathe {
          from,
          to {
            scale: 1;
          }
          50% {
            scale: 1.2;
          }
        }
      `}</style>

      {href ? (
        <a className={`shiny-cta ${variant === "ghost" ? "ghost" : ""} ${className}`} href={href}>
          {content}
        </a>
      ) : (
        <button
          type={type}
          className={`shiny-cta ${variant === "ghost" ? "ghost" : ""} ${className}`}
          onClick={onClick}
        >
          {content}
        </button>
      )}
    </>
  );
}

export default ShinyButton;

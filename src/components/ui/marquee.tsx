import type { ReactNode } from "react";

/*
  Marquee — nastro che scorre in orizzontale, usato per i loghi clienti.

  Trucco classico: si duplica la lista due volte dentro un contenitore che
  trasla da 0 a -50%. Quando la prima copia esce a sinistra, la seconda si
  trova esattamente dove stava la prima all'inizio, quindi il "salto" del
  riavvio è invisibile e il loop sembra infinito.

  Le maschere laterali (mask-image) sfumano i bordi: senza, i loghi
  comparirebbero e sparirebbero di netto contro il fondo.

  Nota: nessun "use client". Non c'è stato né eventi, è solo CSS — quindi resta
  un Server Component e non aggiunge un grammo di JavaScript al bundle.
*/

type MarqueeProps = {
  children: ReactNode;
  /** Durata di un giro completo. Più alto = più lento. */
  durationSeconds?: number;
  reverse?: boolean;
};

export function Marquee({ children, durationSeconds = 40, reverse = false }: MarqueeProps) {
  return (
    <div
      className="group relative flex overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className="flex w-max shrink-0 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${durationSeconds}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {/* Le due copie devono essere identiche: solo così -50% cade esatto. */}
        <div className="flex shrink-0 items-center gap-4 pr-4">{children}</div>
        {/* aria-hidden: la seconda copia è decorativa, gli screen reader
            devono leggere l'elenco una volta sola. */}
        <div aria-hidden className="flex shrink-0 items-center gap-4 pr-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Marquee;

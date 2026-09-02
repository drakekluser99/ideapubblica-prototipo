/*
  Visual astratto dell'hero: una rete di nodi che rappresenta il rapporto tra
  ente centrale, uffici e partecipate — lo stesso concetto del logo, scalato.

  Perché un SVG disegnato e non una foto o un render 3D: i riferimenti che
  usano immagini di stock invecchiano male e in un sito per la PA rischiano
  di sembrare finti. Un grafico vettoriale costa pochi KB, è nitido ovunque,
  usa i colori del design system e si anima con puro CSS.
*/
export function NetworkVisual({ className = "" }: { className?: string }) {
  // Nodi periferici disposti su un cerchio: calcolarli invece di scriverli a
  // mano rende banale cambiarne il numero.
  const outer = Array.from({ length: 7 }, (_, i) => {
    const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 160 + Math.cos(angle) * 112,
      y: 160 + Math.sin(angle) * 112,
      r: i % 3 === 0 ? 9 : 6,
      delay: i * 0.45,
    };
  });

  return (
    <div className={`relative ${className}`}>
      {/* Alone luminoso dietro alla rete. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(47,107,255,0.38), rgba(46,211,183,0.12) 45%, transparent 70%)",
        }}
      />

      <svg viewBox="0 0 320 320" className="h-full w-full" aria-hidden focusable="false">
        <defs>
          <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5b8cff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#2ed3b7" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        {/* Cerchi concentrici: danno profondità e ricordano un radar. */}
        {[70, 112, 150].map((r) => (
          <circle key={r} cx="160" cy="160" r={r} fill="none" stroke="white" strokeOpacity="0.07" />
        ))}

        {/* Collegamenti nodo centrale ↔ nodi periferici. */}
        {outer.map((n, i) => (
          <line key={`l${i}`} x1="160" y1="160" x2={n.x} y2={n.y} stroke="url(#edge)" strokeWidth="1.2" />
        ))}

        {/* Anello che pulsa attorno al nodo centrale. */}
        <circle
          cx="160"
          cy="160"
          r="34"
          fill="none"
          stroke="#2f6bff"
          strokeWidth="1.5"
          style={{ animation: "pulse-ring 3.2s ease-out infinite", transformOrigin: "160px 160px" }}
        />
        <circle
          cx="160"
          cy="160"
          r="34"
          fill="none"
          stroke="#2ed3b7"
          strokeWidth="1.5"
          style={{ animation: "pulse-ring 3.2s ease-out 1.6s infinite", transformOrigin: "160px 160px" }}
        />

        {outer.map((n, i) => (
          <circle
            key={`n${i}`}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={i % 3 === 0 ? "#2ed3b7" : "#5b8cff"}
            fillOpacity={i % 2 === 0 ? 0.95 : 0.6}
            style={{ animation: `float-slow ${5 + i * 0.4}s ease-in-out ${n.delay}s infinite` }}
          />
        ))}

        <circle cx="160" cy="160" r="17" fill="#0b1120" stroke="#2f6bff" strokeWidth="1.5" />
        <circle cx="160" cy="160" r="6" fill="#93b4ff" />
      </svg>
    </div>
  );
}

export default NetworkVisual;

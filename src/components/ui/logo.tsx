/*
  Marchio segnaposto: riprende il motivo dei "pallini connessi" del logo
  attuale (il denominatore comune tra ente, dati e persone). È un SVG inline
  e non un file .png perché così eredita il colore dal testo, resta nitido a
  ogni densità di schermo e non costa una richiesta di rete in più.
  In produzione va sostituito con il logo ufficiale fornito dal cliente.
*/
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden focusable="false">
      <path d="M8 22 L16 7 L24 22" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
      <path d="M8 22 H24" stroke="currentColor" strokeOpacity="0.28" strokeWidth="1.5" />
      <circle cx="16" cy="7" r="3.4" className="fill-brand-400" />
      <circle cx="8" cy="22" r="3.4" className="fill-brand-500" />
      <circle cx="24" cy="22" r="3.4" fill="currentColor" className="text-acqua" />
    </svg>
  );
}

export default Logo;

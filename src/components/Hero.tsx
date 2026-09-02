// Componente puramente statico (nessun useState/useEffect), quindi resta
// un Server Component: niente "use client" in cima al file. Next.js lo
// renderizza in HTML già pronto, più veloce da caricare per l'utente.

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-blue-900 text-white">
      {/* Forme decorative: solo un rimando allo stile "blob" del sito
          originale. Placeholder in attesa della direzione grafica definitiva. */}
      <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-96 w-96 -translate-y-1/2 rounded-full bg-amber-400/90 md:block" />
      <div className="pointer-events-none absolute -right-10 -top-20 h-56 w-56 rounded-full bg-fuchsia-700/70" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-2 md:py-32">
        <div>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">
            Diamo nuove forme <br className="hidden sm:block" />
            ai servizi e alla formazione <br className="hidden sm:block" />
            per gli enti
          </h1>
          <p className="mt-6 max-w-xl text-lg text-blue-100">
            Ideapubblica è ogni giorno al fianco degli enti locali e delle
            loro partecipate, per semplificare i processi burocratici su
            contabilità, controllo di gestione, privacy, anticorruzione,
            tributi e bilancio consolidato.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#servizi"
              className="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-blue-950 transition-transform hover:scale-105"
            >
              Scopri i servizi
            </a>
            <a
              href="#contatti"
              className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Contattaci
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

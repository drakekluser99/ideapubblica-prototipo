import type { NextConfig } from "next";

/*
  Header di sicurezza.

  Sono istruzioni che il server manda insieme a ogni pagina e che il browser
  applica per conto nostro. Costano zero, non si vedono, e chiudono in un
  colpo solo diverse categorie di attacco. Per un sito della pubblica
  amministrazione sono anche una voce che chi fa le verifiche va a guardare.

  Riga per riga:

  · Content-Security-Policy — dichiara da DOVE la pagina può caricare roba.
    È la difesa che rende un'iniezione di codice molto meno utile: anche
    riuscendo a infilare uno <script src="…"> di un altro dominio, il browser
    si rifiuta di scaricarlo.

    `script-src` include 'unsafe-inline', e va detto apertamente perché è il
    punto debole: Next mette nella pagina decine di <script> in linea (il
    payload dei Server Components, lo script del tema in layout.tsx). Toglierlo
    richiede un "nonce" diverso a ogni richiesta, quindi un middleware, quindi
    rinunciare alle pagine statiche servite da CDN. Per un sito vetrina non
    vale il cambio; se un domani ci sarà un'area con dati veri, quella è la
    prima cosa da rivedere. Il resto della policy resta comunque efficace.

    `frame-ancestors 'none'` impedisce che il sito venga messo dentro un
    iframe altrui: è la difesa contro il clickjacking, cioè la pagina finta
    sovrapposta alla nostra per far cliccare cose senza che l'utente lo sappia.

    `form-action 'self'` impedisce che un form della nostra pagina venga
    dirottato a spedire i dati altrove; `base-uri 'self'` impedisce che un
    <base> iniettato riscriva la destinazione di tutti i link relativi.

    `object-src 'none'` chiude plugin e <embed>, che oggi servono solo agli
    attacchi.

  · Referrer-Policy — quando si esce dal sito, l'indirizzo da cui si arriva
    non viene passato per intero al sito di destinazione.

  · X-Content-Type-Options: nosniff — vieta al browser di "indovinare" il tipo
    di un file: senza, un file di testo costruito ad arte può essere eseguito
    come JavaScript.

  · X-Frame-Options — la versione vecchia di `frame-ancestors`, per i browser
    che non leggono la CSP. Ridondante e innocua.

  · Permissions-Policy — dichiara che il sito non usa fotocamera, microfono e
    geolocalizzazione. Se un giorno del codice di terzi provasse a chiederle,
    il browser dice no prima ancora di mostrare il permesso all'utente.

  · Strict-Transport-Security — impone https per due anni. Su Vercel lo
    aggiunge già la piattaforma; dichiararlo qui vale se il sito finisce
    dietro un altro hosting.

  Nota per chi modifica: la CSP è una lista di permessi. Aggiungendo un
  servizio esterno (una mappa, un video incorporato, un tracker) va aggiunto
  anche qui, altrimenti non funziona e la ragione si vede solo in console.
*/
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://filodirettorup.ideapubblica.it",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Toglie l'header "X-Powered-By: Next.js": dire a chiunque con che cosa è
  // fatto il sito non serve a noi e fa risparmiare tempo a chi lo attacca.
  poweredByHeader: false,

  async headers() {
    // Una sola voce con `source: "/:path*"`: vale per ogni pagina e per ogni
    // file servito, comprese le risorse statiche.
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  images: {
    /*
      next/image ottimizza le immagini passandole per il server di Next.
      Per sicurezza rifiuta qualunque host non dichiarato qui: senza questa
      voce, le immagini in evidenza degli articoli del portale Filodiretto
      verrebbero bloccate con un errore in fase di render.

      Si dichiara l'host preciso, non un carattere jolly: aprire a "**"
      significa lasciare che chiunque usi il nostro server per ridimensionare
      le proprie immagini.
    */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "filodirettorup.ideapubblica.it",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;

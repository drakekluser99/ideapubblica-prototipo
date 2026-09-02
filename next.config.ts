import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

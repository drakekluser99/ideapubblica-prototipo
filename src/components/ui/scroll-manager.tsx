"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/*
  ScrollManager — decide dove si trova la pagina dopo ogni navigazione.

  --- Il problema che risolve -------------------------------------------------

  In una app Next (App Router) il cambio pagina NON ricarica il documento: il
  browser resta lo stesso, cambia solo l'albero React. Di conseguenza cambiare
  pagina non azzera lo scroll come farebbe un link tradizionale — deve pensarci
  il framework.

  Next ci prova, ma la sua euristica qui non scatta: prima di scorrere controlla
  se il primo nodo della pagina nuova è già visibile nel viewport, e se lo è non
  fa nulla. Il primo nodo che trova nel nostro documento è un elemento senza
  dimensioni (uno degli <script> che Next stesso inietta in cima al <body>).
  Un elemento invisibile ha un rettangolo tutto a zero, quindi `top: 0`, quindi
  "è in cima al viewport": il controllo passa e lo scroll non viene mai toccato.

  Effetto per chi naviga: si clicca una voce del menu stando a metà o in fondo
  alla home e si atterra sulla pagina nuova alla stessa altezza in pixel — che
  su una pagina più corta significa "in fondo". Verificato in produzione: da
  scrollY 3000 la pagina servizio si apriva a scrollY 2141, cioè il suo fondo.

  Non era un difetto del menu a tendina: succedeva con qualunque link interno.
  Per questo la correzione non sta nell'header ma qui, in un punto solo, montato
  nel layout: vale per il menu, per il footer, per i link dentro le pagine.

  --- Come funziona -----------------------------------------------------------

  Tre casi, tre comportamenti:

  1. URL senza àncora  → si torna in cima.
  2. URL con àncora    → si porta in vista quella sezione. Non calcoliamo noi
                         l'offset dell'header fisso: ci pensa `scroll-padding-top`
                         dichiarato su <html> in globals.css, che `scrollIntoView`
                         rispetta.
  3. Indietro/avanti   → non tocchiamo niente: la posizione salvata la ripristina
                         il browser, e sovrascriverla sarebbe un peggioramento.

  Sempre `behavior: "instant"`. Su <html> c'è `scroll-behavior: smooth`, ottimo
  per le àncore dentro la stessa schermata ma sbagliato qui: animare il salto
  significherebbe far scorrere sotto gli occhi una pagina che l'utente non ha
  ancora visto, e l'animazione verrebbe comunque interrotta dal render.
*/

const EVENTO_URL = "ip:navigazione";

/** Quanti fotogrammi aspettare al massimo che l'àncora compaia nel DOM. */
const TENTATIVI_MAX = 30;

/** Finestra dopo un indietro/avanti in cui lasciamo decidere il browser. */
const MS_DOPO_INDIETRO = 600;

let sondaInstallata = false;
let istanteIndietro = -Infinity;

/*
  Perché serve una "sonda" su history.

  `usePathname()` cambia solo quando cambia il percorso. Andare da
  /servizi#tributi a /servizi#personale lascia il percorso identico: React non
  ri-esegue nulla e la pagina resterebbe ferma. L'unico segnale sempre presente
  è la chiamata a `history.pushState` che il router fa a ogni navigazione, hash
  compreso — quindi la avvolgiamo per farle emettere un evento nostro.

  Avvolgere (non sostituire): teniamo il riferimento all'originale e lo
  richiamiamo. `bind(history)` fissa il `this`, altrimenti chiamandola da una
  variabile sciolta il browser solleva un "Illegal invocation".
*/
function installaSonda() {
  if (sondaInstallata || typeof window === "undefined") return;
  sondaInstallata = true;

  const pushOriginale = history.pushState.bind(history);
  const replaceOriginale = history.replaceState.bind(history);

  history.pushState = (...argomenti: Parameters<History["pushState"]>) => {
    pushOriginale(...argomenti);
    window.dispatchEvent(new Event(EVENTO_URL));
  };
  history.replaceState = (...argomenti: Parameters<History["replaceState"]>) => {
    replaceOriginale(...argomenti);
    window.dispatchEvent(new Event(EVENTO_URL));
  };

  window.addEventListener("popstate", () => {
    istanteIndietro = performance.now();
  });
}

function sistemaScroll(tentativo = 0) {
  if (performance.now() - istanteIndietro < MS_DOPO_INDIETRO) return;

  const ancora = decodeURIComponent(window.location.hash.slice(1));

  if (!ancora) {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    return;
  }

  const bersaglio = document.getElementById(ancora);
  if (bersaglio) {
    bersaglio.scrollIntoView({ behavior: "instant", block: "start" });
    return;
  }

  /*
    L'evento arriva DURANTE pushState, cioè prima che React abbia disegnato la
    pagina nuova: la sezione richiesta può non esistere ancora. Riproviamo al
    fotogramma dopo, con un tetto ai tentativi — se dopo mezzo secondo quella
    àncora ancora non c'è, semplicemente non esiste, e insistere sarebbe un
    ciclo infinito.
  */
  if (tentativo < TENTATIVI_MAX) {
    requestAnimationFrame(() => sistemaScroll(tentativo + 1));
  }
}

export default function ScrollManager() {
  const pathname = usePathname();
  const primoRender = useRef(true);

  useEffect(() => {
    installaSonda();

    const alCambioUrl = () => sistemaScroll();
    window.addEventListener(EVENTO_URL, alCambioUrl);

    // Al primo caricamento non interveniamo: l'àncora dell'URL e il ripristino
    // dopo un refresh a metà pagina sono già gestiti nativamente dal browser.
    if (primoRender.current) {
      primoRender.current = false;
    } else {
      sistemaScroll();
    }

    return () => window.removeEventListener(EVENTO_URL, alCambioUrl);
  }, [pathname]);

  return null;
}

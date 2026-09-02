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

/*
  Quanti fotogrammi aspettare al massimo che l'àncora compaia nel DOM.

  Erano 30 (mezzo secondo) e non bastavano per il caso più lento: arrivare a
  /#contatti da un'altra pagina. Lì la sezione non esiste finché Next non ha
  scaricato e disegnato la home, e su rete reale ci vuole di più. Scaduti i
  tentativi rinunciavamo, e subito dopo Next faceva il salto per conto suo —
  animato, cioè esattamente quello che stiamo evitando. Due secondi coprono
  la navigazione lenta senza rischiare un'attesa percepibile: se l'àncora non
  c'è, nel frattempo non è successo nulla di visibile.
*/
const TENTATIVI_MAX = 120;

/** Finestra dopo un indietro/avanti in cui lasciamo decidere il browser. */
const MS_DOPO_INDIETRO = 600;

/*
  Oltre questa distanza (in schermate) un salto non va animato.

  Il caso che ha fatto scoprire la cosa: dalla cima della home, "Contattaci"
  porta a #contatti, che sta a 7.300 px. Con `scroll-behavior: smooth` il
  browser ci arriva scorrendo, e in quel secondo scarso l'intera home passa
  davanti agli occhi: si legge come uno sfarfallio, o come una pagina che
  "sta caricando". Peggiora la sezione Reveal, perché lo scorrimento tocca
  tutte le sezioni per strada e le fa comparire tutte insieme dietro di noi.

  Due schermate è la soglia dove l'animazione smette di orientare e comincia
  a disorientare: sotto, aiuta a capire dove si è finiti; sopra, è solo
  velocità inutile.
*/
const SOGLIA_SCHERMATE = 2;

/** Quanto teniamo sospeso lo scorrimento animato dopo un click o una navigazione. */
const MS_SOSPENSIONE = 500;

let sondaInstallata = false;
let istanteIndietro = -Infinity;
let timerSospensione: ReturnType<typeof setTimeout> | undefined;

/*
  Sospende temporaneamente lo scorrimento animato.

  Non scorriamo noi al posto del browser: gli togliamo per mezzo secondo il
  `scroll-behavior: smooth`, e lui fa lo stesso salto senza animarlo. È la
  differenza fra spegnere un interruttore e riscrivere l'impianto — e vale
  anche per gli scorrimenti che NON facciamo noi, come quello che Next
  esegue per conto suo quando l'URL ha un'àncora.

  Ripristinare con stringa vuota (non "smooth") rimette in gioco il foglio di
  stile: così chi ha chiesto meno animazioni continua ad averne meno, senza
  che questo file debba saperlo.
*/
function sospendiScorrimentoAnimato() {
  if (typeof document === "undefined") return;
  document.documentElement.style.scrollBehavior = "auto";
  clearTimeout(timerSospensione);
  timerSospensione = setTimeout(() => {
    document.documentElement.style.scrollBehavior = "";
  }, MS_SOSPENSIONE);
}

/**
 * Distanza in pixel fra la posizione attuale e l'àncora indicata.
 * `null` se quell'elemento nella pagina non c'è.
 */
function distanzaDa(ancora: string): number | null {
  const el = document.getElementById(ancora);
  return el ? Math.abs(el.getBoundingClientRect().top) : null;
}

/*
  Click su un link che punta a un'àncora.

  Serve perché non tutti i salti passano da noi: un `<a href="#area">` come
  quelli dell'indice laterale di /servizi lo gestisce il browser da solo, e
  legge `scroll-behavior` nell'istante del click. Intervenendo qui, prima che
  il salto parta, la regola vale anche per quelli.

  Non chiamiamo `preventDefault`: il salto lo fa il browser come sempre, noi
  cambiamo solo come lo fa. Meno codice nostro nel percorso, meno cose che
  possono rompersi.

  Le esclusioni sono quelle d'obbligo per chiunque intercetti dei click:
  tasto non sinistro, tasti modificatori (ctrl/cmd = apri in un'altra scheda),
  link già gestito da qualcun altro, link che esce dal sito o che apre altrove.
*/
function alClick(e: MouseEvent) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
    return;
  }

  const bersaglio = e.target;
  if (!(bersaglio instanceof Element)) return;

  const link = bersaglio.closest("a[href]");
  if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;

  let url: URL;
  try {
    url = new URL(link.href, window.location.href);
  } catch {
    return;
  }
  if (url.origin !== window.location.origin || !url.hash) return;

  // Verso un'altra pagina la distanza non è calcolabile — e non serve:
  // l'atterraggio su una pagina nuova non va mai animato.
  const altraPagina = url.pathname !== window.location.pathname;
  const distanza = altraPagina ? Infinity : distanzaDa(decodeURIComponent(url.hash.slice(1)));

  if (distanza !== null && distanza > SOGLIA_SCHERMATE * window.innerHeight) {
    sospendiScorrimentoAnimato();
  }
}

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

  /*
    Una navigazione non si anima mai, qualunque sia la distanza: la pagina
    d'arrivo va mostrata, non sorvolata. Lo facciamo anche qui e non solo nel
    gestore del click, perché a una navigazione si può arrivare anche senza
    click (router.push da codice, un redirect), e perché lo scorrimento che
    conta potrebbe non essere il nostro: Next ne esegue uno suo poco dopo, e
    la sospensione vale anche per quello.
  */
  sospendiScorrimentoAnimato();

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
    // Rinnoviamo la sospensione a ogni tentativo: finché stiamo aspettando la
    // sezione, lo scorrimento animato deve restare spento. Altrimenti la
    // sospensione (mezzo secondo) scade prima dell'arrivo della pagina e
    // l'animazione che volevamo evitare parte lo stesso.
    sospendiScorrimentoAnimato();
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

    /*
      In fase di CATTURA (il `true` finale): l'evento passa da qui mentre
      scende verso il link, quindi prima di qualunque `onClick` di React e
      prima del comportamento predefinito del browser. Se aspettassimo la
      risalita, il salto sarebbe già partito animato.
    */
    document.addEventListener("click", alClick, true);

    // Al primo caricamento non interveniamo: l'àncora dell'URL e il ripristino
    // dopo un refresh a metà pagina sono già gestiti nativamente dal browser.
    if (primoRender.current) {
      primoRender.current = false;
    } else {
      sistemaScroll();
    }

    return () => {
      window.removeEventListener(EVENTO_URL, alCambioUrl);
      document.removeEventListener("click", alClick, true);
    };
  }, [pathname]);

  return null;
}

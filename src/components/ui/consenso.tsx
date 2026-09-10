"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { GoogleTagManager } from "@next/third-parties/google";

/*
  Consenso ai cookie e caricamento di Google Tag Manager.

  --- Perché GTM non si mette e basta -----------------------------------------

  In Italia gli strumenti di misurazione come Google Analytics richiedono il
  consenso preventivo (art. 122 del Codice privacy): non rientrano
  nell'esenzione per i cookie tecnici, perché GA tratta l'indirizzo IP
  completo, traccia tra siti diversi e condivide i dati con altri servizi
  Google. Il Garante chiede il **blocco preventivo**: gli script non vanno
  caricati e poi disattivati, vanno proprio non caricati finché il consenso
  non c'è. La verifica è banale — si aprono gli strumenti per sviluppatori e
  si guarda se, senza toccare il banner, parte una richiesta verso
  googletagmanager.com.

  Per un fornitore della pubblica amministrazione questo non è un dettaglio
  formale: è esattamente il genere di cosa che un ente controlla.

  Da qui la struttura di questo componente:

  · nessun ID configurato  → non si carica niente E non si mostra il banner.
    Chiedere il consenso per qualcosa che non esiste è solo un fastidio in
    più per chi visita. Oggi il sito è in questo stato.

  · ID configurato, scelta non ancora fatta → banner, e nessuno script.

  · ID configurato e consenso dato → si monta <GoogleTagManager>, che inietta
    il contenitore. Da quel momento i tag si gestiscono dall'interfaccia di
    GTM, senza toccare il codice: è tutto il senso di usare GTM invece di
    incollare gli script uno per uno.

  · rifiuto → non si carica niente e non si richiede più.

  --- Limite dichiarato -------------------------------------------------------

  Questo è un banner minimo: accetta / rifiuta / chiudi, una sola categoria
  (misurazione). Va bene finché l'unica cosa da autorizzare è l'analytics.
  Nel momento in cui entrano remarketing, mappe incorporate o video, servono
  categorie separate e un pulsante "Personalizza", e a quel punto conviene
  una piattaforma di gestione del consenso vera (Iubenda, CookieYes,
  MyAgilePrivacy) invece di far crescere questo file.

  La scelta sta in `localStorage`, che per la legge è assimilabile a un
  cookie tecnico: serve a ricordare una preferenza dell'utente, e per quello
  il consenso non serve. Stesso discorso per il tema chiaro/scuro.
*/

const CHIAVE = "ip-consenso-cookie";
const EVENTO = "ip:consenso";

/*
  L'ID del contenitore arriva da una variabile d'ambiente.

  Il prefisso `NEXT_PUBLIC_` è obbligatorio perché il valore serve nel
  browser: senza, Next lo tiene sul server e qui arriverebbe `undefined`.
  Non è un segreto — l'ID GTM è comunque visibile nel codice della pagina —
  ma resta una configurazione, quindi sta fuori dal codice: si cambia dal
  pannello di Vercel senza toccare il repository.

  La lettura è scritta per esteso e non con una variabile intermedia perché
  Next sostituisce `process.env.NEXT_PUBLIC_...` alla lettera in fase di
  compilazione: costruendo il nome al volo non troverebbe niente.
*/
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

type Scelta = "ignoto" | "accettato" | "rifiutato";

/*
  La scelta salvata è un "sistema esterno" a React, e per leggerla esiste un
  gancio fatto apposta: `useSyncExternalStore`.

  L'alternativa istintiva — leggere in un `useEffect` e chiamare `setState` —
  qui non va bene per due motivi. Il primo è la regola del progetto (vedi
  `Reveal` e `Counter`): aggiornare lo stato dentro un effetto scatena un
  secondo render a catena, e la regola `react-hooks/set-state-in-effect` lo
  segnala. Il secondo è l'idratazione: l'HTML lo genera il server, che
  `localStorage` non ce l'ha, quindi il primo disegno deve per forza essere
  uguale per tutti.

  `useSyncExternalStore` risolve entrambe le cose perché prende due lettori:
  uno per il server (`perIlServer`, che dice sempre "ignoto") e uno per il
  browser (`leggi`). React usa il primo per l'HTML e passa al secondo appena
  la pagina è viva, senza disallineamenti e senza render inutili.

  In più `sottoscrivi` ascolta anche l'evento `storage`, che il browser manda
  alle ALTRE schede aperte sullo stesso sito: accettando qui, un'altra
  scheda già aperta si accorge del cambiamento e fa sparire il suo banner.
*/
function leggi(): Scelta {
  try {
    const salvata = localStorage.getItem(CHIAVE);
    return salvata === "accettato" || salvata === "rifiutato" ? salvata : "ignoto";
  } catch {
    // localStorage lancia se i dati di sito sono bloccati. In quel caso
    // restiamo su "ignoto", cioè non carichiamo niente: il default sicuro.
    return "ignoto";
  }
}

function perIlServer(): Scelta {
  return "ignoto";
}

function sottoscrivi(avvisa: () => void) {
  window.addEventListener(EVENTO, avvisa);
  window.addEventListener("storage", avvisa);
  return () => {
    window.removeEventListener(EVENTO, avvisa);
    window.removeEventListener("storage", avvisa);
  };
}

function decidi(scelta: Exclude<Scelta, "ignoto">) {
  try {
    localStorage.setItem(CHIAVE, scelta);
  } catch {
    // Se non si può salvare, l'evento aggiorna comunque la pagina: la scelta
    // vale per questa visita. Meglio che bloccare tutto con un errore.
  }
  window.dispatchEvent(new Event(EVENTO));
}

export default function Consenso() {
  const scelta = useSyncExternalStore(sottoscrivi, leggi, perIlServer);

  if (!GTM_ID) return null;

  return (
    <>
      {scelta === "accettato" && <GoogleTagManager gtmId={GTM_ID} />}

      {scelta === "ignoto" && (
        /*
          `role="dialog"` con `aria-labelledby`: un lettore di schermo
          annuncia che è comparso un riquadro e ne legge il titolo. Non è
          `aria-modal`, e volutamente: il banner non blocca il resto della
          pagina, e dichiararlo modale sarebbe una bugia detta alla
          tecnologia assistiva.
        */
        <div
          role="dialog"
          aria-labelledby="consenso-titolo"
          className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
        >
          <div className="glass shell flex max-w-3xl flex-col gap-4 rounded-3xl border border-line p-6 shadow-xl sm:flex-row sm:items-center sm:gap-6">
            <div className="min-w-0 flex-1">
              <h2 id="consenso-titolo" className="text-sm font-semibold text-fg">
                Cookie di misurazione
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-soft">
                Vorremmo capire quali pagine sono utili, con strumenti di statistica che
                usano cookie. Senza il vostro consenso non ne attiviamo nessuno.{" "}
                <Link href="/cookie" className="underline underline-offset-2 hover:text-fg">
                  Dettagli
                </Link>
                .
              </p>
            </div>

            {/*
              Tre azioni con lo stesso peso visivo. Rendere "Accetta" grande e
              colorato e "Rifiuta" un link grigio è un dark pattern, ed è
              espressamente escluso dalle indicazioni del Garante: le opzioni
              devono essere ugualmente visibili e leggibili.
            */}
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => decidi("rifiutato")}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-fg/5"
              >
                Rifiuta
              </button>
              <button
                type="button"
                onClick={() => decidi("accettato")}
                className="rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-fg/5"
              >
                Accetta
              </button>
              {/*
                La "X" chiude SENZA acconsentire: fa esattamente quello che fa
                "Rifiuta". Averle entrambe non è una svista — le indicazioni
                del Garante chiedono che il riquadro si possa chiudere, e che
                chiuderlo non valga come consenso. Chi cerca il pulsante lo
                trova, chi cerca la crocetta pure, e il risultato è lo stesso.
              */}
              <button
                type="button"
                onClick={() => decidi("rifiutato")}
                aria-label="Chiudi senza acconsentire"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-soft transition-colors hover:bg-fg/5 hover:text-fg"
              >
                <span aria-hidden>✕</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

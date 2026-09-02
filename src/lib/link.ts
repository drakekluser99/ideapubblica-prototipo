/*
  Un link è "esterno" se punta a un altro sito.

  Serve in due punti (menu dell'header e navigazione del footer) che leggono
  la stessa lista `nav`: da quando la voce Filodiretto porta al portale in
  abbonamento, quella lista mescola percorsi interni e URL assoluti, e i due
  casi vanno resi in modo diverso.

  Il controllo è sul prefisso "http" e non su una libreria di parsing perché
  gli href del sito li scriviamo noi in content.ts: o cominciano con "/",
  oppure sono URL assoluti. Non arrivano mai da input dell'utente, quindi non
  c'è una stringa ostile da normalizzare.

  Perché la distinzione conta:

  · <Link> di Next serve per la navigazione interna, che non ricarica la
    pagina. Su un URL esterno non ha niente da precaricare e il vantaggio
    sparisce: meglio una <a> normale.

  · target="_blank" senza `rel` lascia alla pagina aperta un riferimento
    (window.opener) alla nostra: da lì potrebbe cambiarci l'indirizzo sotto
    i piedi. `noopener` lo recide, `noreferrer` toglie anche il Referer.
    I browser recenti implicano noopener, ma scriverli entrambi resta la
    forma corretta e vale anche sui vecchi.

  · Chi usa un lettore di schermo non vede che si è aperta una scheda nuova:
    l'avviso testuale nascosto glielo dice (vedi `AVVISO_NUOVA_SCHEDA`).
*/

export function esterno(href: string): boolean {
  return href.startsWith("http");
}

export const AVVISO_NUOVA_SCHEDA = "(si apre in una nuova scheda)";

/*
  Lettura degli ultimi articoli dal portale FilodirettoRUP.

  Perché sta in `lib/` e non in `data/`: la regola del progetto è che
  `data/content.ts` contenga SOLO stringhe e oggetti letterali. Questo file
  invece esegue una chiamata di rete, quindi è codice, non dati.

  --- Cosa esce e cosa non esce dal portale --------------------------------

  Il portale è WordPress protetto da MemberPress. La sua API REST è pubblica,
  ma il plugin filtra il CORPO degli articoli: chiedendo il contenuto si
  riceve letteralmente "<p>You are unauthorized to view this page.</p>".

  Titolo, data, link e immagine invece escono normalmente — sono gli stessi
  dati che il portale mostra già in home a chiunque.

  È una garanzia comoda: non dobbiamo replicare noi il paywall, perché il
  contenuto riservato non lascia mai il server di WordPress. Anche volendo,
  da qui non potremmo pubblicarlo.
*/

export type NewsFilodiretto = {
  id: number;
  titolo: string;
  data: string; // ISO, es. "2026-08-31T10:26:22"
  link: string;
  immagine: string | null;
};

const ORIGINE_PORTALE = "https://filodirettorup.ideapubblica.it";
const BASE = `${ORIGINE_PORTALE}/wp-json/wp/v2`;

/*
  Il link di ogni articolo arriva da WordPress e finisce dritto in un `href`.
  Finché il portale è integro non c'è problema, ma è un sito che non
  controlliamo: se un giorno venisse manomesso, un `link` fatto di
  "javascript:…" o "data:…" diventerebbe codice eseguito dentro il NOSTRO
  dominio nel momento in cui qualcuno ci clicca sopra.

  React di suo blocca gli href "javascript:", ma non è una difesa su cui
  appoggiarsi: la regola giusta è non fidarsi del dato che arriva da fuori.
  Qui accettiamo solo URL assoluti che stanno davvero sul portale — schema
  https e stesso host. Tutto il resto viene scartato e l'articolo non esce.

  `new URL` lancia su una stringa che non è un URL: da qui il try/catch.
*/
function linkAmmesso(link: unknown): link is string {
  if (typeof link !== "string") return false;
  try {
    const u = new URL(link);
    return u.protocol === "https:" && u.origin === ORIGINE_PORTALE;
  } catch {
    return false;
  }
}

/*
  WordPress restituisce i titoli con le entità HTML già codificate
  ("L&#8217;affidamento", "Appalti &amp; contratti"). Stampate così si
  vedrebbero a schermo, quindi vanno riconvertite.

  In React NON si può risolvere con dangerouslySetInnerHTML: sarebbe iniettare
  HTML di terze parti nella nostra pagina. Decodifichiamo solo le entità che
  servono e restituiamo testo puro, che React stampa in sicurezza.
*/
function decodificaEntita(testo: string): string {
  const nominali: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&nbsp;": " ",
    "&hellip;": "…",
    "&egrave;": "è",
    "&agrave;": "à",
    "&ugrave;": "ù",
    "&ograve;": "ò",
    "&igrave;": "ì",
  };

  return testo
    .replace(/&[a-zA-Z]+;/g, (e) => nominali[e] ?? e)
    // Entità numeriche: &#8217; (decimale) e &#x2019; (esadecimale).
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

export async function ultimeNews(quante = 3): Promise<NewsFilodiretto[]> {
  try {
    const url =
      `${BASE}/posts?per_page=${quante}` +
      // `_embed` chiede a WordPress di allegare l'immagine in evidenza nella
      // stessa risposta: senza, servirebbe una seconda chiamata per ogni post.
      `&_embed=wp:featuredmedia` +
      // `_fields` limita la risposta ai campi che usiamo davvero.
      `&_fields=id,date,link,title,_links,_embedded`;

    const risposta = await fetch(url, {
      /*
        ISR (Incremental Static Regeneration).

        Next salva il risultato e lo riusa per un'ora; alla prima richiesta
        successiva lo rinfresca in sottofondo, servendo intanto la copia
        vecchia. Due conseguenze:
          · il visitatore non aspetta mai WordPress;
          · WordPress riceve ~1 chiamata l'ora, non una per visita.

        Un'ora è un compromesso: più lungo farebbe sembrare il servizio fermo.
      */
      next: { revalidate: 3600 },
    });

    // Un 404 o un 500 non sono un'eccezione: fetch non lancia per gli
    // stati HTTP, quindi lo stato va controllato a mano.
    if (!risposta.ok) return [];

    const dati: unknown = await risposta.json();
    if (!Array.isArray(dati)) return [];

    return dati
      .map((post: Record<string, never>) => {
        const p = post as unknown as {
          id: number;
          date: string;
          link: string;
          title: { rendered: string };
          _embedded?: { "wp:featuredmedia"?: Array<{ source_url?: string }> };
        };

        // Un articolo senza link utilizzabile non lo mostriamo: meglio due
        // news invece di tre che un link su cui non ci fidiamo.
        if (!linkAmmesso(p.link)) return null;

        const immagine = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? null;

        return {
          id: p.id,
          titolo: decodificaEntita(p.title?.rendered ?? ""),
          data: p.date,
          link: p.link,
          // Stessa logica per l'immagine. `remotePatterns` in next.config.ts
          // già rifiuta gli host non dichiarati, ma lì l'esito è un errore in
          // fase di render: qui la scartiamo prima e la card resta senza foto.
          immagine: linkAmmesso(immagine) ? immagine : null,
        };
      })
      .filter((n): n is NewsFilodiretto => n !== null);
  } catch {
    /*
      Portale irraggiungibile, lento o in manutenzione.

      Il nostro sito NON deve cadere dietro a un sito che non controlliamo:
      restituiamo una lista vuota e chi ci chiama nasconde la sottosezione.
      Un errore qui è un caso previsto, non un guasto.
    */
    return [];
  }
}

// Formatta la data ISO di WordPress in italiano ("31 agosto 2026").
export function dataInItaliano(iso: string): string {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

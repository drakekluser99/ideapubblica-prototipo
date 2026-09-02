# CLAUDE.md — istruzioni di progetto

Prototipo del nuovo sito **Ideapubblica**. Questo file è la prima cosa da leggere prima di toccare il codice.

---

## 1. Come si lavora qui

**Ogni intervento sul codice va spiegato.** Yuri sta imparando lo sviluppo web moderno: vuole sapere *cosa* si sta facendo, *perché* quella soluzione e non un'altra, e quali sono le trappole. Le spiegazioni valgono quanto il codice, non sono un extra da tagliare per brevità.

Stessa logica nei commenti dei file: spiegano il **perché**, mai il *cosa*. Un commento che ripete la riga sotto è rumore; uno che dice perché quella riga esiste è documentazione.

**Yuri non lavora per Ideapubblica.** Non c'è un canale diretto con il cliente. Tutto ciò che è marcato "da chiedere al cliente" è un suggerimento da girare a chi ha il rapporto, non un compito eseguibile. Di conseguenza:

- i contenuti si ricavano dalle fonti pubbliche (sito attuale, portale) e si riformulano;
- non si inventano dati mancanti — i prezzi dei piani Filodiretto restano fuori finché non arrivano;
- ciò che è da validare va **dichiarato in pagina**, non lasciato implicito.

**Prima di ogni push:** `npm run build` deve passare e `npx eslint .` deve essere pulito.

---

## 2. Coordinate

| | |
|---|---|
| Repo | `github.com/drakekluser99/ideapubblica-prototipo` |
| Deploy | `https://ideapubblica-prototipo.vercel.app/` — collegato a `main`, deploy automatico a ogni push |
| Locale | `C:\Users\ammin\Desktop\ideapubblica-prototipo` |
| Riferimenti | `https://ideapubblica.it` · `https://filodirettorup.ideapubblica.it` |
| Stack | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 |

```powershell
npm run dev            # sviluppo — riavviare quando si aggiungono ROTTE o file di dati
npm run build          # la stessa build che farà Vercel
npx eslint .
git add . ; git commit -m "..." ; git push    # il push fa partire il deploy
```

Gli avvisi `LF will be replaced by CRLF` sono normali su Windows.

Per verificare se l'online è aggiornato non guardare la pagina: confronta `git log --oneline -1` con `git log --oneline -1 origin/main`. Un fetch testuale della pagina scarta i `<button>`, e fa sembrare assenti elementi che ci sono.

---

## 3. Struttura

```
src/
  app/
    globals.css              design system: token, temi, utility, animazioni
    layout.tsx               metadata + script inline (classe "js", tema salvato)
    page.tsx                 home: composizione delle sezioni
    servizi/page.tsx         indice dei servizi per area
    servizi/[slug]/page.tsx  pagina di un servizio (rotta dinamica)
  data/
    content.ts               testi del sito
    services.ts              catalogo servizi: 6 categorie, 29 voci
  lib/
    filodiretto.ts           lettura API WordPress del portale
  components/
    Header Hero Clients Pillars Services SoftwareShowcase
    Webinars Filodiretto Testimonials ContactCTA Footer
    ui/  shiny-button reveal counter marquee section-heading logo
         network-visual social-icons theme-toggle tints
         page-hero service-request
```

**Regola architetturale: i dati sono dati puri.** `content.ts` e `services.ts` non importano componenti né colori — contengono chiavi (`icon: "network"`, `tint: "viola"`) che i componenti traducono. Il codice che fa chiamate di rete sta in `lib/`, non in `data/`.

Nella radice c'è anche `HANDOFF.md`, versione più discorsiva di questo documento. Se si aggiorna uno, aggiornare l'altro o eliminare il ridondante.

---

## 4. Design system

Tutto in `src/app/globals.css`, a blocchi numerati.

**Token semantici, non letterali.** Mai `bg-ink-950` o `text-white`: si usa `bg-surface`, `text-fg`, `border-line`, `text-accent`. Il nome dice il *ruolo*, e resta vero in entrambi i temi.

```css
@theme inline { --color-surface: var(--surface); }
:root                     { --surface: #05070f; }
:root[data-theme="light"] { --surface: #ffffff; }
```

`@theme inline` fa generare a Tailwind `var(--surface)` invece del valore: cambiando l'attributo su `<html>` cambia tutto il sito senza rigenerare CSS.

**Token:** `surface` `surface-2` `card` `line` `line-strong` `fg` `fg-soft` `fg-faint` `accent` `accent-soft` `accent-ink` `positive` `focus-ring` · `band-*` (fascia invertita) · `tinta-*` · `logo-*` · `glow-a/b` `grid-line` `card-shadow` `gradient-text` `cta-*`.

**Utility:** `shell` `display` `eyebrow` `glass` `grid-bg` `glow-a` `glow-b` `text-gradient` `salta-al-contenuto` `tinta-blu|ambra|verde|viola|corallo` `tinta-testo|fondo|bordo|alone`.

**Temi.** Scuro predefinito (`#05070f`), chiaro completo. Selettore nell'header, scelta in `localStorage`, riapplicata da script inline prima del primo disegno.

**Tinte di categoria**, campionate dal sito storico: blu `#005FA8`, ambra `#F7A823`, verde acqua `#00A99D`, viola `#4F005E`, malva `#CD8FBE`, corallo `#FD5E5A`. Ogni tinta ha due versioni (fondo scuro / fondo chiaro).

**Tipografia.** Instrument Sans + Inter, auto-ospitati con `@fontsource-variable`. Niente `next/font/google`: il sito pubblicato non fa richieste ai server Google — non secondario per un cliente PA.

---

## 5. Trappole già incontrate — non ripeterle

1. **`<style jsx>` non arriva nell'HTML del server.** Il CSS dei bottoni sta in `globals.css`.
2. **`opacity: 0` nel markup nasconde il contenuto a chi non esegue JS.** Le apparizioni allo scroll partono invisibili solo sotto `html.js`.
3. **`setState` dentro `useEffect` è un anti-pattern.** `Reveal` scrive `data-shown` sul nodo, `Counter` scrive `textContent`.
4. **Tailwind non compila classi costruite al volo.** `tinta-${x}` non funziona: serve la mappa in `ui/tints.ts` con le stringhe per esteso.
5. **Due `<linearGradient>` con lo stesso `id`** sono HTML non valido: `Logo` accetta `gradientId`.
6. **Il marchio si dimensiona sulla larghezza**, non sull'altezza.
7. **Lucide non ha più le icone di marchio**: i social sono SVG inline.
8. **Il selettore di tema non ha stato React**: con `useState` ci sarebbe hydration mismatch.
9. **`npm run dev` non ha niente a che vedere col deploy.** Vercel guarda `main` su GitHub.
10. **Un host esterno per le immagini va dichiarato** in `next.config.ts` → `images.remotePatterns`, con hostname preciso, mai un jolly.
11. **WordPress restituisce entità HTML** (`&#8217;`): vanno decodificate a testo puro, mai risolte con `dangerouslySetInnerHTML`.
12. **`scroll-mt` sugli elementi ancorati.** L'header è `fixed`: senza, saltando a un'àncora il titolo finisce nascosto sotto la barra. Sembra un'àncora sbagliata, è solo coperta.
13. **`overflow-hidden` sui pannelli animati va SEMPRE, non solo da chiusi.** Con `overflow: visible` da aperto, il contenuto più alto di `max-h` non viene ritagliato ma trabocca sopra la pagina senza sfondo dietro. È successo al menu a tendina.
14. **`grid-cols-N` con colonne di lunghezza molto diversa lascia buchi**: ogni riga è alta quanto la colonna più lunga. Per elenchi di lunghezza disomogenea usare `columns-N` + `break-inside-avoid`, che bilancia.
15. **`<Link>` invece di `<a>` per la navigazione interna.** `<a>` ricostruisce l'intera pagina; `<Link>` sostituisce solo ciò che cambia e precarica la rotta. I link esterni restano `<a>`.
16. **Gli href della nav sono assoluti** (`/#formazione`, non `#formazione`): un'àncora nuda su una pagina interna cerca una sezione che lì non esiste.
17. **L'attributo `download` non funziona su file di altri domini** e viene ignorato in silenzio: per un PDF esterno si apre in nuova scheda e lo si dichiara.

---

## 6. Servizi — come è fatto il catalogo

`src/data/services.ts` ha due livelli: **6 categorie** e **29 servizi**.

Il meccanismo centrale è il campo opzionale `dettaglio`:

- voce **con** `dettaglio` → esiste `/servizi/<slug>`, generata da `generateStaticParams`;
- voce **senza** → nel menu e nell'indice rimanda a `/servizi#<categoria>`.

Lo decide `linkServizio()` in `services.ts`, non i componenti: nessun `if` sparso nel JSX, e quando una voce acquista un dettaglio il link cambia da solo.

Il motivo: 29 pagine di contenuto non si scrivono in una volta, e **pubblicare pagine vuote è peggio che non pubblicarle**. Il sito mostra l'offerta completa da subito ma promette una pagina solo dove c'è qualcosa da leggere.

**Per aggiungere un servizio basta aggiungere un `dettaglio`.** Nessun file da creare, nessuna rotta da registrare.

Schema del dettaglio: `claim`, `inquadramento`, `blocchi[]`, `destinatari[]`, `risultati[]`, `riferimenti`, `pdf`.

Rispetto al sito attuale le pagine aggiungono **"A chi serve"**, **"Cosa resta all'ente"** e i **riferimenti normativi espliciti**; il form è contestuale (campo nascosto `servizio`) e ha un honeypot antispam.

**Stato:** hanno il dettaglio le 6 voci di *Contabilità, programmazione e controllo*. Ne restano 23.

I PDF sono le locandine ospitate sul sito attuale: link esterni, finché non vengono spostati.

---

## 7. Filodiretto — integrazione in sola vetrina

Il portale `filodirettorup.ideapubblica.it` resta su WordPress. Questo sito ne è la vetrina:

- `src/lib/filodiretto.ts` legge `wp-json/wp/v2/posts` **lato server**, con ISR a un'ora;
- escono titolo, data, link, immagine; **il corpo no** — MemberPress lo filtra e restituisce `You are unauthorized to view this page`. Il paywall quindi non va replicato: il contenuto riservato non lascia mai il server WordPress;
- se la chiamata fallisce, `ultimeNews` restituisce `[]` e la sottofascia si nasconde. Il nostro sito non deve cadere dietro a un sito che non controlliamo;
- le sessioni **non** sono condivise tra i due domini, ed è voluto: sottodomini distinti, cookie distinti. Il link "Area riservata" è tutta l'integrazione di autenticazione necessaria.

---

## 8. Cosa manca

1. **23 pagine servizio** da scrivere (estrarre da `ideapubblica.it/servizio/<slug>/` e riscrivere).
2. **Pagine Formazione, Software, Contatti** — riusano `ui/page-hero.tsx`.
3. **Invio dei form**: `app/api/contatti/route.ts` + provider email. I campi hanno già `name` e `autoComplete` corretti, l'honeypot è già in pagina. Servono `required`, `aria-invalid`, `aria-describedby` e messaggi di errore (WCAG 3.3.1, 3.3.3).
4. **Loghi clienti**: oggi etichette testuali. Servono marchi reali e liberatorie.
5. **Testimonianze e numeri dell'hero**: riformulati/stimati, da validare.
6. **Tema ufficiale**: scuro, chiaro, o selettore all'utente.
7. Test con lettore di schermo reale — l'analisi automatica copre circa il 30% dei problemi.

**Da girare al cliente:** prezzi dei piani Filodiretto; conferma della collocazione dei cinque servizi assenti dal menu attuale (bilancio di previsione, check-up finanziario, opere pubbliche/BDAP, allineamento PCC, service contabile); far categorizzare gli articoli del Filodiretto, oggi tutti in "Senza categoria"; valutare se lasciare pubblici gli articoli più vecchi per il posizionamento.

---

## 9. Accessibilità — livello raggiunto

WCAG 2.1 AA, verificato su entrambi i temi con misurazione reale dei contrasti.

Corretto: `--fg-faint` portato a 5,34:1 / 5,14:1; numerazione servizi a 3,19:1; link "salta al contenuto"; anello `:focus-visible` 2px tematizzato; `inert` sul menu mobile chiuso; target a 44px.

Da mantenere in ogni aggiunta: un solo `h1` per pagina (nelle pagine interne lo dà `PageHero`, le sezioni partono da `h2`); ogni `nav` con `aria-label` distinto; ogni campo con `<label>` collegata; icone decorative `aria-hidden`; link esterni con `<span class="sr-only">(si apre in una nuova scheda)</span>`; `prefers-reduced-motion` rispettato.

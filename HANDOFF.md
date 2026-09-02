# Ideapubblica — prototipo homepage · stato al 2 settembre 2026

Documento di passaggio di consegne. Chi apre una nuova sessione dovrebbe leggere questo file e `claude/direzione-grafica.md` (nel progetto Claude) prima di toccare il codice.

---

## 1. Coordinate

| | |
|---|---|
| Repo | `github.com/drakekluser99/ideapubblica-prototipo` (account personale `drakekluser99`) |
| Deploy | `https://ideapubblica-prototipo.vercel.app/` — collegato a `main`, deploy automatico a ogni push |
| Cartella locale | `C:\Users\ammin\Desktop\ideapubblica-prototipo` |
| Sito di riferimento | `https://ideapubblica.it` |
| Stack | Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS 4 |

**Attenzione:** l'ultima versione online è indietro rispetto al codice locale. Sul PC ci sono modifiche non ancora committate (tema chiaro/scuro, tinte di categoria, correzioni di accessibilità). Primo comando da dare:

```powershell
cd $HOME\Desktop\ideapubblica-prototipo
npm install
npm run dev          # verifica
git add .
git commit -m "Tema chiaro/scuro, tinte di categoria, correzioni accessibilità"
git push             # Vercel ridispiega da solo
```

---

## 2. Preferenza di lavoro dell'utente

Yuri sta imparando lo sviluppo web moderno. **Vuole che ogni intervento sul codice sia spiegato**: cosa si sta facendo, perché quella soluzione e non un'altra, quali sono le trappole. Le spiegazioni valgono quanto il codice — non sono un extra da tagliare per brevità. I commenti nei file seguono la stessa logica: spiegano il *perché*, non il *cosa*.

---

## 3. Struttura del codice

```
src/
  app/
    globals.css      ← design system completo: token, temi, utility, animazioni
    layout.tsx       ← metadata + script inline (classe "js" e tema salvato)
    page.tsx         ← composizione delle sezioni + skip link
    icon.png         ← favicon generata dal simbolo del logo
  data/
    content.ts       ← TUTTI i testi e i dati, separati dai componenti
  components/
    Header Hero Clients Pillars Services SoftwareShowcase
    Webinars Testimonials ContactCTA Footer
    ui/
      shiny-button  reveal  counter  marquee  section-heading
      logo  network-visual  social-icons  theme-toggle  tints
```

Regola architetturale: **i dati sono stringhe pure**. `content.ts` non importa componenti né colori — contiene chiavi (`icon: "network"`, `tint: "viola"`) che i componenti traducono. Serve a poter collegare un CMS domani senza toccare i dati.

Ordine sezioni: Header → Hero → Clienti (marquee) → Pilastri (bento) → Servizi (fascia invertita) → Software (bento asimmetrico) → Formazione → Testimonial → Contatti → Footer.

---

## 4. Design system

Tutto in `src/app/globals.css`, diviso in blocchi numerati.

**Token semantici, non letterali.** I componenti non usano mai `bg-ink-950` o `text-white` ma `bg-surface`, `text-fg`, `border-line`, `text-accent`. Il nome dice il *ruolo*, non il colore, e resta vero in entrambi i temi.

```css
@theme inline { --color-surface: var(--surface); }
:root                     { --surface: #05070f; }
:root[data-theme="light"] { --surface: #ffffff; }
```

`@theme inline` fa generare a Tailwind `var(--surface)` invece del valore letterale: cambiando l'attributo su `<html>` cambia tutto il sito senza rigenerare CSS.

**Famiglie di token:** `surface` `surface-2` `card` `line` `line-strong` `fg` `fg-soft` `fg-faint` `accent` `accent-soft` `accent-ink` `positive` `focus-ring` · `band-*` per la fascia invertita · `tinta-*` per le tinte di categoria · `logo-*` per il marchio · `glow-a/b`, `grid-line`, `card-shadow`, `gradient-text`, `cta-*`.

**Utility di progetto:** `shell` `display` `eyebrow` `glass` `grid-bg` `glow-a` `glow-b` `text-gradient` `salta-al-contenuto` `tinta-blu|ambra|verde|viola|corallo` `tinta-testo|fondo|bordo|alone`.

**Due temi.** Scuro predefinito (blu notte `#05070f`), chiaro completo (bianco). Selettore nell'header, scelta salvata in `localStorage`, riapplicata da uno script inline prima del primo disegno.

**Fascia invertita.** Una sezione (Servizi) è sempre al registro opposto: chiara nel sito scuro, scura nel sito chiaro. La classe `.fascia-invertita` ribalta anche le tinte.

**Tinte di categoria.** Ricavate campionando i colori reali di ideapubblica.it: blu `#005FA8`, ambra `#F7A823`, verde acqua `#00A99D`, viola `#4F005E`, malva `#CD8FBE`, corallo `#FD5E5A`. Ogni tinta esiste in due versioni (fondo scuro / fondo chiaro) perché il viola sparisce sullo scuro e l'ambra non ha contrasto sul bianco. Uso: Servizi=blu, Formazione=ambra, Software=verde; nei servizi Contabilità=blu, Tributi=ambra, Conformità=viola, Programmazione=verde; ogni applicativo ha la sua.

**Tipografia.** Instrument Sans (titoli) + Inter (testo), auto-ospitati con `@fontsource-variable`. Niente `next/font/google`: la build funziona anche senza rete verso Google e il sito pubblicato non fa richieste ai server Google (rilevante per un cliente PA).

**Logo.** File ufficiale ottimizzato con SVGO e diviso in quattro tracciati (simbolo, "idea", "pubblica", payoff) per colorarli separatamente. `ui/logo.tsx` prende i colori dalle variabili `--logo-*`, che seguono il tema: colori ufficiali sul chiaro, versione negativa sullo scuro. Restano `tone="brand"` / `tone="onDark"` per usi fissi.

---

## 5. Decisioni tecniche e trappole già incontrate

Da non ripetere:

1. **`<style jsx>` non arriva nell'HTML del server.** styled-jsx inietta le regole solo all'idratazione: il CTA appariva come testo nudo al primo disegno. Il CSS del bottone sta in `globals.css`, e `ShinyButton` è tornato un Server Component.
2. **`opacity: 0` nel markup nasconde il contenuto a chi non esegue JS.** Le sezioni con apparizione allo scroll partono invisibili solo sotto `html.js`, classe messa da uno script inline sincrono. Senza JavaScript la pagina è comunque leggibile.
3. **`setState` dentro `useEffect` è un anti-pattern** (`react-hooks/set-state-in-effect`). `Reveal` scrive un attributo `data-shown` sul nodo, `Counter` scrive `textContent`. Nessun render inutile.
4. **Tailwind non compila classi costruite al volo.** `lg:col-span-${n}` e `tinta-${x}` non funzionano: servono mappe con le stringhe scritte per intero (`ui/tints.ts`).
5. **Due `<linearGradient>` con lo stesso `id`** nella stessa pagina sono HTML non valido: `Logo` accetta `gradientId`.
6. **Il marchio si dimensiona sulla larghezza**, non sull'altezza: il simbolo è molto più alto della parola.
7. **Lucide non ha più le icone di marchio** (rimosse per trademark): Facebook/LinkedIn/YouTube sono SVG inline in `ui/social-icons.tsx`.
8. **Il selettore di tema non ha stato React**: ribalta `data-theme` e il CSS decide l'icona. Con `useState` ci sarebbe hydration mismatch, perché il server non può sapere il tema scelto.

---

## 6. Audit di accessibilità (WCAG 2.1 AA)

Eseguito su entrambi i temi, con misurazione reale dei rapporti di contrasto (compositing alpha via canvas, non stima).

### Corretto in questa sessione

| Criterio | Problema | Correzione |
|---|---|---|
| 1.4.3 Contrasto | `--fg-faint` a 3,97:1 (scuro) e 2,82:1 (chiaro) — usato in note, riga legale, etichette footer | Portato a `#7684a0` / `#646e80` → 5,34:1 e 5,14:1 |
| 1.4.3 Contrasto | Numerazione servizi a 1,8:1 | Opacità da 25% a 45% → 3,19:1 e 4,5:1 (min 3:1 per testo grande) |
| 2.4.1 Salto blocchi | Nessun link "salta al contenuto" | Aggiunto, visibile solo al focus da tastiera |
| 2.4.7 Focus visibile | Anello predefinito di Chrome quasi nero sul fondo scuro; larghezza 0 su alcuni link; `outline-none` sui campi del form | Anello esplicito `:focus-visible` 2px con colore tematizzato (`--focus-ring`), rimosso `outline-none` |
| 2.4.3 Ordine di focus | Con menu mobile **chiuso**, 6 link restavano nell'ordine di tabulazione su elementi invisibili | Attributo `inert` sul pannello quando chiuso |
| 2.5.8 Target (WCAG 2.2) | Link nav 36px, bottoni icona 40px, checkbox 16px, link footer 17px | Nav 44px, bottoni 44px, checkbox 20px, link footer con padding |

### Verificato conforme

Struttura dei titoli corretta (un solo `h1`, gerarchia `h2`/`h3` regolare) · landmark `header`/`main`/`footer` e tre `nav` con `aria-label` distinti · nessuna `img` senza `alt`, nessun `svg` senza nome accessibile · label collegate a tutti i campi con `htmlFor`/`id` · link con sola icona muniti di `aria-label` · `lang="it"` · copia duplicata del marquee in `aria-hidden` · `prefers-reduced-motion` rispettato ovunque · zoom 200%: nessuno scorrimento orizzontale · tutti i testi misurati ≥ 4,5:1 in entrambi i temi dopo le correzioni.

### Rimasto aperto (non bloccante per un prototipo)

- Il form non ha validazione né gestione errori: quando lo si collegherà servono `required`, `aria-invalid`, `aria-describedby` e messaggi di errore testuali (3.3.1, 3.3.3).
- Test con lettore di schermo reale (NVDA/VoiceOver) non eseguito: l'analisi automatica copre circa il 30% dei problemi.
- I titoli `h3` del footer non hanno un `h2` che li precede nel loro landmark (minore).

---

## 7. Punti aperti sul contenuto e sul progetto

1. **Decidere il tema ufficiale** — scuro, chiaro, o lasciare il selettore all'utente.
2. **Loghi clienti**: oggi sono etichette testuali con icona neutra. Servono i marchi reali e le liberatorie.
3. **Testimonianze**: riformulate dal sito attuale, da far approvare al cliente. In pagina c'è già una nota che lo dichiara.
4. **Numeri dell'hero** (10+ anni, 300+ enti, 6 aree): stime prudenti, da validare.
5. **Versione negativa del logo**: è una proposta nostra, da far validare.
6. **Form contatti**: solo interfaccia. Prossimo passo `app/api/contatti/route.ts` + provider email (es. Resend), con honeypot e rate limit.
7. **Pagine interne** (Servizi, Formazione, Software, Contatti) quando si passa dal prototipo al sito completo.
8. **Webinar**: lista statica in `content.ts`, da collegare a un calendario o CMS.

---

## 8. Comandi utili

```powershell
npm run dev            # sviluppo su localhost:3000
npm run build          # build di produzione — deve passare prima del push
npx eslint .           # lint — deve essere pulito
git add . ; git commit -m "..." ; git push    # il push fa partire il deploy
```

Gli avvisi `LF will be replaced by CRLF` sono normali su Windows e innocui.

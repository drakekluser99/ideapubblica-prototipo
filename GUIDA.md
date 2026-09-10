# Guida al sito — da WordPress a GitHub + Vercel

Questa guida è per chi il sito lo usa e lo governa, non per chi scrive il codice. Spiega come funziona il nuovo sito, che cosa cambia rispetto a WordPress, che cosa si può fare da soli e che cosa richiede uno sviluppatore.

Non serve saper programmare per leggerla. Dove serve un comando o un file, è indicato, ma il senso si capisce comunque.

---

## 1. La differenza che spiega tutte le altre

Su WordPress il sito **è** il server. Si entra in `/wp-admin`, si modifica una pagina, si salva, e nello stesso istante il sito online è cambiato. Il contenuto vive in un database, e il sito lo va a leggere ogni volta che qualcuno apre una pagina.

Qui funziona al contrario. Il sito è un insieme di **file di testo** conservati in un archivio su GitHub. Quando quei file cambiano, un servizio (Vercel) li prende, ne ricava le pagine già pronte — vere e proprie pagine HTML, calcolate una volta sola — e le distribuisce in tutto il mondo. Quando qualcuno visita il sito non c'è nessun database da interrogare e nessun programma da eseguire: la pagina è già lì, finita.

Da questa singola differenza discende quasi tutto il resto:

| | WordPress | Questo sito |
|---|---|---|
| Dove sta il contenuto | in un database | in file di testo versionati |
| Come si modifica | dal pannello, in diretta | si modifica il file, si pubblica |
| Quando è online | subito | dopo 1–2 minuti di pubblicazione |
| Chi può modificare | chi ha un account redattore | chi sa modificare i file (oggi: uno sviluppatore) |
| Cosa si aggiorna | WordPress, tema, plugin | niente, in automatico |
| Se qualcosa si rompe | si ripristina un backup | si torna alla versione precedente in un click |
| Come si attacca | plugin vulnerabili, login, database | quasi nessuna superficie: non c'è login né database |
| Velocità | dipende dal server e dai plugin | pagine pronte servite da una rete mondiale |

Il compromesso è chiaro e va detto subito: **si guadagna in velocità, sicurezza e affidabilità, si perde l'autonomia di modificare i testi da un pannello.** Il paragrafo 6 spiega come recuperarla, se e quando serve.

---

## 2. I tre attori, e cosa fa ciascuno

**GitHub** è l'archivio. Contiene tutti i file del sito e, cosa altrettanto importante, la storia completa di ogni modifica: chi ha cambiato cosa, quando e perché. Non è un backup che qualcuno deve ricordarsi di fare: è il funzionamento normale dello strumento. Ogni versione del sito mai esistita è ancora lì.

**Vercel** è la pubblicazione. Sorveglia l'archivio; appena qualcosa cambia, ricostruisce il sito e lo mette online. Gestisce anche il certificato di sicurezza (il lucchetto https), la distribuzione geografica e la protezione dagli attacchi di sovraccarico.

**Chi sviluppa** è l'unico che oggi modifica i file. Nel modello WordPress questo ruolo si accende solo quando qualcosa si rompe; qui è coinvolto anche per un cambio di testo — ma non serve più per aggiornare plugin, ripulire malware o rimettere in piedi un sito caduto.

---

## 3. Come si aggiorna il sito

Il ciclo è sempre lo stesso, che si tratti di una virgola o di una pagina nuova:

1. si modifica il file sul computer;
2. si controlla che il sito si ricostruisca senza errori (`npm run build`);
3. si registra la modifica nella storia dell'archivio, con una frase che dice perché (`git commit`);
4. si invia a GitHub (`git push`).

Da lì in poi è automatico: **Vercel se ne accorge, ricostruisce e pubblica in uno o due minuti.** Nessuno deve caricare file via FTP, nessuno deve svuotare cache.

### Cosa vedete voi

Sul pannello di Vercel ogni pubblicazione compare come una riga con data, autore e descrizione. Se una pubblicazione fallisce — per esempio perché c'è un errore nel codice — **il sito online non cambia**: resta la versione precedente, funzionante. È una differenza importante rispetto a WordPress, dove un plugin aggiornato male può mandare giù il sito nell'istante stesso in cui lo si aggiorna. Qui una modifica sbagliata non arriva mai al pubblico.

### Se qualcosa va storto lo stesso

Se una pubblicazione riesce ma il risultato non piace, si torna indietro dal pannello di Vercel: si apre la pubblicazione precedente e si sceglie **Promote to Production** (in italiano: rendila quella pubblica). Il sito torna com'era in pochi secondi. Non c'è un backup da ripristinare, perché tutte le versioni sono già online e raggiungibili — semplicemente si sposta l'indicazione di quale è "quella buona".

### Le anteprime

Ogni ramo di lavoro diverso da quello principale riceve **un suo indirizzo privato**. Serve a far vedere una modifica prima che diventi pubblica: si manda il link, si guarda, si commenta, e solo dopo si porta sul sito vero. È il modo pulito di far approvare una pagina nuova senza pubblicarla per sbaglio.

---

## 4. Come si cambia un testo

Oggi i testi non stanno sparsi nel codice: sono raccolti in due file, apposta perché si possano trovare senza cercare.

- `src/data/content.ts` — i testi del sito: titoli, descrizioni, recapiti, voci di menu, elenchi.
- `src/data/services.ts` — il catalogo dei servizi: le sei aree e le ventinove voci, con le schede di dettaglio.

Modificare una frase significa aprire il file, trovarla fra virgolette, cambiarla e pubblicare. **Non serve toccare la grafica né il resto del sito**: la separazione fra "cosa c'è scritto" e "come è fatto" è voluta proprio per questo.

Chi sa muoversi su GitHub può farlo perfino dal browser, senza installare niente: si apre il file sul sito di GitHub, si clicca sulla matita, si modifica e si salva. La pubblicazione parte da sola. Resta il fatto che una virgola fuori posto in quei file può far fallire la ricostruzione — non è pericoloso (il sito online non cambia), ma richiede qualcuno che sappia leggere l'errore.

**Aggiungere una pagina servizio** è il caso più frequente e il più semplice: basta compilare la scheda di quel servizio dentro `services.ts` e la pagina nasce da sola, con il suo indirizzo, il suo link nel menu e la sua voce nell'indice. Nessun file da creare.

---

## 5. Come si cambia l'aspetto

Tutta la grafica è governata da un solo file, `src/app/globals.css`, e da un elenco di **colori con un nome che dice il ruolo**, non il colore: `superficie`, `testo`, `accento`, `bordo`. Cambiando la definizione dell'accento in un punto, cambia in tutto il sito: bottoni, link, dettagli, entrambi i temi.

Questo vale per:

- **colori** — palette chiara e scura, tinte delle sei aree di competenza;
- **caratteri tipografici** — sono due, ospitati sul nostro server e non su quelli di Google (per un fornitore della PA non è un dettaglio: il sito pubblicato non fa nessuna richiesta verso terzi);
- **spaziature, angoli arrotondati, ombre**;
- **effetti** — le apparizioni allo scroll, il bordo animato del pulsante principale.

Cambiare un colore o un carattere è quindi rapido. Cambiare la **struttura** di una pagina — spostare una sezione, aggiungerne una nuova, ridisegnare l'intestazione — è un lavoro di sviluppo, come lo sarebbe modificare un tema WordPress oltre le opzioni previste.

Il sito ha due temi completi, chiaro e scuro, con un selettore nell'intestazione. Se preferite imporne uno solo, si può: è una decisione ancora aperta.

---

## 6. Se volete modificare i testi da soli

È la domanda che arriva sempre, ed è legittima: su WordPress lo facevate.

La risposta non è "non si può", è "si aggiunge un pezzo". Si chiama **CMS headless**: un pannello di redazione (Sanity, Contentful, Strapi, Storyblok e altri) che assomiglia a WordPress per chi scrive, ma invece di generare il sito si limita a fornire i testi. Il sito resta questo, con la sua velocità e la sua sicurezza; cambia solo da dove prende le parole.

Cosa comporta, detto senza sconti:

- **costo di realizzazione**: qualche giornata di lavoro, perché ogni campo di ogni pagina va descritto nel pannello;
- **costo ricorrente**: molti CMS hanno un piano gratuito sufficiente per un sito di questa dimensione, ma è un fornitore in più;
- **conviene farlo dopo**, non ora: ha senso quando i contenuti sono stabili e si sa quali cambiano spesso. Farlo adesso significherebbe descrivere nel pannello anche i testi che verranno riscritti.

Una via di mezzo che non costa niente: le pagine dei servizi sono già dati compilabili. Se un giorno servisse dare autonomia solo su quelli, si può collegare il CMS a quel pezzo soltanto.

---

## 7. Statistiche e Google Tag Manager

### Com'è adesso

**Il sito non traccia nessuno.** Non c'è Google Analytics, non ci sono pixel pubblicitari, non ci sono contenuti incorporati da altri siti. Le uniche due cose salvate sul dispositivo di chi visita sono la preferenza di tema chiaro/scuro e — se un domani ci sarà da scegliere — la risposta al banner cookie. Nessuna delle due lascia il browser.

Per questo motivo **oggi non compare nessun banner cookie**: non c'è niente da autorizzare, e chiedere il consenso per il nulla è solo un fastidio. La pagina `/cookie` del sito lo dichiara apertamente, ed è verificabile da chiunque.

### Come si accende Google Tag Manager

Il codice è **già pronto e installato**: manca solo l'identificativo del contenitore. Sono tre passi.

**Passo 1 — Creare il contenitore.** Su [tagmanager.google.com](https://tagmanager.google.com) si crea un account e un contenitore di tipo Web per il dominio. Google restituisce un codice nella forma `GTM-XXXXXXX`.

**Passo 2 — Inserirlo su Vercel.** Nel progetto: **Settings → Environment Variables**. Si aggiunge una variabile chiamata esattamente

```
NEXT_PUBLIC_GTM_ID
```

con il codice come valore, selezionando tutti gli ambienti (Production, Preview, Development).

**Passo 3 — Ripubblicare.** Questo passo non è facoltativo e non è ovvio: le impostazioni di sicurezza del sito vengono calcolate durante la ricostruzione, e finché non se ne fa una nuova il browser continuerebbe a bloccare Google. Dal pannello di Vercel, sull'ultima pubblicazione, si sceglie **Redeploy**.

Da quel momento compare il banner cookie e, per chi accetta, il contenitore GTM si carica. Tutto il resto — Google Analytics 4, conversioni, eventi — si configura **dentro l'interfaccia di GTM**, senza mai più toccare il sito. È esattamente il motivo per cui si usa GTM invece di incollare gli script uno per uno.

Per spegnere tutto: si svuota la variabile e si ripubblica. Il banner sparisce e il sito torna a non caricare niente.

### Il punto delicato: il consenso

Qui la differenza rispetto a WordPress non è tecnica, è di responsabilità. Con un plugin si spunta una casella e gli script partono; qui il comportamento è stato scritto apposta, e vale la pena sapere perché.

In Italia Google Analytics **richiede il consenso preventivo** (art. 122 del Codice privacy). Non rientra fra i cookie tecnici esenti, perché tratta l'indirizzo IP completo, traccia fra siti diversi e condivide i dati con gli altri servizi Google. E il Garante chiede il **blocco preventivo**: gli script non vanno caricati e poi disattivati, vanno proprio *non caricati* finché il consenso non c'è.

È un controllo che chiunque può fare in trenta secondi, aprendo gli strumenti per sviluppatori del browser e guardando se, senza toccare il banner, parte una richiesta verso `googletagmanager.com`. Su questo sito non parte: è stato verificato.

Il banner rispetta le indicazioni del Garante su tre punti che sono i più spesso sbagliati: i pulsanti "Accetta" e "Rifiuta" hanno **lo stesso peso visivo** (evidenziare l'uno e nascondere l'altro è un dark pattern espressamente escluso); la **X chiude senza acconsentire**; lo scorrimento della pagina **non vale come consenso**.

Due limiti dichiarati:

- il banner ha **una sola categoria**, la misurazione. Va bene finché l'unica cosa da autorizzare è l'analytics. Se entreranno remarketing, mappe incorporate o video di YouTube, serviranno categorie separate e un pulsante "Personalizza", e a quel punto conviene una piattaforma di gestione del consenso vera (Iubenda, CookieYes, MyAgilePrivacy) invece di far crescere il codice fatto in casa;
- la pagina `/cookie` descrive il **comportamento tecnico** del sito ed è accurata, ma **non è l'informativa privacy**: titolare del trattamento, base giuridica, tempi di conservazione e diritti dell'interessato vanno scritti da chi si occupa di privacy per l'azienda. Le due cose devono combaciare — un'informativa che elenca cookie inesistenti, o che ne dimentica uno, è peggio che non averla.

### Se aggiungete un tag che chiama un servizio nuovo

Il sito dichiara al browser da quali domini può caricare roba, e tutto il resto lo rifiuta. È una protezione forte, ma ha una conseguenza pratica: **un tag configurato dentro GTM che chiami un servizio non previsto (un pixel Meta, una mappa, un video) non funzionerà**, e il motivo si vede solo nella console del browser. Va aggiunto un permesso nel file di configurazione del sito. È un intervento di due minuti per chi sviluppa, ma va saputo prima, non dopo tre giorni di dati mancanti.

### Un'alternativa che vale la pena conoscere

Se lo scopo è solo sapere quante persone leggono quali pagine, esistono strumenti che **non usano cookie e non richiedono consenso** (Vercel Web Analytics, Plausible, Umami, Simple Analytics). Nessun banner, nessun rischio privacy, dati aggregati. Danno molto meno di GA4 — niente pubblico, niente attribuzione delle campagne — ma se GA4 serve per l'advertising, allora serve GA4; se serve per capire quali pagine funzionano, spesso questi bastano.

---

## 8. Domande frequenti nel passaggio da WordPress

**Chi aggiorna il sito, ora che non ci sono plugin?**
Nessuno, di routine. Non esistono plugin da aggiornare né versioni di WordPress da inseguire, e non c'è la finestra di rischio fra "esce una vulnerabilità" e "qualcuno aggiorna". Le librerie usate dal sito si aggiornano ogni tanto, ma è manutenzione programmata, non urgenza: se non si aggiorna nulla per sei mesi, il sito continua a funzionare identico.

**Il sito può essere violato?**
Non nel modo in cui lo è un WordPress. Non c'è un pannello di amministrazione da attaccare, non c'è un database da svuotare, non c'è codice in esecuzione sul server a ogni visita: ci sono file già pronti. La superficie di attacco è quasi tutta sull'account GitHub e sull'account Vercel — **è lì che va messa l'autenticazione a due fattori**, ed è la cosa più importante di tutta questa guida in materia di sicurezza.

**E i backup?**
Sono la storia dell'archivio, e ci sono per costruzione. Ogni versione del sito è recuperabile, e ogni modifica ha una data e un autore. Non c'è un backup da programmare, verificare e sperare che funzioni.

**Quanto costa?**
GitHub è gratuito per questo uso. Vercel ha un piano gratuito, ma è **riservato all'uso personale e non commerciale**: per un sito aziendale serve il piano a pagamento, che al momento parte da 20 dollari al mese per persona che sviluppa (chi deve solo guardare non paga). Verificate le condizioni aggiornate prima di decidere. Rispetto a un hosting WordPress la cifra è simile; la differenza è che qui non ci sono costi di manutenzione ricorrente.

**Il dominio e le email?**
Il dominio si fa puntare a Vercel cambiando due voci nella configurazione DNS presso chi lo gestisce. **Le email non c'entrano niente e non si toccano**: viaggiano su record separati (MX). È un timore ricorrente e infondato, ma vale la pena dirlo esplicitamente perché lo spostamento di un sito è il momento in cui, per distrazione, le caselle si rompono davvero.

**Cosa succede al posizionamento su Google?**
Nel passaggio la cosa che conta non è la tecnologia, sono **gli indirizzi delle pagine**. Se un indirizzo cambia senza che il vecchio venga reindirizzato al nuovo, quella pagina perde tutto il posizionamento accumulato. Prima di sostituire il sito attuale va preparato l'elenco completo dei vecchi indirizzi e dei corrispondenti nuovi, con i reindirizzamenti. È la singola operazione che, saltata, fa più danno di tutte le altre messe insieme. Per il resto la tecnologia aiuta: le pagine sono più veloci, il che è un fattore di posizionamento.

**Si può fare un blog o una sezione news?**
Sì. Oggi gli articoli del portale Filodiretto vengono già letti dal suo WordPress e mostrati in home: è la dimostrazione che i due mondi possono convivere. Una sezione di notizie propria richiede o un CMS (vedi il paragrafo 6) o articoli scritti come file, che va bene se sono pochi e rari.

**I moduli di contatto funzionano?**
Non ancora. Le caselle ci sono, l'invio no — è dichiarato in pagina, sotto il modulo. Su WordPress questo lo faceva un plugin; qui serve collegare un servizio di invio email. È il primo lavoro da fare per passare da prototipo a sito vero.

**E l'area riservata di FilodirettoRUP?**
Resta dov'è, su WordPress, ed è una scelta. Questo sito ne è la vetrina: presenta il servizio, mostra gli ultimi articoli e ci rimanda. Il contenuto riservato non passa mai da qui — verificato: il paywall filtra i contenuti anche attraverso l'interfaccia tecnica. Rifare il portale da zero è stato valutato e documentato: sono mesi di lavoro, e WordPress lì fa il suo mestiere.

**Il sito è multilingua?**
No, e aggiungerlo non è banale: vanno tradotti tutti i testi e raddoppiati gli indirizzi. Next.js lo supporta bene, ma è un progetto a sé.

**Se domani cambiate fornitore?**
Il codice è vostro e sta su GitHub, in un formato standard che qualunque sviluppatore che conosca React sa leggere. Non c'è nessun aggancio proprietario: Vercel si può sostituire con altri servizi equivalenti, e il codice non cambia. È una posizione più libera di un sito costruito su un tema WordPress a pagamento con dodici plugin, dove la sostituzione di un pezzo costringe spesso a rifarne altri tre.

---

## 9. Cosa serve davvero uno sviluppatore per fare

Per onestà, l'elenco al contrario:

- aggiungere o ridisegnare una **pagina**;
- spostare **sezioni**, cambiare il **menu**, modificare l'**intestazione**;
- collegare **servizi esterni** (invio moduli, CMS, chat, mappe, pixel);
- toccare le **impostazioni di sicurezza** (per esempio per far funzionare un tag nuovo);
- **aggiornare le librerie**, ogni tanto;
- risolvere un **errore di pubblicazione**.

E l'elenco di ciò che **non serve più**: aggiornare plugin, aggiornare il tema, aggiornare WordPress, rimuovere malware, ripristinare backup, ottimizzare la cache, gestire il certificato https, riparare un sito caduto sotto carico.

---

## 10. Glossario minimo

**Repository (o repo)** — l'archivio dei file su GitHub, con tutta la storia delle modifiche.

**Commit** — una modifica registrata nella storia, con una frase che dice perché è stata fatta.

**Push** — l'invio delle modifiche a GitHub. È il gesto che fa partire la pubblicazione.

**Deploy** — la pubblicazione: Vercel prende i file, costruisce il sito e lo mette online.

**Build** — la costruzione vera e propria. Se fallisce, il sito online resta quello di prima.

**Branch (ramo)** — una linea di lavoro parallela, per preparare qualcosa senza toccare il sito pubblico. Ogni ramo ha la sua anteprima privata.

**Variabile d'ambiente** — un'impostazione conservata fuori dal codice, nel pannello di Vercel. Serve per i valori che cambiano da un ambiente all'altro o che non devono finire nell'archivio.

**CMS headless** — un pannello di redazione che fornisce solo i contenuti, lasciando il sito com'è.

**CSP (Content Security Policy)** — l'elenco dei domini da cui il sito è autorizzato a caricare qualcosa. Tutto ciò che non è nell'elenco viene rifiutato dal browser.

---

*Documento tecnico-divulgativo redatto insieme al prototipo. Per le convenzioni di codice e le trappole già incontrate, il riferimento è `CLAUDE.md` nella stessa cartella.*

// Contenuti testuali del sito.
// Tenerli separati dai componenti serve a due cose: modificare i testi
// senza toccare il JSX, e avere un unico punto dove poi collegare un CMS
// o un file .json se in futuro i contenuti dovranno essere gestiti da chi
// non scrive codice.

/*
  Gli href sono ASSOLUTI ("/#formazione", non "#formazione").

  Finché esisteva solo la home un'àncora nuda bastava. Ora che ci sono pagine
  interne, "#formazione" su /servizi cercherebbe una sezione che lì non
  esiste. La forma "/#formazione" dice invece: vai alla home, poi scorri.
  Funziona da qualunque pagina, home compresa.
*/
export const nav = [
  { label: "Chi siamo", href: "/#chi-siamo" },
  { label: "Servizi", href: "/servizi" },
  { label: "Formazione", href: "/#formazione" },
  { label: "Filodiretto", href: "/#filodiretto" },
  { label: "Software", href: "/#software" },
  { label: "Contatti", href: "/#contatti" },
] as const;

// Claim principale, spezzato per poter evidenziare una parola nel titolo.
export const hero = {
  eyebrow: "Servizi · Formazione · Software per la PA",
  titleLead: "Rendiamo più semplice",
  titleAccent: "la quotidianità",
  titleTail: "di ogni ente.",
  subtitle:
    "Dal 2015 affianchiamo comuni, province e società partecipate su contabilità, controllo di gestione, privacy, anticorruzione e tributi: consulenza, formazione e software che parlano la stessa lingua.",
  primaryCta: { label: "Parla con un consulente", href: "/#contatti" },
  secondaryCta: { label: "Scopri i software", href: "/#software" },
} as const;

// Numeri di sintesi mostrati sotto al claim. Da validare col cliente:
// oggi sono stime prudenti ricavate dal sito attuale.
export const heroStats = [
  { value: 10, suffix: "+", label: "anni al fianco degli enti" },
  { value: 300, suffix: "+", label: "enti e partecipate seguiti" },
  { value: 6, suffix: "", label: "aree di competenza" },
] as const;

// `icon` e `tint` sono chiavi, non componenti né colori: i dati restano dati
// puri e la traduzione in icona/classe la fa il componente che li mostra.
export const pillars = [
  {
    title: "Servizi",
    icon: "services",
    tint: "blu",
    description:
      "Affianchiamo gli enti nella gestione quotidiana: contabilità, controllo di gestione, privacy, anticorruzione, tributi e bilancio consolidato.",
    bullets: ["Contabilità e bilancio", "Controllo di gestione", "Privacy e anticorruzione"],
    href: "/servizi",
  },
  {
    title: "Formazione",
    icon: "training",
    tint: "ambra",
    description:
      "Percorsi formativi su misura, webinar e seminari per aggiornare in modo pratico chi lavora ogni giorno nella pubblica amministrazione.",
    bullets: ["Webinar in diretta", "Corsi su misura in ente", "Filodiretto RUP"],
    href: "/#formazione",
  },
  {
    title: "Software",
    icon: "software",
    tint: "verde",
    description:
      "Strumenti digitali pensati per semplificare i processi degli enti: dalla gestione delle partecipate alla protezione dei dati.",
    bullets: ["P@rtecipo", "I-Privacy", "Economica"],
    href: "/#software",
  },
] as const;

/*
  Le sei aree di servizio.

  Ogni voce serve a DUE posti con profondità diverse:
    · in home (components/Services.tsx) si usano solo name, tag, tint,
      description — è un elenco di richiamo;
    · su /servizi si usano anche intro, attivita, risultati e riferimenti.

  Lo `slug` è l'id dell'àncora sulla pagina (/servizi#pef-rifiuti). Averlo
  nei dati e non calcolato dal nome ha due vantaggi: l'indirizzo resta
  stabile anche se il titolo viene riscritto, e il giorno in cui un'area
  meritasse una pagina propria lo slug è già quello giusto.

  ATTENZIONE AI CONTENUTI: `intro`, `attivita` e `risultati` sono
  riformulazioni basate sul sito attuale e sugli adempimenti previsti dalla
  normativa. Descrivono prassi reali, ma NON sono testi approvati
  dall'azienda: vanno validati prima di qualunque pubblicazione.
*/
export const services = [
  {
    slug: "partecipate-bilancio-consolidato",
    name: "Partecipate e bilancio consolidato",
    tag: "Contabilità",
    tint: "blu",
    description:
      "Semplifichiamo la comunicazione tra ente e società partecipate, dalla raccolta dati alla revisione periodica delle partecipazioni.",
    intro:
      "Il bilancio consolidato mette insieme i conti dell'ente e quelli degli organismi che controlla. La difficoltà non è contabile ma organizzativa: i dati arrivano da soggetti diversi, in tempi diversi e in formati diversi. Lavoriamo su quel passaggio, prima ancora che sulle scritture.",
    attivita: [
      "Definizione del perimetro di consolidamento e del gruppo amministrazione pubblica",
      "Raccolta e verifica dei dati dalle società partecipate",
      "Scritture di elisione delle operazioni infragruppo e rettifiche di uniformità",
      "Revisione periodica delle partecipazioni e supporto agli atti conseguenti",
    ],
    risultati: [
      "Schemi di bilancio consolidato e nota integrativa",
      "Documentazione a supporto dell'organo di revisione",
      "Delibera di revisione periodica delle partecipazioni",
    ],
    riferimenti: "D.Lgs. 118/2011 · D.Lgs. 175/2016 (TUSP)",
  },
  {
    slug: "pef-rifiuti",
    name: "PEF rifiuti — metodo ARERA",
    tag: "Tributi",
    tint: "ambra",
    description:
      "Supporto completo nella predisposizione del Piano Economico Finanziario rifiuti secondo la metodologia ARERA.",
    intro:
      "Il PEF è il documento che collega i costi del servizio rifiuti alla tariffa pagata dai contribuenti. Il metodo ARERA impone una griglia rigida di voci, limiti di crescita e validazioni: un errore di classificazione a monte si trasforma in un rilievo a valle.",
    attivita: [
      "Riclassificazione dei costi secondo lo schema ARERA",
      "Calcolo del limite di crescita e dei coefficienti applicabili",
      "Predisposizione della relazione di accompagnamento e delle dichiarazioni di veridicità",
      "Interlocuzione con il gestore e con l'ente territorialmente competente",
    ],
    risultati: [
      "PEF completo nei formati richiesti",
      "Relazione di accompagnamento",
      "Documentazione per la validazione",
    ],
    riferimenti: "Metodo tariffario rifiuti ARERA",
  },
  {
    slug: "privacy-gdpr-dpo",
    name: "Privacy, GDPR e ruolo di DPO",
    tag: "Conformità",
    tint: "viola",
    description:
      "Assunzione dell'incarico di DPO, registro dei trattamenti, valutazioni d'impatto e formazione del personale.",
    intro:
      "Per un ente pubblico la nomina del Responsabile della protezione dei dati è obbligatoria. Ma la nomina da sola non produce conformità: servono un registro dei trattamenti che rispecchi ciò che l'ente fa davvero, procedure utilizzabili da chi lavora agli sportelli, e qualcuno da chiamare quando succede qualcosa.",
    attivita: [
      "Assunzione dell'incarico di DPO e supporto continuativo",
      "Impianto e aggiornamento del registro dei trattamenti",
      "Valutazioni d'impatto (DPIA) sui trattamenti a rischio elevato",
      "Gestione delle violazioni di dati e dei diritti degli interessati",
      "Formazione del personale sulle procedure adottate",
    ],
    risultati: [
      "Registro dei trattamenti aggiornato",
      "Informative, nomine e procedure interne",
      "Relazione annuale del DPO",
    ],
    riferimenti: "Regolamento UE 2016/679 · D.Lgs. 196/2003",
  },
  {
    slug: "contabilita-economico-patrimoniale",
    name: "Contabilità economico-patrimoniale",
    tag: "Contabilità",
    tint: "blu",
    description:
      "Impianto e tenuta della contabilità economico-patrimoniale, in versione standard o semplificata.",
    intro:
      "Accanto alla contabilità finanziaria, gli enti tengono una contabilità economico-patrimoniale che misura costi, ricavi e valore del patrimonio. Le due devono raccontare la stessa storia: gran parte del lavoro sta nel tenerle riconciliate, non nel produrle separatamente.",
    attivita: [
      "Impianto del piano dei conti integrato",
      "Rilevazione delle scritture e riconciliazione con la contabilità finanziaria",
      "Ricostruzione e aggiornamento dello stato patrimoniale iniziale",
      "Supporto alla redazione dei documenti di bilancio",
    ],
    risultati: [
      "Conto economico e stato patrimoniale",
      "Prospetti di riconciliazione",
      "Supporto in sede di approvazione del rendiconto",
    ],
    riferimenti: "D.Lgs. 118/2011 e principi contabili applicati",
  },
  {
    slug: "controllo-gestione-performance",
    name: "Controllo di gestione e performance",
    tag: "Programmazione",
    tint: "verde",
    description:
      "Dal piano della performance al referto annuale: indicatori, monitoraggi e reportistica per la direzione.",
    intro:
      "Programmazione e valutazione sono lo stesso ciclo visto da due punti diversi: si fissano obiettivi, si misura cosa è successo, si rendiconta. Il punto debole di solito non sono gli obiettivi ma gli indicatori — se non sono misurabili con i dati che l'ente ha davvero, il monitoraggio diventa un esercizio di forma.",
    attivita: [
      "Costruzione di obiettivi e indicatori misurabili",
      "Monitoraggi infrannuali e supporto ai responsabili di servizio",
      "Redazione della relazione sulla performance",
      "Predisposizione del referto del controllo di gestione",
    ],
    risultati: [
      "Sezione performance del PIAO",
      "Report di monitoraggio periodici",
      "Relazione sulla performance e referto annuale",
    ],
    riferimenti: "D.Lgs. 150/2009 · art. 198-bis TUEL",
  },
  {
    slug: "anticorruzione-trasparenza",
    name: "Anticorruzione e trasparenza",
    tag: "Conformità",
    tint: "viola",
    description:
      "PIAO, mappatura dei processi, misure di prevenzione e verifica degli obblighi di pubblicazione.",
    intro:
      "La prevenzione della corruzione si regge su una mappatura onesta dei processi: dove si decide, chi decide, quanto margine c'è. Da lì discendono le misure. Un piano costruito a tavolino, senza quel passaggio, produce adempimenti che nessuno applica.",
    attivita: [
      "Mappatura dei processi e analisi del rischio",
      "Definizione delle misure di prevenzione e dei relativi monitoraggi",
      "Redazione della sezione anticorruzione e trasparenza del PIAO",
      "Verifica degli obblighi di pubblicazione su Amministrazione trasparente",
      "Formazione del personale e supporto al RPCT",
    ],
    risultati: [
      "Sezione rischi corruttivi e trasparenza del PIAO",
      "Registro delle misure e degli esiti dei monitoraggi",
      "Relazione annuale del RPCT",
    ],
    riferimenti: "L. 190/2012 · D.Lgs. 33/2013 · PIAO",
  },
] as const;

// Testo di riepilogo della pagina /servizi.
export const servicesPage = {
  eyebrow: "Servizi",
  titleLead: "Gli adempimenti complessi,",
  titleAccent: "gestiti con voi",
  description:
    "Non consegniamo un modello e ci salutiamo: seguiamo l'ente lungo tutta la scadenza, dai dati grezzi al documento firmato. Sei aree di competenza, un unico interlocutore.",
  indiceTitolo: "Aree di competenza",
  attivitaTitolo: "Cosa facciamo",
  risultatiTitolo: "Cosa resta all'ente",
  riferimentiTitolo: "Riferimenti",
  nota: "Prototipo: i testi delle schede sono riformulati dalle fonti pubbliche e dagli adempimenti di legge, e vanno validati con l'azienda prima della pubblicazione.",
} as const;

export const softwareProducts = [
  {
    name: "P@rtecipo",
    tint: "blu",
    icon: "network",
    description:
      "Gestione delle società partecipate e del bilancio consolidato: raccolta dati, scritture di rettifica e output pronti per la revisione.",
    features: ["Raccolta dati dalle partecipate", "Elisioni e rettifiche guidate", "Export per l'organo di revisione"],
  },
  {
    name: "I-Privacy",
    tint: "viola",
    icon: "shield",
    description:
      "Conformità GDPR e supporto operativo al DPO, con registro dei trattamenti sempre aggiornato e scadenzario integrato.",
    features: ["Registro dei trattamenti", "Valutazioni d'impatto (DPIA)", "Data breach e scadenze"],
  },
  {
    name: "Economica",
    tint: "ambra",
    icon: "chart",
    description:
      "Contabilità economico-patrimoniale in versione standard o semplificata, allineata agli schemi di bilancio degli enti.",
    features: ["Piano dei conti integrato", "Riconciliazione con la finanziaria", "Schemi di bilancio pronti"],
  },
  {
    name: "IdeafondiPA",
    tint: "verde",
    icon: "compass",
    description:
      "Ricerca e monitoraggio di finanziamenti europei, nazionali e regionali, filtrati sul profilo dell'ente.",
    features: ["Bandi filtrati per ente", "Avvisi sulle scadenze", "Schede di sintesi"],
  },
] as const;

/*
  FilodirettoRUP — servizio in abbonamento su dominio proprio
  (filodirettorup.ideapubblica.it, oggi WordPress). Questo sito ne fa solo la
  VETRINA: nessun contenuto riservato passa di qui. Vedi src/lib/filodiretto.ts.
*/
export const filodiretto = {
  eyebrow: "Filodiretto RUP",
  titleLead: "L'affiancamento",
  titleAccent: "quotidiano",
  titleTail: "per i RUP.",
  description:
    "Un servizio dedicato a chi gestisce gare e contratti: poni un quesito operativo e ricevi una risposta personalizzata e tracciabile, con aggiornamenti costanti su norme, sentenze e prassi.",
  portaleUrl: "https://filodirettorup.ideapubblica.it/",
  accessoUrl: "https://filodirettorup.ideapubblica.it/accedi/",
  esempi: [
    "Posso riaffidare lo stesso servizio all'operatore dell'anno scorso senza violare il principio di rotazione?",
    "Il RUP può delegare alla commissione la verifica di anomalia?",
    "In un appalto finanziato con fondi PNRR posso prorogare i termini di consegna?",
  ],
  piani: [
    {
      nome: "Silver",
      quesiti: "10 quesiti",
      tint: "blu",
      voci: ["News periodiche", "Assistenza quotidiana", "Accesso allo storico dei quesiti"],
    },
    {
      nome: "Gold",
      quesiti: "25 quesiti",
      tint: "ambra",
      evidenza: true,
      voci: [
        "News periodiche",
        "Assistenza quotidiana",
        "Accesso allo storico dei quesiti",
        "Servizio personalizzato",
      ],
    },
  ],
  newsTitolo: "Ultimi aggiornamenti",
  newsNota: "Gli articoli completi sono riservati agli abbonati.",
} as const;

// Esempio di formato per i prossimi webinar: da collegare, in futuro, a un
// calendario/CMS reale invece di una lista statica.
export const webinars = [
  {
    title: "Coordinare programmazione e valutazione della performance",
    day: "18",
    month: "SET",
    time: "09:30 — 12:30",
    format: "Webinar in diretta",
  },
  {
    title: "PEF rifiuti: cosa cambia nel prossimo periodo regolatorio",
    day: "21",
    month: "SET",
    time: "15:00 — 17:00",
    format: "Webinar in diretta",
  },
  {
    title: "Bilancio consolidato: perimetro, elisioni ed errori ricorrenti",
    day: "25",
    month: "SET",
    time: "09:30 — 12:30",
    format: "Webinar in diretta",
  },
] as const;

// Placeholder: comuni ed enti citati sul sito attuale, da confermare/aggiornare
// con il cliente prima della pubblicazione definitiva.
export const clients = [
  "Comune di Varese",
  "Comune di Cagliari",
  "Comune di Padova",
  "Comune di Casalecchio di Reno",
  "Province ed enti associati",
  "Società partecipate",
] as const;

// Testimonianze riformulate in forma sintetica a partire dal sito attuale:
// da sostituire con i testi definitivi approvati dal cliente.
export const testimonials = [
  {
    quote:
      "La collaborazione ha portato a un miglioramento concreto nel rapporto tra l'ente e i cittadini, grazie anche a strumenti pensati per semplificare le procedure di rendicontazione.",
    author: "Comune di Parma",
    role: "Area finanziaria",
  },
  {
    quote:
      "Un supporto costante e competente, capace di adattarsi alle esigenze specifiche dell'ente in ogni fase del progetto.",
    author: "Ente cliente",
    role: "Servizi finanziari",
  },
  {
    quote:
      "Professionalità e disponibilità del team hanno reso più semplice affrontare adempimenti complessi.",
    author: "Ente cliente",
    role: "Segreteria generale",
  },
] as const;

export const contact = {
  phone: "071 9733239",
  phoneHref: "tel:0719733239",
  email: "info@ideapubblica.it",
  pec: "ideapubblica@pec.it",
  addresses: [
    { label: "Sede legale", value: "Via Liuti, 2 — 61122 Pesaro (PU)" },
    { label: "Sede operativa", value: "Via Giulio Pastore, 17 — 60131 Ancona (AN)" },
  ],
  // `icon` è una chiave testuale: il componente che le mostra la traduce nel
  // relativo SVG (vedi components/ui/social-icons.tsx).
  social: [
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/ideapubblica" },
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/company/ideapubblica/" },
    { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/channel/UC7QS1ZegA5IXBK6ZrY3oJiQ" },
  ],
} as const;

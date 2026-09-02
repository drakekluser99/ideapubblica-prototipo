/*
  Catalogo dei servizi.

  Sta in un file suo e non in content.ts per una ragione di dimensioni: 29
  voci con il loro dettaglio avrebbero reso content.ts illeggibile. La regola
  resta la stessa — qui dentro solo dati, nessun componente e nessun colore
  letterale: `tint` è una chiave che i componenti traducono in classe.

  --- Come è organizzato ---------------------------------------------------

  Due livelli, come sul sito attuale:
    · serviceCategories → le sei famiglie che compaiono nel menu a tendina;
    · serviceItems      → i singoli servizi, ciascuno legato a una categoria.

  Ogni voce ha SEMPRE slug, nome, categoria e sommario: bastano per il menu e
  per l'indice. Il campo `dettaglio` è invece OPZIONALE, ed è la chiave di
  tutta la struttura: solo le voci che ce l'hanno diventano una pagina vera
  (`/servizi/<slug>`). Le altre, nel menu, rimandano alla loro sezione
  dell'indice.

  Il motivo è pratico: 29 pagine di contenuto non si scrivono in una volta, e
  pubblicare pagine vuote è peggio che non pubblicarle — chi arriva da una
  ricerca trova un guscio, e i motori se ne accorgono. Così il sito mostra
  l'offerta completa fin da subito, ma promette una pagina solo dove c'è
  qualcosa da leggere. Aggiungere un `dettaglio` è tutto ciò che serve per
  far nascere la pagina successiva: nessun file da creare, nessuna rotta da
  registrare.

  --- Provenienza dei testi ------------------------------------------------

  I `dettaglio` presenti sono riscritti a partire dalle pagine pubbliche di
  ideapubblica.it/servizio/<slug>/: la sostanza e i riferimenti normativi
  vengono da lì, la struttura è nuova. Restano da validare con l'azienda.

  La collocazione in categoria delle cinque voci che non compaiono nel menu
  a tendina attuale (bilancio di previsione, check-up finanziario, opere
  pubbliche/BDAP, allineamento PCC, service contabile) è una nostra ipotesi:
  da confermare.
*/

export type Tinta = "blu" | "ambra" | "verde" | "viola" | "corallo";

export type ServiceCategory = {
  slug: string;
  nome: string;
  tint: Tinta;
  sommario: string;
};

export type ServiceBlock = {
  titolo: string;
  testo?: string;
  elenco?: readonly string[];
};

export type ServiceDetail = {
  claim: string;
  inquadramento: string;
  blocchi: readonly ServiceBlock[];
  destinatari: readonly string[];
  risultati: readonly string[];
  riferimenti?: string;
  /* Locandina del servizio ospitata sul sito attuale. Finché i PDF non
     vengono spostati, li serviamo da lì: sono già pubblici e aggiornati
     da chi li produce. */
  pdf?: string;
};

export type ServiceItem = {
  slug: string;
  nome: string;
  categoria: string;
  sommario: string;
  dettaglio?: ServiceDetail;
};

export const serviceCategories: readonly ServiceCategory[] = [
  {
    slug: "contabilita-programmazione-controllo",
    nome: "Contabilità, programmazione e controllo",
    tint: "blu",
    sommario:
      "Dal bilancio di previsione al referto del controllo di gestione: il ciclo che tiene insieme programmazione, scritture e rendicontazione.",
  },
  {
    slug: "consolidato-partecipate",
    nome: "Consolidato e partecipate",
    tint: "verde",
    sommario:
      "Il rapporto tra ente e organismi controllati, dalla raccolta dei dati al bilancio consolidato alla revisione periodica.",
  },
  {
    slug: "privacy-anticorruzione-trasparenza",
    nome: "Privacy, anticorruzione e trasparenza",
    tint: "viola",
    sommario:
      "Conformità continuativa: protezione dei dati, obblighi di pubblicazione e misure di prevenzione della corruzione.",
  },
  {
    slug: "arera-tributi",
    nome: "ARERA e tributi",
    tint: "ambra",
    sommario:
      "Piano economico finanziario rifiuti, tariffe e regolamenti: la parte che arriva direttamente in bolletta al cittadino.",
  },
  {
    slug: "personale",
    nome: "Personale",
    tint: "corallo",
    sommario: "Programmazione e valutazione della performance del personale dell'ente.",
  },
  {
    slug: "ottimizzazione-ente",
    nome: "Ottimizzazione dell'ente",
    tint: "blu",
    sommario:
      "Riorganizzazione, gestioni associate e ricerca di finanziamenti: gli interventi che cambiano la struttura, non solo gli adempimenti.",
  },
] as const;

export const serviceItems: readonly ServiceItem[] = [
  // ─── Contabilità, programmazione e controllo ──────────────────────────
  {
    slug: "contabilita-economico-patrimoniale",
    nome: "Contabilità economico patrimoniale",
    categoria: "contabilita-programmazione-controllo",
    sommario:
      "Impianto e tenuta della contabilità economico-patrimoniale, inventari e versione semplificata.",
    dettaglio: {
      claim: "Ogni aspetto della situazione patrimoniale sotto controllo",
      inquadramento:
        "Con il principio contabile applicato alla contabilità economico-patrimoniale, gli enti locali devono allegare al rendiconto i prospetti dello stato patrimoniale e del conto economico, redatti secondo il principio della competenza economica e seguendo la matrice di correlazione dei piani dei conti. Accanto alla contabilità finanziaria, l'ente deve quindi tenerne una seconda che misura costi, ricavi e valore del patrimonio — e le due devono raccontare la stessa storia.",
      blocchi: [
        {
          titolo: "Redazione della contabilità economico patrimoniale",
          testo:
            "Affianchiamo l'ente nella tenuta della contabilità con il metodo della partita doppia, producendo conto economico, stato patrimoniale, libro giornale e la documentazione a corredo. Il servizio è disponibile in tre modalità, che si scelgono in base a quanto l'ente vuole fare in proprio.",
          elenco: [
            "Full service — la teniamo noi, l'ente approva",
            "Light service — la tiene l'ente, noi verifichiamo e chiudiamo",
            "Training on the job — la impara l'ente lavorando sui propri dati",
          ],
        },
        {
          titolo: "Inventari",
          testo:
            "Aggiornamento annuale degli inventari dei beni mobili e immobili secondo i criteri del principio contabile allegato 4/3 al D.Lgs. 118/2011. È il presupposto perché lo stato patrimoniale dica qualcosa di vero: senza inventari aggiornati, i valori patrimoniali si trascinano di anno in anno.",
        },
        {
          titolo: "Contabilità economico patrimoniale semplificata",
          testo:
            "Per i comuni che accedono alla modalità semplificata prevista dalla normativa, la situazione patrimoniale si compila con il software Economica: fondo crediti di dubbia esigibilità, debiti, crediti, patrimonio netto e le altre poste patrimoniali.",
        },
      ],
      destinatari: [
        "Comuni di ogni dimensione, anche in contabilità semplificata",
        "Uffici ragioneria che tengono la finanziaria ma non hanno presidio sull'economico-patrimoniale",
        "Enti che devono ricostruire uno stato patrimoniale iniziale attendibile",
      ],
      risultati: [
        "Conto economico e stato patrimoniale pronti per l'allegazione al rendiconto",
        "Libro giornale e prospetti di riconciliazione con la contabilità finanziaria",
        "Inventari aggiornati dei beni mobili e immobili",
      ],
      riferimenti: "D.Lgs. 118/2011 · principio contabile applicato allegato 4/3",
      pdf: "https://ideapubblica.it/wp-content/uploads/2026/03/Locandina-CEP_compressed.pdf",
    },
  },
  {
    slug: "questionario-sose",
    nome: "Questionario SOSE",
    categoria: "contabilita-programmazione-controllo",
    sommario:
      "Compilazione e affiancamento sul questionario per i fabbisogni standard, con controllo dei dati.",
    dettaglio: {
      claim: "Il questionario che decide quante risorse arrivano all'ente",
      inquadramento:
        "La compilazione del questionario SOSE alimenta il calcolo dei fabbisogni standard, cioè il criterio con cui vengono ripartite le risorse tra gli enti. Non è un adempimento formale: una compilazione tardiva espone all'interruzione dei trasferimenti, e una compilazione imprecisa produce fabbisogni che non rispecchiano la realtà dell'ente — con effetti che durano anni.",
      blocchi: [
        {
          titolo: "Affiancamento o sostituzione nella compilazione",
          testo:
            "Possiamo affiancare l'ufficio o occuparci direttamente della compilazione. In entrambi i casi il lavoro punta su tre cose.",
          elenco: [
            "Tempestività — rispetto dei termini, per evitare le sanzioni da mancato o tardivo invio",
            "Correttezza — analisi dei costi e rappresentazione fedele della situazione dell'ente",
            "Controllo — inserimento assistito da software, per ridurre gli errori materiali",
          ],
        },
      ],
      destinatari: [
        "Comuni e unioni tenuti alla compilazione dei questionari sui fabbisogni standard",
        "Enti che negli anni precedenti hanno avuto rilievi o dati incoerenti",
      ],
      risultati: [
        "Questionario compilato e inviato nei termini",
        "Riscontro sui dati che incidono di più sul calcolo del fabbisogno",
      ],
      riferimenti: "Fabbisogni standard · questionari SOSE",
      pdf: "https://ideapubblica.it/wp-content/uploads/2026/02/2.Questionario-SOSE_compressed-1.pdf",
    },
  },
  {
    slug: "relazione-di-inizio-e-fine-mandato",
    nome: "Relazione di inizio e fine mandato",
    categoria: "contabilita-programmazione-controllo",
    sommario:
      "Redazione dei documenti che aprono e chiudono il mandato amministrativo.",
    dettaglio: {
      claim: "Da dove tutto inizia, e dove tutto si tira in somma",
      inquadramento:
        "Gli articoli 4 e 4-bis del D.Lgs. 149/2011 impongono all'ente di redigere una relazione di inizio mandato e una di fine mandato. Sono documenti che richiedono di raccogliere dati da tutti i settori e di ricostruire la situazione finanziaria in modo verificabile: la difficoltà non sta nella scrittura, ma nel reperire e riconciliare le informazioni nei tempi stretti previsti.",
      blocchi: [
        {
          titolo: "Accompagnamento in entrambe le fasi",
          testo:
            "Seguiamo l'ente sia all'insediamento sia alla chiusura del mandato: raccolta e verifica dei dati dai settori, compilazione degli schemi previsti, ricostruzione della situazione finanziaria e patrimoniale, predisposizione degli atti di approvazione e trasmissione.",
        },
      ],
      destinatari: [
        "Amministrazioni appena insediate",
        "Amministrazioni a fine mandato, con scadenze ravvicinate",
      ],
      risultati: [
        "Relazione di inizio o fine mandato completa negli schemi previsti",
        "Documentazione di supporto per la sottoscrizione dell'organo di revisione",
      ],
      riferimenti: "Art. 4 e 4-bis D.Lgs. 149/2011",
      pdf: "https://ideapubblica.it/wp-content/uploads/2026/02/3.Relazione-di-inizio-e-fine-mandato_compressed.pdf",
    },
  },
  {
    slug: "documento-unico-di-programmazione-dup",
    nome: "Documento unico di programmazione (DUP)",
    categoria: "contabilita-programmazione-controllo",
    sommario:
      "Elaborazione e aggiornamento del DUP, con obiettivi strategici e operativi costruiti sull'ente.",
    dettaglio: {
      claim: "La programmazione dell'ente, scritta perché venga usata",
      inquadramento:
        "Entro i termini di legge l'ente presenta al consiglio il Documento Unico di Programmazione, poi aggiornato in sede di approvazione del bilancio. Il DUP indica gli obiettivi strategici del mandato ed è il presupposto del bilancio di previsione e del PEG. Non tutti i DUP sono uguali: alcuni sono un adempimento, altri esprimono davvero la visione dell'amministrazione e fissano obiettivi realizzabili nel periodo considerato.",
      blocchi: [
        {
          titolo: "Cosa facciamo insieme agli amministratori",
          elenco: [
            "Supporto nella definizione degli obiettivi strategici e operativi",
            "Redazione del DUP nuovo o aggiornato secondo la normativa vigente",
            "Supporto al programma triennale delle opere pubbliche e al piano dei fabbisogni di personale",
            "Schemi degli atti amministrativi necessari all'approvazione",
          ],
        },
      ],
      destinatari: [
        "Amministrazioni al primo DUP del mandato",
        "Enti che devono aggiornare il DUP in sede di bilancio",
        "Enti che vogliono passare da un DUP di adempimento a uno realmente programmatorio",
      ],
      risultati: [
        "DUP completo nelle sezioni strategica e operativa",
        "Programma triennale delle opere pubbliche e piano dei fabbisogni coordinati",
        "Schemi di delibera per l'approvazione",
      ],
      riferimenti: "D.Lgs. 118/2011 · principio contabile applicato alla programmazione",
      pdf: "https://ideapubblica.it/wp-content/uploads/2026/02/4.DUP-Documento-unico-di-programmazione_compressed.pdf",
    },
  },
  {
    slug: "controllo-di-gestione",
    nome: "Controllo di gestione",
    categoria: "contabilita-programmazione-controllo",
    sommario:
      "Centri di costo, indicatori e reportistica fino al referto per la Corte dei conti.",
    dettaglio: {
      claim: "Ottimizzare il rapporto tra obiettivi e azioni",
      inquadramento:
        "Il controllo di gestione verifica efficienza, efficacia ed economicità dell'azione amministrativa. È un'attività obbligatoria ai sensi dell'art. 198-bis del TUEL, con invio del referto alla Corte dei conti. Il punto debole di solito non sono gli obiettivi ma gli indicatori: se non sono misurabili con i dati che l'ente ha davvero, il monitoraggio diventa un esercizio di forma.",
      blocchi: [
        {
          titolo: "Dal dato al report",
          testo:
            "Mettiamo a sistema i dati degli strumenti di programmazione e costruiamo una reportistica utilizzabile dalla direzione, allineata a quanto richiede la Corte dei conti.",
          elenco: [
            "Rilevazione dei prodotti amministrativi",
            "Impostazione e taratura dei centri di costo",
            "Individuazione degli indicatori di output, attività, efficacia, efficienza ed economicità",
            "Definizione del sistema di reporting operativo",
            "Elaborazione dei report periodici",
          ],
        },
      ],
      destinatari: [
        "Enti obbligati al referto del controllo di gestione",
        "Direzioni che ricevono report che nessuno legge e vogliono cambiarli",
      ],
      risultati: [
        "Sistema di centri di costo e indicatori documentato",
        "Report periodici per la direzione e i responsabili di servizio",
        "Referto annuale del controllo di gestione",
      ],
      riferimenti: "Art. 198-bis TUEL",
      pdf: "https://ideapubblica.it/wp-content/uploads/2026/02/5.Controllo-di-Gestione_compressed.pdf",
    },
  },
  {
    slug: "controllo-strategico",
    nome: "Controllo strategico",
    categoria: "contabilita-programmazione-controllo",
    sommario:
      "Traduzione delle linee di mandato in temi e obiettivi misurabili, con report intermedio e finale.",
    dettaglio: {
      claim: "Verificare se il mandato sta andando dove aveva detto",
      inquadramento:
        "Il controllo strategico rileva i risultati conseguiti rispetto alle linee programmatiche di mandato approvate dal consiglio. Ogni ente lo definisce secondo la propria autonomia organizzativa e la propria metodologia, ma per tutti conviene attivarlo: è l'unico strumento che collega ciò che è stato promesso a ciò che è stato fatto.",
      blocchi: [
        {
          titolo: "Come costruiamo il sistema",
          elenco: [
            "Riclassificazione delle linee programmatiche in temi strategici",
            "Associazione di ogni obiettivo strategico alla missione e di ogni obiettivo operativo al programma di riferimento",
            "Individuazione annuale degli indicatori, in fase preventiva e a consuntivo",
            "Un indicatore di outcome per ogni obiettivo strategico, uno di output per ogni obiettivo operativo",
            "Report intermedio e finale sui risultati",
          ],
        },
      ],
      destinatari: [
        "Enti che vogliono dare seguito misurabile alle linee di mandato",
        "Segretari e direzioni generali che coordinano il ciclo della programmazione",
      ],
      risultati: [
        "Mappa dei temi e degli obiettivi strategici con i relativi indicatori",
        "Report intermedio e finale di controllo strategico",
      ],
      riferimenti: "Art. 147-ter TUEL",
      pdf: "https://ideapubblica.it/wp-content/uploads/2026/02/6.Controllo-strategico_compressed.pdf",
    },
  },
  // Voci della stessa categoria ancora senza pagina di dettaglio.
  {
    slug: "bilancio-di-previsione",
    nome: "Bilancio di previsione",
    categoria: "contabilita-programmazione-controllo",
    sommario: "Supporto alla costruzione e alla gestione del bilancio di previsione.",
  },
  {
    slug: "check-up-finanziario-e-risanamento",
    nome: "Check-up finanziario e risanamento",
    categoria: "contabilita-programmazione-controllo",
    sommario: "Analisi degli equilibri di bilancio e percorsi di risanamento.",
  },
  {
    slug: "programmazione-e-gestione-delle-opere-pubbliche-e-rendicontazione-alla-bdap-mop",
    nome: "Opere pubbliche e rendicontazione BDAP-MOP",
    categoria: "contabilita-programmazione-controllo",
    sommario: "Programmazione delle opere pubbliche e monitoraggio verso la BDAP.",
  },
  {
    slug: "allineamento-pcc",
    nome: "Allineamento PCC",
    categoria: "contabilita-programmazione-controllo",
    sommario: "Riallineamento della Piattaforma Crediti Commerciali con la contabilità dell'ente.",
  },
  {
    slug: "service-contabile",
    nome: "Service contabile",
    categoria: "contabilita-programmazione-controllo",
    sommario: "Gestione contabile in service per gli enti privi di personale dedicato.",
  },

  // ─── Consolidato e partecipate ────────────────────────────────────────
  {
    slug: "bilancio-consolidato",
    nome: "Bilancio consolidato",
    categoria: "consolidato-partecipate",
    sommario: "Perimetro, raccolta dati, elisioni e schemi del bilancio consolidato.",
  },
  {
    slug: "revisione-partecipate",
    nome: "Revisione partecipate",
    categoria: "consolidato-partecipate",
    sommario: "Revisione periodica delle partecipazioni e atti conseguenti.",
  },
  {
    slug: "filodiretto-partecipate",
    nome: "Filodiretto partecipate",
    categoria: "consolidato-partecipate",
    sommario: "Assistenza continuativa sulle società partecipate.",
  },

  // ─── Privacy, anticorruzione e trasparenza ────────────────────────────
  {
    slug: "designazione-del-responsabile-della-protezione-dei-dati-dpo",
    nome: "Designazione del DPO",
    categoria: "privacy-anticorruzione-trasparenza",
    sommario: "Assunzione dell'incarico di Responsabile della protezione dei dati.",
  },
  {
    slug: "supporto-videosorveglianza",
    nome: "Supporto videosorveglianza",
    categoria: "privacy-anticorruzione-trasparenza",
    sommario: "Conformità degli impianti di videosorveglianza dell'ente.",
  },
  {
    slug: "supporto-trasparenza",
    nome: "Supporto trasparenza",
    categoria: "privacy-anticorruzione-trasparenza",
    sommario: "Verifica degli obblighi di pubblicazione su Amministrazione trasparente.",
  },
  {
    slug: "supporto-anticorruzione",
    nome: "Supporto anticorruzione",
    categoria: "privacy-anticorruzione-trasparenza",
    sommario: "Mappatura dei processi, analisi del rischio e misure di prevenzione.",
  },
  {
    slug: "filodiretto-privacy-trasparenza-anticorruzione-e-assistenza-al-rup",
    nome: "Filodiretto privacy, trasparenza e anticorruzione",
    categoria: "privacy-anticorruzione-trasparenza",
    sommario: "Assistenza continuativa su privacy, trasparenza e anticorruzione.",
  },

  // ─── ARERA e tributi ──────────────────────────────────────────────────
  {
    slug: "piano-economico-finanziario-rifiuti-arera",
    nome: "Piano economico finanziario rifiuti — ARERA",
    categoria: "arera-tributi",
    sommario: "Predisposizione del PEF rifiuti secondo il metodo tariffario ARERA.",
  },
  {
    slug: "simulazione-tariffe-tari-tcp",
    nome: "Simulazione tariffe TARI / TCP",
    categoria: "arera-tributi",
    sommario: "Simulazioni tariffarie e valutazione degli effetti sulle utenze.",
  },
  {
    slug: "revisione-regolamenti-tributi",
    nome: "Revisione regolamenti tributi",
    categoria: "arera-tributi",
    sommario: "Aggiornamento dei regolamenti tributari dell'ente.",
  },
  {
    slug: "progettazione-tariffa-puntuale",
    nome: "Progettazione tariffa puntuale",
    categoria: "arera-tributi",
    sommario: "Passaggio alla tariffazione puntuale del servizio rifiuti.",
  },

  // ─── Personale ────────────────────────────────────────────────────────
  {
    slug: "piano-delle-performance",
    nome: "Piano delle performance",
    categoria: "personale",
    sommario: "Obiettivi, indicatori e relazione sulla performance.",
  },

  // ─── Ottimizzazione dell'ente ─────────────────────────────────────────
  {
    slug: "gestioni-associate-e-fusioni",
    nome: "Gestioni associate e fusioni",
    categoria: "ottimizzazione-ente",
    sommario: "Studi di fattibilità e accompagnamento a unioni e fusioni.",
  },
  {
    slug: "riorganizzazione-dellente",
    nome: "Riorganizzazione dell'ente",
    categoria: "ottimizzazione-ente",
    sommario: "Revisione della struttura organizzativa e dei processi interni.",
  },
  {
    slug: "ricerca-finanziamenti-europei",
    nome: "Ricerca finanziamenti europei",
    categoria: "ottimizzazione-ente",
    sommario: "Individuazione di bandi europei coerenti con il profilo dell'ente.",
  },
  {
    slug: "pnrr-e-fondi-complementari",
    nome: "PNRR e fondi complementari",
    categoria: "ottimizzazione-ente",
    sommario: "Gestione e rendicontazione degli interventi finanziati.",
  },
  {
    slug: "portale-ideafondipa",
    nome: "Portale IdeafondiPA",
    categoria: "ottimizzazione-ente",
    sommario: "Accesso al portale di monitoraggio dei finanziamenti.",
  },
] as const;

/* ─── Funzioni di lettura ───────────────────────────────────────────────
   Stanno qui e non nei componenti perché la forma dei dati la conosce
   questo file: se domani la struttura cambia, si aggiorna in un posto solo.
*/

export const serviziConPagina = serviceItems.filter((s) => s.dettaglio);

export function servizioPerSlug(slug: string) {
  return serviceItems.find((s) => s.slug === slug);
}

export function categoriaPerSlug(slug: string) {
  return serviceCategories.find((c) => c.slug === slug);
}

export function serviziDiCategoria(slugCategoria: string) {
  return serviceItems.filter((s) => s.categoria === slugCategoria);
}

/*
  Dove punta una voce di menu o di indice.

  Se il servizio ha una pagina, ci si va. Altrimenti si rimanda alla sua
  sezione dell'indice: meglio una lista utile che una pagina vuota.
*/
export function linkServizio(servizio: ServiceItem) {
  return servizio.dettaglio ? `/servizi/${servizio.slug}` : `/servizi#${servizio.categoria}`;
}

export const servicesPage = {
  eyebrow: "Servizi",
  titleLead: "Gli adempimenti complessi,",
  titleAccent: "gestiti con voi",
  description:
    "Non consegniamo un modello e ci salutiamo: seguiamo l'ente lungo tutta la scadenza, dai dati grezzi al documento firmato. Sei aree di competenza, un unico interlocutore.",
  nota: "Prototipo: i testi delle schede sono riscritti a partire dalle pagine pubbliche del sito attuale e vanno validati con l'azienda. Le pagine di dettaglio sono al momento disponibili per la prima area; le altre voci rimandano all'indice.",
} as const;

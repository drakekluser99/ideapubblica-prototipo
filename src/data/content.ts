// Contenuti testuali della homepage.
// Tenerli separati dai componenti serve a due cose: modificare i testi
// senza toccare il JSX, e avere un unico punto dove poi collegare un CMS
// o un file .json se in futuro i contenuti dovranno essere gestiti da chi
// non scrive codice.

export const nav = [
  { label: "Chi siamo", href: "#chi-siamo" },
  { label: "Servizi", href: "#servizi" },
  { label: "Formazione", href: "#formazione" },
  { label: "Software", href: "#software" },
  { label: "Contatti", href: "#contatti" },
] as const;

// Claim principale, spezzato per poter evidenziare una parola nel titolo.
export const hero = {
  eyebrow: "Servizi · Formazione · Software per la PA",
  titleLead: "Rendiamo più semplice",
  titleAccent: "la quotidianità",
  titleTail: "di ogni ente.",
  subtitle:
    "Dal 2015 affianchiamo comuni, province e società partecipate su contabilità, controllo di gestione, privacy, anticorruzione e tributi: consulenza, formazione e software che parlano la stessa lingua.",
  primaryCta: { label: "Parla con un consulente", href: "#contatti" },
  secondaryCta: { label: "Scopri i software", href: "#software" },
} as const;

// Numeri di sintesi mostrati sotto al claim. Da validare col cliente:
// oggi sono stime prudenti ricavate dal sito attuale.
export const heroStats = [
  { value: 10, suffix: "+", label: "anni al fianco degli enti" },
  { value: 300, suffix: "+", label: "enti e partecipate seguiti" },
  { value: 6, suffix: "", label: "aree di competenza" },
] as const;

// `icon` è una chiave, non un componente: i dati restano dati puri e la
// scelta dell'icona la fa il componente che li mostra.
export const pillars = [
  {
    title: "Servizi",
    icon: "services",
    description:
      "Affianchiamo gli enti nella gestione quotidiana: contabilità, controllo di gestione, privacy, anticorruzione, tributi e bilancio consolidato.",
    bullets: ["Contabilità e bilancio", "Controllo di gestione", "Privacy e anticorruzione"],
    href: "#servizi",
  },
  {
    title: "Formazione",
    icon: "training",
    description:
      "Percorsi formativi su misura, webinar e seminari per aggiornare in modo pratico chi lavora ogni giorno nella pubblica amministrazione.",
    bullets: ["Webinar in diretta", "Corsi su misura in ente", "Filodiretto RUP"],
    href: "#formazione",
  },
  {
    title: "Software",
    icon: "software",
    description:
      "Strumenti digitali pensati per semplificare i processi degli enti: dalla gestione delle partecipate alla protezione dei dati.",
    bullets: ["P@rtecipo", "I-Privacy", "Economica"],
    href: "#software",
  },
] as const;

export const services = [
  {
    name: "Partecipate e bilancio consolidato",
    tag: "Contabilità",
    description:
      "Semplifichiamo la comunicazione tra ente e società partecipate, dalla raccolta dati alla revisione periodica delle partecipazioni.",
  },
  {
    name: "PEF rifiuti — metodo ARERA",
    tag: "Tributi",
    description:
      "Supporto completo nella predisposizione del Piano Economico Finanziario rifiuti secondo la metodologia ARERA.",
  },
  {
    name: "Privacy, GDPR e ruolo di DPO",
    tag: "Conformità",
    description:
      "Assunzione dell'incarico di DPO, registro dei trattamenti, valutazioni d'impatto e formazione del personale.",
  },
  {
    name: "Contabilità economico-patrimoniale",
    tag: "Contabilità",
    description:
      "Impianto e tenuta della contabilità economico-patrimoniale, in versione standard o semplificata.",
  },
  {
    name: "Controllo di gestione e performance",
    tag: "Programmazione",
    description:
      "Dal piano della performance al referto annuale: indicatori, monitoraggi e reportistica per la direzione.",
  },
  {
    name: "Anticorruzione e trasparenza",
    tag: "Conformità",
    description:
      "PIAO, mappatura dei processi, misure di prevenzione e verifica degli obblighi di pubblicazione.",
  },
] as const;

export const softwareProducts = [
  {
    name: "P@rtecipo",
    icon: "network",
    description:
      "Gestione delle società partecipate e del bilancio consolidato: raccolta dati, scritture di rettifica e output pronti per la revisione.",
    features: ["Raccolta dati dalle partecipate", "Elisioni e rettifiche guidate", "Export per l'organo di revisione"],
  },
  {
    name: "I-Privacy",
    icon: "shield",
    description:
      "Conformità GDPR e supporto operativo al DPO, con registro dei trattamenti sempre aggiornato e scadenzario integrato.",
    features: ["Registro dei trattamenti", "Valutazioni d'impatto (DPIA)", "Data breach e scadenze"],
  },
  {
    name: "Economica",
    icon: "chart",
    description:
      "Contabilità economico-patrimoniale in versione standard o semplificata, allineata agli schemi di bilancio degli enti.",
    features: ["Piano dei conti integrato", "Riconciliazione con la finanziaria", "Schemi di bilancio pronti"],
  },
  {
    name: "IdeafondiPA",
    icon: "compass",
    description:
      "Ricerca e monitoraggio di finanziamenti europei, nazionali e regionali, filtrati sul profilo dell'ente.",
    features: ["Bandi filtrati per ente", "Avvisi sulle scadenze", "Schede di sintesi"],
  },
] as const;

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

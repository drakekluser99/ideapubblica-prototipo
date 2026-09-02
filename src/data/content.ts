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

export const pillars = [
  {
    title: "Servizi",
    description:
      "Affianchiamo gli enti nella gestione quotidiana: contabilità, controllo di gestione, privacy, anticorruzione, tributi e bilancio consolidato.",
  },
  {
    title: "Formazione",
    description:
      "Percorsi formativi su misura, webinar e seminari per aggiornare in modo pratico chi lavora ogni giorno nella pubblica amministrazione.",
  },
  {
    title: "Software",
    description:
      "Strumenti digitali pensati per semplificare i processi degli enti: dalla gestione delle partecipate alla protezione dei dati.",
  },
] as const;

export const services = [
  {
    name: "P@rtecipo",
    description:
      "Semplifica la comunicazione tra ente e società partecipate, supportando bilancio consolidato e revisione delle partecipazioni.",
  },
  {
    name: "Piano Economico Finanziario rifiuti — ARERA",
    description:
      "Supporto nella predisposizione del PEF rifiuti secondo la metodologia ARERA.",
  },
  {
    name: "I-Privacy",
    description:
      "Software per la gestione della conformità GDPR e il supporto al ruolo di DPO.",
  },
  {
    name: "Contabilità economico-patrimoniale",
    description:
      "Soluzioni per la gestione della contabilità economico-patrimoniale, in versione standard o semplificata.",
  },
] as const;

export const softwareProducts = [
  {
    name: "P@rtecipo",
    description: "Gestione delle società partecipate e del bilancio consolidato.",
  },
  {
    name: "I-Privacy",
    description: "Conformità GDPR e supporto operativo al DPO.",
  },
  {
    name: "Economica",
    description: "Contabilità economico-patrimoniale, in versione standard o semplificata.",
  },
  {
    name: "IdeafondiPA",
    description: "Ricerca di finanziamenti europei, nazionali e regionali per gli enti.",
  },
] as const;

// Esempio di formato per i prossimi webinar: da collegare, in futuro, a un
// calendario/CMS reale invece di una lista statica.
export const webinars = [
  {
    title: "Coordinare programmazione e valutazione della performance",
    date: "18 settembre 2026",
  },
  {
    title: "Coordinare programmazione e valutazione della performance",
    date: "21 settembre 2026",
  },
  {
    title: "Coordinare programmazione e valutazione della performance",
    date: "25 settembre 2026",
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
    author: "Comune di Parma (PR)",
  },
  {
    quote:
      "Un supporto costante e competente, capace di adattarsi alle esigenze specifiche dell'ente in ogni fase del progetto.",
    author: "Ente cliente",
  },
  {
    quote:
      "Professionalità e disponibilità del team hanno reso più semplice affrontare adempimenti complessi.",
    author: "Ente cliente",
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
  social: [
    { label: "Facebook", href: "https://www.facebook.com/Ideapubblica-srl-174636776250806/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/ideapubblica/" },
    { label: "YouTube", href: "https://www.youtube.com/channel/UC7QS1ZegA5IXBK6ZrY3oJiQ" },
  ],
} as const;

import type { Metadata } from "next";
import PageHero from "@/components/ui/page-hero";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/*
  /cookie — che cosa il sito salva sul dispositivo di chi lo visita.

  Attenzione a cosa è questa pagina e a cosa NON è: è la descrizione
  TECNICA e verificabile di ciò che il codice fa oggi, scritta da chi il
  codice lo ha scritto. Non è l'informativa legale: quella deve essere
  redatta o validata da chi si occupa di privacy per l'azienda, perché deve
  dichiarare titolare del trattamento, base giuridica, tempi di
  conservazione e diritti dell'interessato — cose che il codice non sa.

  Le due parti però si tengono: un'informativa che elenca cookie che il sito
  non usa, o che ne dimentica uno, è peggio che non averla. Questa pagina
  serve anche a quello — a dire a chi la scriverà esattamente cosa c'è.
*/

export const metadata: Metadata = {
  title: "Cookie e tracciamento — Ideapubblica",
  description:
    "Che cosa questo sito salva sul dispositivo di chi lo visita, e a cosa serve.",
};

const GTM_ATTIVO = Boolean(process.env.NEXT_PUBLIC_GTM_ID);

const tecnici = [
  {
    nome: "Preferenza di tema",
    dove: "localStorage · ip-theme",
    scopo:
      "Ricorda se avete scelto l'aspetto chiaro o scuro, per non ripresentare ogni volta quello predefinito.",
  },
  {
    nome: "Scelta sui cookie di misurazione",
    dove: "localStorage · ip-consenso-cookie",
    scopo:
      "Ricorda se avete accettato o rifiutato, per non richiedervelo a ogni pagina. Esiste solo dopo che avete scelto.",
  },
];

export default function CookiePage() {
  return (
    <>
      <a href="#contenuto" className="salta-al-contenuto">
        Salta al contenuto
      </a>
      <Header />

      <main id="contenuto">
        <PageHero
          briciole={[{ label: "Home", href: "/" }, { label: "Cookie" }]}
          eyebrow="Trasparenza"
          title={
            <>
              Che cosa salviamo <span className="text-gradient">sul vostro dispositivo</span>
            </>
          }
          description="L'elenco completo, aggiornato al codice effettivamente pubblicato. Niente di più di quello che leggete qui."
        />

        <section className="pb-24 sm:pb-32">
          <div className="shell max-w-3xl">
            <h2 className="display text-2xl text-fg sm:text-3xl">Sempre presenti</h2>
            <p className="mt-3 text-sm leading-relaxed text-fg-soft sm:text-base">
              Sono preferenze vostre, salvate dal browser sul vostro dispositivo. Non escono da
              lì, non raggiungono nessun server — né il nostro né quello di altri — e non
              servono a riconoscervi. Per questo la legge non ne richiede il consenso.
            </p>

            <dl className="mt-8 flex flex-col gap-4">
              {tecnici.map((t) => (
                <div key={t.nome} className="glass rounded-3xl p-6">
                  <dt className="text-base font-semibold text-fg">{t.nome}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-fg-soft">{t.scopo}</dd>
                  <dd className="mt-2 font-mono text-xs text-fg-faint">{t.dove}</dd>
                </div>
              ))}
            </dl>

            <h2 className="display mt-14 text-2xl text-fg sm:text-3xl">Solo con il vostro consenso</h2>

            {GTM_ATTIVO ? (
              <>
                <p className="mt-3 text-sm leading-relaxed text-fg-soft sm:text-base">
                  Usiamo Google Tag Manager per raccogliere statistiche di lettura. Gli script
                  non vengono caricati finché non premete &laquo;Accetta&raquo; nel riquadro che
                  compare alla prima visita: se rifiutate, o se chiudete il riquadro senza
                  scegliere, non parte nessuna richiesta verso Google. Potete verificarlo voi
                  stessi con gli strumenti per sviluppatori del browser.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-fg-soft sm:text-base">
                  Per cambiare idea in seguito basta cancellare i dati di questo sito dalle
                  impostazioni del browser: il riquadro tornerà a comparire.
                </p>
              </>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-fg-soft sm:text-base">
                <strong className="text-fg">Al momento nessuno.</strong> Il sito non usa
                strumenti di statistica, non ha pixel pubblicitari e non incorpora contenuti di
                terze parti. Per questo non vedete comparire nessun riquadro sui cookie: non
                c&apos;è niente da autorizzare. Se un domani verrà attivata la misurazione delle
                visite, il riquadro comparirà e questa pagina lo elencherà qui.
              </p>
            )}

            <p className="mt-14 border-t border-line pt-6 text-xs leading-relaxed text-fg-faint">
              Questa pagina descrive il comportamento tecnico del sito. L&apos;informativa
              privacy completa — titolare del trattamento, base giuridica, tempi di
              conservazione, diritti dell&apos;interessato — va predisposta a parte.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

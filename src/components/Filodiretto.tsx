import Image from "next/image";
import { ArrowUpRight, Check, ExternalLink, MessageCircleQuestion } from "lucide-react";
import { filodiretto } from "@/data/content";
import { ultimeNews, dataInItaliano } from "@/lib/filodiretto";
import { tinte, type Tinta } from "@/components/ui/tints";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

/*
  Sezione FilodirettoRUP.

  È un Server Component ASINCRONO: in Next 15+ un componente può essere
  `async` e fare `await` direttamente nel corpo. Il fetch avviene sul server,
  a build time o durante la rigenerazione ISR — mai nel browser del
  visitatore. Due conseguenze pratiche:

    · niente CORS da configurare (riguarda solo le chiamate del browser);
    · l'HTML arriva già completo, quindi le news sono indicizzabili e
      visibili anche a chi ha JavaScript disattivato.

  La sezione ha due parti con affidabilità diverse:
    1. presentazione e piani → dati statici, sempre presenti;
    2. ultimi articoli → dipendono da un sito che non controlliamo,
       quindi la sottosezione si nasconde se la chiamata non porta nulla.
  Il punto 2 è il motivo per cui il fetch non sta nella pagina: se il portale
  è giù, qui sparisce una fascia, non si rompe la home.
*/
export default async function Filodiretto() {
  const news = await ultimeNews(3);

  return (
    <section id="filodiretto" className="relative py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow={filodiretto.eyebrow}
          title={
            <>
              {filodiretto.titleLead}{" "}
              <span className="text-gradient">{filodiretto.titleAccent}</span>{" "}
              {filodiretto.titleTail}
            </>
          }
          description={filodiretto.description}
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-5">
          {/* Colonna sinistra: esempi di quesiti reali.
              Mostrare tre domande vere comunica il taglio del servizio molto
              meglio di qualunque descrizione astratta. */}
          <Reveal className="lg:col-span-3">
            <div className="glass flex h-full flex-col rounded-3xl p-8">
              <div className="flex items-center gap-3">
                <span className="tinta-blu flex h-11 w-11 items-center justify-center rounded-2xl tinta-fondo tinta-bordo border">
                  <MessageCircleQuestion size={20} className="tinta-blu tinta-testo" />
                </span>
                <h3 className="text-lg font-semibold text-fg">Hai un dubbio? Ottieni una risposta.</h3>
              </div>

              <ul className="mt-8 flex flex-col gap-4">
                {filodiretto.esempi.map((esempio) => (
                  <li
                    key={esempio}
                    className="rounded-2xl border border-line bg-card/40 p-4 text-sm leading-relaxed text-fg-soft"
                  >
                    <span aria-hidden className="mr-2 text-accent-soft">
                      &ldquo;
                    </span>
                    {esempio}
                  </li>
                ))}
              </ul>

              <a
                href={filodiretto.portaleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex w-fit items-center gap-2 pt-8 text-sm font-semibold text-accent-soft transition-transform duration-300 hover:translate-x-1"
              >
                Vai al portale Filodiretto
                <ExternalLink size={15} aria-hidden />
                <span className="sr-only">(si apre in una nuova scheda)</span>
              </a>
            </div>
          </Reveal>

          {/* Colonna destra: i due piani.
              I prezzi non sono pubblici sul portale, quindi la scheda si
              ferma al monte quesiti: meglio un dato mancante che uno inventato. */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {filodiretto.piani.map((piano, i) => (
              <Reveal key={piano.nome} delay={i * 110} className="h-full">
                <div
                  className={`${tinte[piano.tint as Tinta]} glass flex h-full flex-col rounded-3xl p-6 ${
                    "evidenza" in piano && piano.evidenza ? "tinta-bordo border-2" : ""
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="display text-xl text-fg">{piano.nome}</h3>
                    <span className="tinta-testo text-sm font-semibold">{piano.quesiti}</span>
                  </div>

                  <ul className="mt-5 flex flex-col gap-2.5">
                    {piano.voci.map((voce) => (
                      <li key={voce} className="flex items-start gap-2 text-sm text-fg-soft">
                        <Check size={15} className="tinta-testo mt-0.5 shrink-0" aria-hidden />
                        {voce}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={filodiretto.accessoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center gap-2 rounded-full border border-line mt-6 px-5 py-3 text-sm font-semibold text-fg transition-colors hover:bg-fg hover:text-surface"
                  >
                    Richiedi l&rsquo;accesso
                    <ArrowUpRight size={15} aria-hidden />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/*
          Ultimi articoli dal portale.

          Mostriamo SOLO titolo, data e immagine: il corpo non ci viene mai
          consegnato dall'API, perché MemberPress lo filtra. La nota lo dice
          in chiaro al visitatore, così il link non sembra un errore quando
          porta a una schermata di accesso.
        */}
        {news.length > 0 && (
          <div className="mt-16">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="display text-xl text-fg">{filodiretto.newsTitolo}</h3>
              <p className="text-xs text-fg-faint">{filodiretto.newsNota}</p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {news.map((articolo, i) => (
                <Reveal key={articolo.id} delay={i * 110} className="h-full">
                  <a
                    href={articolo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass flex h-full flex-col overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
                  >
                    {articolo.immagine && (
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={articolo.immagine}
                          alt=""
                          fill
                          /* `sizes` dice al browser quanto sarà larga
                             l'immagine ai vari formati di schermo, così
                             scarica la variante giusta invece della più grande. */
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-5">
                      <time dateTime={articolo.data} className="text-xs text-fg-faint">
                        {dataInItaliano(articolo.data)}
                      </time>
                      <h4 className="mt-2 text-base leading-snug font-semibold text-fg">
                        {articolo.titolo}
                      </h4>
                      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent-soft transition-transform duration-300 group-hover:translate-x-1">
                        Leggi sul portale
                        <ExternalLink size={14} aria-hidden />
                        <span className="sr-only">(si apre in una nuova scheda)</span>
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

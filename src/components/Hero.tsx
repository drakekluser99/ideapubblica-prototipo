import { ArrowRight, ShieldCheck } from "lucide-react";
import { hero, heroStats } from "@/data/content";
import ShinyButton from "@/components/ui/shiny-button";
import Reveal from "@/components/ui/reveal";
import Counter from "@/components/ui/counter";
import NetworkVisual from "@/components/ui/network-visual";

/*
  Hero — la prima schermata.

  Struttura: griglia a due colonne su desktop (testo a sinistra, visual a
  destra), una colonna sola su mobile. Il fondo è costruito a strati, dal più
  lontano al più vicino:
    1. reticolo tecnico (utility `grid-bg`)
    2. due aloni radiali blu/acqua sfocati
    3. una sfumatura verso il basso che "scioglie" l'hero nella sezione dopo
  Nessuna immagine: tutto CSS/SVG, quindi zero peso e nessun rischio di foto
  di stock che invecchiano male.

  Il titolo usa `clamp()` invece dei breakpoint: la dimensione scala in
  continuo con la larghezza della finestra, senza salti.
*/
export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* --- strati di sfondo --- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 grid-bg opacity-70" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 -z-20 h-[36rem] w-[52rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(47,107,255,0.22), transparent 68%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 -z-20 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(46,211,183,0.14), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink-950"
      />

      <div className="shell grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* --- colonna testo --- */}
        <div>
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-brand-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acqua opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-acqua" />
              </span>
              {hero.eyebrow}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-7 text-[clamp(2.6rem,6.2vw,4.6rem)] text-white">
              {hero.titleLead}{" "}
              <span className="text-gradient">{hero.titleAccent}</span>
              <br className="hidden sm:block" /> {hero.titleTail}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-mute sm:text-lg">
              {hero.subtitle}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ShinyButton href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight size={17} />
              </ShinyButton>
              {/* Il CTA secondario resta volutamente "muto": due bottoni
                  animati affiancati si rubano l'attenzione a vicenda e
                  nessuno dei due funziona. Una gerarchia chiara vale più di
                  un effetto in più. */}
              <a
                href={hero.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-7 py-3.5 text-sm font-medium text-white/85 transition-colors hover:border-white/30 hover:bg-white/5 hover:text-white"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/8 pt-8">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="display text-3xl text-white sm:text-4xl">
                    <Counter to={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-mute">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* --- colonna visual --- */}
        <Reveal from="right" delay={200} className="relative">
          <NetworkVisual className="mx-auto aspect-square w-full max-w-lg" />

          {/* Card flottante: dà scala al visual e comunica un beneficio
              concreto senza aggiungere un paragrafo di testo. */}
          <div className="glass absolute bottom-2 left-0 hidden max-w-[15rem] rounded-2xl p-4 sm:block">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/15 text-brand-300">
                <ShieldCheck size={16} />
              </span>
              <p className="text-sm font-semibold text-white">Dati in Italia</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-mute">
              Software conformi al GDPR e alle linee guida AgID per la pubblica amministrazione.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { ArrowUpRight, BarChart3, Compass, Network, ShieldCheck } from "lucide-react";
import { softwareProducts } from "@/data/content";
import SectionHeading from "@/components/ui/section-heading";
import Reveal from "@/components/ui/reveal";

/*
  Software — griglia "bento": la prima card occupa due colonne su desktop,
  le altre una. È il modo più semplice per creare gerarchia senza scrivere un
  layout diverso per ogni card: basta una classe condizionale su `col-span`.

  Nota su Tailwind: `lg:col-span-2` deve esistere come stringa intera nel
  sorgente perché il compilatore la trovi. Costruirla al volo
  (`lg:col-span-${n}`) NON funziona — è l'errore più comune con Tailwind.
*/
const icons = {
  network: Network,
  shield: ShieldCheck,
  chart: BarChart3,
  compass: Compass,
} as const;

export default function SoftwareShowcase() {
  return (
    <section id="software" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="glow-a pointer-events-none absolute top-1/3 left-1/2 -z-10 h-[30rem] w-[46rem] -translate-x-1/2 rounded-full blur-3xl"
      />

      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Software"
          title={
            <>
              Strumenti costruiti <span className="text-gradient">sul lavoro reale</span> degli enti
            </>
          }
          description="Ogni applicativo nasce da un adempimento che abbiamo seguito sul campo. Niente moduli generici: quello che serve, dove serve."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {softwareProducts.map((product, i) => {
            const Icon = icons[product.icon];
            // Bento: la 1ª e la 4ª card occupano due colonne. Così le due
            // righe risultano [larga | stretta] e [stretta | larga] invece di
            // lasciare un buco nella griglia.
            const featured = i === 0 || i === 3;

            return (
              <Reveal
                key={product.name}
                delay={i * 100}
                className={`h-full ${featured ? "lg:col-span-2" : ""}`}
              >
                <article className="group glass relative flex h-full flex-col overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
                  {/* Reticolo interno appena percettibile: dà "texture" alla
                      card e la fa sembrare una superficie, non un rettangolo. */}
                  <span aria-hidden className="grid-bg pointer-events-none absolute inset-0 opacity-40" />

                  <div className="relative flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-accent/12 text-accent-soft">
                      <Icon size={20} />
                    </span>
                    <span className="rounded-full border border-line px-2.5 py-1 text-[11px] font-medium text-fg-soft">
                      Applicativo
                    </span>
                  </div>

                  <h3 className="display relative mt-6 text-2xl text-fg">{product.name}</h3>
                  <p
                    className={`relative mt-3 text-sm leading-relaxed text-fg-soft ${
                      featured ? "max-w-xl" : ""
                    }`}
                  >
                    {product.description}
                  </p>

                  <ul
                    className={`relative mt-6 flex flex-wrap gap-2 ${featured ? "" : "flex-col gap-2"}`}
                  >
                    {product.features.map((f) => (
                      <li
                        key={f}
                        className="rounded-lg border border-line bg-fg/[0.03] px-3 py-1.5 text-xs text-fg/75"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contatti"
                    className="relative mt-auto inline-flex items-center gap-1.5 pt-7 text-sm font-semibold text-accent-soft transition-transform duration-300 group-hover:translate-x-1"
                  >
                    Richiedi una demo
                    <ArrowUpRight size={16} />
                  </a>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

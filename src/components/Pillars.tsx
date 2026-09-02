import { pillars } from "@/data/content";

export default function Pillars() {
  return (
    <section id="chi-siamo" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-600">
        Chi siamo
      </h2>
      <p className="mt-2 max-w-2xl text-2xl font-bold text-blue-950 sm:text-3xl">
        Un gruppo di professionisti al servizio della pubblica amministrazione.
      </p>

      {/* grid a 1 colonna su mobile, 3 colonne da sm in su */}
      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {pillars.map((pillar, i) => (
          <div key={pillar.title} className="rounded-2xl border border-slate-200 p-8">
            <span className="text-sm font-semibold text-amber-500">
              0{i + 1}
            </span>
            <h3 className="mt-3 text-xl font-bold text-blue-950">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

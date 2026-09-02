import { softwareProducts } from "@/data/content";

export default function SoftwareShowcase() {
  return (
    <section id="software" className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-600">
        Software
      </h2>
      <p className="mt-2 max-w-2xl text-2xl font-bold text-blue-950 sm:text-3xl">
        Strumenti digitali per snellire i processi dell&apos;ente.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {softwareProducts.map((product) => (
          <div key={product.name} className="rounded-2xl border border-slate-200 p-6">
            <h3 className="font-bold text-blue-950">{product.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {product.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

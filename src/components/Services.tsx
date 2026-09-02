import { services } from "@/data/content";

export default function Services() {
  return (
    <section id="servizi" className="bg-slate-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-600">
          Servizi in evidenza
        </h2>
        <p className="mt-2 max-w-2xl text-2xl font-bold text-blue-950 sm:text-3xl">
          Soluzioni pensate per la quotidianità dell&apos;ente.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.name}
              className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200"
            >
              <h3 className="text-lg font-bold text-blue-950">{service.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

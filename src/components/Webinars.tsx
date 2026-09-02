import { webinars } from "@/data/content";

export default function Webinars() {
  return (
    <section id="formazione" className="bg-blue-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-400">
          Formazione
        </h2>
        <p className="mt-2 max-w-2xl text-2xl font-bold sm:text-3xl">
          Prossimi webinar
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {webinars.map((webinar, i) => (
            <div
              key={`${webinar.title}-${i}`}
              className="rounded-2xl border border-white/15 p-6"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
                {webinar.date}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-blue-100">
                {webinar.title}
              </p>
            </div>
          ))}
        </div>

        <a
          href="#contatti"
          className="mt-10 inline-block rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-blue-950 transition-transform hover:scale-105"
        >
          Scopri la formazione su misura
        </a>
      </div>
    </section>
  );
}

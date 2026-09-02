import { testimonials } from "@/data/content";

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-600">
        Dicono di noi
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.author}
            className="flex flex-col justify-between rounded-2xl bg-slate-50 p-8"
          >
            <blockquote className="text-sm leading-relaxed text-slate-700">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-sm font-semibold text-blue-950">
              {t.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

import { clients } from "@/data/content";

export default function Clients() {
  return (
    <section className="border-y border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-slate-400">
          Enti che si affidano a noi
        </p>

        {/* In questa fase di prototipo i clienti sono elencati come testo:
            quando avremo i loghi reali (in formato SVG/PNG) basterà sostituire
            questi elementi con <Image />, senza toccare la struttura. */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {clients.map((client) => (
            <span key={client} className="text-sm font-semibold text-slate-500">
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

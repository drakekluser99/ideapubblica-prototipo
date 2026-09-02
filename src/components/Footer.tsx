import { contact } from "@/data/content";

export default function Footer() {
  return (
    <footer className="bg-blue-950 py-12 text-blue-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-extrabold text-white">
            idea<span className="text-amber-400">pubblica</span>
          </p>
          <p className="mt-1 text-xs text-blue-300">
            P.IVA/CF 02590670416 — © {new Date().getFullYear()} Ideapubblica srl
          </p>
        </div>

        <div className="flex gap-6 text-sm">
          {contact.social.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

import type { ReactNode } from "react";
import Reveal from "./reveal";

/*
  SectionHeading — occhiello + titolo + sottotitolo.

  Perché farne un componente invece di ripetere il markup: garantisce che
  tutte le sezioni abbiano la stessa gerarchia tipografica e le stesse
  distanze. È il modo più semplice per evitare che una pagina "scivoli" verso
  dieci varianti leggermente diverse dello stesso titolo.
*/

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <Reveal className={className}>
      <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
        {eyebrow ? (
          <p
            className={`eyebrow mb-4 flex items-center gap-2 ${isCenter ? "justify-center" : ""} ${
              tone === "dark" ? "text-brand-300" : "text-brand-600"
            }`}
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-current" />
            {eyebrow}
          </p>
        ) : null}

        <h2
          className={`display text-[clamp(2rem,4.4vw,3.25rem)] ${
            tone === "dark" ? "text-white" : "text-ink-950"
          }`}
        >
          {title}
        </h2>

        {description ? (
          <p
            className={`mt-5 text-base leading-relaxed sm:text-lg ${
              tone === "dark" ? "text-mute" : "text-mute-ink"
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}

export default SectionHeading;

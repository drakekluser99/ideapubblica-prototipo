import type { ReactNode } from "react";

/*
  ShinyButton — il CTA principale del sito.

  Il componente è volutamente minuscolo: tutto l'effetto (bordo animato,
  trama a puntini, riflesso, stati hover) vive in globals.css sotto la classe
  `.shiny-cta`. Qui restano solo il markup e la scelta fra <a> e <button>.

  Perché non un <style jsx> dentro al componente, come nello snippet di
  partenza: styled-jsx inietta le regole quando React idrata la pagina, quindi
  nell'HTML servito dal server non ci sono e per un istante il bottone appare
  come testo nudo. Portando il CSS nel foglio globale lo stile arriva insieme
  alla pagina — e viene servito una volta sola invece che per ogni istanza.

  Nota: non serve "use client". Non c'è stato né eventi, quindi resta un
  Server Component e non aggiunge JavaScript al bundle.
*/

type ShinyButtonProps = {
  children: ReactNode;
  /** Se presente rende un <a>, altrimenti un <button>. */
  href?: string;
  className?: string;
  variant?: "brand" | "ghost";
  type?: "button" | "submit";
};

export function ShinyButton({
  children,
  href,
  className = "",
  variant = "brand",
  type = "button",
}: ShinyButtonProps) {
  const classes = `shiny-cta ${variant === "ghost" ? "shiny-cta--ghost" : ""} ${className}`;

  if (href) {
    return (
      <a className={classes} href={href}>
        <span>{children}</span>
      </a>
    );
  }

  return (
    <button type={type} className={classes}>
      <span>{children}</span>
    </button>
  );
}

export default ShinyButton;

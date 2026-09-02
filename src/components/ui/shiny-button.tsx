import type { ReactNode } from "react";
import Link from "next/link";
import { esterno, AVVISO_NUOVA_SCHEDA } from "@/lib/link";

/*
  ShinyButton — il CTA principale del sito.

  Il componente è volutamente minuscolo: tutto l'effetto (bordo animato,
  trama a puntini, riflesso, stati hover) vive in globals.css sotto la classe
  `.shiny-cta`. Qui restano solo il markup e la scelta fra link e <button>.

  Perché non un <style jsx> dentro al componente, come nello snippet di
  partenza: styled-jsx inietta le regole quando React idrata la pagina, quindi
  nell'HTML servito dal server non ci sono e per un istante il bottone appare
  come testo nudo. Portando il CSS nel foglio globale lo stile arriva insieme
  alla pagina — e viene servito una volta sola invece che per ogni istanza.

  --- Perché <Link> e non <a> -----------------------------------------------

  Qui c'era una <a> normale, ed era la causa di un difetto visibile: cliccando
  "Contattaci" da una pagina qualsiasi il browser ricaricava l'intero
  documento. Si vedeva come un lampo bianco di una frazione di secondo, come
  se la pagina stesse caricando qualcosa — perché stava davvero ricaricando
  tutto: HTML, CSS, JavaScript, e la riesecuzione di tutte le animazioni.

  Con <Link> la navigazione resta dentro l'applicazione: Next scarica solo la
  parte di pagina che cambia, il documento non viene buttato via e non c'è
  nessun lampo. È anche la differenza fra precaricare la destinazione mentre
  il bottone è in vista e cominciare a scaricarla dopo il click.

  Regola generale, non solo per questo bottone: **dentro il sito si naviga con
  <Link>**. La <a> nuda resta giusta solo per un indirizzo che esce dal sito,
  dove non c'è niente da precaricare e il documento va comunque sostituito.
  `esterno()` distingue i due casi, come già fanno Header e Footer.

  Nota: non serve "use client". Non c'è stato né eventi, quindi resta un
  Server Component e non aggiunge JavaScript al bundle.
*/

type ShinyButtonProps = {
  children: ReactNode;
  /** Se presente rende un link, altrimenti un <button>. */
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
    // Fuori dal sito: <a> normale, con le protezioni d'obbligo su target
    // _blank e l'avviso per chi non vede aprirsi la scheda nuova.
    if (esterno(href)) {
      return (
        <a className={classes} href={href} target="_blank" rel="noopener noreferrer">
          <span>
            {children}
            <span className="sr-only"> {AVVISO_NUOVA_SCHEDA}</span>
          </span>
        </a>
      );
    }

    return (
      <Link className={classes} href={href}>
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      <span>{children}</span>
    </button>
  );
}

export default ShinyButton;

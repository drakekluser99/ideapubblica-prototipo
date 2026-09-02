"use client";

import { Moon, Sun } from "lucide-react";

/*
  Selettore tema chiaro/scuro.

  Il punto interessante è che questo componente NON ha stato React.

  Il tentativo naturale sarebbe: `useState` con il tema corrente, letto da
  localStorage dentro un useEffect. Ma il server non può sapere quale tema ha
  scelto l'utente, quindi renderizzerebbe l'icona sbagliata e React
  segnalerebbe un "hydration mismatch"; e leggere localStorage in un effect
  per poi chiamare setState è l'anti-pattern che abbiamo già incontrato con
  Reveal.

  Soluzione: il tema vive dove deve vivere, cioè sull'attributo
  `data-theme` di <html>. Il bottone rende entrambe le icone e a decidere
  quale mostrare è il CSS, che legge lo stesso attributo. Il click si limita a
  ribaltare l'attributo e a salvare la scelta. Zero stato, zero mismatch.
*/
export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("ip-theme", next);
    } catch {
      // Navigazione privata o cookie bloccati: il tema vale per questa
      // sessione e basta. Non è un errore da mostrare all'utente.
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Passa dal tema scuro a quello chiaro"
      title="Cambia tema"
      className={`theme-toggle flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-soft transition-colors hover:border-line-strong hover:text-fg ${className}`}
    >
      <Sun size={16} className="icon-sun" />
      <Moon size={16} className="icon-moon" />
    </button>
  );
}

export default ThemeToggle;

import type { Metadata } from "next";
import "./globals.css";

// Niente next/font/google in questo prototipo: quel meccanismo scarica i
// file dei font da Google al momento della build, e l'ambiente in cui
// stiamo lavorando non ha accesso a quel dominio. Usiamo per ora lo stack
// di font di sistema (vedi globals.css) — la tipografia definitiva sarà
// decisa nella fase di direzione grafica e si può reintrodurre allora,
// eventualmente auto-ospitando i file con next/font/local.

export const metadata: Metadata = {
  title: "Ideapubblica — Servizi, formazione e software per gli enti",
  description:
    "Ideapubblica affianca gli enti locali su contabilità, controllo di gestione, privacy, anticorruzione, tributi e bilancio consolidato, con servizi, formazione e software dedicati.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

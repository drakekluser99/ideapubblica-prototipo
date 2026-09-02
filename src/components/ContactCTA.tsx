"use client";

// Client Component perché gestiamo lo stato di invio del form (submitted)
// e intercettiamo l'evento di submit nel browser. In questo prototipo il
// form non è collegato a nessun backend: al submit mostriamo solo un
// messaggio di conferma finto, da sostituire con una vera chiamata
// (es. a un Route Handler /api/contact, o a un servizio come Resend/Formspree)
// quando il sito passerà dalla fase di prototipo a quella funzionante.

import { useState, type FormEvent } from "react";
import { contact } from "@/data/content";

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contatti" className="bg-slate-50 py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-amber-600">
            Contattaci
          </h2>
          <p className="mt-2 text-2xl font-bold text-blue-950 sm:text-3xl">
            Rendiamo più semplice la quotidianità di ogni ente.
          </p>
          <dl className="mt-8 space-y-3 text-sm text-slate-600">
            <div>
              <dt className="font-semibold text-slate-900">Telefono</dt>
              <dd>
                <a href={contact.phoneHref} className="hover:text-blue-900">
                  {contact.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900">Email</dt>
              <dd>
                <a href={`mailto:${contact.email}`} className="hover:text-blue-900">
                  {contact.email}
                </a>
              </dd>
            </div>
            {contact.addresses.map((address) => (
              <div key={address.label}>
                <dt className="font-semibold text-slate-900">{address.label}</dt>
                <dd>{address.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          {submitted ? (
            <p className="text-sm font-medium text-blue-950">
              Grazie per averci scritto! Ti risponderemo il prima possibile.
              <br />
              <span className="text-slate-500">
                (Prototipo: nessun messaggio è stato realmente inviato.)
              </span>
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  name="nome"
                  placeholder="Nome e cognome"
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-900"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-900"
                />
                <input
                  name="telefono"
                  placeholder="Telefono"
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-900"
                />
                <input
                  name="ente"
                  placeholder="Ente di appartenenza"
                  className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-900"
                />
              </div>
              <input
                name="oggetto"
                placeholder="Oggetto"
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-900"
              />
              <textarea
                required
                name="messaggio"
                placeholder="Messaggio"
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm outline-none focus:border-blue-900"
              />
              <label className="flex items-start gap-2 text-xs text-slate-500">
                <input required type="checkbox" className="mt-0.5" />
                Ho letto e accetto l&apos;informativa sulla privacy.
              </label>
              <button
                type="submit"
                className="w-full rounded-full bg-blue-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Invia richiesta
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

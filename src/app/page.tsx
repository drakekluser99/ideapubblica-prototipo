import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Services from "@/components/Services";
import SoftwareShowcase from "@/components/SoftwareShowcase";
import Webinars from "@/components/Webinars";
import Filodiretto from "@/components/Filodiretto";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

// page.tsx dentro app/ è la home ("/"). Qui componiamo solo le sezioni,
// nell'ordine in cui devono apparire: ogni sezione è un componente a sé,
// così è facile riordinarle, nasconderne una o sostituirla in futuro.
export default function Home() {
  return (
    <>
      <a href="#contenuto" className="salta-al-contenuto">
        Salta al contenuto
      </a>
      <Header />
      <main id="contenuto">
        <Hero />
        {/* La riprova sociale sta subito sotto l'hero: è la sezione che
            convince di più in rapporto allo spazio che occupa. */}
        <Clients />
        <Pillars />
        <Services />
        <SoftwareShowcase />
        <Webinars />
        {/* Filodiretto sta dopo la Formazione perché è la sua evoluzione
            continuativa: chi ha appena letto dei webinar è il pubblico
            giusto per un abbonamento di affiancamento quotidiano.
            La sezione legge gli ultimi articoli dal portale WordPress. */}
        <Filodiretto />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

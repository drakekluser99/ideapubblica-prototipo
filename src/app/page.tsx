import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Services from "@/components/Services";
import SoftwareShowcase from "@/components/SoftwareShowcase";
import Webinars from "@/components/Webinars";
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
      <Header />
      <main>
        <Hero />
        <Pillars />
        <Services />
        <SoftwareShowcase />
        <Webinars />
        <Clients />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

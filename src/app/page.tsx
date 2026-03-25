import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Configurator from "@/components/Configurator";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Configurator />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  );
}

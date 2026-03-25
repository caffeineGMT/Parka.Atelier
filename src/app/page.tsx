import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProductShowcase from "@/components/ProductShowcase";
import HowItWorks from "@/components/HowItWorks";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <HowItWorks />
      <ProductShowcase />
      <Reviews />
      <FAQ />
      <Footer />
    </main>
  );
}

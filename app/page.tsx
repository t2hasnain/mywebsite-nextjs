import Hero from './components/ui/Hero';
import SkillsAnimation from './components/ui/SkillsAnimation';
import Services from './components/ui/Services';
import Portfolio from './components/ui/Portfolio';
import Testimonials from './components/ui/Testimonials';
import Contact from './components/ui/Contact';
import ScrollDots from './components/ui/ScrollDots';
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-hidden">
        {/* Fixed navigation dots for scroll */}
        <ScrollDots />
        
        {/* Main sections */}
        <section id="hero">
          <Hero />
        </section>
        
        <section id="skills">
          <SkillsAnimation />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="portfolio">
          <Portfolio />
        </section>
        
        <section id="testimonials">
          <Testimonials />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </>
  );
}

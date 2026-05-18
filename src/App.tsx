import { useState, useEffect } from 'react';
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Services from "@/components/Services/Services";
import Categories from "@/components/Categories/Categories";
import Gallery from "@/components/Gallery/Gallery";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";

function App() {
  const [activeRoute, setActiveRoute] = useState<'landing' | 'catalogo'>('landing');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      // Si la URL es de catálogo, cambiamos de ruta
      if (hash.startsWith('#/catalogo') || hash === '#catalogo') {
        setActiveRoute('catalogo');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setActiveRoute('landing');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Ejecutar una vez al iniciar la app

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      <Navbar activeRoute={activeRoute} />
      <main className="shared-background-wrapper">
        {activeRoute === 'catalogo' ? (
          <Categories />
        ) : (
          <>
            <Hero />
            <About />
            <Services />
            <Gallery />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;

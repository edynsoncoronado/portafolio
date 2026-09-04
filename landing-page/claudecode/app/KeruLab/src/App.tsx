import { MotionConfig } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Capabilities } from './components/sections/Capabilities';
import { ValueProposition } from './components/sections/ValueProposition';
import { Services } from './components/sections/Services';
import { ERPSection } from './components/sections/ERPSection';
import { AISolutions } from './components/sections/AISolutions';
import { Industries } from './components/sections/Industries';
import { Process } from './components/sections/Process';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Technology } from './components/sections/Technology';
import { FAQ } from './components/sections/FAQ';
import { CTA } from './components/sections/CTA';
import { Contact } from './components/sections/Contact';
import { useI18n } from './hooks/useI18n';

export default function App() {
  const { t } = useI18n();

  return (
    // `reducedMotion="user"` desactiva las animaciones de transformación
    // cuando el sistema pide reducir el movimiento.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-brand-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        {t.a11y.skipToContent}
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Capabilities />
        <ValueProposition />
        <Services />
        <ERPSection />
        <AISolutions />
        <Industries />
        <Process />
        <About />
        <Projects />
        <Technology />
        <FAQ />
        <CTA />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}

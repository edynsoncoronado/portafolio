import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Apps } from './components/sections/Apps';
import { Quality } from './components/sections/Quality';
import { Productivity } from './components/sections/Productivity';
import { AI } from './components/sections/AI';
import { Bento } from './components/sections/Bento';
import { Industries } from './components/sections/Industries';
import { Process } from './components/sections/Process';
import { Cases } from './components/sections/Cases';
import { SocialProof } from './components/sections/SocialProof';
import { FAQ } from './components/sections/FAQ';
import { FinalCTA } from './components/sections/FinalCTA';
import { Contact } from './components/sections/Contact';

export default function App() {
  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-plum-500 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Saltar al contenido principal
      </a>

      <Navbar />

      <main id="contenido">
        <Hero />
        <Apps />
        <Quality />
        <Productivity />
        <AI />
        <Bento />
        <Industries />
        <Process />
        <Cases />
        <SocialProof />
        <FAQ />
        <FinalCTA />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

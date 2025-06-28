import { useEffect } from 'react';
import HeroEnhanced from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import WorkEducationEnhanced from '@/components/WorkEducationEnhanced';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;
      const key = e.key.toLowerCase();
      if (key === 'r') window.open('/resume.pdf', '_blank');
      if (key === 'g') window.open('https://github.com/petar-nikolic125/', '_blank');
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <StickyNav />
      <HeroEnhanced />
      <WorkEducationEnhanced />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

import Hero from '@/components/sections/Hero/Hero';
import About from '@/components/sections/About/About';
import Skills from '@/components/sections/Skills/Skills';
import Timeline from '@/components/sections/Timeline/Timeline';
import Future from '@/components/sections/Future/Future';
import Projects from '@/components/sections/Projects/Projects';
import Contact from '@/components/sections/Contact/Contact';

export default function Home() {
  return (
    <main className="relative w-full">
      <Hero />
      <About />
      <Skills />
      <Timeline />
      <Future />
      <Projects />
      <Contact />
    </main>
  );
}

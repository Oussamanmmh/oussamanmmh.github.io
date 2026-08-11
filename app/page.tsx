import { About } from '@/components/about'
import { Contact } from '@/components/contact'
import { CustomCursor } from '@/components/custom-cursor'
import { Experience } from '@/components/experience'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { NoiseOverlay } from '@/components/noise-overlay'
import { Projects } from '@/components/projects'
import { Skills } from '@/components/skills'
import { SmoothScroll } from '@/components/smooth-scroll'

export default function Page() {
  return (
    <>
      <NoiseOverlay />
      <SmoothScroll />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

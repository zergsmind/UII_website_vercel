import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { translations } from './translations'
import './ScrollIndicator.css'

type Section = 'hero' | 'about' | 'services' | 'stats'

interface SectionInfo {
  id: Section
  label: string
  color: string
}

export function ScrollIndicator() {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeSection, setActiveSection] = useState<Section>('hero')

  const sections: SectionInfo[] = [
    { id: 'hero', label: 'UII', color: '#1b5e5a' },
    { id: 'about', label: t.whatWeAre, color: '#d4613a' },
    { id: 'services', label: t.howWeWork, color: '#1b5e5a' },
    { id: 'stats', label: t.trackRecord, color: '#f2845f' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.querySelector('.about-section') as HTMLElement
      const servicesSection = document.querySelector('.services-section') as HTMLElement
      const statsSection = document.querySelector('.stats-section') as HTMLElement

      const scrollPosition = window.scrollY + window.innerHeight / 3

      if (statsSection && scrollPosition >= statsSection.offsetTop) {
        setActiveSection('stats')
      } else if (servicesSection && scrollPosition >= servicesSection.offsetTop) {
        setActiveSection('services')
      } else if (aboutSection && scrollPosition >= aboutSection.offsetTop) {
        setActiveSection('about')
      } else {
        setActiveSection('hero')
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSectionClick = (sectionId: Section) => {
    const sectionMap: Record<Section, string> = {
      hero: '.hero',
      about: '.about-section',
      services: '.services-section',
      stats: '.stats-section',
    }

    const element = document.querySelector(sectionMap[sectionId])
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="scroll-indicator">
      <div className="scroll-dots">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`scroll-dot ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => handleSectionClick(section.id)}
            title={section.label}
            aria-label={`Go to ${section.label}`}
            style={{
              ['--dot-color' as any]: section.color,
            }}
          >
            <span className="dot-inner"></span>
          </button>
        ))}
      </div>
      <div className="scroll-label">{sections.find((s) => s.id === activeSection)?.label}</div>
    </nav>
  )
}

import React, { useState, useEffect } from 'react'
import './App.css'
import { UrbanScene } from './UrbanScene'
import { LanguagePicker } from './LanguagePicker'
import { useLanguage } from './LanguageContext'
import { translations } from './translations'

function App() {
  const { language } = useLanguage()
  const t = translations[language]
  const [scrollProgress, setScrollProgress] = useState(0)
  const [visibleCards, setVisibleCards] = useState<Set<string>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      // Track scroll progress for scroll bar
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = windowHeight > 0 ? window.scrollY / windowHeight : 0
      setScrollProgress(Math.min(progress, 1))

      // Detect visible cards for reveal animation
      const cardElements = document.querySelectorAll('[data-card]')
      const newVisible = new Set<string>()

      cardElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const cardId = el.getAttribute('data-card')
        if (rect.top < window.innerHeight * 0.75 && cardId) {
          newVisible.add(cardId)
        }
      })

      setVisibleCards(newVisible)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app-container">
      <LanguagePicker />

      {/* Scroll progress bar */}
      <div className="scroll-bar" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* Hero with WebGL background spanning full page */}
      <div className="page-background">
        <UrbanScene />
      </div>

      {/* Content cards overlaid on hero background */}
      <div className="cards-container">
        {/* Hero title card */}
        <section className="hero-card">
          <h1 className="hero-title">
            {language === 'ro' ? 'Unde sistemele urbane devin actiune' : t.heroTitle}
          </h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <button className="btn btn-primary">
            {language === 'ro' ? 'Descopera' : 'Discover'}
          </button>
        </section>

        {/* About section */}
        <section className="content-card" data-card="about">
          <div className="card-content">
            <div className="card-header">
              <span className="card-number">01</span>
              <h2 className="card-title">{t.whatWeAre}</h2>
            </div>
            <p className="card-text">{t.aboutParagraph}</p>
            <div className="card-quote">
              <p>"{t.doctrine}"</p>
            </div>
          </div>
        </section>

        {/* Services section */}
        <section className="content-card" data-card="services">
          <div className="card-content">
            <div className="card-header">
              <span className="card-number">02</span>
              <h2 className="card-title">{t.howWeWork}</h2>
            </div>
            <div className="services-grid">
              <div className="service-item">
                <h3>{t.publicAdmin.split('\n')[0]}</h3>
                <p>{t.publicAdminDesc}</p>
              </div>
              <div className="service-item">
                <h3>{t.euConsortium.split('\n')[0]}</h3>
                <p>{t.euConsortiumDesc}</p>
              </div>
              <div className="service-item">
                <h3>{t.corporatePartnerships.split('\n')[0]}</h3>
                <p>{t.corporateDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="content-card" data-card="stats">
          <div className="card-content">
            <div className="card-header">
              <span className="card-number">03</span>
              <h2 className="card-title">{t.trackRecord}</h2>
            </div>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <p>{t.projects}</p>
              </div>
              <div className="stat-item">
                <div className="stat-number">3</div>
                <p>{t.decisionLevels}</p>
              </div>
              <div className="stat-item">
                <div className="stat-number">10</div>
                <p>{t.japaneseOrgs}</p>
              </div>
              <div className="stat-item">
                <div className="stat-number">2025</div>
                <p>{t.expoRepresentation}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="content-card cta-card" data-card="cta">
          <div className="card-content">
            <h2>{t.readyToTransform}</h2>
            <p>{t.ctaSubtitle}</p>
            <div className="btn-group">
              <button className="btn btn-primary">{t.getInTouch}</button>
              <button className="btn btn-secondary">{t.learnMore}</button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-card">
          <div className="footer-content">
            <h3>Urban Innovation Institute</h3>
            <p>{t.bucharest}</p>
            <a href="mailto:contact@urbaninnovationinstitute.ro">{t.contact}</a>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App

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
      // Track scroll progress for parallax
      const windowHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = windowHeight > 0 ? window.scrollY / windowHeight : 0
      setScrollProgress(Math.min(progress, 1))

      // Detect visible cards for scroll reveal
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
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <LanguagePicker />

      {/* Hero Section with WebGL & Gradient */}
      <section className="hero" style={{ '--scroll-y': `${scrollProgress * 30}px` } as React.CSSProperties}>
        <UrbanScene />
        <div className="hero-content">
          <h1 className="hero-title">
            {language === 'ro' ? 'Unde sistemele urbane devin actiune' : t.heroTitle}
          </h1>
          <p className="hero-subtitle">{t.heroSubtitle}</p>
          <button className="btn btn-primary">
            {language === 'ro' ? 'Descopera' : 'Discover'}
          </button>
        </div>

        {/* Gradient overlay shapes */}
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
      </section>

      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* Content Sections - Card Based */}
      <div className="content-wrapper">
        {/* What We Are */}
        <section className="content-section">
          <div className="section-header">
            <span className="section-number">01</span>
            <h2 className="section-title">{t.whatWeAre}</h2>
          </div>
          <div className="section-container">
            <div
              className={`card card-large ${visibleCards.has('about') ? 'visible' : ''}`}
              data-card="about"
              style={{ '--card-delay': '0ms' } as React.CSSProperties}
            >
              <p>{t.aboutParagraph}</p>
              <div className="card-quote">
                <p>"{t.doctrine}"</p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="content-section">
          <div className="section-header">
            <span className="section-number">02</span>
            <h2 className="section-title">{t.howWeWork}</h2>
          </div>
          <div className="section-container">
            <div className="cards-grid">
              <div
                className={`card ${visibleCards.has('service-1') ? 'visible' : ''}`}
                data-card="service-1"
                style={{ '--card-delay': '0ms' } as React.CSSProperties}
              >
                <h3>{t.publicAdmin.split('\n')[0]}</h3>
                <p>{t.publicAdminDesc}</p>
              </div>
              <div
                className={`card ${visibleCards.has('service-2') ? 'visible' : ''}`}
                data-card="service-2"
                style={{ '--card-delay': '100ms' } as React.CSSProperties}
              >
                <h3>{t.euConsortium.split('\n')[0]}</h3>
                <p>{t.euConsortiumDesc}</p>
              </div>
              <div
                className={`card ${visibleCards.has('service-3') ? 'visible' : ''}`}
                data-card="service-3"
                style={{ '--card-delay': '200ms' } as React.CSSProperties}
              >
                <h3>{t.corporatePartnerships.split('\n')[0]}</h3>
                <p>{t.corporateDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Track Record */}
        <section className="content-section">
          <div className="section-header">
            <span className="section-number">03</span>
            <h2 className="section-title">{t.trackRecord}</h2>
          </div>
          <div className="section-container">
            <div className="stats-grid">
              <div
                className={`stat-card ${visibleCards.has('stat-1') ? 'visible' : ''}`}
                data-card="stat-1"
                style={{ '--card-delay': '0ms' } as React.CSSProperties}
              >
                <div className="stat-number">100+</div>
                <p>{t.projects}</p>
              </div>
              <div
                className={`stat-card ${visibleCards.has('stat-2') ? 'visible' : ''}`}
                data-card="stat-2"
                style={{ '--card-delay': '100ms' } as React.CSSProperties}
              >
                <div className="stat-number">3</div>
                <p>{t.decisionLevels}</p>
              </div>
              <div
                className={`stat-card ${visibleCards.has('stat-3') ? 'visible' : ''}`}
                data-card="stat-3"
                style={{ '--card-delay': '200ms' } as React.CSSProperties}
              >
                <div className="stat-number">10</div>
                <p>{t.japaneseOrgs}</p>
              </div>
              <div
                className={`stat-card ${visibleCards.has('stat-4') ? 'visible' : ''}`}
                data-card="stat-4"
                style={{ '--card-delay': '300ms' } as React.CSSProperties}
              >
                <div className="stat-number">2025</div>
                <p>{t.expoRepresentation}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="content-section cta-section">
          <div
            className={`card card-cta ${visibleCards.has('cta') ? 'visible' : ''}`}
            data-card="cta"
          >
            <h2>{t.readyToTransform}</h2>
            <p>{t.ctaSubtitle}</p>
            <div className="btn-group">
              <button className="btn btn-primary">{t.getInTouch}</button>
              <button className="btn btn-secondary">{t.learnMore}</button>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-info">
            <h3>Urban Innovation Institute</h3>
            <p>{t.bucharest}</p>
          </div>
          <div className="footer-links">
            <a href="mailto:contact@urbaninnovationinstitute.ro">{t.contact}</a>
            <a href="#">urbaninnovationinstitute.ro</a>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

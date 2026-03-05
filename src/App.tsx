import React from 'react'
import './App.css'
import { UrbanScene } from './UrbanScene'
import { LanguagePicker } from './LanguagePicker'
import { ScrollIndicator } from './ScrollIndicator'
import { SectionDivider } from './SectionDivider'
import { useLanguage } from './LanguageContext'
import { translations } from './translations'

function App() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <>
      <LanguagePicker />
      <ScrollIndicator />

      {/* Hero Section */}
      <section className="hero">
        <UrbanScene />
        <div className="hero-wrapper">
          <div className="hero-content">
            <p className="hero-tag">{t.tagline}</p>
            <h1 className="hero-title">
              {language === 'ro' ? (
                <>
                  Unde sistemele urbane<br />devin <em>actiune</em>
                </>
              ) : (
                <em>{t.heroTitle}</em>
              )}
            </h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <button className="btn btn-primary">{t.discoverBtn}</button>
          </div>
          <div className="hero-visual">
            <div className="visual-shape"></div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider
        number="01"
        title={t.whatWeAre}
        subtitle={language === 'ro' ? 'Cine suntem si ce facem noi de fapt' : language === 'nl' ? 'Wie we zijn en wat we werkelijk doen' : 'Who we are and what we actually do'}
        color="teal"
      />

      {/* What We Are Section */}
      <section className="about-section">
        <div className="section-content">
          <div className="about-content">
            <div className="about-text">
              <p>
                <strong>UII {t.aboutParagraph}</strong>
              </p>
              <div className="doctrine-quote">
                <p>
                  <em>"{t.doctrine}"</em>
                </p>
              </div>
              <div className="clarification">
                <p>
                  <strong>{t.whatWeAreNot}</strong>
                </p>
                <ul>
                  <li>{t.notThinkTank}</li>
                  <li>{t.notConsulting}</li>
                  <li>{t.notNGO}</li>
                </ul>
                <p>
                  <strong>{t.whatWeAreYes}</strong> {t.areStructure}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider
        number="02"
        title={t.howWeWork}
        subtitle={language === 'ro' ? 'Metodologie si abordare' : language === 'nl' ? 'Methodologie en aanpak' : 'Methodology and approach'}
        color="coral"
      />

      {/* How We Work Section */}
      <section className="services-section">
        <div className="section-content">
          <div className="services-grid">
            <div className="service-card">
              <h3>{t.publicAdmin.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</h3>
              <p>{t.publicAdminDesc}</p>
            </div>
            <div className="service-card">
              <h3>{t.euConsortium.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</h3>
              <p>{t.euConsortiumDesc}</p>
            </div>
            <div className="service-card">
              <h3>{t.corporatePartnerships.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br /></React.Fragment>)}</h3>
              <p>{t.corporateDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <SectionDivider
        number="03"
        title={t.trackRecord}
        subtitle={language === 'ro' ? 'Realizari si numere' : language === 'nl' ? 'Resultaten en statistieken' : 'Results and statistics'}
        color="teal"
      />

      {/* Track Record Section */}
      <section className="stats-section">
        <div className="section-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <p>{t.projects}</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">3</div>
              <p>{t.decisionLevels}</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">10</div>
              <p>{t.japaneseOrgs}</p>
            </div>
            <div className="stat-card">
              <div className="stat-number">2025</div>
              <p>{t.expoRepresentation}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>{t.readyToTransform}</h2>
          <p>{t.ctaSubtitle}</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">{t.getInTouch}</button>
            <button className="btn btn-secondary">{t.learnMore}</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="section-content">
          <div className="footer-content">
            <div className="footer-info">
              <h3>Urban Innovation Institute</h3>
              <p>{t.bucharest}</p>
            </div>
            <div className="footer-contact">
              <p>
                <strong>{t.contact}</strong> contact@urbaninnovationinstitute.ro
              </p>
              <p>
                <strong>{t.website}</strong> urbaninnovationinstitute.ro
              </p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2026 Urban Innovation Institute. {t.allRights}</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

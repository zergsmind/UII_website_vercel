import { useState } from 'react'
import { useLanguage } from './LanguageContext'
import { Language } from './translations'
import './LanguagePicker.css'

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'ro', label: 'Română', flag: '🇷🇴' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
]

export function LanguagePicker() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const currentLang = languages.find((l) => l.code === language)

  const handleLanguageChange = (code: Language) => {
    setLanguage(code)
    setIsOpen(false)
  }

  return (
    <div className="language-picker">
      <button
        className="lang-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        title="Change language"
      >
        <span className="lang-flag">{currentLang?.flag}</span>
        <span className="lang-code">{currentLang?.code.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`lang-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
              title={lang.label}
              aria-label={`Switch to ${lang.label}`}
            >
              <span className="lang-flag">{lang.flag}</span>
              <span className="lang-label">{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

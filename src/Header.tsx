import { LanguagePicker } from './LanguagePicker'

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-container">
            <svg className="logo" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <path d="M870.9,225.7v151.8h-51c-4.1,0-16.1,9.9-14.1,16.2-5.7,109.5,8.7,227.8-2.2,336.2-20.9,209.5-231.2,285.7-413.7,222.9-237.7-81.7-154.3-367.7-169.7-558.9,0-6.5-10.7-16.4-16.1-16.4h-47.7c-.7,0-1.7,2.7-3.3,2.2v-154h189.8c23.5,0,48.5,26.7,52.9,49s2.2,60.5,2.5,86.5c1.2,104.5-2.8,208.6-.1,312.4,1.5,55.5,13.3,106.1,73.3,124,79.1,23.6,153-19.6,156.7-104.5l.2-414.1c2.1-24.9,29.9-53.4,55.1-53.4h187.6Z" fill="currentColor"/>
              <path d="M276.2,52.8c102.8-14.9,113.3,129.4,27.1,142-100.5,14.7-113.6-129.4-27.1-142Z" fill="currentColor"/>
              <path d="M722.9,52.8c103.1-15,112.4,128.6,27.1,142-99,15.6-114.7-129.3-27.1-142Z" fill="currentColor"/>
            </svg>
          </div>
          <span className="header-title">Urban Innovation Institute</span>
        </div>
        <LanguagePicker />
      </div>
    </header>
  )
}

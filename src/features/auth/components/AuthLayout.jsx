// The layout arranges a left "welcome" panel and a right "form" panel.
// Visual styles live in AuthLayout.module.css, imported as 's'.
import s from './AuthLayout.module.css'
import logo from "../../../assets/medtwin-logo.svg";


export default function AuthLayout({ children }) {
  return (
    <div className={s.screen}>
      <div className={s.card}>
        {/* Left marketing/welcome panel */}
        <section className={s.leftPane}>
          <img src={logo} alt="MedTwin Logo" className={s.logoImg} />

          <h2 className={s.title}>Welcome to MedTwin</h2>
          <p className={s.subtitle}>
            Your Digital Twin Healthcare Platform. Monitor your health metrics in
            real-time with AI-powered insights.
          </p>

          <ul className={s.bullets}>
            <li><span className={s.check}>✓</span> Real-time health monitoring</li>
            <li><span className={s.check}>✓</span> AI-powered health predictions</li>
            <li><span className={s.check}>✓</span> Personalized treatment plans</li>
          </ul>
        </section>

        {/* Right content area: header + injected form */}
        <section className={s.rightPane}>
          <header className={s.brandRow}>
            <img src={logo} alt="MedTwin Logo Small" className={s.iconImg} />

            <div>
              <div className={s.brandName}>MedTwin</div>
              <div className={s.brandTag}>Digital Twin Healthcare</div>
            </div>
          </header>
          <div className={s.inner}>{children}</div>
        </section>
      </div>
    </div>
  )
}

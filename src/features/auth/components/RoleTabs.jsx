// Two buttons that toggle between "patient" and "doctor" roles.
// Styling is local in RoleTabs.module.css.
import s from './RoleTabs.module.css'

export default function RoleTabs({ role, onChange }) {
  return (
    <div className={s.row}>
      <button
        type="button"
        onClick={() => onChange('patient')}
        className={`${s.tab} ${role === 'patient' ? s.active : ''}`}
      >
        Patient Login
      </button>
      <button
        type="button"
        onClick={() => onChange('doctor')}
        className={`${s.tab} ${role === 'doctor' ? s.active : ''}`}
      >
        Doctor Login
      </button>
    </div>
  )
}

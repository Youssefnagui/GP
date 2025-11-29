// Displays an icon, title, description, and a radio-style selector.
// Selection is controlled by the parent (SignUpPage).
import s from "./RoleChoiceCard.module.css";

const icons = {
  stethoscope: (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <path d="M6 3v5a4 4 0 0 0 8 0V3" fill="none" stroke="#334155" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M10 14v3a5 5 0 0 0 10 0v-2" fill="none" stroke="#334155" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="20" cy="12" r="2" fill="none" stroke="#334155" strokeWidth="1.8"/>
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="none" stroke="#334155" strokeWidth="1.8"/>
      <path d="M4 20a8 8 0 0 1 16 0" fill="none" stroke="#334155" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
};

export default function RoleChoiceCard({ title, description, icon, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`${s.card} ${selected ? s.active : ""}`}
      aria-pressed={selected}
    >
      <div className={s.iconWrap}>{icons[icon]}</div>

      <div className={s.body}>
        <div className={s.title}>{title}</div>
        <div className={s.desc}>{description}</div>
      </div>

      <div className={`${s.radio} ${selected ? s.radioOn : ""}`} aria-hidden="true">
        <div className={s.radioDot} />
      </div>
    </button>
  );
}

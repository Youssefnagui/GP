// Stepper.jsx — simple 1–3 indicator with connecting lines
import s from "./Stepper.module.css";

export default function Stepper({ current = 1, total = 3 }) {
  const steps = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className={s.row} aria-label={`Step ${current} of ${total}`}>
      {steps.map((n, idx) => (
        <div key={n} className={s.item}>
          <div className={`${s.dot} ${n <= current ? s.active : ""}`}>{n}</div>
          {idx < steps.length - 1 && (
            <div className={`${s.bar} ${n < current ? s.filled : ""}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// Collects doctor-specific data. State is lifted to the parent via onChange.
// We use controlled inputs as recommended by React docs.
import s from "./DoctorDetailsForm.module.css";

export default function DoctorDetailsForm({ value, onChange, errors }) {
  // Helper to update parent state
  const set = (key, v) => onChange({ ...value, [key]: v });

  return (
    <div className={s.form}>
      <div className={s.row2}>
        <label className={s.field}>
          <span className={s.label}>Full name</span>
          <input
            className={s.input}
            value={value.fullName || ""}
            onChange={e => set("fullName", e.target.value)}
            placeholder="Dr. Jane Smith"
          />
          {errors.fullName && <div className={s.err}>{errors.fullName}</div>}
        </label>

        <label className={s.field}>
          <span className={s.label}>Email</span>
          <input
            type="email"
            className={s.input}
            value={value.email || ""}
            onChange={e => set("email", e.target.value)}
            placeholder="name@hospital.org"
            autoComplete="email"
          />
          {errors.email && <div className={s.err}>{errors.email}</div>}
        </label>
      </div>

      <div className={s.row2}>
        <label className={s.field}>
          <span className={s.label}>Password</span>
          <input
            type="password"
            className={s.input}
            value={value.password || ""}
            onChange={e => set("password", e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />
          {errors.password && <div className={s.err}>{errors.password}</div>}
        </label>

        <label className={s.field}>
          <span className={s.label}>Confirm password</span>
          <input
            type="password"
            className={s.input}
            value={value.confirmPassword || ""}
            onChange={e => set("confirmPassword", e.target.value)}
            placeholder="Repeat password"
            autoComplete="new-password"
          />
          {errors.confirmPassword && <div className={s.err}>{errors.confirmPassword}</div>}
        </label>
      </div>

      <div className={s.row2}>
        <label className={s.field}>
          <span className={s.label}>Medical license #</span>
          <input
            className={s.input}
            value={value.license || ""}
            onChange={e => set("license", e.target.value)}
            placeholder="e.g., EG-123456"
          />
          {errors.license && <div className={s.err}>{errors.license}</div>}
        </label>

        <label className={s.field}>
          <span className={s.label}>Specialty</span>
          <select
            className={s.input}
            value={value.specialty || ""}
            onChange={e => set("specialty", e.target.value)}
          >
            <option value="">Select a specialty</option>
            <option>Cardiology</option>
            <option>Internal Medicine</option>
            <option>Orthopedics</option>
            <option>Pediatrics</option>
            <option>Neurology</option>
            <option>Radiology</option>
          </select>
          {errors.specialty && <div className={s.err}>{errors.specialty}</div>}
        </label>
      </div>

      <div className={s.row2}>
        <label className={s.field}>
          <span className={s.label}>Hospital / Clinic</span>
          <input
            className={s.input}
            value={value.organization || ""}
            onChange={e => set("organization", e.target.value)}
            placeholder="Cairo University Hospitals"
          />
          {errors.organization && <div className={s.err}>{errors.organization}</div>}
        </label>

        <label className={s.field}>
          <span className={s.label}>Phone</span>
          <input
            className={s.input}
            value={value.phone || ""}
            onChange={e => set("phone", e.target.value)}
            placeholder="+20 10 1234 5678"
          />
          {errors.phone && <div className={s.err}>{errors.phone}</div>}
        </label>
      </div>
    </div>
  );
}

// PatientDetailsForm.jsx
// - Controlled inputs (parent owns state via value/onChange)
// - Conditionally renders HEART or DIABETIC sections
// - Keep visuals in PatientDetailsForm.module.css

import s from "./PatientDetailsForm.module.css";

export default function PatientDetailsForm({ value, onChange, errors }) {
  const set = (k, v) => onChange({ ...value, [k]: v });

  const cat = value.conditionCategory || ""; // 'heart' | 'diabetic' | ''

  return (
    <div className={s.form}>
      {/* Basic identity */}
      <div className={s.row2}>
        <label className={s.field}>
          <span className={s.label}>Full name</span>
          <input
            className={s.input}
            value={value.fullName || ""}
            onChange={(e) => set("fullName", e.target.value)}
            placeholder="Jane Doe"
          />
          {errors.fullName && <div className={s.err}>{errors.fullName}</div>}
        </label>

        <label className={s.field}>
          <span className={s.label}>Email</span>
          <input
            type="email"
            className={s.input}
            value={value.email || ""}
            onChange={(e) => set("email", e.target.value)}
            placeholder="you@example.com"
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
            onChange={(e) => set("password", e.target.value)}
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
            onChange={(e) => set("confirmPassword", e.target.value)}
            placeholder="Repeat password"
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <div className={s.err}>{errors.confirmPassword}</div>
          )}
        </label>
      </div>

      <div className={s.row3}>
        <label className={s.field}>
          <span className={s.label}>Date of birth</span>
          <input
            type="date"
            className={s.input}
            value={value.dob || ""}
            onChange={(e) => set("dob", e.target.value)}
          />
          {errors.dob && <div className={s.err}>{errors.dob}</div>}
        </label>

        <label className={s.field}>
          <span className={s.label}>Gender</span>
          <select
            className={s.input}
            value={value.gender || ""}
            onChange={(e) => set("gender", e.target.value)}
          >
            <option value="">Select</option>
            <option>Female</option>
            <option>Male</option>
            <option>Other</option>
            <option>Prefer not to say</option>
          </select>
          {errors.gender && <div className={s.err}>{errors.gender}</div>}
        </label>

        <label className={s.field}>
          <span className={s.label}>Phone</span>
          <input
            className={s.input}
            value={value.phone || ""}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+20 10 1234 5678"
          />
          {errors.phone && <div className={s.err}>{errors.phone}</div>}
        </label>
      </div>

      {/* Condition Category */}
      <div className={s.card}>
        <div className={s.cardTitle}>Health Condition</div>

        <div className={s.row2}>
          <label className={s.field}>
            <span className={s.label}>Condition category</span>
            <select
              className={s.input}
              value={cat}
              onChange={(e) => {
                // reset category-specific fields when switching
                const next = e.target.value;
                onChange({
                  ...value,
                  conditionCategory: next,
                  // clear both groups to avoid leftover values
                  cardiacType: "",
                  cardiologist: "",
                  lastEcgDate: "",
                  cardiacMeds: "",
                  diabetesType: "",
                  insulin: "",
                  hba1c: "",
                  lastGlucose: "",
                  endocrinologist: "",
                });
              }}
            >
              <option value="">Select</option>
              <option value="heart">Heart / Cardiac</option>
              <option value="diabetic">Diabetic</option>
            </select>
            {errors.conditionCategory && (
              <div className={s.err}>{errors.conditionCategory}</div>
            )}
          </label>

          {/* Show condition "type" selector for chosen category */}
          {cat === "heart" && (
            <label className={s.field}>
              <span className={s.label}>Cardiac type</span>
              <select
                className={s.input}
                value={value.cardiacType || ""}
                onChange={(e) => set("cardiacType", e.target.value)}
              >
                <option value="">Select</option>
                <option>Hypertension</option>
                <option>Coronary Artery Disease</option>
                <option>Heart Failure</option>
                <option>Arrhythmia</option>
              </select>
              {errors.cardiacType && (
                <div className={s.err}>{errors.cardiacType}</div>
              )}
            </label>
          )}

          {cat === "diabetic" && (
            <label className={s.field}>
              <span className={s.label}>Diabetes type</span>
              <select
                className={s.input}
                value={value.diabetesType || ""}
                onChange={(e) => set("diabetesType", e.target.value)}
              >
                <option value="">Select</option>
                <option>Type 1</option>
                <option>Type 2</option>
                <option>Gestational</option>
              </select>
              {errors.diabetesType && (
                <div className={s.err}>{errors.diabetesType}</div>
              )}
            </label>
          )}
        </div>

        {/* Category-specific required fields */}
        {cat === "heart" && (
          <div className={s.row3}>
            <label className={s.field}>
              <span className={s.label}>Cardiologist / Clinic</span>
              <input
                className={s.input}
                value={value.cardiologist || ""}
                onChange={(e) => set("cardiologist", e.target.value)}
                placeholder="Dr. Ahmed — ABC Cardio Center"
              />
              {errors.cardiologist && (
                <div className={s.err}>{errors.cardiologist}</div>
              )}
            </label>

            <label className={s.field}>
              <span className={s.label}>Last ECG date</span>
              <input
                type="date"
                className={s.input}
                value={value.lastEcgDate || ""}
                onChange={(e) => set("lastEcgDate", e.target.value)}
              />
              {errors.lastEcgDate && (
                <div className={s.err}>{errors.lastEcgDate}</div>
              )}
            </label>

            <label className={s.field}>
              <span className={s.label}>Current heart meds</span>
              <input
                className={s.input}
                value={value.cardiacMeds || ""}
                onChange={(e) => set("cardiacMeds", e.target.value)}
                placeholder="e.g., beta blockers, ACE inhibitors"
              />
              {errors.cardiacMeds && (
                <div className={s.err}>{errors.cardiacMeds}</div>
              )}
            </label>
          </div>
        )}

        {cat === "diabetic" && (
          <div className={s.row3}>
            <label className={s.field}>
              <span className={s.label}>Insulin usage</span>
              <select
                className={s.input}
                value={value.insulin || ""}
                onChange={(e) => set("insulin", e.target.value)}
              >
                <option value="">Select</option>
                <option>Yes</option>
                <option>No</option>
              </select>
              {errors.insulin && <div className={s.err}>{errors.insulin}</div>}
            </label>

            <label className={s.field}>
              <span className={s.label}>HbA1c (%)</span>
              <input
                type="number"
                step="0.1"
                className={s.input}
                value={value.hba1c || ""}
                onChange={(e) => set("hba1c", e.target.value)}
                placeholder="e.g., 7.2"
              />
              {errors.hba1c && <div className={s.err}>{errors.hba1c}</div>}
            </label>

            <label className={s.field}>
              <span className={s.label}>Last glucose (mg/dL)</span>
              <input
                type="number"
                className={s.input}
                value={value.lastGlucose || ""}
                onChange={(e) => set("lastGlucose", e.target.value)}
                placeholder="e.g., 110"
              />
              {errors.lastGlucose && (
                <div className={s.err}>{errors.lastGlucose}</div>
              )}
            </label>
          </div>
        )}

        {cat === "diabetic" && (
          <div className={s.row1}>
            <label className={s.field}>
              <span className={s.label}>Endocrinologist / Clinic</span>
              <input
                className={s.input}
                value={value.endocrinologist || ""}
                onChange={(e) => set("endocrinologist", e.target.value)}
                placeholder="Dr. Mona — ABC Endocrine Center"
              />
              {errors.endocrinologist && (
                <div className={s.err}>{errors.endocrinologist}</div>
              )}
            </label>
          </div>
        )}
      </div>

      {/* Optional measurements */}
      <div className={s.row2}>
        <label className={s.field}>
          <span className={s.label}>Height (cm)</span>
          <input
            type="number"
            className={s.input}
            value={value.height || ""}
            onChange={(e) => set("height", e.target.value)}
            placeholder="170"
          />
        </label>

        <label className={s.field}>
          <span className={s.label}>Weight (kg)</span>
          <input
            type="number"
            className={s.input}
            value={value.weight || ""}
            onChange={(e) => set("weight", e.target.value)}
            placeholder="65"
          />
        </label>
      </div>

      <label className={s.field}>
        <span className={s.label}>Known conditions (optional)</span>
        <textarea
          rows={3}
          className={s.textarea}
          value={value.conditions || ""}
          onChange={(e) => set("conditions", e.target.value)}
          placeholder="e.g., hypertension, asthma"
        />
      </label>
    </div>
  );
}

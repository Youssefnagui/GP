import s from "./PatientReview.module.css";

export default function PatientReview({ value }) {
  const Row = ({ k, v }) => (
    <div className={s.row}>
      <div className={s.k}>{k}</div>
      <div className={s.v}>{v || "—"}</div>
    </div>
  );

  return (
    <div className={s.wrap}>
      <Row k="Full name" v={value.fullName} />
      <Row k="Email" v={value.email} />
      <Row k="Date of birth" v={value.dob} />
      <Row k="Gender" v={value.gender} />
      <Row k="Phone" v={value.phone} />
      <Row k="Height (cm)" v={value.height} />
      <Row k="Weight (kg)" v={value.weight} />

      <Row k="Condition category" v={value.conditionCategory === "heart" ? "Heart / Cardiac" : value.conditionCategory === "diabetic" ? "Diabetic" : ""} />
      {value.conditionCategory === "heart" && (
        <>
          <Row k="Cardiac type" v={value.cardiacType} />
          <Row k="Cardiologist / Clinic" v={value.cardiologist} />
          <Row k="Last ECG date" v={value.lastEcgDate} />
          <Row k="Current heart meds" v={value.cardiacMeds} />
        </>
      )}
      {value.conditionCategory === "diabetic" && (
        <>
          <Row k="Diabetes type" v={value.diabetesType} />
          <Row k="Insulin usage" v={value.insulin} />
          <Row k="HbA1c (%)" v={value.hba1c} />
          <Row k="Last glucose (mg/dL)" v={value.lastGlucose} />
          <Row k="Endocrinologist / Clinic" v={value.endocrinologist} />
        </>
      )}

      <Row k="Other conditions" v={value.conditions} />
      <div className={s.note}>Password is not shown for security.</div>
    </div>
  );
}

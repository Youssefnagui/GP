// Simple summary screen before final submit
import s from "./DoctorReview.module.css";

export default function DoctorReview({ value }) {
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
      <Row k="License #" v={value.license} />
      <Row k="Specialty" v={value.specialty} />
      <Row k="Hospital / Clinic" v={value.organization} />
      <Row k="Phone" v={value.phone} />
      <div className={s.note}>Password is not shown for security.</div>
    </div>
  );
}

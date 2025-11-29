import { useState } from "react";
import { Link } from "react-router-dom";
import s from "./SignUpPage.module.css";
import { useNavigate } from "react-router-dom";


import Stepper from "../components/Stepper.jsx";
import RoleChoiceCard from "../components/RoleChoiceCard.jsx";

import DoctorDetailsForm from "../components/DoctorDetailsForm.jsx";
import DoctorReview from "../components/DoctorReview.jsx";
import PatientDetailsForm from "../components/PatientDetailsForm.jsx";
import PatientReview from "../components/PatientReview.jsx";

import { registerDoctor, registerPatient } from "../api/authApi.js";
import logo from "../../../assets/medtwin-logo.svg";

export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);      // 'doctor' | 'patient'
  const [doctor, setDoctor] = useState({});
  const [patient, setPatient] = useState({});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const nextDisabled =
    (step === 1 && !role) ||
    (step === 2 && role === "doctor" && !isDoctorValid(doctor)) ||
    (step === 2 && role === "patient" && !isPatientValid(patient));

  function isEmail(s){ return /\S+@\S+\.\S+/.test(s); }

  function validateDoctor(v){
    const e = {};
    if (!v.fullName) e.fullName = "Full name is required";
    if (!v.email || !isEmail(v.email)) e.email = "Valid email is required";
    if (!v.password || v.password.length < 8) e.password = "Min 8 characters";
    if (v.confirmPassword !== v.password) e.confirmPassword = "Passwords do not match";
    if (!v.license) e.license = "License is required";
    if (!v.specialty) e.specialty = "Select your specialty";
    if (!v.organization) e.organization = "Hospital/Clinic is required";
    return e;
  }
  function isDoctorValid(v){ return Object.keys(validateDoctor(v)).length === 0; }

  function validatePatient(v){
  const e = {};
  const isEmail = (s) => /\S+@\S+\.\S+/.test(s);

  // Core identity
  if (!v.fullName) e.fullName = "Full name is required";
  if (!v.email || !isEmail(v.email)) e.email = "Valid email is required";
  if (!v.password || v.password.length < 8) e.password = "Min 8 characters";
  if (v.confirmPassword !== v.password) e.confirmPassword = "Passwords do not match";
  if (!v.dob) e.dob = "Date of birth is required";
  if (!v.gender) e.gender = "Select gender";

  // Condition category required
  if (!v.conditionCategory) {
    e.conditionCategory = "Please choose a condition category";
    return e; // stop early, no category-specific checks yet
  }

  if (v.conditionCategory === "heart") {
    if (!v.cardiacType) e.cardiacType = "Select cardiac type";
    if (!v.cardiologist) e.cardiologist = "Cardiologist / clinic is required";
    if (!v.lastEcgDate) e.lastEcgDate = "Last ECG date is required";
    if (!v.cardiacMeds) e.cardiacMeds = "List current heart meds";
  }

  if (v.conditionCategory === "diabetic") {
    if (!v.diabetesType) e.diabetesType = "Select diabetes type";
    if (!v.insulin) e.insulin = "Select insulin usage";
    if (!v.hba1c) e.hba1c = "Enter HbA1c";
    if (!v.lastGlucose) e.lastGlucose = "Enter last glucose";
    if (!v.endocrinologist) e.endocrinologist = "Endocrinologist / clinic is required";
  }

  return e;
}

  function isPatientValid(v){ return Object.keys(validatePatient(v)).length === 0; }

  async function handleContinue(){
    if (step === 1) { setStep(2); return; }

    if (step === 2) {
      if (role === "doctor") {
        const e = validateDoctor(doctor); setErrors(e);
        if (Object.keys(e).length) return; setStep(3); return;
      }
      if (role === "patient") {
        const e = validatePatient(patient); setErrors(e);
        if (Object.keys(e).length) return; setStep(3); return;
      }
    }

    if (step === 3) {
      try {
        setSubmitting(true);
        if (role === "doctor") {
          const { ok, doctorId } = await registerDoctor({ ...doctor, role: "doctor" });
          if (ok) alert(`Welcome, ${doctor.fullName}! Your ID is ${doctorId}.`);
        } else {
          const { ok, patientId } = await registerPatient({ ...patient, role: "patient" });
          if (ok) alert(`Welcome, ${patient.fullName}! Your ID is ${patientId}.`);
        }
        // TODO: navigate to dashboard or login
      } catch {
        alert("Registration failed. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  }
const navigate = useNavigate();

  function handleBack() {
  if (step === 1) {
    // When on step 1 → go back to login page
    navigate("/login");
    return;
  }

  // Otherwise go to previous step
  setErrors({});
  setStep(prev => Math.max(1, prev - 1));
}

  return (
    <div className={s.screen}>
      <div className={s.container}>
        <div className={s.header}>
          <img src={logo} alt="MedTwin" className={s.brandIcon} />
          <h1 className={s.brandTitle}>MedTwin</h1>
          <p className={s.brandSubtitle}>Create your MedTwin Account</p>
          <p className={s.brandHint}>
            {step === 1 ? "Choose your role to get started"
              : step === 2 ? (role === "doctor" ? "Enter your professional details" : "Enter your personal details")
              : "Review and submit"}
          </p>
        </div>

        <Stepper current={step} total={3} />

        {step === 1 && (
          <div className={s.grid}>
            <RoleChoiceCard
              title="Doctor"
              description="For healthcare professionals managing patient care"
              icon="stethoscope"
              selected={role === "doctor"}
              onSelect={() => setRole("doctor")}
            />
            <RoleChoiceCard
              title="Patient"
              description="For individuals managing their health conditions"
              icon="user"
              selected={role === "patient"}
              onSelect={() => setRole("patient")}
            />
          </div>
        )}

        {step === 2 && role === "doctor" && (
          <DoctorDetailsForm value={doctor} onChange={setDoctor} errors={errors} />
        )}

        {step === 2 && role === "patient" && (
          <PatientDetailsForm value={patient} onChange={setPatient} errors={errors} />
        )}

        {step === 3 && role === "doctor" && <DoctorReview value={doctor} />}
        {step === 3 && role === "patient" && <PatientReview value={patient} />}

        <div className={s.actions}>
          <button className={s.secondary} onClick={handleBack} disabled={ submitting}>Back</button>
          <button
            className={`${s.primary} ${(nextDisabled || submitting) ? s.disabled : ""}`}
            onClick={handleContinue}
            disabled={nextDisabled || submitting}
          >
            {step < 3 ? "Continue" : (submitting ? "Submitting..." : "Submit")}
          </button>
        </div>

        <div className={s.backRow}>
          Already have an account? <Link to="/login" className={s.link}>Back to Login</Link>
        </div>
      </div>
    </div>
  );
}

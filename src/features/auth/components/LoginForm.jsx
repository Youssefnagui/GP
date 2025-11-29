// Simple controlled form with basic validation.
// onSubmit is provided by the page; we only emit { email, password, role }.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import s from './LoginForm.module.css'

export default function LoginForm({ role = 'patient', onSubmit }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !password) { // tiny validation for demo
      setError('Please enter email and password.')
      return
    }
    setError('')
    onSubmit?.({ email, password, role })
  }

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label className={s.label}>
        <span className={s.labelText}>Email</span>
        <input
          type="email"
          placeholder="Enter your email"
          className={s.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
      </label>

      <label className={s.label}>
        <span className={s.labelText}>Password</span>
        <input
          type="password"
          placeholder="Enter your password"
          className={s.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />
      </label>

      <div className={s.rightText}>
        <Link to="/forgot-password" className={s.link}>
          Forgot password?
        </Link>
      </div>

      {error && <div className={s.errorBox}>{error}</div>}

      <button type="submit" className={s.cta}>
        Login
      </button>

      <p className={s.centerText}>
        Don&apos;t have an account?{' '}
        <Link to="/signup" className={s.link}>Sign up</Link>
      </p>
    </form>
  )
}

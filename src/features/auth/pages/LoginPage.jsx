// Page-level composition: layout + role tabs + form.
// Only orchestration lives here; no visual styling.
import { useState } from 'react'
import AuthLayout from '../components/AuthLayout.jsx'
import RoleTabs from '../components/RoleTabs.jsx'
import LoginForm from '../components/LoginForm.jsx'

export default function LoginPage() {
  const [role, setRole] = useState('patient')

  const handleLogin = ({ email, password, role }) => {
    // Replace this with an API call (fetch/axios) later.
    console.log('LOGIN', { email, password, role })
  }

  return (
    <AuthLayout>
      <h1 style={{fontSize: '18px', fontWeight: 600, marginBottom: 8}}>
        Login to your account
      </h1>
      <RoleTabs role={role} onChange={setRole} />
      <LoginForm role={role} onSubmit={handleLogin} />
    </AuthLayout>
  )
}

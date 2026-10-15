import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerCustomer } from '../services/axios'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullname: '', email: '', password: '', phone: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }
    if (!/^\d{10}$/.test(form.phone)) {
      setError('Phone number must contain 10 digits')
      return
    }

    setLoading(true)
    try {
      await registerCustomer({ ...form, phone: Number(form.phone) })
      navigate('/login', { state: { message: 'Account created successfully. Please login.' } })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="card">
        <h1>ShopKart</h1>
        <p className="subtitle">Create your account</p>

        <form onSubmit={handleSubmit}>
          <label>Full Name<input name="fullname" value={form.fullname} onChange={handleChange} required placeholder="Enter your full name" /></label>
          <label>Email<input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" /></label>
          <label>Password<input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6} placeholder="Minimum 6 characters" /></label>
          <label>Phone Number<input type="tel" name="phone" value={form.phone} onChange={handleChange} required pattern="[0-9]{10}" maxLength={10} placeholder="10 digit phone number" /></label>

          {error && <p className="error">{error}</p>}
          <button disabled={loading}>{loading ? 'Creating Account...' : 'Create Account'}</button>
        </form>

        <p className="switch">Already have an account? <Link to="/login">Login</Link></p>
      </section>
    </main>
  )
}

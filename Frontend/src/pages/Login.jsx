import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginCustomer } from '../services/axios'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (event) => setForm({ ...form, [event.target.name]: event.target.value })

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      await loginCustomer(form)
      navigate('/home', { replace: true })
    } catch {
      setError('Invalid Credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="card">
        <h1>ShopKart</h1>
        <p className="subtitle">Login to continue</p>

        {location.state?.message && <p className="success">{location.state.message}</p>}

        <form onSubmit={handleSubmit}>
          <label>Email<input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" /></label>
          <label>Password<input type="password" name="password" value={form.password} onChange={handleChange} required placeholder="Enter your password" /></label>
          {error && <p className="error">{error}</p>}
          <button disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>

        <p className="switch">Don't have an account? <Link to="/register">Register</Link></p>
      </section>
    </main>
  )
}

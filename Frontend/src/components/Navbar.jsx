import { Link, useNavigate } from 'react-router-dom'
import { logoutCustomer } from '../services/axios'

export default function Navbar() {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logoutCustomer()
    } finally {
      navigate('/login', { replace: true })
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link className="brand" to="/home">ShopKart</Link>
        <Link className="nav-link" to="/home">Home</Link>
        <Link className="nav-link" to="/products">Products</Link>
      </div>
      <button className="logout" onClick={handleLogout}>Logout</button>
    </nav>
  )
}

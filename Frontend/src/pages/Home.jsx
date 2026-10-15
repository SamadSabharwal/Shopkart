import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getMyProfile } from '../services/axios'
import './Home.css'

export default function Home() {
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  useEffect(() => {
    getMyProfile()
      .then(setCustomer)
      .catch(() => setUnauthorized(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="loading">Loading...</div>
  }

  if (unauthorized) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="home-page">

      <Navbar />

      <main className="home-content">

        {/* Hero Section */}
        <section className="hero-section">

          <div className="hero-text">

            <p className="welcome-label">
              Welcome to
            </p>

            <h1>
              Shop<span>Kart</span>
            </h1>

            <p className="hero-description">
              Your one-stop destination for everything you need.
              Discover great products, amazing deals and a smooth
              shopping experience.
            </p>

            <Link className="browse-button" to="/products">
              🛒 &nbsp; Browse Products
              <span>→</span>
            </Link>

          </div>


          {/* Shopping Illustration */}
          <div className="hero-image">

            <div className="circle-bg"></div>

            <div className="shopping-cart">
              🛒
            </div>

            <div className="floating-item item-one">
              🎧
            </div>

            <div className="floating-item item-two">
              👟
            </div>

            <div className="floating-item item-three">
              📦
            </div>

          </div>

        </section>


        {/* Features */}
        <section className="features-section">

          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>
              Get your orders delivered quickly and safely.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Shopping</h3>
            <p>
              Shop confidently with our secure platform.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3>Best Deals</h3>
            <p>
              Find quality products at great prices.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>Easy Experience</h3>
            <p>
              Simple and convenient shopping for everyone.
            </p>
          </div>

        </section>

      </main>

    </div>
  )
}
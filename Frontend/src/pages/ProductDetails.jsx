import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getProductById } from '../services/axios'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getProductById(id)
        setProduct(data.product)
      } catch (err) {
        if (err.response?.status === 404) {
          setError('Product not found.')
        } else {
          setError('Something went wrong while loading the product.')
        }
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  return (
    <div className="products-page">
      <Navbar />

      <main className="details-content">
        {loading && <div className="state-message">Loading product...</div>}

        {!loading && error && (
          <div className="details-error">
            <h1>{error}</h1>
            <Link className="details-button inline-button" to="/products">
              Back to Products
            </Link>
          </div>
        )}

        {!loading && !error && product && (
          <section className="product-details">
            <img
              className="details-image"
              src={product.image}
              alt={product.name}
              onError={(event) => {
                event.currentTarget.src = 'https://placehold.co/800x600?text=No+Image'
              }}
            />

            <div className="details-info">
              <p className="product-category">{product.category}</p>
              <h1>{product.name}</h1>
              <p className="details-price">₹{product.price.toLocaleString('en-IN')}</p>
              <p className="details-description">{product.description}</p>

              <p className={product.stock > 0 ? 'stock available' : 'stock out'}>
                {product.stock > 0
                  ? `${product.stock} units left`
                  : 'Out of stock'}
              </p>

              <button
                className="cart-button"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>

              <Link className="back-link" to="/products">
                ← Back to Products
              </Link>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

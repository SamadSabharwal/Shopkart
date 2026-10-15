import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/axios'

const categories = ['All Categories', 'Electronics', 'Fashion', 'Books', 'Home']

export default function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    const loadProducts = async () => {
      setLoading(true)
      setError('')

      try {
        const data = await getProducts(search, category)

        if (!cancelled) {
          setProducts(data.products || [])
        }
      } catch {
        if (!cancelled) {
          setProducts([])
          setError('Something went wrong while loading products.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [search, category])

  return (
    <div className="products-page">
      <Navbar />

      <main className="products-content">
        <div className="products-heading">
          <div>
            <h1>Discover Products</h1>
            <p>Find something you love from our catalogue.</p>
          </div>
        </div>

        <section className="filters">
          <input
            className="search-input"
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="category-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </section>

        {loading && <div className="state-message">Loading products...</div>}

        {!loading && error && (
          <div className="state-message error-state">{error}</div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="state-message">No products found.</div>
        )}

        {!loading && !error && products.length > 0 && (
          <section className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </section>
        )}
      </main>
    </div>
  )
}

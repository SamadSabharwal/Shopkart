import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        onError={(event) => {
          event.currentTarget.src = 'https://placehold.co/600x400?text=No+Image'
        }}
      />

      <div className="product-card-body">
        <p className="product-category">{product.category}</p>
        <h2>{product.name}</h2>
        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>

        <p className={product.stock > 0 ? 'stock available' : 'stock out'}>
          {product.stock > 0 ? `${product.stock} units left` : 'Out of stock'}
        </p>

        <Link className="details-button" to={`/products/${product._id}`}>
          View Details
        </Link>
      </div>
    </article>
  )
}

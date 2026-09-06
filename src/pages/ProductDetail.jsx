import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { products } from '../data/products';
import { formatCurrency } from '../utils/currency';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  const { items, addItem, increase, decrease, remove } = useCart();
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  if (!product) {
    return (
      <main className="product-detail container">
        <h1>Product not found</h1>
        <Link className="product-detail__back" to="/shop"><ArrowLeft size={17} /> Back to shop</Link>
      </main>
    );
  }

  const cartItem = items.find((item) => item.id === product.id);

  function handleAddToCart() {
    addItem(product, selectedQuantity);
    setSelectedQuantity(1);
  }

  return (
    <main className="product-detail container">
      <Link className="product-detail__back" to="/"><ArrowLeft size={17} /> Back to home</Link>
      <section className="product-detail__content">
        <div className="product-detail__image-wrap">
          <img src={product.image} alt={product.name} className="product-detail__image" />
        </div>
        <div className="product-detail__info">
          <p className="product-detail__eyebrow">Featured collection</p>
          <h1>{product.name}</h1>
          <p className="product-detail__price">{formatCurrency(product.price)}</p>
          <p className="product-detail__description">A beautifully balanced piece made to bring comfort, character, and a considered finish to your everyday interior.</p>
          <ul>
            <li><Check size={18} /> Carefully selected materials</li>
            <li><Check size={18} /> Designed for lasting comfort</li>
            <li><Check size={18} /> Fast and free delivery</li>
          </ul>
          <div className="product-detail__purchase">
            <div className="product-detail__quantity" aria-label="Quantity to add">
              <button type="button" onClick={() => setSelectedQuantity((quantity) => Math.max(1, quantity - 1))} aria-label="Decrease quantity">
                <Minus size={17} />
              </button>
              <span>{selectedQuantity}</span>
              <button type="button" onClick={() => setSelectedQuantity((quantity) => quantity + 1)} aria-label="Increase quantity">
                <Plus size={17} />
              </button>
            </div>
            <Button type="button" variant="primary-solid" onClick={handleAddToCart}>
              <ShoppingBag size={17} /> Add to cart
            </Button>
          </div>
          {cartItem && (
            <div className="product-detail__cart-controls">
              <div>
                <strong>In your cart</strong>
                <span>{cartItem.quantity} {cartItem.quantity === 1 ? 'item' : 'items'}</span>
              </div>
              <div className="product-detail__cart-actions">
                <div className="product-detail__quantity" aria-label="Cart quantity">
                  <button type="button" onClick={() => decrease(product.id)} aria-label="Decrease cart quantity"><Minus size={16} /></button>
                  <span>{cartItem.quantity}</span>
                  <button type="button" onClick={() => increase(product.id)} aria-label="Increase cart quantity"><Plus size={16} /></button>
                </div>
                <button type="button" className="product-detail__remove" onClick={() => remove(product.id)}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            </div>
          )}
          <Link className="product-detail__shop-link" to="/shop">View the full collection</Link>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
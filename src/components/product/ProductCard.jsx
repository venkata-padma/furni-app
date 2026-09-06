import { Minus, Plus, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/currency';
import './ProductCard.css';

function ProductCard({ product }) {
  const { name, price, image } = product;
  const { items, addItem, increase, decrease } = useCart();
  const { has, toggle } = useWishlist();
  const saved = has(product.id);
  const productId = String(product.id).replace(/-\d+$/, '');
  const cartItem = items.find((item) => item.id === productId);

  return (
    <article className="product-card">
      <button
        type="button"
        className={`product-card__wish${saved ? ' product-card__wish--on' : ''}`}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${name} from wishlist` : `Save ${name} to wishlist`}
        onClick={() => toggle(product)}
      >
        <Heart size={17} strokeWidth={2} fill={saved ? 'currentColor' : 'none'} />
      </button>
      <img className="product-card__img" src={image} alt={name} />
      <div className="product-card__info">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">{formatCurrency(price)}</p>
      </div>
      {cartItem ? (
        <div className="product-card__quantity" aria-label={`${cartItem.quantity} ${name} in cart`}>
          <button
            type="button"
            className="product-card__quantity-btn"
            aria-label={cartItem.quantity === 1 ? `Remove ${name} from cart` : `Decrease ${name} quantity`}
            onClick={() => decrease(cartItem.id)}
          >
            <Minus size={16} strokeWidth={2.5} />
          </button>
          <span className="product-card__quantity-value">{cartItem.quantity}</span>
          <button
            type="button"
            className="product-card__quantity-btn"
            aria-label={`Increase ${name} quantity`}
            onClick={() => increase(cartItem.id)}
          >
            <Plus size={16} strokeWidth={2.5} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="product-card__add"
          aria-label={`Add ${name} to cart`}
          onClick={() => addItem(product)}
        >
          <Plus size={20} strokeWidth={3} />
        </button>
      )}
    </article>
  );
}

export default ProductCard;

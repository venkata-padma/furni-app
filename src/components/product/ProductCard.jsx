import { Plus, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { name, price, image } = product;
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const saved = has(product.id);

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
        <p className="product-card__price">${price.toFixed(2)}</p>
      </div>
      <button
        type="button"
        className="product-card__add"
        aria-label={`Add ${name} to cart`}
        onClick={() => addItem(product)}
      >
        <Plus size={20} strokeWidth={3} />
      </button>
    </article>
  );
}

export default ProductCard;

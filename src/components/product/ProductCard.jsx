import { Plus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { name, price, image } = product;
  const { addItem } = useCart();

  return (
    <article className="product-card">
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

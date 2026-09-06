import { Trash2, ShoppingCart } from 'lucide-react';
import AccountEmpty from '../../components/account/AccountEmpty';
import Button from '../../components/common/Button';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import './AccountPage.css';

function Wishlist() {
  const { items, remove, clear } = useWishlist();
  const { addItem } = useCart();

  if (!items.length) {
    return (
      <AccountEmpty
        image="/no-orders.png"
        imageAlt="Empty shopping cart illustration"
        title="Your wishlist is empty"
        body="Tap the heart on any piece in the shop to keep it here while you decide."
        actionLabel="Explore the Shop"
        actionTo="/shop"
      />
    );
  }

  function moveToCart(item) {
    addItem(item);
    remove(item.id);
  }

  function moveAllToCart() {
    items.forEach((item) => addItem(item));
    clear();
  }

  return (
    <div className="account-card" data-reveal>
      <header className="account-card__head account-card__head--row">
        <div>
          <h2 className="account-card__title">Wishlist</h2>
          <p className="account-card__sub">
            {items.length} saved piece{items.length === 1 ? '' : 's'}.
          </p>
        </div>
        <Button type="button" variant="primary-solid" onClick={moveAllToCart}>
          Move all to cart
        </Button>
      </header>

      <ul className="wishlist-grid">
        {items.map((item) => (
          <li key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.name} className="wishlist-item__img" />
            <div className="wishlist-item__body">
              <span className="wishlist-item__name">{item.name}</span>
              <span className="wishlist-item__price">${item.price.toFixed(2)}</span>
            </div>
            <div className="wishlist-item__actions">
              <button
                type="button"
                className="wishlist-item__add"
                onClick={() => moveToCart(item)}
              >
                <ShoppingCart size={15} strokeWidth={2} />
                Add to cart
              </button>
              <button
                type="button"
                className="wishlist-item__remove"
                aria-label={`Remove ${item.name} from wishlist`}
                onClick={() => remove(item.id)}
              >
                <Trash2 size={15} strokeWidth={2} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Wishlist;

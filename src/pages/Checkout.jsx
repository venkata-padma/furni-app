import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/common/HeroBanner';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { useCart } from '../context/CartContext';
import './Checkout.css';

function Checkout() {
  const { items, subtotal, discount, total, coupon, clear } = useCart();
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [placed, setPlaced] = useState(false);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setPlaced(true);
    clear();
  }

  return (
    <>
      <HeroBanner
        title="Checkout"
        description="Review your order and enter your delivery details to place the order."
      />

      <section className="checkout-section container">
        {placed ? (
          <div className="checkout-done">
            <h2>Thank you for your order!</h2>
            <p>A confirmation has been sent to your email. Your furniture is on its way.</p>
            <Button as={Link} to="/shop" variant="dark">
              Continue Shopping
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="checkout-done">
            <h2>Your cart is empty</h2>
            <p>Add a few pieces before checking out.</p>
            <Button as={Link} to="/shop" variant="dark">
              Browse the Shop
            </Button>
          </div>
        ) : (
          <div className="checkout-grid">
            <form className="checkout-form" onSubmit={handleSubmit}>
              <h2 className="checkout-form__heading">Delivery Details</h2>
              <FormInput
                id="checkout-name"
                label="Full Name"
                value={form.name}
                onChange={handleChange('name')}
                required
              />
              <FormInput
                id="checkout-email"
                label="Email Address"
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                required
              />
              <FormInput
                id="checkout-address"
                label="Delivery Address"
                value={form.address}
                onChange={handleChange('address')}
                required
              />
              <Button type="submit" variant="primary-solid">
                Place Order
              </Button>
            </form>

            <aside className="checkout-order">
              <h2 className="checkout-order__heading">Order Summary</h2>
              <ul className="checkout-order__items">
                {items.map((item) => (
                  <li key={item.id}>
                    <span>
                      {item.name} &times; {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <dl className="checkout-order__totals">
                <div>
                  <dt>Subtotal</dt>
                  <dd>${subtotal.toFixed(2)}</dd>
                </div>
                {discount > 0 && (
                  <div>
                    <dt>Discount{coupon ? ` (${coupon.code})` : ''}</dt>
                    <dd>-${discount.toFixed(2)}</dd>
                  </div>
                )}
                <div className="checkout-order__total">
                  <dt>Total</dt>
                  <dd>${total.toFixed(2)}</dd>
                </div>
              </dl>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}

export default Checkout;

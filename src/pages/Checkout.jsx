import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import QuantityStepper from '../components/cart/QuantityStepper';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Checkout.css';

function Checkout() {
  const { items, increase, decrease, remove, subtotal, discount, total, coupon, clear } = useCart();
  const { user } = useAuth();

  const [form, setForm] = useState({
    email: user?.email || '',
    name: [user?.firstName, user?.lastName].filter(Boolean).join(' '),
    address: user?.address || '',
    city: '',
    postcode: '',
  });
  const [placed, setPlaced] = useState(false);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

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
          <div className="checkout-done" data-reveal>
            <h2>Thank you for your order!</h2>
            <p>A confirmation has been sent to your email. Your furniture is on its way.</p>
            <Button as={Link} to="/shop" variant="dark">
              Continue Shopping
            </Button>
          </div>
        ) : items.length === 0 ? (
          <div className="checkout-done" data-reveal>
            <h2>Your cart is empty</h2>
            <p>Add a few pieces before checking out.</p>
            <Button as={Link} to="/shop" variant="dark">
              Browse the Shop
            </Button>
          </div>
        ) : (
          <div className="checkout-grid">
            <form id="checkout-form" className="checkout-main" onSubmit={handleSubmit}>
              <div className="checkout-step" data-reveal>
                <span className="checkout-step__num">1</span>
                <div className="checkout-step__body">
                  <h2 className="checkout-step__title">Contact</h2>
                  <FormInput
                    id="checkout-email"
                    label="Email Address"
                    type="email"
                    value={form.email}
                    onChange={set('email')}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="checkout-step" data-reveal>
                <span className="checkout-step__num">2</span>
                <div className="checkout-step__body">
                  <h2 className="checkout-step__title">Delivery Address</h2>
                  <FormInput
                    id="checkout-name"
                    label="Full Name"
                    value={form.name}
                    onChange={set('name')}
                    autoComplete="name"
                    required
                  />
                  <FormInput
                    id="checkout-address"
                    label="Street Address"
                    value={form.address}
                    onChange={set('address')}
                    autoComplete="street-address"
                    required
                  />
                  <div className="checkout-step__row">
                    <FormInput
                      id="checkout-city"
                      label="City"
                      value={form.city}
                      onChange={set('city')}
                      required
                    />
                    <FormInput
                      id="checkout-postcode"
                      label="Postcode"
                      value={form.postcode}
                      onChange={set('postcode')}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="checkout-step" data-reveal>
                <span className="checkout-step__num">3</span>
                <div className="checkout-step__body">
                  <h2 className="checkout-step__title">Payment</h2>
                  <p className="checkout-step__note">
                    Payment is simulated in this demo — no card details are collected.
                  </p>
                </div>
              </div>
            </form>

            <aside className="checkout-order" data-reveal>
              <h2 className="checkout-order__heading">Order Summary</h2>

              <ul className="checkout-order__items">
                {items.map((item) => (
                  <li key={item.id} className="checkout-order__item">
                    <img src={item.image} alt={item.name} className="checkout-order__thumb" />
                    <div className="checkout-order__meta">
                      <span className="checkout-order__name">{item.name}</span>
                      <QuantityStepper
                        quantity={item.quantity}
                        onIncrease={() => increase(item.id)}
                        onDecrease={() => decrease(item.id)}
                      />
                    </div>
                    <span className="checkout-order__line">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      type="button"
                      className="checkout-order__remove"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => remove(item.id)}
                    >
                      <X size={15} />
                    </button>
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

              <Button
                type="submit"
                form="checkout-form"
                variant="primary-solid"
                className="checkout-order__submit"
              >
                Place Order
              </Button>
            </aside>
          </div>
        )}
      </section>
    </>
  );
}

export default Checkout;

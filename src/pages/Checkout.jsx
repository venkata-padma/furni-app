import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Check, ClipboardList, ShoppingCart, Truck, X } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import QuantityStepper from '../components/cart/QuantityStepper';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import './Checkout.css';

function Checkout() {
  const { items, increase, decrease, remove, subtotal, discount, total, coupon, clear } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();

  const savedCards = user?.paymentMethods || [];
  const defaultCard = savedCards.find((c) => c.default) || savedCards[0];

  const [form, setForm] = useState({
    email: user?.email || '',
    name: [user?.firstName, user?.lastName].filter(Boolean).join(' '),
    address: user?.address || '',
    city: '',
    postcode: '',
  });
  const [payment, setPayment] = useState(defaultCard ? defaultCard.id : 'cod');
  const [placedOrder, setPlacedOrder] = useState(null);

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function paymentLabel() {
    if (payment === 'cod') return 'Cash on Delivery';
    const card = savedCards.find((c) => c.id === payment);
    return card ? `${card.brand} •••• ${card.last4}` : 'Card';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const order = placeOrder({
      items,
      subtotal,
      discount,
      shipping: 0,
      total,
      couponCode: coupon?.code || null,
      address: [form.address, form.city, form.postcode].filter(Boolean).join(', '),
      payment: paymentLabel(),
    });
    setPlacedOrder(order);
    clear();
  }

  function formatOrderDate(value) {
    return new Date(value).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  function renderOrderConfirmation() {
    const featuredItem = placedOrder.items[0];
    const statusIndex = ['Processing', 'Packed', 'Shipped', 'Delivered'].indexOf(placedOrder.status);
    const progress = ['Order placed', 'Processing', 'Shipped', 'Delivered'];

    return (
      <div className="checkout-confirmation" data-reveal>
        <div className="checkout-confirmation__mark"><Check size={48} strokeWidth={2.5} /></div>
        <h2>Thank you for your order!</h2>
        <p className="checkout-confirmation__intro">
          Your order <strong>{placedOrder.number}</strong> is confirmed and a receipt is on its way
          to your email. Track its progress any time from your account.
        </p>

        <section className="checkout-confirmation__card">
          <div className="checkout-confirmation__product">
            <img src={featuredItem.image} alt={featuredItem.name} />
            <span>{placedOrder.items.length > 1 ? `+${placedOrder.items.length - 1} more item${placedOrder.items.length > 2 ? 's' : ''}` : featuredItem.name}</span>
          </div>
          <div className="checkout-confirmation__order-info">
            <span className="checkout-confirmation__label">Order number</span>
            <strong>{placedOrder.number}</strong>
            <span className="checkout-confirmation__date"><CalendarDays size={18} /> Placed on {formatOrderDate(placedOrder.placedAt)}</span>
          </div>
          <div className="checkout-confirmation__progress">
            <div className="checkout-confirmation__receipt"><Truck size={21} /><span><strong>A receipt has been sent</strong><small>to your email</small></span></div>
            <ol>
              {progress.map((label, index) => (
                <li key={label} className={index <= statusIndex ? 'is-done' : ''}>
                  <span>{index <= statusIndex ? <Check size={14} /> : ''}</span>
                  <small>{label}</small>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <div className="checkout-confirmation__actions">
          <Button as={Link} to="/account/orders" variant="primary-solid"><ClipboardList size={17} /> View my orders</Button>
          <Button as={Link} to="/shop" variant="outline-dark"><ShoppingCart size={17} /> Continue Shopping <ArrowRight size={17} /></Button>
        </div>
        <p className="checkout-confirmation__thanks">We appreciate your support! <span aria-hidden="true">♥</span></p>
      </div>
    );
  }

  return (
    <>
      <HeroBanner
        title="Checkout"
        description="Review your order and enter your delivery details to place the order."
        exploreTo="/services"
      />

      <section className="checkout-section container">
        {placedOrder ? (
          renderOrderConfirmation()
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
                  <fieldset className="checkout-pay">
                    <legend className="checkout-pay__legend">Choose how to pay</legend>

                    {savedCards.map((card) => (
                      <label key={card.id} className="checkout-pay__option">
                        <input
                          type="radio"
                          name="payment"
                          value={card.id}
                          checked={payment === card.id}
                          onChange={() => setPayment(card.id)}
                        />
                        <span className="checkout-pay__label">
                          {card.brand} •••• {card.last4}
                          <span className="checkout-pay__hint">expires {card.expiry}</span>
                        </span>
                      </label>
                    ))}

                    <label className="checkout-pay__option">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={payment === 'cod'}
                        onChange={() => setPayment('cod')}
                      />
                      <span className="checkout-pay__label">
                        Cash on Delivery
                        <span className="checkout-pay__hint">Pay in cash when it arrives</span>
                      </span>
                    </label>
                  </fieldset>

                  <p className="checkout-step__note">
                    {savedCards.length === 0 && (
                      <>
                        Want to pay by card?{' '}
                        <Link to="/account/payment" className="checkout-pay__manage">
                          Add one in your account
                        </Link>
                        . {' '}
                      </>
                    )}
                    Payment is simulated in this demo — no money changes hands.
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
                      {formatCurrency(item.price * item.quantity)}
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
                  <dd>{formatCurrency(subtotal)}</dd>
                </div>
                {discount > 0 && (
                  <div>
                    <dt>Discount{coupon ? ` (${coupon.code})` : ''}</dt>
                    <dd>-{formatCurrency(discount)}</dd>
                  </div>
                )}
                <div className="checkout-order__total">
                  <dt>Total</dt>
                  <dd>{formatCurrency(total)}</dd>
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

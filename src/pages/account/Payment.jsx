import { useState } from 'react';
import { Plus, Check, Trash2, CreditCard } from 'lucide-react';
import Button from '../../components/common/Button';
import AddCardForm from '../../components/account/AddCardForm';
import { useAuth } from '../../context/AuthContext';
import { availablePaymentMethods } from '../../data/paymentOptions';
import './AccountPage.css';

function Payment() {
  const { user, addPaymentMethod, removePaymentMethod, setDefaultPaymentMethod } = useAuth();
  const cards = user.paymentMethods || [];
  const [adding, setAdding] = useState(false);

  function handleAdd(method) {
    addPaymentMethod(method);
    setAdding(false);
  }

  return (
    <div className="account-card" data-reveal>
      <header className="account-card__head account-card__head--row">
        <div>
          <h2 className="account-card__title">Payment Methods</h2>
          <p className="account-card__sub">
            Save a card for faster checkout. Your default is used automatically when you place an
            order.
          </p>
        </div>
        {!adding && (
          <Button type="button" variant="primary-solid" onClick={() => setAdding(true)}>
            <Plus size={16} strokeWidth={2.5} /> Add card
          </Button>
        )}
      </header>

      {adding && <AddCardForm onAdd={handleAdd} onCancel={() => setAdding(false)} />}

      {cards.length > 0 ? (
        <ul className="pm-list">
          {cards.map((card) => (
            <li key={card.id} className={`pm-card${card.default ? ' pm-card--default' : ''}`}>
              <span className="pm-card__chip" aria-hidden="true">
                <CreditCard size={20} strokeWidth={1.5} />
              </span>
              <div className="pm-card__info">
                <span className="pm-card__brand">
                  {card.brand} &bull;&bull;&bull;&bull; {card.last4}
                  {card.default && <span className="pm-card__badge">Default</span>}
                </span>
                <span className="pm-card__meta">
                  {card.holder} &middot; expires {card.expiry}
                </span>
              </div>
              <div className="pm-card__actions">
                {!card.default && (
                  <button
                    type="button"
                    className="pm-card__link"
                    onClick={() => setDefaultPaymentMethod(card.id)}
                  >
                    <Check size={14} strokeWidth={2.5} /> Set default
                  </button>
                )}
                <button
                  type="button"
                  className="pm-card__remove"
                  aria-label={`Remove ${card.brand} ending ${card.last4}`}
                  onClick={() => removePaymentMethod(card.id)}
                >
                  <Trash2 size={15} strokeWidth={2} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        !adding && (
          <p className="pm-empty">
            No cards saved yet. Add one now, or choose Cash on Delivery at checkout.
          </p>
        )
      )}

      <section className="pm-accepted">
        <h3 className="pm-accepted__title">Accepted payment methods</h3>
        <p className="pm-accepted__sub">
          Every Furni order can be paid with any of the options below.
        </p>
        <ul className="pm-accepted__grid">
          {availablePaymentMethods.map((method) => (
            <li key={method.id} className="pm-accepted__item">
              <span className={`pm-accepted__tag pm-accepted__tag--${method.kind}`}>
                {method.name}
              </span>
              <span className="pm-accepted__blurb">{method.blurb}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Payment;

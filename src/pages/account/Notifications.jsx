import { useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AccountPage.css';

const GROUPS = [
  {
    label: 'Orders & delivery',
    hint: 'We recommend keeping these on so you never miss a delivery.',
    options: [
      { key: 'orderUpdates', title: 'Order confirmations & status', desc: 'Receipts and updates when your order status changes.' },
      { key: 'deliveryAlerts', title: 'Delivery alerts', desc: 'A heads-up on the day your furniture is out for delivery.' },
    ],
  },
  {
    label: 'Shopping',
    hint: null,
    options: [
      { key: 'backInStock', title: 'Back in stock', desc: 'Tell me when a piece on my wishlist is available again.' },
      { key: 'promotions', title: 'Offers & promotions', desc: 'Seasonal sales and members-only discounts.' },
      { key: 'newsletter', title: 'The Furni newsletter', desc: 'Styling ideas and new collections, about once a month.' },
    ],
  },
];

function Notifications() {
  const { user, setNotifications } = useAuth();
  const prefs = user.notifications || {};
  const [savedKey, setSavedKey] = useState(null);
  const timer = useRef();

  function toggle(key) {
    setNotifications({ [key]: !prefs[key] });
    setSavedKey(key);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSavedKey(null), 1600);
  }

  return (
    <div className="account-card" data-reveal>
      <header className="account-card__head">
        <h2 className="account-card__title">Notifications</h2>
        <p className="account-card__sub">
          Choose what Furni emails you about. Changes save automatically.
        </p>
      </header>

      {GROUPS.map((group) => (
        <section key={group.label} className="notif-group">
          <h3 className="notif-group__label">{group.label}</h3>
          {group.hint && <p className="notif-group__hint">{group.hint}</p>}
          <ul>
            {group.options.map((opt) => (
              <li key={opt.key} className="notif-row">
                <div className="notif-row__text">
                  <span className="notif-row__title">{opt.title}</span>
                  <span className="notif-row__desc">{opt.desc}</span>
                </div>
                <div className="notif-row__control">
                  {savedKey === opt.key && <span className="notif-row__saved">Saved</span>}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={Boolean(prefs[opt.key])}
                    aria-label={opt.title}
                    className={`switch${prefs[opt.key] ? ' switch--on' : ''}`}
                    onClick={() => toggle(opt.key)}
                  >
                    <span className="switch__thumb" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export default Notifications;

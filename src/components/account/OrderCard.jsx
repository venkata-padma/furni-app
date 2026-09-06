import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Button from '../common/Button';
import { STATUS_FLOW } from '../../context/OrdersContext';
import { formatCurrency } from '../../utils/currency';

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

function OrderCard({ order, onBuyAgain, onCancel, onMarkReceived }) {
  const [open, setOpen] = useState(false);
  const cancelled = order.status === 'Cancelled';
  const canCancel = order.status === 'Processing' || order.status === 'Packed';
  const canConfirm = order.status === 'Shipped';
  const stepIndex = STATUS_FLOW.indexOf(order.status);

  return (
    <article className={`order-card${cancelled ? ' order-card--cancelled' : ''}`}>
      <header className="order-card__head">
        <div>
          <p className="order-card__number">{order.number}</p>
          <p className="order-card__date">Placed {formatDate(order.placedAt)}</p>
        </div>
        <span className={`order-card__status order-card__status--${order.status.toLowerCase()}`}>
          {order.status}
        </span>
      </header>

      <div className="order-card__items">
        {order.items.map((item) => (
          <div key={item.id} className="order-card__item">
            <img src={item.image} alt={item.name} className="order-card__thumb" />
            <div className="order-card__item-meta">
              <span className="order-card__item-name">{item.name}</span>
              <span className="order-card__item-qty">
                Qty {item.quantity} &middot; {formatCurrency(item.price)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {!cancelled && (
        <ol className="order-track" aria-label="Order progress">
          {STATUS_FLOW.map((label, i) => (
            <li
              key={label}
              className={`order-track__step${i <= stepIndex ? ' order-track__step--done' : ''}${
                i === stepIndex ? ' order-track__step--current' : ''
              }`}
            >
              <span className="order-track__dot" aria-hidden="true" />
              <span className="order-track__label">{label}</span>
            </li>
          ))}
        </ol>
      )}

      <button
        type="button"
        className="order-card__toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{open ? 'Hide' : 'View'} order details</span>
        <ChevronDown size={16} className={open ? 'order-card__chev order-card__chev--up' : 'order-card__chev'} />
      </button>

      {open && (
        <dl className="order-card__summary">
          <div>
            <dt>Subtotal</dt>
            <dd>{formatCurrency(order.subtotal)}</dd>
          </div>
          {order.discount > 0 && (
            <div>
              <dt>Discount{order.couponCode ? ` (${order.couponCode})` : ''}</dt>
              <dd>-{formatCurrency(order.discount)}</dd>
            </div>
          )}
          <div>
            <dt>Delivery</dt>
            <dd>{order.shipping > 0 ? formatCurrency(order.shipping) : 'Free'}</dd>
          </div>
          {order.address && (
            <div>
              <dt>Ship to</dt>
              <dd>{order.address}</dd>
            </div>
          )}
          {order.payment && (
            <div>
              <dt>Payment</dt>
              <dd>{order.payment}</dd>
            </div>
          )}
          <div className="order-card__summary-total">
            <dt>Total</dt>
            <dd>{formatCurrency(order.total)}</dd>
          </div>
        </dl>
      )}

      <footer className="order-card__actions">
        <span className="order-card__total-inline">Total {formatCurrency(order.total)}</span>
        <div className="order-card__buttons">
          {canConfirm && (
            <Button type="button" variant="primary-solid" onClick={onMarkReceived}>
              Mark as received
            </Button>
          )}
          <Button type="button" variant="dark" onClick={onBuyAgain}>
            Buy again
          </Button>
          {canCancel && (
            <button type="button" className="order-card__cancel" onClick={onCancel}>
              Cancel order
            </button>
          )}
        </div>
      </footer>
    </article>
  );
}

export default OrderCard;

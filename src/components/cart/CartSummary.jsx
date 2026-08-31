import { Link } from 'react-router-dom';
import Button from '../common/Button';
import './CartSummary.css';

function CartSummary({ subtotal, discount = 0, total, coupon, disabled = false }) {
  return (
    <div className="cart-summary">
      <h3 className="cart-summary__heading">Cart Totals</h3>
      <dl className="cart-summary__rows">
        <div className="cart-summary__row">
          <dt>Subtotal</dt>
          <dd>${subtotal.toFixed(2)}</dd>
        </div>
        {discount > 0 && (
          <div className="cart-summary__row cart-summary__row--discount">
            <dt>Discount{coupon ? ` (${coupon.code})` : ''}</dt>
            <dd>-${discount.toFixed(2)}</dd>
          </div>
        )}
        <div className="cart-summary__row cart-summary__row--total">
          <dt>Total</dt>
          <dd>${total.toFixed(2)}</dd>
        </div>
      </dl>
      <Button
        as={disabled ? 'button' : Link}
        to={disabled ? undefined : '/checkout'}
        variant="dark"
        className="cart-summary__checkout"
        disabled={disabled}
      >
        Proceed To Checkout
      </Button>
    </div>
  );
}

export default CartSummary;

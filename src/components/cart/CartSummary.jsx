import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, LockKeyhole, ShieldCheck, Truck } from 'lucide-react';
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
        <div className="cart-summary__row">
          <dt>Shipping</dt>
          <dd>Calculated at checkout</dd>
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
        <LockKeyhole size={17} /> Proceed To Checkout <ArrowRight size={17} />
      </Button>
      <div className="cart-summary__benefits">
        <div><Truck size={21} /><span><strong>Free Shipping</strong><small>On orders over $50</small></span></div>
        <div><ShieldCheck size={21} /><span><strong>Secure Payment</strong><small>100% secure checkout</small></span></div>
        <div><Leaf size={21} /><span><strong>Easy Returns</strong><small>Hassle-free within 30 days</small></span></div>
      </div>
    </div>
  );
}

export default CartSummary;

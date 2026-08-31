import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeroBanner from '../components/common/HeroBanner';
import Button from '../components/common/Button';
import CartTable from '../components/cart/CartTable';
import CouponForm from '../components/cart/CouponForm';
import CartSummary from '../components/cart/CartSummary';
import { useCart } from '../context/CartContext';
import './Cart.css';

function Cart() {
  const {
    items,
    increase,
    decrease,
    remove,
    clear,
    applyCoupon,
    coupon,
    subtotal,
    discount,
    total,
  } = useCart();
  const [couponMessage, setCouponMessage] = useState(null);

  function handleApplyCoupon(code) {
    const applied = applyCoupon(code);
    setCouponMessage(
      applied
        ? `Coupon "${code.trim().toUpperCase()}" applied.`
        : 'That coupon code is not valid.'
    );
  }

  return (
    <>
      <HeroBanner
        title="Cart"
        description="Lorem Ipsum dolor sit amet consectetur. Pharetra aliquet ornarevelit blandit purus erat. Viverra ac tellus morbiet purus amet nec."
      />

      <section className="cart-section container">
        <CartTable items={items} onIncrease={increase} onDecrease={decrease} onRemove={remove} />

        <div className="cart-actions">
          <Button variant="dark" onClick={clear} disabled={items.length === 0}>
            Clear Cart
          </Button>
          <Button variant="dark" as={Link} to="/shop">
            Continue Shopping
          </Button>
        </div>

        <div className="cart-footer">
          <CouponForm onApply={handleApplyCoupon} message={couponMessage} />
          <CartSummary
            subtotal={subtotal}
            discount={discount}
            total={total}
            coupon={coupon}
            disabled={items.length === 0}
          />
        </div>
      </section>
    </>
  );
}

export default Cart;

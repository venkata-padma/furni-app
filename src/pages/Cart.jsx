import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
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
        {items.length === 0 ? (
          <CartTable items={items} onIncrease={increase} onDecrease={decrease} onRemove={remove} />
        ) : (
          <div className="cart-layout">
            <div className="cart-main">
              <div className="cart-heading-row">
                <Link className="cart-continue" to="/shop"><ArrowLeft size={18} /> Continue Shopping</Link>
                <span className="cart-count"><ShoppingBag size={18} /> {items.reduce((sum, item) => sum + item.quantity, 0)} items</span>
              </div>
              <div className="cart-items-panel">
                <CartTable items={items} onIncrease={increase} onDecrease={decrease} onRemove={remove} />
                <div className="cart-actions">
                  <Button variant="dark" onClick={clear}>Clear Cart</Button>
                  <Button variant="dark" as={Link} to="/shop">Continue Shopping</Button>
                </div>
              </div>
              <CouponForm onApply={handleApplyCoupon} message={couponMessage} />
            </div>
            <CartSummary subtotal={subtotal} discount={discount} total={total} coupon={coupon} disabled={false} />
          </div>
        )}
      </section>
    </>
  );
}

export default Cart;

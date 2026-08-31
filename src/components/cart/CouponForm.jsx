import { useState } from 'react';
import Button from '../common/Button';
import './CouponForm.css';

function CouponForm({ onApply, message }) {
  const [code, setCode] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (code.trim()) onApply?.(code.trim());
  }

  return (
    <div className="coupon">
      <h3 className="coupon__heading">Coupon</h3>
      <p className="coupon__hint">Enter your coupon code if you have one.</p>
      <form className="coupon__form" onSubmit={handleSubmit}>
        <label htmlFor="coupon-code" className="sr-only">
          Coupon code
        </label>
        <input
          id="coupon-code"
          type="text"
          placeholder="Coupon code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="coupon__input"
        />
        <Button type="submit" variant="dark">
          Apply Coupon
        </Button>
      </form>
      {message && <p className="coupon__message">{message}</p>}
      <p className="coupon__hint">Try <strong>FURNI10</strong> or <strong>WELCOME5</strong>.</p>
    </div>
  );
}

export default CouponForm;

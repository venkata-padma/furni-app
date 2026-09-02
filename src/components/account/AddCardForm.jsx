import { useState } from 'react';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import { detectCardBrand, formatCardNumber } from '../../data/paymentOptions';

const EMPTY = { number: '', holder: '', expiry: '', cvc: '', makeDefault: false };

function validate(values) {
  const errors = {};
  const digits = values.number.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 16) errors.number = 'Enter a valid card number';
  if (!values.holder.trim()) errors.holder = 'Enter the name on the card';
  if (!/^(0[1-9]|1[0-2])\s*\/\s*\d{2}$/.test(values.expiry.trim()))
    errors.expiry = 'Use MM/YY';
  else {
    const [mm, yy] = values.expiry.split('/').map((s) => parseInt(s.trim(), 10));
    const end = new Date(2000 + yy, mm, 0, 23, 59, 59);
    if (end < new Date()) errors.expiry = 'Card has expired';
  }
  if (!/^\d{3,4}$/.test(values.cvc.trim())) errors.cvc = 'Enter the 3–4 digit code';
  return errors;
}

function AddCardForm({ onAdd, onCancel }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  const brand = detectCardBrand(values.number);

  const set = (field) => (e) => {
    const raw = e.target.value;
    let next = raw;
    if (field === 'number') next = formatCardNumber(raw);
    if (field === 'expiry') {
      const d = raw.replace(/\D/g, '').slice(0, 4);
      next = d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
    }
    if (field === 'cvc') next = raw.replace(/\D/g, '').slice(0, 4);
    setValues((prev) => ({ ...prev, [field]: next }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length) {
      setErrors(found);
      return;
    }
    const digits = values.number.replace(/\D/g, '');
    // Only the last four digits and expiry are kept — never the full PAN or CVC.
    onAdd({
      brand,
      last4: digits.slice(-4),
      expiry: values.expiry.replace(/\s/g, ''),
      holder: values.holder.trim(),
      default: values.makeDefault,
    });
  }

  return (
    <form className="add-card" onSubmit={handleSubmit} noValidate>
      <div className="add-card__field">
        <FormInput
          id="card-number"
          label="Card number"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="1234 5678 9012 3456"
          value={values.number}
          onChange={set('number')}
        />
        {values.number && <span className="add-card__brand">{brand}</span>}
        {errors.number && <span className="add-card__error">{errors.number}</span>}
      </div>

      <div className="add-card__field">
        <FormInput
          id="card-holder"
          label="Name on card"
          autoComplete="cc-name"
          placeholder="Jane Cooper"
          value={values.holder}
          onChange={set('holder')}
        />
        {errors.holder && <span className="add-card__error">{errors.holder}</span>}
      </div>

      <div className="add-card__row">
        <div className="add-card__field">
          <FormInput
            id="card-expiry"
            label="Expiry"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            value={values.expiry}
            onChange={set('expiry')}
          />
          {errors.expiry && <span className="add-card__error">{errors.expiry}</span>}
        </div>
        <div className="add-card__field">
          <FormInput
            id="card-cvc"
            label="CVC"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            value={values.cvc}
            onChange={set('cvc')}
          />
          {errors.cvc && <span className="add-card__error">{errors.cvc}</span>}
        </div>
      </div>

      <label className="add-card__check">
        <input
          type="checkbox"
          checked={values.makeDefault}
          onChange={(e) => setValues((prev) => ({ ...prev, makeDefault: e.target.checked }))}
        />
        Set as default payment method
      </label>

      <p className="add-card__note">
        Demo only — cards are stored in your browser. We keep just the brand, last four digits
        and expiry.
      </p>

      <div className="add-card__actions">
        <Button type="submit" variant="primary-solid">
          Save card
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default AddCardForm;

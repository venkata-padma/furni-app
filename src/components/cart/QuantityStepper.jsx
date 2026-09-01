import { Minus, Plus } from 'lucide-react';
import './QuantityStepper.css';

function QuantityStepper({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="qty-stepper">
      <button
        type="button"
        onClick={onDecrease}
        aria-label={quantity <= 1 ? 'Remove item' : 'Decrease quantity'}
        className="qty-stepper__btn"
      >
        <Minus size={14} />
      </button>
      <span className="qty-stepper__value">{quantity}</span>
      <button
        type="button"
        onClick={onIncrease}
        aria-label="Increase quantity"
        className="qty-stepper__btn"
      >
        <Plus size={14} />
      </button>
    </div>
  );
}

export default QuantityStepper;

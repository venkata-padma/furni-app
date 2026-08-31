import { X } from 'lucide-react';
import QuantityStepper from './QuantityStepper';
import './CartItemRow.css';

function CartItemRow({ item, onIncrease, onDecrease, onRemove }) {
  const lineTotal = item.price * item.quantity;

  return (
    <tr className="cart-row">
      <td className="cart-row__image">
        <img src={item.image} alt={item.name} />
      </td>
      <td className="cart-row__name">{item.name}</td>
      <td className="cart-row__price">${item.price.toFixed(2)}</td>
      <td>
        <QuantityStepper
          quantity={item.quantity}
          onIncrease={() => onIncrease(item.id)}
          onDecrease={() => onDecrease(item.id)}
        />
      </td>
      <td className="cart-row__total">${lineTotal.toFixed(2)}</td>
      <td>
        <button
          type="button"
          className="cart-row__remove"
          aria-label={`Remove ${item.name} from cart`}
          onClick={() => onRemove(item.id)}
        >
          <X size={18} />
        </button>
      </td>
    </tr>
  );
}

export default CartItemRow;

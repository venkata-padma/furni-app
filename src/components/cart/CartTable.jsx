import CartItemRow from './CartItemRow';
import './CartTable.css';

function CartTable({ items, onIncrease, onDecrease, onRemove }) {
  if (items.length === 0) {
    return <p className="cart-table__empty">Your cart is empty.</p>;
  }

  return (
    <div className="cart-table-wrap">
      <table className="cart-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartTable;

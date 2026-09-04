import CartItemRow from './CartItemRow';
import AccountEmpty from '../account/AccountEmpty';
import './CartTable.css';

function CartTable({ items, onIncrease, onDecrease, onRemove }) {
  if (items.length === 0) {
    return (
      <AccountEmpty
        image="/no-orders.png"
        imageAlt="An empty shopping cart"
        title="Your cart is empty"
        body="There are no items in your cart yet. Explore our collection and find something made for your space."
        actionLabel="Browse the Shop"
        actionTo="/shop"
      />
    );
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

import AccountEmpty from '../../components/account/AccountEmpty';
import OrderCard from '../../components/account/OrderCard';
import { useOrders } from '../../context/OrdersContext';
import { useCart } from '../../context/CartContext';
import './AccountPage.css';

function Orders() {
  const { orders, cancelOrder, advanceStatus } = useOrders();
  const { addItem } = useCart();

  if (!orders.length) {
    return (
      <AccountEmpty
        image="/no-orders.png"
        imageAlt="Shopping cart with a sad face"
        title="No orders yet"
        body="When you place an order it will show up here with live status, a delivery timeline and a one-tap reorder."
        actionLabel="Browse the Shop"
        actionTo="/shop"
      />
    );
  }

  function buyAgain(order) {
    order.items.forEach((item) => addItem(item, item.quantity));
  }

  return (
    <div className="account-card" data-reveal>
      <header className="account-card__head">
        <h2 className="account-card__title">My Orders</h2>
        <p className="account-card__sub">
          {orders.length} order{orders.length === 1 ? '' : 's'} &middot; track status, reorder or
          cancel while it&rsquo;s still being prepared.
        </p>
      </header>

      <ul className="order-list">
        {orders.map((order) => (
          <li key={order.id}>
            <OrderCard
              order={order}
              onBuyAgain={() => buyAgain(order)}
              onCancel={() => cancelOrder(order.id)}
              onMarkReceived={() => advanceStatus(order.id)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Orders;

import AccountEmpty from '../../components/account/AccountEmpty';

function Orders() {
  return (
    <AccountEmpty
      image="/hero-sofa.png"
      imageAlt="Green three-seater sofa"
      title="No orders yet"
      body="When you place an order it will show up here with its status and tracking."
      actionLabel="Browse the Shop"
      actionTo="/shop"
    />
  );
}

export default Orders;

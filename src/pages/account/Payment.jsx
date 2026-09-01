import AccountEmpty from '../../components/account/AccountEmpty';

function Payment() {
  return (
    <AccountEmpty
      image="/chair3-home.png"
      imageAlt="Green ergonomic chair"
      title="No payment methods"
      body="Save a card at checkout and it will appear here for faster ordering next time."
      actionLabel="Go to Shop"
      actionTo="/shop"
    />
  );
}

export default Payment;

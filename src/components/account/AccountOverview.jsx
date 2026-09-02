import { Link } from 'react-router-dom';
import { Package, Truck, Heart, CreditCard, ArrowRight } from 'lucide-react';
import { useOrders } from '../../context/OrdersContext';
import { useWishlist } from '../../context/WishlistContext';

function AccountOverview({ user }) {
  const { orders } = useOrders();
  const { count: wishlistCount } = useWishlist();

  const inProgress = orders.filter(
    (o) => o.status !== 'Delivered' && o.status !== 'Cancelled'
  ).length;

  const memberSince = user.memberSince
    ? new Date(user.memberSince).toLocaleDateString(undefined, {
        month: 'long',
        year: 'numeric',
      })
    : null;

  const stats = [
    { label: 'Total orders', value: orders.length, to: '/account/orders', icon: Package },
    { label: 'In progress', value: inProgress, to: '/account/orders', icon: Truck },
    { label: 'Wishlist', value: wishlistCount, to: '/account/wishlist', icon: Heart },
    {
      label: 'Saved cards',
      value: user.paymentMethods?.length || 0,
      to: '/account/payment',
      icon: CreditCard,
    },
  ];

  const missing = [];
  if (!user.phone) missing.push({ label: 'Add a phone number', to: '/account/profile' });
  if (!user.address) missing.push({ label: 'Add a delivery address', to: '/account/address' });
  if (!(user.paymentMethods?.length))
    missing.push({ label: 'Save a payment method', to: '/account/payment' });

  return (
    <section className="account-overview" data-reveal>
      <div className="account-overview__intro">
        <h2 className="account-overview__title">
          Welcome back{user.firstName ? `, ${user.firstName}` : ''}
        </h2>
        <p className="account-overview__sub">
          {memberSince ? `Furni member since ${memberSince}.` : 'Your Furni account at a glance.'}
        </p>
      </div>

      <div className="account-overview__stats">
        {stats.map(({ label, value, to, icon: Icon }) => (
          <Link key={label} to={to} className="account-stat">
            <span className="account-stat__icon">
              <Icon size={18} strokeWidth={1.75} />
            </span>
            <span className="account-stat__value">{value}</span>
            <span className="account-stat__label">{label}</span>
          </Link>
        ))}
      </div>

      {missing.length > 0 && (
        <div className="account-overview__todo">
          <p className="account-overview__todo-title">Finish setting up your account</p>
          <ul>
            {missing.map((m) => (
              <li key={m.label}>
                <Link to={m.to}>
                  {m.label}
                  <ArrowRight size={15} strokeWidth={2} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default AccountOverview;

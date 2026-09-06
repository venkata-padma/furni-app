import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import HeroBanner from '../components/common/HeroBanner';
import AccountSidebar from '../components/account/AccountSidebar';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrdersContext';
import { useWishlist } from '../context/WishlistContext';
import './Account.css';

/** Account area layout: persistent sidebar + routed panel (<Outlet />). */
function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const { count: orderCount } = useOrders();
  const { count: wishlistCount } = useWishlist();
  const navigate = useNavigate();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Furni Member';

  return (
    <>
      <HeroBanner
        title={`Hi, ${user.firstName || 'there'}`}
        description="Manage your profile details, track your orders and keep your preferences up to date."
        exploreTo="/services"
      />

      <section className="account-section container">
        <AccountSidebar
          user={{ ...user, name: fullName }}
          badges={{
            orders: orderCount,
            wishlist: wishlistCount,
            cards: user.paymentMethods?.length || 0,
          }}
          onLogout={() => {
            logout();
            navigate('/');
          }}
        />

        <div className="account-panel">
          <Outlet />
        </div>
      </section>
    </>
  );
}

export default Account;

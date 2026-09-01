import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { FileText, Heart, MapPin, CreditCard } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner';
import AccountSidebar from '../components/account/AccountSidebar';
import AccountForm from '../components/account/AccountForm';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Account.css';

const PANELS = {
  orders: { icon: FileText, title: 'My Orders', body: 'You haven’t placed any orders yet.' },
  wishlist: { icon: Heart, title: 'Wishlist', body: 'Your wishlist is empty — tap the heart on a product to save it.' },
  address: { icon: MapPin, title: 'Address Book', body: 'No delivery addresses saved yet.' },
  payment: { icon: CreditCard, title: 'Payment Methods', body: 'No cards on file.' },
};

function Account() {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('profile');

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ') || 'Furni Member';
  const panel = PANELS[activeItem];

  return (
    <>
      <HeroBanner
        title={`Hi, ${user.firstName || 'there'}`}
        description="Manage your profile details, track your orders and keep your preferences up to date."
      />

      <section className="account-section container">
        <AccountSidebar
          user={{ ...user, name: fullName }}
          cartCount={count}
          activeItem={activeItem}
          onSelect={setActiveItem}
          onLogout={() => {
            logout();
            navigate('/');
          }}
        />

        <div className="account-panel">
          {activeItem === 'profile' ? (
            <AccountForm user={user} onSave={updateUser} />
          ) : (
            <div className="account-empty">
              {panel?.icon && <panel.icon size={40} strokeWidth={1.5} />}
              <h2>{panel?.title}</h2>
              <p>{panel?.body}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Account;

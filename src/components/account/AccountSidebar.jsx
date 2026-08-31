import { User, FileText, Heart, MapPin, CreditCard, LogOut } from 'lucide-react';
import './AccountSidebar.css';

const NAV_ITEMS = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'orders', label: 'My Orders', icon: FileText },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
];

function AccountSidebar({ user, activeItem = 'profile', onSelect, onLogout }) {
  return (
    <aside className="account-sidebar">
      <div className="account-sidebar__profile">
        <img src={user.avatar} alt={user.name} className="account-sidebar__avatar" />
        <p className="account-sidebar__name">{user.name}</p>
        <p className="account-sidebar__email">{user.email}</p>
      </div>

      <nav className="account-sidebar__nav" aria-label="Account">
        <ul>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <button
                type="button"
                className={
                  id === activeItem
                    ? 'account-sidebar__item account-sidebar__item--active'
                    : 'account-sidebar__item'
                }
                onClick={() => onSelect?.(id)}
              >
                <Icon size={16} strokeWidth={1.75} />
                {label}
              </button>
            </li>
          ))}
          <li>
            <button type="button" className="account-sidebar__item account-sidebar__item--danger" onClick={onLogout}>
              <LogOut size={16} strokeWidth={1.75} />
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AccountSidebar;

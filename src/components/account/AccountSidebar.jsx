import { User, FileText, Heart, MapPin, CreditCard, LogOut } from 'lucide-react';
import Avatar from '../common/Avatar';
import './AccountSidebar.css';

const NAV_ITEMS = [
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'orders', label: 'My Orders', icon: FileText },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'address', label: 'Address', icon: MapPin },
  { id: 'payment', label: 'Payment Methods', icon: CreditCard },
];

function AccountSidebar({ user, cartCount = 0, activeItem = 'profile', onSelect, onLogout }) {
  return (
    <aside className="account-sidebar">
      <div className="account-sidebar__profile">
        <div className="account-sidebar__cover" aria-hidden="true" />
        <Avatar
          name={user.name}
          src={user.avatar}
          size={88}
          className="account-sidebar__avatar"
        />
        <p className="account-sidebar__name">{user.name}</p>
        <p className="account-sidebar__email">{user.email || 'No email on file'}</p>
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
                <Icon size={17} strokeWidth={1.75} />
                <span>{label}</span>
                {id === 'orders' && cartCount > 0 && (
                  <span className="account-sidebar__badge">{cartCount}</span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <button type="button" className="account-sidebar__logout" onClick={onLogout}>
          <LogOut size={17} strokeWidth={1.75} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default AccountSidebar;

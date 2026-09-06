import { NavLink } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  ShieldCheck,
  LogOut,
} from 'lucide-react';
import Avatar from '../common/Avatar';
import './AccountSidebar.css';

const NAV_GROUPS = [
  {
    label: 'Account',
    items: [
      { to: '/account/profile', label: 'My Profile', icon: User },
      { to: '/account/orders', label: 'My Orders', icon: Package, badge: 'orders' },
      { to: '/account/wishlist', label: 'Wishlist', icon: Heart, badge: 'wishlist' },
    ],
  },
  {
    label: 'Preferences',
    items: [
      { to: '/account/address', label: 'Address', icon: MapPin },
      { to: '/account/payment', label: 'Payment Methods', icon: CreditCard, badge: 'cards' },
      { to: '/account/notifications', label: 'Notifications', icon: Bell },
      { to: '/account/security', label: 'Security', icon: ShieldCheck },
    ],
  },
];

function AccountSidebar({ user, badges = {}, onLogout }) {
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
        {NAV_GROUPS.map((group) => (
          <div key={group.label} className="account-sidebar__group">
            <p className="account-sidebar__group-label">{group.label}</p>
            <ul>
              {group.items.map(({ to, label, icon: Icon, badge }) => {
                const count = badge ? badges[badge] : 0;
                return (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={({ isActive }) =>
                        isActive
                          ? 'account-sidebar__item account-sidebar__item--active'
                          : 'account-sidebar__item'
                      }
                    >
                      <Icon size={17} strokeWidth={1.75} />
                      <span>{label}</span>
                      {count > 0 && (
                        <span className="account-sidebar__badge">{count}</span>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <button type="button" className="account-sidebar__logout" onClick={onLogout}>
          <LogOut size={17} strokeWidth={1.75} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}

export default AccountSidebar;

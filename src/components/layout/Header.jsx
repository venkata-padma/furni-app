import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';
import { User, ShoppingCart, LogIn, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact Us', to: '/contact' },
];

function Header() {
  const { count } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          Furni
        </Link>

        <button
          type="button"
          className="header__menu-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        <nav
          className={menuOpen ? 'header__nav header__nav--open' : 'header__nav'}
          aria-label="Primary"
        >
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    isActive ? 'header__link header__link--active' : 'header__link'
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="header__mobile-auth">
              {isAuthenticated ? (
                <Link to="/account" className="header__mobile-auth-link" onClick={() => setMenuOpen(false)}>
                  <User size={18} strokeWidth={1.9} />
                  My Account
                </Link>
              ) : (
                <Link to="/login" className="header__mobile-auth-link" onClick={() => setMenuOpen(false)}>
                  <LogIn size={18} strokeWidth={2} />
                  Login
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <div className="header__actions">
          {isAuthenticated ? (
            <Link
              to="/account"
              className="header__icon-link header__user"
              aria-label="Account"
              onClick={() => setMenuOpen(false)}
            >
              <User size={22} strokeWidth={1.75} />
              {user?.firstName && (
                <span className="header__user-name">{user.firstName}</span>
              )}
            </Link>
          ) : (
            <Link to="/login" className="header__login" onClick={() => setMenuOpen(false)}>
              <LogIn size={17} strokeWidth={2} />
              Login
            </Link>
          )}

          <Link
            to="/cart"
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
            className="header__icon-link header__cart"
            onClick={() => setMenuOpen(false)}
          >
            <ShoppingCart size={22} strokeWidth={1.75} />
            {count > 0 && <span className="header__cart-badge">{count}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;

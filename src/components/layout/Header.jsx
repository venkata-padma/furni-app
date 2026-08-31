import { NavLink, Link } from 'react-router-dom';
import { User, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
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

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="header__logo">
          Furni
        </Link>

        <nav className="header__nav" aria-label="Primary">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    isActive ? 'header__link header__link--active' : 'header__link'
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header__actions">
          <Link to="/account" aria-label="Account" className="header__icon-link">
            <User size={22} strokeWidth={1.75} />
          </Link>
          <Link
            to="/cart"
            aria-label={`Cart, ${count} item${count === 1 ? '' : 's'}`}
            className="header__icon-link header__cart"
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

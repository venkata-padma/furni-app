import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import FormInput from '../../components/common/FormInput';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrdersContext';
import { useWishlist } from '../../context/WishlistContext';
import './AccountPage.css';

function Security() {
  const { user, logout, deleteAccount } = useAuth();
  const { clearOrders } = useOrders();
  const { clear: clearWishlist } = useWishlist();
  const navigate = useNavigate();

  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [pwMsg, setPwMsg] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const set = (field) => (e) => {
    setPw((prev) => ({ ...prev, [field]: e.target.value }));
    setPwMsg(null);
  };

  function changePassword(e) {
    e.preventDefault();
    if (pw.next.length < 8) {
      setPwMsg({ type: 'error', text: 'New password must be at least 8 characters.' });
      return;
    }
    if (pw.next !== pw.confirm) {
      setPwMsg({ type: 'error', text: 'New password and confirmation don’t match.' });
      return;
    }
    setPw({ current: '', next: '', confirm: '' });
    setPwMsg({ type: 'ok', text: 'Password updated.' });
  }

  function signOutEverywhere() {
    logout();
    navigate('/');
  }

  function handleDelete() {
    clearOrders();
    clearWishlist();
    deleteAccount();
    navigate('/');
  }

  return (
    <div className="account-stack">
      <form className="account-card" onSubmit={changePassword} data-reveal>
        <header className="account-card__head">
          <h2 className="account-card__title">Password</h2>
          <p className="account-card__sub">
            Signed in as {user.email || 'your Furni account'}. Choose a strong password you don&rsquo;t
            use elsewhere.
          </p>
        </header>

        <FormInput
          id="pw-current"
          label="Current password"
          type="password"
          autoComplete="current-password"
          value={pw.current}
          onChange={set('current')}
        />
        <div className="account-card__grid">
          <FormInput
            id="pw-next"
            label="New password"
            type="password"
            autoComplete="new-password"
            value={pw.next}
            onChange={set('next')}
          />
          <FormInput
            id="pw-confirm"
            label="Confirm new password"
            type="password"
            autoComplete="new-password"
            value={pw.confirm}
            onChange={set('confirm')}
          />
        </div>

        <div className="account-card__actions">
          <Button type="submit" variant="primary-solid">
            Update password
          </Button>
          {pwMsg && (
            <span
              className={
                pwMsg.type === 'ok' ? 'account-card__saved' : 'account-card__error'
              }
            >
              {pwMsg.text}
            </span>
          )}
        </div>
      </form>

      <section className="account-card" data-reveal>
        <header className="account-card__head">
          <h2 className="account-card__title">Sessions</h2>
          <p className="account-card__sub">
            Sign out of Furni on this browser and any other device where you&rsquo;re logged in.
          </p>
        </header>
        <div className="account-card__actions">
          <Button type="button" variant="dark" onClick={signOutEverywhere}>
            <LogOut size={16} strokeWidth={2} /> Sign out everywhere
          </Button>
        </div>
      </section>

      <section className="account-card account-card--danger" data-reveal>
        <header className="account-card__head">
          <h2 className="account-card__title">Delete account</h2>
          <p className="account-card__sub">
            Permanently removes your profile, saved cards, wishlist and order history from this
            browser. This can&rsquo;t be undone.
          </p>
        </header>
        <label className="account-card__confirm">
          <input
            type="checkbox"
            checked={confirmDelete}
            onChange={(e) => setConfirmDelete(e.target.checked)}
          />
          I understand this permanently deletes my Furni data.
        </label>
        <div className="account-card__actions">
          <Button
            type="button"
            variant="dark"
            className="btn--danger"
            disabled={!confirmDelete}
            onClick={handleDelete}
          >
            Delete my account
          </Button>
        </div>
      </section>
    </div>
  );
}

export default Security;

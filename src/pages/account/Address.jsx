import { useState } from 'react';
import FormTextarea from '../../components/common/FormTextarea';
import Button from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import './AccountPage.css';

function Address() {
  const { user, updateUser } = useAuth();
  const [address, setAddress] = useState(user.address || '');
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({ address });
    setSaved(true);
  }

  return (
    <form className="account-card" onSubmit={handleSubmit} data-reveal>
      <header className="account-card__head">
        <h2 className="account-card__title">Delivery Address</h2>
        <p className="account-card__sub">We&rsquo;ll use this address to ship your orders.</p>
      </header>

      {user.address && (
        <div className="account-card__current">
          <span className="account-card__label">Current</span>
          <p>{user.address}</p>
        </div>
      )}

      <FormTextarea
        id="account-address"
        label={user.address ? 'Update address' : 'Address'}
        rows={4}
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          setSaved(false);
        }}
        placeholder="Street, city, postcode, country"
      />

      <div className="account-card__actions">
        <Button type="submit" variant="primary-solid">
          Save Address
        </Button>
        {saved && <span className="account-card__saved">Saved ✓</span>}
      </div>
    </form>
  );
}

export default Address;

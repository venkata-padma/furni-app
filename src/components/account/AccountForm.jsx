import { useState } from 'react';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import './AccountForm.css';

function toValues(user) {
  return {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
  };
}

function AccountForm({ user, onSave }) {
  // The Account area remounts on auth changes, so initialising once is enough.
  const [values, setValues] = useState(() => toValues(user));
  const [saved, setSaved] = useState(false);

  const set = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onSave(values);
    setSaved(true);
  }

  function handleReset() {
    setValues(toValues(user));
    setSaved(false);
  }

  return (
    <form className="account-form" onSubmit={handleSubmit} data-reveal>
      <header className="account-form__head">
        <h2 className="account-form__heading">Profile Details</h2>
        <p className="account-form__sub">This information appears on your account and orders.</p>
      </header>

      <div className="account-form__grid">
        <FormInput id="first-name" label="First Name" value={values.firstName} onChange={set('firstName')} />
        <FormInput id="last-name" label="Last Name" value={values.lastName} onChange={set('lastName')} />
      </div>

      <FormInput id="email" label="Email Address" type="email" value={values.email} onChange={set('email')} />
      <FormInput
        id="phone"
        label="Phone"
        type="tel"
        value={values.phone}
        onChange={set('phone')}
        placeholder="+92 123 4567 890"
      />

      <div className="account-form__actions">
        <Button type="submit" variant="primary-solid">
          Save Changes
        </Button>
        <Button type="button" variant="ghost" onClick={handleReset}>
          Reset
        </Button>
        {saved && <span className="account-form__saved">Saved ✓</span>}
      </div>
    </form>
  );
}

export default AccountForm;

import { useState } from 'react';
import FormInput from '../common/FormInput';
import Button from '../common/Button';
import './AccountForm.css';

function AccountForm({ initialValues }) {
  const [values, setValues] = useState(initialValues);

  function handleChange(field) {
    return (e) => setValues((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Placeholder behaviour — wire up to a real account-update endpoint later.
  }

  function handleCancel() {
    setValues(initialValues);
  }

  return (
    <form className="account-form" onSubmit={handleSubmit}>
      <h2 className="account-form__heading">Account Details</h2>

      <div className="account-form__grid">
        <FormInput
          id="first-name"
          label="First Name"
          value={values.firstName}
          onChange={handleChange('firstName')}
        />
        <FormInput
          id="last-name"
          label="Last Name"
          placeholder="Last Name"
          value={values.lastName}
          onChange={handleChange('lastName')}
        />
      </div>

      <FormInput
        id="email"
        label="Email Address"
        type="email"
        value={values.email}
        onChange={handleChange('email')}
      />

      <div className="account-form__password-field">
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
        />
        <button type="button" className="account-form__change-password">
          Change Password
        </button>
      </div>

      <div className="account-form__actions">
        <Button type="submit" variant="primary-solid">
          Save Changes
        </Button>
        <Button type="button" variant="ghost" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default AccountForm;

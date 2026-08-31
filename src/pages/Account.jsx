import { useState } from 'react';
import HeroBanner from '../components/common/HeroBanner';
import AccountSidebar from '../components/account/AccountSidebar';
import AccountForm from '../components/account/AccountForm';
import avatarPadma from '../assets/images/people/avatar-padma.svg';
import './Account.css';

// Placeholder signed-in user — replace with real auth/session data.
const CURRENT_USER = {
  name: 'Padma',
  email: 'padma@gmail.com',
  avatar: avatarPadma,
};

function Account() {
  const [activeItem, setActiveItem] = useState('profile');

  return (
    <>
      <HeroBanner
        title="Account"
        description="Lorem Ipsum dolor sit amet consectetur. Pharetra aliquet ornarevelit blandit purus erat. Viverra ac tellus morbiet purus amet nec."
      />

      <section className="account-section container">
        <AccountSidebar
          user={CURRENT_USER}
          activeItem={activeItem}
          onSelect={setActiveItem}
          onLogout={() => {
            // Placeholder behaviour — wire up to a real sign-out flow later.
          }}
        />

        <AccountForm
          initialValues={{
            firstName: CURRENT_USER.name,
            lastName: '',
            email: CURRENT_USER.email,
            password: '••••••••',
          }}
        />
      </section>
    </>
  );
}

export default Account;

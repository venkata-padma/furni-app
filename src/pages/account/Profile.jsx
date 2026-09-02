import AccountForm from '../../components/account/AccountForm';
import AccountOverview from '../../components/account/AccountOverview';
import { useAuth } from '../../context/AuthContext';
import './AccountPage.css';

function Profile() {
  const { user, updateUser } = useAuth();
  return (
    <div className="account-stack">
      <AccountOverview user={user} />
      <AccountForm user={user} onSave={updateUser} />
    </div>
  );
}

export default Profile;

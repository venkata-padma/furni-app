import AccountForm from '../../components/account/AccountForm';
import { useAuth } from '../../context/AuthContext';

function Profile() {
  const { user, updateUser } = useAuth();
  return <AccountForm user={user} onSave={updateUser} />;
}

export default Profile;

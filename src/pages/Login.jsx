import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import HeroBanner from '../components/common/HeroBanner';
import FormInput from '../components/common/FormInput';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  if (isAuthenticated) return <Navigate to="/account/profile" replace />;

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    if (isCreatingAccount && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    login(form);
    navigate('/account/profile');
  }

  return (
    <>
      <HeroBanner
        title={isCreatingAccount ? 'Create Account' : 'Login'}
        description={
          isCreatingAccount
            ? 'Create your Furni account to track orders and manage your profile.'
            : 'Log in to your Furni account to track orders and manage your profile.'
        }
          exploreTo="/services"
      />

      <section className="login-section container">
        <div className="login-card">
          <h2 className="login-card__heading">{isCreatingAccount ? 'Join Furni' : 'Welcome back'}</h2>
          <p className="login-card__sub">
              {isCreatingAccount ? 'Set up your account for a smoother shopping experience.' : 'Enter your email and password to continue.'}
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            {isCreatingAccount && (
              <FormInput
                id="login-name"
                label="Name"
                value={form.firstName}
                onChange={set('firstName')}
                autoComplete="name"
                required
              />
            )}

            <FormInput
              id="login-email"
              label="Email Address"
              type="email"
              value={form.email}
              onChange={set('email')}
              autoComplete="email"
              required
            />

            <FormInput
              id="login-password"
              label="Password"
              type="password"
              value={form.password}
              onChange={set('password')}
              autoComplete={isCreatingAccount ? 'new-password' : 'current-password'}
              required
            />

            {isCreatingAccount && (
              <FormInput
                id="login-confirm-password"
                label="Confirm Password"
                type="password"
                value={form.confirmPassword}
                onChange={set('confirmPassword')}
                autoComplete="new-password"
                required
              />
            )}

            {error && <p className="login-form__error">{error}</p>}

            <Button type="submit" variant="primary-solid" className="login-form__submit">
              {isCreatingAccount ? 'Sign In' : 'Login'}
            </Button>
          </form>

          <div className="login-card__account-options">
            <p>{isCreatingAccount ? 'Already have an account?' : "Don't have an account?"}</p>
            <button
              type="button"
              className="login-card__account-action"
              onClick={() => setIsCreatingAccount((current) => !current)}
            >
              {isCreatingAccount ? 'Sign in' : 'Create new account'}
            </button>
          </div>

          <p className="login-card__foot">
            By continuing you agree to Furni&rsquo;s Terms &amp; Privacy Policy.
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;

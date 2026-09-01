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
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  if (isAuthenticated) return <Navigate to="/account" replace />;

  const set = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    login(form);
    navigate('/account');
  }

  return (
    <>
      <HeroBanner
        title="Sign In"
        description="Enter your details to access your Furni account, track orders and manage your profile."
      />

      <section className="login-section container">
        <div className="login-card">
          <h2 className="login-card__heading">Welcome to Furni</h2>
          <p className="login-card__sub">
            We&rsquo;ll use these details for your profile and delivery.
          </p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-form__row">
              <FormInput
                id="login-first"
                label="First Name"
                value={form.firstName}
                onChange={set('firstName')}
                autoComplete="given-name"
                required
              />
              <FormInput
                id="login-last"
                label="Last Name"
                value={form.lastName}
                onChange={set('lastName')}
                autoComplete="family-name"
              />
            </div>

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
              autoComplete="current-password"
              required
            />

            <Button type="submit" variant="primary-solid" className="login-form__submit">
              Sign In
            </Button>
          </form>

          <p className="login-card__foot">
            By continuing you agree to Furni&rsquo;s Terms &amp; Privacy Policy.
          </p>
        </div>
      </section>
    </>
  );
}

export default Login;

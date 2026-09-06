import { useState } from 'react';
import { CheckCircle2, ChevronLeft, ChevronRight, CreditCard, Mail, Send, UserRound } from 'lucide-react';
import './NewsletterSubscribe.css';

const PLANS = [
  { id: 'monthly', label: '1 month', price: 9.99 },
  { id: 'quarterly', label: '3 months', price: 24.99 },
  { id: 'half-year', label: '6 months', price: 44.99 },
  { id: 'annual', label: '1 year', price: 79.99 },
];

function NewsletterSubscribe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('details');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [payment, setPayment] = useState({
    method: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
  });

  const updatePayment = (field) => (event) =>
    setPayment((current) => ({ ...current, [field]: event.target.value }));

  function handleSubmit(e) {
    e.preventDefault();
    setStep('success');
  }

  function choosePlan(plan) {
    setSelectedPlan(plan);
    setStep('review');
  }

  function handlePayment(e) {
    e.preventDefault();
    setStep('success');
  }

  return (
    <section className="newsletter">
      <div className="container">
        <p className="newsletter__eyebrow">Stay connected</p>
        <h2 className="newsletter__heading">Subscribe to our Newsletter</h2>
        <p className="newsletter__description">Get the latest updates, new arrivals, exclusive offers and home inspiration straight to your inbox.</p>

        {step === 'details' && <form className="newsletter__form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="newsletter-name">
            Your name
          </label>
          <div className="newsletter__field">
            <UserRound size={19} />
            <input id="newsletter-name" type="text" placeholder="Enter your Name" value={name} onChange={(e) => setName(e.target.value)} className="newsletter__input" />
          </div>

          <label className="sr-only" htmlFor="newsletter-email">
            Your email
          </label>
          <div className="newsletter__field">
            <Mail size={19} />
            <input id="newsletter-email" type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="newsletter__input" />
          </div>

          <button type="submit" className="newsletter__submit">
            Subscribe <Send size={18} strokeWidth={1.75} />
          </button>
        </form>}

        {step === 'plans' && (
          <div className="newsletter__step">
            <h3>Choose your subscription</h3>
            <div className="newsletter__plans">
              {PLANS.map((plan) => (
                <button type="button" className="newsletter__plan" key={plan.id} onClick={() => choosePlan(plan)}>
                  <strong>{plan.label}</strong>
                  <span>${plan.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'review' && selectedPlan && (
          <div className="newsletter__step newsletter__review">
            <h3>Review your subscription</h3>
            <dl>
              <div><dt>Name</dt><dd>{name}</dd></div>
              <div><dt>Email</dt><dd>{email}</dd></div>
              <div><dt>Plan</dt><dd>{selectedPlan.label}</dd></div>
              <div><dt>Total</dt><dd>${selectedPlan.price.toFixed(2)}</dd></div>
            </dl>
            <div className="newsletter__step-actions">
              <button type="button" className="newsletter__back" onClick={() => setStep('plans')}><ChevronLeft size={17} /> Plans</button>
              <button type="button" className="newsletter__submit" onClick={() => setStep('payment')}>Proceed <ChevronRight size={17} /></button>
            </div>
          </div>
        )}

        {step === 'payment' && selectedPlan && (
          <form className="newsletter__step newsletter__payment" onSubmit={handlePayment}>
            <h3>Payment details</h3>
            <div className="newsletter__payment-summary">
              <span>{selectedPlan.label} subscription</span>
              <strong>${selectedPlan.price.toFixed(2)}</strong>
            </div>
            <label className="newsletter__select-field">
              <span>Payment method</span>
              <select value={payment.method} onChange={updatePayment('method')} required>
                <option value="">Choose how to pay</option>
                <option value="card">Credit or debit card</option>
                <option value="paypal">PayPal</option>
                <option value="apple-pay">Apple Pay</option>
              </select>
            </label>
            {payment.method === 'card' && (
              <>
                <div className="newsletter__payment-field"><CreditCard size={18} /><input aria-label="Card number" inputMode="numeric" placeholder="Card number" value={payment.cardNumber} onChange={updatePayment('cardNumber')} required /></div>
                <div className="newsletter__payment-row">
                  <select aria-label="Expiry month" value={payment.expiryMonth} onChange={updatePayment('expiryMonth')} required>
                    <option value="">Expiry month</option>
                    {Array.from({ length: 12 }, (_, index) => {
                      const month = String(index + 1).padStart(2, '0');
                      return <option key={month} value={month}>{month}</option>;
                    })}
                  </select>
                  <select aria-label="Expiry year" value={payment.expiryYear} onChange={updatePayment('expiryYear')} required>
                    <option value="">Expiry year</option>
                    {[2026, 2027, 2028, 2029, 2030].map((year) => <option key={year} value={year}>{year}</option>)}
                  </select>
                </div>
              </>
            )}
            <div className="newsletter__step-actions">
              <button type="button" className="newsletter__back" onClick={() => setStep('review')}><ChevronLeft size={17} /> Review</button>
              <button type="submit" className="newsletter__submit">Pay ${selectedPlan.price.toFixed(2)} <ChevronRight size={17} /></button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="newsletter__success-view">
            <CheckCircle2 size={72} strokeWidth={1.6} />
            <h3>You&apos;re subscribed!</h3>
            <p>Thanks, {name}. You are now subscribed to our newsletter. A confirmation was sent to {email}.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default NewsletterSubscribe;

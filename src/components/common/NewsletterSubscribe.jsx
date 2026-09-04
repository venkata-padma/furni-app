import { useState } from 'react';
import { Mail, Send, UserRound } from 'lucide-react';
import './NewsletterSubscribe.css';

function NewsletterSubscribe() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // Placeholder behaviour — wire up to a real subscription endpoint later.
    setSubmitted(true);
  }

  return (
    <section className="newsletter">
      <div className="container">
        <p className="newsletter__eyebrow">Stay connected</p>
        <h2 className="newsletter__heading">Subscribe to our Newsletter</h2>
        <p className="newsletter__description">Get the latest updates, new arrivals, exclusive offers and home inspiration straight to your inbox.</p>

        <form className="newsletter__form" onSubmit={handleSubmit}>
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
        </form>
        {submitted && <p className="newsletter__success">Thanks — you're subscribed!</p>}
      </div>
    </section>
  );
}

export default NewsletterSubscribe;

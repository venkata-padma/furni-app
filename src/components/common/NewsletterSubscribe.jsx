import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
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
        <h2 className="newsletter__heading">
          <Mail size={20} strokeWidth={1.75} />
          Subscribe to NewSletter
        </h2>

        <form className="newsletter__form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="newsletter-name">
            Your name
          </label>
          <input
            id="newsletter-name"
            type="text"
            placeholder="Enter your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="newsletter__input"
          />

          <label className="sr-only" htmlFor="newsletter-email">
            Your email
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter__input"
          />

          <button type="submit" className="newsletter__submit" aria-label="Subscribe">
            <Send size={18} strokeWidth={1.75} />
          </button>
        </form>
        {submitted && <p className="newsletter__success">Thanks — you're subscribed!</p>}
      </div>
    </section>
  );
}

export default NewsletterSubscribe;

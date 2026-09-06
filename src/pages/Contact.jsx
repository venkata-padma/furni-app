import { useState } from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import HeroBanner from '../components/common/HeroBanner';
import ContactInfoItem from '../components/contact/ContactInfoItem';
import FormInput from '../components/common/FormInput';
import FormTextarea from '../components/common/FormTextarea';
import Button from '../components/common/Button';
import TestimonialCarousel from '../components/testimonial/TestimonialCarousel';
import FeaturedProductShowcase from '../components/common/FeaturedProductShowcase';
import NewsletterSubscribe from '../components/common/NewsletterSubscribe';
import { testimonials } from '../data/testimonials';
import './Contact.css';

const CONTACT_INFO = [
  { icon: MapPin, label: 'River Swat, Pakistan' },
  { icon: Mail, label: 'info@youremail.com' },
  { icon: Phone, label: '+92 123 4567 890' },
];

function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Placeholder behaviour — wire up to a real contact endpoint later.
    setSubmitted(true);
  }

  return (
    <>
      <HeroBanner
        title="Contact Us"
        description="Lorem Ipsum dolor sit amet consectetur. Pharetra aliquet ornarevelit blandit purus erat. Viverra ac tellus morbiet purus amet nec."
        exploreTo="/services"
      />

      <div className="contact-section-wrap">
        <section className="contact-section container">
          <div className="contact-section__intro">
            <p className="contact-section__eyebrow">We would love to hear from you</p>
            <h2>Let&apos;s make your space feel like home.</h2>
            <p>Have a question about a product, an order, or your next room refresh? Send us a note and our team will get back to you soon.</p>
          </div>

          <div className="contact-info">
            {CONTACT_INFO.map((item) => (
              <ContactInfoItem key={item.label} icon={item.icon} label={item.label} />
            ))}
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-form__grid">
              <FormInput
                id="contact-first-name"
                label="First Name"
                value={form.firstName}
                onChange={handleChange('firstName')}
              />
              <FormInput
                id="contact-last-name"
                label="Last Name"
                value={form.lastName}
                onChange={handleChange('lastName')}
              />
            </div>

            <FormInput
              id="contact-email"
              label="Email Address"
              type="email"
              value={form.email}
              onChange={handleChange('email')}
            />
            <FormTextarea
              id="contact-message"
              label="Message"
              value={form.message}
              onChange={handleChange('message')}
            />

            <Button type="submit" variant="primary-solid">
              Send Message
            </Button>
            {submitted && <p className="contact-form__success">Thanks — your message was sent.</p>}
          </form>
        </section>
      </div>

      <TestimonialCarousel testimonials={testimonials} />
      <FeaturedProductShowcase />
      <NewsletterSubscribe />
    </>
  );
}

export default Contact;

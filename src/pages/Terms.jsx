import LegalPage from './LegalPage';

const sections = [
  { heading: 'Using Furni', body: 'Furni provides an online furniture catalogue and shopping experience. By using this website, you agree to provide accurate information and use the site for lawful personal shopping purposes.' },
  { heading: 'Orders and payment', body: 'An order is placed when checkout is completed and Furni confirms the order details. Prices, availability, delivery estimates, and payment details are shown during checkout. Our demo checkout does not process real payments.' },
  { heading: 'Delivery and returns', body: 'Delivery timing and return eligibility depend on the product and destination. Please contact our team through the Contact page before returning an item so we can guide you through the appropriate process.' },
  { heading: 'Product information', body: 'We work to keep product names, images, dimensions, materials, and prices accurate. Small differences in color or finish may occur because of screen settings and natural material variation.' },
  { heading: 'Contact', body: 'Questions about these terms or an order can be sent through our contact form. We will use the details you provide to respond and help resolve your request.' },
];

function Terms() {
  return <LegalPage title="Terms & Conditions" intro="These terms explain how the Furni website, catalogue, cart, checkout, and customer services work together." sections={sections} />;
}

export default Terms;

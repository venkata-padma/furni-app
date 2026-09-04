import LegalPage from './LegalPage';

const sections = [
  { heading: 'Information we collect', body: 'Furni may collect contact details, delivery information, account preferences, order details, and messages you submit when you use our account, checkout, or contact features.' },
  { heading: 'How we use information', body: 'We use this information to provide products and services, manage your cart and orders, respond to questions, improve the website, and keep your account experience useful and secure.' },
  { heading: 'Storage and local preferences', body: 'This demo storefront stores cart and order data in your browser so your experience persists between visits. You can clear this data through your browser settings.' },
  { heading: 'Sharing information', body: 'We do not sell your personal information. Information is shared only when needed to provide a requested service, comply with a legal requirement, or protect the security of Furni and its customers.' },
  { heading: 'Your choices', body: 'You can review or update account information from your profile pages and contact us with questions about your personal data. You may also stop using the site or clear locally stored browser data at any time.' },
];

function Privacy() {
  return <LegalPage title="Privacy Policy" intro="Your privacy matters to Furni. This policy explains what information we use and the choices available to you." sections={sections} />;
}

export default Privacy;

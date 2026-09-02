// Payment options Furni accepts at checkout. Presentational only — there is no
// real payment processor wired up in this demo.
export const availablePaymentMethods = [
  {
    id: 'visa',
    name: 'Visa',
    kind: 'card',
    blurb: 'Credit & debit cards',
  },
  {
    id: 'mastercard',
    name: 'Mastercard',
    kind: 'card',
    blurb: 'Credit & debit cards',
  },
  {
    id: 'amex',
    name: 'American Express',
    kind: 'card',
    blurb: 'Credit cards',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    kind: 'wallet',
    blurb: 'Pay with your PayPal balance or linked account',
  },
  {
    id: 'apple-pay',
    name: 'Apple Pay',
    kind: 'wallet',
    blurb: 'One-tap checkout on Apple devices',
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    kind: 'bank',
    blurb: 'Direct transfer — order ships once funds clear',
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    kind: 'cod',
    blurb: 'Pay in cash when your furniture arrives',
  },
];

/** Detect the card brand from the leading digits of a card number. */
export function detectCardBrand(number) {
  const n = number.replace(/\D/g, '');
  if (/^4/.test(n)) return 'Visa';
  if (/^(5[1-5]|2[2-7])/.test(n)) return 'Mastercard';
  if (/^3[47]/.test(n)) return 'American Express';
  if (/^6(011|5)/.test(n)) return 'Discover';
  return 'Card';
}

/** Group digits for display: 4-4-4-4, or 4-6-5 for Amex. */
export function formatCardNumber(value) {
  const n = value.replace(/\D/g, '').slice(0, 16);
  const amex = /^3[47]/.test(n);
  const groups = amex ? [4, 6, 5] : [4, 4, 4, 4];
  const out = [];
  let i = 0;
  for (const size of groups) {
    if (i >= n.length) break;
    out.push(n.slice(i, i + size));
    i += size;
  }
  return out.join(' ');
}

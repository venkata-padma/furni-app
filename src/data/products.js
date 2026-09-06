// Product photography lives in /public so the same assets can be swapped without a rebuild.
const nordicChair = '/chair1-home.png';
const kruzoChair = '/chair2-home.png';
const ergonomicChair = '/chair3-home.png';

// Placeholder catalog data — replace with real API data when backend is available.
export const products = [
  { id: 'nordic-chair', name: 'Nordic Chair', price: 20.0, image: nordicChair },
  { id: 'kruzo-chair', name: 'Kruzo Chair', price: 31.2, image: kruzoChair },
  { id: 'ergonomic-chair', name: 'Ergonomic Chair', price: 17.6, image: ergonomicChair },
];

// Shop grid repeats the catalog to fill an 8-item layout, matching the design.
export const shopProducts = [
  products[0], products[1], products[2], products[0],
  products[2], products[0], products[1], products[2],
].map((p, i) => ({ ...p, id: `${p.id}-${i}` }));

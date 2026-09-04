const desc = 'Thoughtful support and dependable service for a smoother furniture journey.';

const details = {
  delivery: { slug: 'delivery', detailTitle: 'Furniture delivery, made simple.', detailDescription: 'From our studio to your doorstep, we coordinate every step so your new pieces arrive safely, on time, and ready to become part of your home.', points: ['Carefully protected packaging', 'Flexible delivery scheduling', 'Doorstep placement in your chosen room'] },
  shop: { slug: 'shop', detailTitle: 'A calmer way to find your pieces.', detailDescription: 'Browse considered furniture collections with clear details, helpful guidance, and an easy path from inspiration to checkout.', points: ['Curated collections for every room', 'Clear dimensions and material details', 'Friendly help when you need a second opinion'] },
  support: { slug: 'support', detailTitle: 'Here whenever your home needs us.', detailDescription: 'Our support team is ready to help with product questions, order updates, and practical advice before and after your purchase.', points: ['Responsive order assistance', 'Product and care guidance', 'Support seven days a week'] },
  returns: { slug: 'returns', detailTitle: 'Returns without the hassle.', detailDescription: 'Sometimes a piece is not quite right. Our straightforward returns process gives you room to make the choice that feels best for your space.', points: ['Simple return requests', 'Clear policy with no surprises', 'Helpful team from request to resolution'] },
};

export const features = [
  { id: 'delivery', icon: 'Truck', title: 'Fast & Free Delivery', description: desc },
  { id: 'shop', icon: 'ShoppingBag', title: 'Easy to Shop', description: desc },
  { id: 'support', icon: 'LifeBuoy', title: '24/7 Support', description: desc },
  { id: 'returns', icon: 'RefreshCw', title: 'Hassie Free Returns', description: desc },
];

export const servicesFeatures = [
  { ...details.delivery, id: 'delivery', icon: 'Truck', title: 'Fast & Free Delivery', description: desc },
  { ...details.shop, id: 'shop', icon: 'ShoppingBag', title: 'Easy to Shop', description: desc },
  { ...details.support, id: 'support', icon: 'LifeBuoy', title: '24/7 Support', description: desc },
  { ...details.returns, id: 'returns', icon: 'RefreshCw', title: 'Hassle Free Returns', description: desc },
  { ...details.delivery, id: 'delivery-secondary', icon: 'Truck', title: 'Fast & Free Delivery', description: desc },
  { ...details.shop, id: 'shop-secondary', icon: 'ShoppingBag', title: 'Easy to Shop', description: desc },
];

export const serviceDetails = Object.values(details);

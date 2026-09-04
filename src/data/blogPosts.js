// Blog photography served from /public.
// Placeholder blog data — replace with real CMS/API data when available.
const postContent = [
  {
    title: 'First Time Home Owner Ideas',
    excerpt: 'Simple ways to create a comfortable, personal home from the very first day.',
    body: 'A first home is a chance to build a space around the way you actually live. Start with the pieces you use every day, then layer in warm lighting, meaningful objects, and one or two colors that make the room feel like yours.',
  },
  {
    title: 'How to Style a Quiet Reading Corner',
    excerpt: 'Turn an unused corner into a calm retreat with a chair, a lamp, and a little intention.',
    body: 'The best reading corners are less about size and more about atmosphere. Choose a chair that supports long conversations with a good book, add a focused pool of light, and keep a small surface nearby for tea or the current page-turner.',
  },
  {
    title: 'The Art of Choosing Timeless Furniture',
    excerpt: 'A practical guide to choosing pieces that will keep working as your home evolves.',
    body: 'Timeless furniture earns its place through proportion, comfort, and honest materials. Look for silhouettes that can live with different rugs and wall colors, then invest in the details you touch most often.',
  },
];

export const blogPosts = Array.from({ length: 9 }, (_, i) => ({
  id: `post-${i + 1}`,
  image: `/blog-${i + 1}.png`,
  ...(postContent[i % postContent.length]),
  author: 'Tariq Raza',
  date: 'Oct 26, 2026',
}));

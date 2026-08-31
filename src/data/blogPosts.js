// Blog photography served from /public.
// Placeholder blog data — replace with real CMS/API data when available.
export const blogPosts = Array.from({ length: 9 }, (_, i) => ({
  id: `post-${i + 1}`,
  image: `/blog-${i + 1}.png`,
  title: 'First Time Home Owner Ideas',
  author: 'Tariq Raza',
  date: 'Oct 26, 2026',
}));

// Team portraits served from /public.
// Placeholder team data — replace with real bios when available.
export const team = [
  { id: 'jeremy', name: 'Jeremy Walker', title: 'CEO, Founder, Atty.', photo: '/profile-1.png' },
  { id: 'kathryn', name: 'Kathryn Ryan', title: 'CEO, Founder, Atty.', photo: '/profile-2.png' },
  { id: 'lawson', name: 'Lawson Arnold', title: 'CEO, Founder, Atty.', photo: '/profile-3.png' },
  { id: 'patrik', name: 'Patrik White', title: 'CEO, Founder, Atty.', photo: '/profile-4.png' },
];

const bio = 'Donec facilisis quam ut purus tutrum lobortis. Donec vitae odio quis nisi dapibus maiesuada';
export const teamWithBio = team.map((t) => ({ ...t, bio }));

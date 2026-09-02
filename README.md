# Furni — React + Vite Frontend

A React + Vite implementation of the Furni furniture-store design.

## Tech stack
- React 19
- Vite
- JavaScript (JSX)
- Plain CSS (design tokens in `src/styles/variables.css`)
- React Router v7

## Getting started
```bash
npm install
npm run dev       # start local dev server
npm run build     # production build
npm run preview   # preview the production build
npm run lint      # oxlint
```

## Pages / routes
| Route        | Page       |
|--------------|------------|
| `/`          | Home       |
| `/shop`      | Shop       |
| `/about`     | About Us   |
| `/services`  | Services   |
| `/blog`      | Blog       |
| `/contact`   | Contact Us |
| `/cart`      | Cart       |
| `/checkout`  | Checkout   |
| `/account`   | Account    |
| `*`          | 404 / Not Found |

## Features
- **Animated top navbar** — links slide in a yellow underline and lift on hover; sticky on scroll.
- **Product cards** — chair image on a clean background; on hover a light-green panel eases up
  from the bottom behind the chair with centred name/price and an add-to-cart `+` button.
- **Cart** — `src/context/CartContext.jsx` provides add / increase / decrease / remove / clear,
  coupon codes (`FURNI10`, `WELCOME5`), derived subtotal / discount / total, persisted to
  `localStorage`. The header cart icon shows a live count badge; `/checkout` places the order
  and clears the cart.
- **Account area** — `/account` (auth-gated) with a grouped sidebar:
  - **Profile** — an overview dashboard (order / wishlist / saved-card stats, setup checklist) plus editable details.
  - **My Orders** — real orders created at checkout (`src/context/OrdersContext.jsx`, persisted to
    `localStorage`), each with a delivery timeline, expandable summary, cancel, "mark received" and
    "buy again". Empty state uses `/public/no-orders.png`.
  - **Wishlist** — heart any product in the shop (`src/context/WishlistContext.jsx`); move items to cart individually or in bulk.
  - **Address**, **Payment Methods** (add / remove / set-default cards — only brand, last 4 and
    expiry are stored — plus an "accepted payment methods" reference), **Notifications**
    (per-channel email toggles), **Security** (change password, sign out everywhere, delete account).
- **Checkout** — pick a saved card or Cash on Delivery; placing the order records it under My Orders.
- **Testimonials** — auto-advancing carousel (5s loop, pauses on hover) with a fixed-height quote.
- **Blog cards** — image zoom, lift, colour shift and a "Read More" reveal on hover.

## Images
Photography lives in `public/` and is referenced by absolute path
(e.g. `/hero-sofa.png`, `/chair1-home.png`, `/blog-1.png`, `/profile-1.png`).
Swap the files in `public/` (keeping the names) to change the imagery.

## Placeholder data
`src/data/*.js` holds placeholder catalog / blog / testimonial / team / cart data.
Replace with real API calls when a backend is available — components consume this
data via props / context, so component changes shouldn't be required.

## Folder structure
```
src/
├── assets/               legacy placeholder SVGs (no longer referenced)
├── components/
│   ├── layout/            Header, Footer, Layout
│   ├── common/            Button, HeroBanner, NewsletterSubscribe,
│   │                      FeaturedProductShowcase, FormInput, FormTextarea, SocialIcons
│   ├── product/           ProductCard, ProductGrid
│   ├── testimonial/       TestimonialCarousel
│   ├── features/          FeatureItem
│   ├── blog/              BlogCard
│   ├── team/              TeamMemberCard
│   ├── contact/           ContactInfoItem
│   ├── cart/              CartTable, CartItemRow, QuantityStepper, CouponForm, CartSummary
│   └── account/           AccountSidebar, AccountForm
├── context/              CartContext.jsx
├── data/                 placeholder data
├── pages/                one file per route
├── router/               AppRouter.jsx
├── styles/               variables.css (design tokens), global.css
├── App.jsx
└── main.jsx
```

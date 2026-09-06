import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import './HeroBanner.css';

// Shared hero photograph, served from /public.
const sofaHero = '/hero-sofa.png';

/**
 * Shared dark-green hero section used at the top of every page.
 * title/description are page-specific; image defaults to the sofa hero shot.
 */
function HeroBanner({ title, description, image = sofaHero, imageAlt = 'Furniture', exploreTo = '/services' }) {
  const { pathname } = useLocation();

  return (
    // key re-mounts the content on every route change so the entrance
    // animation replays each time you navigate to a page.
    <section className="hero" key={pathname}>
      <div className="container hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">{title}</h1>
          {description && <p className="hero__description">{description}</p>}
          <div className="hero__actions">
            <Button as={Link} to="/shop" variant="primary">
              Shop Now
            </Button>
            <Button as={Link} to={exploreTo} variant="outline">
              Explore Now
            </Button>
          </div>
        </div>

        <div className="hero__media">
          <img src={image} alt={imageAlt} className="hero__image" />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;

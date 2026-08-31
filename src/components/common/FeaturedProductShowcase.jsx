import './FeaturedProductShowcase.css';

// Teal armchair cut-out, served from /public.
const armchair = '/armchair.png';

/**
 * The teal armchair image band that sits above the newsletter section
 * on every inner page, straddling the soft-grey and white backgrounds.
 */
function FeaturedProductShowcase() {
  return (
    <div className="showcase" aria-hidden="true">
      <div className="showcase__split">
        <div className="showcase__top" />
        <div className="showcase__bottom" />
      </div>
      <img src={armchair} alt="" className="showcase__image" />
    </div>
  );
}

export default FeaturedProductShowcase;

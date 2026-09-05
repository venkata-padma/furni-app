import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './HorizontalScrollRail.css';

function HorizontalScrollRail({ children, className = '' }) {
  const railRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;

    const updateScrollState = () => {
      setCanScrollLeft(rail.scrollLeft > 4);
      setCanScrollRight(rail.scrollLeft + rail.clientWidth < rail.scrollWidth - 4);
    };

    updateScrollState();
    rail.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      rail.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const scroll = (direction) => {
    railRef.current?.scrollBy({
      left: direction * railRef.current.clientWidth * 0.82,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`horizontal-rail ${className}`}>
      <button
        type="button"
        className="horizontal-rail__arrow horizontal-rail__arrow--left"
        onClick={() => scroll(-1)}
        disabled={!canScrollLeft}
        aria-label="Scroll left"
      >
        <ArrowLeft size={20} strokeWidth={2.25} />
      </button>
      <div className="horizontal-rail__viewport" ref={railRef}>
        {children}
      </div>
      <button
        type="button"
        className="horizontal-rail__arrow horizontal-rail__arrow--right"
        onClick={() => scroll(1)}
        disabled={!canScrollRight}
        aria-label="Scroll right"
      >
        <ArrowRight size={20} strokeWidth={2.25} />
      </button>
    </div>
  );
}

export default HorizontalScrollRail;

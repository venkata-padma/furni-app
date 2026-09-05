import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './TestimonialCarousel.css';

const AUTOPLAY_MS = 5000;

function TestimonialCarousel({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance through the testimonials in a loop; pause on hover/focus.
  useEffect(() => {
    if (paused || testimonials.length <= 1) return undefined;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % testimonials.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, testimonials.length, activeIndex]);

  const active = testimonials[activeIndex];
  if (!active) return null;

  const showPrevious = () => {
    setActiveIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  };

  const showNext = () => {
    setActiveIndex((i) => (i + 1) % testimonials.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') showPrevious();
    if (event.key === 'ArrowRight') showNext();
  };

  return (
    <section
      className="testimonials"
      aria-label="Customer testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container testimonials__inner">
        <h2 className="testimonials__heading">Testimonials</h2>

        <div
          className="testimonials__panel"
          tabIndex="0"
          onKeyDown={handleKeyDown}
          aria-live="polite"
        >
          <button
            type="button"
            className="testimonials__arrow testimonials__arrow--previous"
            onClick={showPrevious}
            aria-label="Show previous testimonial"
          >
            <ArrowLeft size={22} strokeWidth={2.25} />
          </button>

          <div className="testimonials__slide" key={active.id}>
            <p className="testimonials__quote">{active.quote}</p>
            <img src={active.avatar} alt={active.name} className="testimonials__avatar" />
            <p className="testimonials__name">{active.name}</p>
            <p className="testimonials__title">{active.title}</p>
          </div>

          <button
            type="button"
            className="testimonials__arrow testimonials__arrow--next"
            onClick={showNext}
            aria-label="Show next testimonial"
          >
            <ArrowRight size={22} strokeWidth={2.25} />
          </button>
        </div>

        <div className="testimonials__dots" role="tablist" aria-label="Testimonials">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show testimonial from ${t.name}`}
              className={
                i === activeIndex
                  ? 'testimonials__dot testimonials__dot--active'
                  : 'testimonials__dot'
              }
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialCarousel;

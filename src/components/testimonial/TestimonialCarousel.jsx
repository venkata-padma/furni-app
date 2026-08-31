import { useEffect, useState } from 'react';
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

  return (
    <section
      className="testimonials"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container testimonials__inner">
        <h2 className="testimonials__heading">Testinomials</h2>

        <div className="testimonials__slide" key={active.id}>
          <p className="testimonials__quote">{active.quote}</p>
          <img src={active.avatar} alt={active.name} className="testimonials__avatar" />
          <p className="testimonials__name">{active.name}</p>
          <p className="testimonials__title">{active.title}</p>
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

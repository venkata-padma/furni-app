import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './TestimonialCarousel.css';

const AUTOPLAY_MS = 5000;

function TestimonialCarousel({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
  };

  const showPrevious = () => {
    setActiveIndex((currentIndex) => {
      const nextIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
      scrollToIndex(nextIndex);
      return nextIndex;
    });
  };

  const showNext = () => {
    setActiveIndex((currentIndex) => {
      const nextIndex = (currentIndex + 1) % testimonials.length;
      scrollToIndex(nextIndex);
      return nextIndex;
    });
  };

  // Auto-advance through the testimonials in a loop.
  useEffect(() => {
    if (testimonials.length <= 1) return undefined;
    const id = setInterval(() => {
      showNext();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const active = testimonials[activeIndex];
  if (!active) return null;

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') showPrevious();
    if (event.key === 'ArrowRight') showNext();
  };

  const handleTrackScroll = (event) => {
    const track = event.currentTarget;
    const nextIndex = Math.round(track.scrollLeft / track.clientWidth);
    if (nextIndex !== activeIndex && nextIndex >= 0 && nextIndex < testimonials.length) {
      setActiveIndex(nextIndex);
    }
  };

  return (
    <section
      className="testimonials"
      aria-label="Customer testimonials"
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

          <div
            className="testimonials__track"
            ref={trackRef}
            onScroll={handleTrackScroll}
            aria-label="Scrollable customer testimonials"
          >
            {testimonials.map((testimonial) => (
              <article className="testimonials__slide" key={testimonial.id}>
                <p className="testimonials__quote">{testimonial.quote}</p>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="testimonials__avatar"
                />
                <p className="testimonials__name">{testimonial.name}</p>
                <p className="testimonials__title">{testimonial.title}</p>
              </article>
            ))}
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
              onClick={() => {
                setActiveIndex(i);
                scrollToIndex(i);
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialCarousel;

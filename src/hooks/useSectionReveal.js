import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Minimal scroll-in reveal for a page's top-level sections.
 *
 * Runs on every route change: marks each direct child of <main> (except the
 * hero, which has its own entrance) as hidden, then fades + rises it into
 * place once it scrolls into view. Honours prefers-reduced-motion.
 */
export function useSectionReveal() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const main = document.querySelector('main');
    if (!main) return undefined;

    const targets = Array.from(main.children).filter(
      (el) => !el.classList.contains('hero')
    );

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('reveal-in'));
      return undefined;
    }

    targets.forEach((el) => {
      el.classList.add('reveal');
      el.classList.remove('reveal-in');
    });

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
}

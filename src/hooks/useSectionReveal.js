import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scroll-in reveal: elements fade + rise into place one by one as they
 * enter the viewport. Re-arms on every route change.
 *
 * - If the page opts in with `data-reveal` attributes, those elements are
 *   the targets (use this for finer control inside a page).
 * - Otherwise every direct child of <main> (except the hero, which has its
 *   own entrance) is a target.
 *
 * Honours prefers-reduced-motion and degrades to "always visible".
 */
export function useSectionReveal() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const main = document.querySelector('main');
    if (!main) return undefined;

    const opted = Array.from(main.querySelectorAll('[data-reveal]'));
    const targets = opted.length
      ? opted
      : Array.from(main.children).filter((el) => !el.classList.contains('hero'));

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('reveal-in'));
      return undefined;
    }

    targets.forEach((el, i) => {
      el.classList.add('reveal');
      el.classList.remove('reveal-in');
      // Small cascade when several targets enter together (e.g. on load).
      el.style.setProperty('--reveal-i', String(Math.min(i, 4)));
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

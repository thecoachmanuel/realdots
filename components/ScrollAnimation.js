'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimation({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Small delay to allow the DOM to fully paint after navigation
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              // Once visible, stop observing — no need to re-trigger
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
      );

      const hiddenElements = document.querySelectorAll('.animate-on-scroll');
      hiddenElements.forEach((el) => {
        // Reset visibility for re-navigation — remove is-visible and re-observe
        el.classList.remove('is-visible');
        observer.observe(el);
      });

      return () => {
        hiddenElements.forEach((el) => observer.unobserve(el));
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]); // Re-run whenever the route changes

  return <>{children}</>;
}

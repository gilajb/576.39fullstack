import { useState, useEffect, useRef } from "react";

/**
 * useIntersection
 * Returns a [ref, isVisible] tuple.
 * Once the element enters the viewport it stays "visible" and the observer disconnects.
 */
export const useIntersection = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return [ref, visible];
};

/**
 * useParallax
 * Returns the current window.scrollY for parallax calculations.
 */
export const useParallax = () => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handler = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return offset;
};

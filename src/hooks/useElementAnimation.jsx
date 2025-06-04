import { useEffect } from "react";
import { animate, stagger } from "framer-motion";

export const useElementAnimation = () => {
  useEffect(() => {
    // Animate all elements with data-animate attribute
    animate(
      "[data-animate]",
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      },
      {
        delay: stagger(0.15, { startDelay: 0.3 }),
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }
    );

    // Special animation for impact numbers
    animate(
      "[data-countup]",
      { scale: [1, 1.1, 1] },
      {
        duration: 0.8,
        ease: "easeOut",
      }
    );
  }, []);
};

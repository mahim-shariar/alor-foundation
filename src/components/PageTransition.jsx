import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 14 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.22, ease: "easeIn" } },
};

/**
 * Wrap each page in this for smooth route transitions.
 * `padTop` adds pt-[72px] to clear the fixed navbar (omit on the home page
 * where the hero intentionally starts at the very top).
 */
export default function PageTransition({ children, padTop = true }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      className={padTop ? "pt-[72px]" : ""}
    >
      {children}
    </motion.div>
  );
}

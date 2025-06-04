import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiHeart } from "react-icons/fi";

const navLinks = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <motion.div
        className={`
          pointer-events-auto
          w-[98vw] max-w-6xl mx-auto mt-3
          rounded-2xl transition-all duration-500
          border border-emerald-100/70 shadow-xl
          flex items-center px-4 sm:px-8 h-[68px]
          bg-gradient-to-br
          ${
            scrolled
              ? "from-white/80 via-teal-50/90 to-emerald-50/90 backdrop-blur-xl"
              : "bg-transparent shadow-none border-transparent"
          }
        `}
        initial={false}
        animate={{
          backgroundColor: scrolled
            ? "rgba(255,255,255,0.87)"
            : "rgba(255,255,255,0)",
          boxShadow: scrolled
            ? "0 6px 32px 0 #0596691a"
            : "0 0px 0px 0 transparent",
          borderColor: scrolled
            ? "rgba(16,185,129,0.16)"
            : "rgba(16,185,129,0)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 shadow-xl">
            <motion.span
              className="absolute -inset-1 rounded-full bg-teal-400/20 blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <span className="relative text-white font-bold text-2xl select-none">
              A
            </span>
          </div>
          <span className="hidden sm:block text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600 tracking-tight">
            Alor Foundation
          </span>
        </a>
        {/* Links */}
        <div className="hidden md:flex gap-2 ml-10 flex-1">
          {navLinks.map((link, idx) => (
            <motion.a
              key={link.label}
              href={link.href}
              className={`
                relative px-5 py-2 rounded-full
                bg-white/40 backdrop-blur-lg
                border border-emerald-100/50
                font-semibold text-gray-700
                hover:text-emerald-600 hover:shadow
                transition-all duration-200
                group
              `}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * idx, duration: 0.3 }}
            >
              <span className="relative z-10">{link.label}</span>
            </motion.a>
          ))}
        </div>
        {/* CTA Donate button */}
        <a
          href="#donate"
          className="ml-auto hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:scale-105 hover:shadow-xl transition-all"
        >
          <FiHeart className="text-lg text-pink-200" />
          Donate
        </a>
        {/* Mobile menu button */}
        <button
          className="md:hidden ml-auto p-2 text-emerald-600 text-2xl"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu />
        </button>
      </motion.div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="absolute top-3 right-3 w-[88vw] max-w-xs h-[90vh] bg-white/90 bg-gradient-to-br from-teal-50 to-emerald-50 shadow-xl border border-emerald-100 rounded-2xl p-8 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="self-end mb-8 p-2 text-emerald-600 text-2xl"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <FiX />
              </button>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  className="mb-3 px-3 py-2 rounded-full font-semibold text-gray-700 hover:text-emerald-600 bg-white/70 border border-emerald-100 transition group"
                  initial={{ x: 40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.09 * idx, duration: 0.32 }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#donate"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold shadow-lg bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:scale-105 hover:shadow-xl transition-all"
              >
                <FiHeart className="text-lg text-pink-200" />
                Donate
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

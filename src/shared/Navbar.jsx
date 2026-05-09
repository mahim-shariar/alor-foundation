import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiHeart } from "react-icons/fi";

const navLinks = [
  { path: "/",         label: "Home" },
  { path: "/about",    label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/gallery",  label: "Gallery" },
  { path: "/news",     label: "News" },
  { path: "/contact",  label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const location = useLocation();

  const isHome = location.pathname === "/";

  const isActive = (link) =>
    link.path === "/" ? location.pathname === "/" : location.pathname.startsWith(link.path);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Reset on page change
    setScrolled(window.scrollY > 20);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Close drawer whenever route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── Floating Bar ── */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
        <motion.div
          className={`pointer-events-auto w-[95vw] max-w-6xl mx-auto mt-3 rounded-2xl flex items-center justify-between px-4 sm:px-6 h-16 sm:h-[68px] transition-all duration-500 ${
            scrolled || !isHome
              ? "bg-white/95 backdrop-blur-2xl border border-emerald-100 shadow-[0_8px_48px_rgba(5,150,105,0.12)]"
              : "bg-white/0 border border-transparent"
          }`}
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <div className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 shadow-lg shadow-teal-500/20 overflow-hidden">
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-white font-black text-xl select-none tracking-tighter">A</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm sm:text-[15px] font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-700 tracking-tight">
                Alor Foundation
              </span>
              <span className="hidden sm:block text-[9px] font-semibold text-emerald-500/50 tracking-[0.2em] uppercase mt-[3px]">
                Empowering Lives
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link, idx) => (
              <motion.div key={link.path}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 * idx, duration: 0.3 }}>
                <Link to={link.path}
                  className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-colors duration-200 block ${
                    isActive(link) ? "text-emerald-700" : "text-gray-500 hover:text-emerald-700"
                  }`}>
                  {isActive(link) && (
                    <motion.span layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl bg-emerald-50 border border-emerald-200/60"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="hidden sm:block">
              <Link to="/contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/25">
                <FiHeart className="text-pink-200 text-sm" />
                Donate
              </Link>
            </motion.div>
            <motion.button
              className="lg:hidden p-2.5 rounded-xl text-emerald-700 bg-emerald-50 border border-emerald-100 hover:bg-emerald-100 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              whileTap={{ scale: 0.92 }}>
              <FiMenu className="text-xl" />
            </motion.button>
          </div>
        </motion.div>
      </nav>

      {/* ── Mobile Drawer — outside the pointer-events-none nav ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)} />

            <motion.aside
              className="fixed inset-y-0 right-0 z-[101] w-[82vw] max-w-sm bg-white flex flex-col shadow-2xl"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}>

              {/* Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <Link to="/" className="flex items-center gap-2.5" onClick={() => setMobileOpen(false)}>
                  <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 shadow-md">
                    <span className="text-white font-black text-base">A</span>
                  </div>
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-700 tracking-tight">
                    Alor Foundation
                  </span>
                </Link>
                <button
                  className="p-2 rounded-xl text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu">
                  <FiX className="text-xl" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 px-3 py-5 overflow-y-auto space-y-1">
                {navLinks.map((link, idx) => (
                  <motion.div key={link.path}
                    initial={{ x: 28, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * idx, duration: 0.25 }}>
                    <Link to={link.path}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-base transition-colors duration-200 ${
                        isActive(link)
                          ? "text-emerald-700 bg-emerald-50 border border-emerald-200/60"
                          : "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50/60"
                      }`}
                      onClick={() => setMobileOpen(false)}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isActive(link) ? "bg-emerald-500" : "bg-gray-300"}`} />
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Secondary links */}
                <div className="pt-4 mt-4 border-t border-gray-100 space-y-1">
                  <p className="px-4 text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-2">More Pages</p>
                  {[{ path: "/team", label: "Our Team" }, { path: "/stories", label: "Impact Stories" }].map((link) => (
                    <Link key={link.path} to={link.path}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-gray-500 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors"
                      onClick={() => setMobileOpen(false)}>
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-200 flex-shrink-0" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Footer */}
              <div className="px-4 pb-8 pt-3 border-t border-gray-100 space-y-3">
                <Link to="/contact"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-base bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/25"
                  onClick={() => setMobileOpen(false)}>
                  <FiHeart className="text-pink-200" />
                  Donate Now
                </Link>
                <p className="text-center text-xs text-gray-400 tracking-wide">
                  © {new Date().getFullYear()} Alor Foundation
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

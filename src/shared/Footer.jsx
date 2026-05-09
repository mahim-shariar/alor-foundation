import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiLinkedin, FiFacebook, FiYoutube, FiMapPin, FiPhone, FiMail, FiArrowUp } from "react-icons/fi";

const socials = [
  { href: "https://www.linkedin.com/", icon: <FiLinkedin />, label: "LinkedIn" },
  { href: "https://www.facebook.com/", icon: <FiFacebook />, label: "Facebook" },
  { href: "https://www.youtube.com/", icon: <FiYoutube />, label: "YouTube" },
];

const navLinks = [
  { to: "/",         label: "Home" },
  { to: "/about",    label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery",  label: "Gallery" },
  { to: "/news",     label: "News" },
  { to: "/contact",  label: "Contact" },
];

const moreLinks = [
  { to: "/team",    label: "Our Team" },
  { to: "/stories", label: "Impact Stories" },
];

const PARTICLES = Array.from({ length: 5 }, (_, i) => {
  const colors = [
    ["#5eead4", "#0d9488"],
    ["#f59e0b", "#f97316"],
    ["#f472b6", "#db2777"],
    ["#60a5fa", "#3b82f6"],
    ["#34d399", "#059669"],
  ];
  return {
    id: i,
    color: colors[i],
    w: Math.random() * 90 + 70,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    dx: (Math.random() - 0.5) * 28,
    dy: (Math.random() - 0.5) * 28,
    dur: Math.random() * 16 + 10,
  };
});

const Footer = () => (
  <footer className="relative overflow-hidden bg-[#020b07] border-t border-teal-950 pt-16 pb-6 px-6 sm:px-12 lg:px-24">

    {/* Grid bg */}
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "linear-gradient(rgba(20,184,166,1) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,1) 1px,transparent 1px)",
      backgroundSize: "44px 44px",
    }} />

    {/* Particles */}
    <div className="absolute inset-0 pointer-events-none z-0">
      {PARTICLES.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full opacity-[0.07]"
          style={{ background: `linear-gradient(45deg,${p.color[0]},${p.color[1]})`, width: p.w, height: p.w, top: p.top, left: p.left, filter: "blur(30px)" }}
          animate={{ x: [0, p.dx], y: [0, p.dy] }}
          transition={{ duration: p.dur, repeat: Infinity, repeatType: "reverse" }} />
      ))}
    </div>

    {/* Top accent */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />

    <div className="relative z-10 max-w-7xl mx-auto">

      {/* Main grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-900">
              <span className="text-white font-black text-xl">A</span>
            </div>
            <div>
              <div className="font-black text-white text-sm tracking-tight">Alor Foundation</div>
              <div className="text-[10px] text-teal-500/60 font-semibold tracking-[0.18em] uppercase">Empowering Lives</div>
            </div>
          </Link>
          <p className="text-gray-500 text-sm leading-relaxed mb-5">
            A registered NGO dedicated to uplifting underserved communities across Bangladesh since 2013.
          </p>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 rounded-xl border border-teal-900/60 bg-white/5 flex items-center justify-center text-gray-500 hover:text-teal-400 hover:border-teal-700 hover:bg-teal-950 transition-all text-sm">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs font-black text-teal-500 tracking-[0.2em] uppercase mb-5">Navigation</h3>
          <ul className="space-y-2.5">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-gray-500 hover:text-teal-400 text-sm font-medium transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-teal-700 group-hover:bg-teal-500 transition-colors flex-shrink-0" />
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-2 border-t border-teal-950/80">
              <p className="text-[10px] font-bold text-gray-600 tracking-widest uppercase mb-2">More</p>
            </li>
            {moreLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-gray-600 hover:text-teal-400 text-sm font-medium transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-teal-500 transition-colors flex-shrink-0" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-black text-teal-500 tracking-[0.2em] uppercase mb-5">Contact</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2.5 text-sm text-gray-500">
              <FiMapPin className="text-teal-500 mt-0.5 flex-shrink-0" />
              Sector #12, Uttara, Dhaka
            </li>
            <li>
              <a href="tel:01717509975" className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-teal-400 transition-colors">
                <FiPhone className="text-teal-500 flex-shrink-0" />
                01717509975
              </a>
            </li>
            <li>
              <a href="mailto:zm.arif.eee@gmail.com" className="flex items-center gap-2.5 text-sm text-gray-500 hover:text-teal-400 transition-colors break-all">
                <FiMail className="text-teal-500 flex-shrink-0" />
                zm.arif.eee@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Map */}
        <div>
          <h3 className="text-xs font-black text-teal-500 tracking-[0.2em] uppercase mb-5">Location</h3>
          <div className="w-full h-40 bg-gray-900 rounded-xl border border-teal-900/50 overflow-hidden">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps?q=Sector+12,+Uttara,+Dhaka,+Bangladesh&output=embed"
              className="w-full h-full"
              loading="lazy"
              style={{ border: 0 }}
              allowFullScreen
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-teal-950 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Alor Foundation. All rights reserved.
        </span>
        <span className="text-xs flex items-center gap-1.5 text-gray-600">
          Built by{" "}
          <a href="https://trilance.tech" target="_blank" rel="noopener noreferrer"
            className="font-bold text-teal-500 hover:text-teal-400 transition-colors">
            Trilance
          </a>
        </span>
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
          className="w-8 h-8 rounded-lg border border-teal-900/60 bg-white/5 flex items-center justify-center text-gray-500 hover:text-teal-400 hover:border-teal-700 transition-all"
          aria-label="Back to top">
          <FiArrowUp className="text-sm" />
        </motion.button>
      </div>
    </div>
  </footer>
);

export default Footer;

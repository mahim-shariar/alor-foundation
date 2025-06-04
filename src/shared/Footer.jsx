import { motion } from "framer-motion";
import {
  FiLinkedin,
  FiFacebook,
  FiYoutube,
  FiMapPin,
  FiPhone,
  FiMail,
  FiGlobe,
} from "react-icons/fi";

const socials = [
  {
    href: "https://www.linkedin.com/",
    icon: <FiLinkedin />,
    label: "LinkedIn",
  },
  {
    href: "https://www.facebook.com/",
    icon: <FiFacebook />,
    label: "Facebook",
  },
  {
    href: "https://www.youtube.com/",
    icon: <FiYoutube />,
    label: "YouTube",
  },
];

const links = [
  { href: "#", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

const Footer = () => (
  <footer className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 pt-16 pb-6 px-6 sm:px-12 lg:px-24 border-t border-emerald-100">
    {/* Floating particles */}
    <div className="absolute inset-0 pointer-events-none z-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10"
          style={{
            background: `linear-gradient(45deg, 
              ${
                i % 4 === 0
                  ? "#5eead4"
                  : i % 4 === 1
                  ? "#f59e0b"
                  : i % 4 === 2
                  ? "#f472b6"
                  : "#60a5fa"
              }, 
              ${
                i % 4 === 0
                  ? "#0d9488"
                  : i % 4 === 1
                  ? "#f97316"
                  : i % 4 === 2
                  ? "#db2777"
                  : "#3b82f6"
              })`,
            width: `${Math.random() * 100 + 70}px`,
            height: `${Math.random() * 100 + 70}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(30px)",
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 30],
            y: [0, (Math.random() - 0.5) * 30],
            opacity: [0.08, 0.17, 0.08],
          }}
          transition={{
            duration: Math.random() * 18 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>

    <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-24">
      {/* Links and info */}
      <div className="flex-1 flex flex-col sm:flex-row gap-10">
        <div className="flex-1 min-w-[180px] mb-8 sm:mb-0">
          <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact */}
        <div className="flex-1 min-w-[210px]">
          <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
            Contact
          </h3>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-center gap-2">
              <FiMapPin className="text-emerald-500" />
              Sector# 12, Uttara, Dhaka
            </li>
            <li className="flex items-center gap-2">
              <FiPhone className="text-emerald-500" />
              <a
                href="tel:01717509975"
                className="hover:text-emerald-700 transition"
              >
                01717509975
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FiMail className="text-emerald-500" />
              <a
                href="mailto:zm.arif.eee@gmail.com"
                className="hover:text-emerald-700 transition"
              >
                zm.arif.eee@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FiGlobe className="text-emerald-500" />
              <a
                href="https://trilance.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-700 transition"
              >
                trilance.tech
              </a>
            </li>
          </ul>
          {/* Socials */}
          <div className="flex gap-4 mt-6">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-500 hover:text-emerald-700 text-2xl transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      {/* Google Map */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md h-60 sm:h-72 bg-white/80 rounded-2xl shadow-lg border-2 border-emerald-100 overflow-hidden relative">
          <iframe
            title="Google Map"
            src="https://www.google.com/maps?q=Sector+12,+Uttara,+Dhaka,+Bangladesh&output=embed"
            className="w-full h-full"
            loading="lazy"
            style={{
              border: 0,
              filter:
                "brightness(97%) saturate(105%) drop-shadow(0 2px 16px #10b98122)",
            }}
            allowFullScreen
          />
          <div className="absolute inset-0 pointer-events-none rounded-2xl border-emerald-200/50" />
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="relative z-10 max-w-7xl mx-auto mt-12 border-t border-emerald-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <span className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Trilance. All rights reserved.
      </span>
      <span className="text-sm text-gray-400">
        Crafted with{" "}
        <span className="text-emerald-500 font-bold">Alor Foundation</span> ✦
        Powered by Trilance
      </span>
    </div>
  </footer>
);

export default Footer;

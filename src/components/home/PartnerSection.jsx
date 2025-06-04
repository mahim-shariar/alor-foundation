import { motion } from "framer-motion";
import React from "react";
import { FiArrowRight, FiHeart, FiUserPlus, FiMail } from "react-icons/fi";

// Replace with your actual logos and names
const partnerLogos = [
  {
    id: 1,
    name: "UNICEF",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Logo_of_UNICEF.svg/250px-Logo_of_UNICEF.svg.png",
  },
  {
    id: 2,
    name: "BRAC",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/BRAC_logo.svg/250px-BRAC_logo.svg.png",
  },
  {
    id: 3,
    name: "World Vision",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/World_Vision_logo_2017.svg/250px-World_Vision_logo_2017.svg.png",
  },
  {
    id: 4,
    name: "Save the Children",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Save_the_Children_Logo.svg/250px-Save_the_Children_Logo.svg.png",
  },
  {
    id: 5,
    name: "Oxfam",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Oxfam_logo_vertical.svg/150px-Oxfam_logo_vertical.svg.png",
  },
  {
    id: 6,
    name: "Plan International",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Plan_International_Logo.svg/250px-Plan_International_Logo.svg.png",
  },
  // Add more if you have!
];

const Marquee = ({ children }) => (
  <div className="overflow-hidden w-full relative">
    <div className="marquee group hover:[animation-play-state:paused] flex">
      {children}
      {children /* Duplicate for seamless loop */}
    </div>
    <style jsx>{`
      .marquee {
        animation: marqueeAnim 28s linear infinite;
      }
      @keyframes marqueeAnim {
        0% {
          transform: translateX(0%);
        }
        100% {
          transform: translateX(-50%);
        }
      }
    `}</style>
  </div>
);

const PartnerSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 py-20 px-6 sm:px-12 lg:px-24">
    {/* Floating background particles */}
    <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
      {[...Array(14)].map((_, i) => (
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
            width: `${Math.random() * 120 + 80}px`,
            height: `${Math.random() * 120 + 80}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(32px)",
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 60],
            y: [0, (Math.random() - 0.5) * 60],
            opacity: [0.1, 0.17, 0.1],
          }}
          transition={{
            duration: Math.random() * 18 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>

    <div className="relative z-10 max-w-7xl mx-auto">
      {/* Headline */}
      <motion.div
        className="mb-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
            Trusted by Our Partners
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Organizations that power our mission for change.
        </p>
      </motion.div>

      {/* Marquee */}
      <Marquee>
        {partnerLogos.map((logo, idx) => (
          <div
            key={logo.id + "-" + idx}
            className="mx-8 flex items-center justify-center min-w-[180px] h-24 sm:h-28"
          >
            <div className="bg-white/70 backdrop-blur-md border border-teal-100 rounded-xl shadow flex items-center justify-center h-20 px-8 transition hover:scale-105 hover:shadow-xl">
              <img
                src={logo.logo}
                alt={logo.name}
                className="h-12 sm:h-14 object-contain grayscale hover:grayscale-0 transition"
                title={logo.name}
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>

    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(12)].map((_, i) => (
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
            width: `${Math.random() * 140 + 80}px`,
            height: `${Math.random() * 140 + 80}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(36px)",
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 50],
            y: [0, (Math.random() - 0.5) * 60],
            opacity: [0.1, 0.17, 0.1],
          }}
          transition={{
            duration: Math.random() * 18 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>

    <div className="relative z-10 max-w-3xl mx-auto text-center">
      {/* Headline */}
      <motion.h2
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
          Ready to Make a Difference?
        </span>
      </motion.h2>
      <motion.p
        className="text-lg text-gray-700 max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        viewport={{ once: true }}
      >
        Whether you want to volunteer, donate, or collaborate — your step
        changes lives.
      </motion.p>

      {/* Glassy CTA Card */}
      <motion.div
        className="mx-auto bg-white/80 border border-emerald-100 rounded-2xl shadow-2xl p-8 sm:p-12 backdrop-blur flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        initial={{ opacity: 0, scale: 0.97, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <motion.a
          href="#volunteer"
          className="flex items-center gap-3 px-7 py-4 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <FiUserPlus className="text-xl" />
          Volunteer With Us
          <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
        </motion.a>
        <motion.a
          href="#donate"
          className="flex items-center gap-3 px-7 py-4 rounded-xl font-semibold bg-white/90 border-2 border-teal-500 text-teal-700 hover:bg-teal-50 shadow hover:shadow-xl transition-all group relative overflow-hidden"
          whileHover={{ scale: 1.05, borderColor: "#10b981" }}
          whileTap={{ scale: 0.97 }}
        >
          <FiHeart className="text-xl text-pink-500" />
          Make a Donation
          <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
        </motion.a>
        <motion.a
          href="#contact"
          className="flex items-center gap-3 px-7 py-4 rounded-xl font-semibold bg-white/90 border-2 border-emerald-400 text-emerald-700 hover:bg-emerald-50 shadow hover:shadow-xl transition-all group relative overflow-hidden"
          whileHover={{ scale: 1.05, borderColor: "#059669" }}
          whileTap={{ scale: 0.97 }}
        >
          <FiMail className="text-xl text-emerald-500" />
          Contact Our Team
          <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
        </motion.a>
      </motion.div>
    </div>
  </section>
);

export default PartnerSection;

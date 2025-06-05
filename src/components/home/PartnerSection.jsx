import { motion } from "framer-motion";
import React from "react";
import { FiArrowRight, FiHeart, FiUserPlus, FiMail } from "react-icons/fi";

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
];

const Marquee = ({ children }) => (
  <div className="overflow-hidden w-full relative my-4">
    <div className="marquee group hover:[animation-play-state:paused] flex">
      {children}
      {children}
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

const bgBlobs = Array.from({ length: 14 });
const bgColors = [
  ["#5eead4", "#0d9488"], // teal
  ["#f59e0b", "#f97316"], // amber
  ["#f472b6", "#db2777"], // pink
  ["#60a5fa", "#3b82f6"], // blue
];

const AnimatedBlobs = ({ count = 12 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => {
      const colorSet = bgColors[i % bgColors.length];
      const size = Math.random() * 120 + 80;
      return (
        <motion.div
          key={i}
          className="absolute rounded-full opacity-10"
          style={{
            background: `linear-gradient(45deg, ${colorSet[0]}, ${colorSet[1]})`,
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: "blur(32px)",
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 70],
            y: [0, (Math.random() - 0.5) * 70],
            opacity: [0.09, 0.14, 0.09],
          }}
          transition={{
            duration: Math.random() * 20 + 12,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      );
    })}
  </>
);

const PartnerSection = () => (
  <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 py-24 px-4 sm:px-12">
    {/* Animated Background */}
    <div className="absolute inset-0 pointer-events-none z-0">
      <AnimatedBlobs count={14} />
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16">
      {/* Headline */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
            Trusted by Our Partners
          </span>
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Organizations that power our mission for change.
        </p>
      </motion.div>

      {/* Marquee */}
      <div className="relative z-10">
        <Marquee>
          {partnerLogos.map((logo) => (
            <div
              key={logo.id}
              className="mx-7 flex items-center justify-center min-w-[170px] h-24 sm:h-28"
            >
              <div className="bg-white/80 backdrop-blur-lg border border-teal-100 rounded-xl shadow-md flex items-center justify-center h-20 px-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <img
                  src={logo.logo}
                  alt={`${logo.name} logo`}
                  className="h-12 sm:h-14 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  title={logo.name}
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* CTA Section */}
      <motion.div
        className="max-w-3xl mx-auto flex flex-col gap-8 items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
          Ready to Make a Difference?
        </h2>
        <p className="text-lg text-gray-700 max-w-xl text-center mb-2">
          Whether you want to volunteer, donate, or collaborate — your step
          changes lives.
        </p>
        <motion.div
          className="w-full flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8 bg-white/80 border border-emerald-100 rounded-2xl shadow-xl px-8 py-8 sm:py-10 backdrop-blur"
          initial={{ opacity: 0, scale: 0.97, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#volunteer"
            className="flex items-center gap-3 px-7 py-4 rounded-xl font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiUserPlus className="text-xl" />
            Volunteer With Us
            <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href="#donate"
            className="flex items-center gap-3 px-7 py-4 rounded-xl font-semibold bg-white/90 border-2 border-teal-500 text-teal-700 hover:bg-teal-50 shadow hover:shadow-xl transition-all group relative overflow-hidden"
            whileHover={{ scale: 1.07, borderColor: "#10b981" }}
            whileTap={{ scale: 0.97 }}
          >
            <FiHeart className="text-xl text-pink-500" />
            Make a Donation
            <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
          </motion.a>
          <motion.a
            href="#contact"
            className="flex items-center gap-3 px-7 py-4 rounded-xl font-semibold bg-white/90 border-2 border-emerald-400 text-emerald-700 hover:bg-emerald-50 shadow hover:shadow-xl transition-all group relative overflow-hidden"
            whileHover={{ scale: 1.07, borderColor: "#059669" }}
            whileTap={{ scale: 0.97 }}
          >
            <FiMail className="text-xl text-emerald-500" />
            Contact Our Team
            <FiArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default PartnerSection;

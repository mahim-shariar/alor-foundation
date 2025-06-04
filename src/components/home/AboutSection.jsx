import { motion } from "framer-motion";
import { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";

const AboutSection = () => {
  const constraintsRef = useRef(null);
  
  // Floating photo collage items data
  const collageItems = [
    { id: 1, type: "image", size: "md", rotation: -3, delay: 0.1 },
    { id: 2, type: "image", size: "lg", rotation: 2, delay: 0.3 },
    { id: 3, type: "video", size: "sm", rotation: 5, delay: 0.2 },
    { id: 4, type: "image", size: "sm", rotation: -2, delay: 0.4 },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-20 px-6 sm:px-12 lg:px-24">
      {/* Futuristic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }} />
        
        {/* Floating orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-teal-400/10 to-emerald-500/10 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(40px)",
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            {/* Decorative accent */}
            <div className="absolute -left-6 -top-6 w-32 h-32 bg-emerald-500/10 rounded-full filter blur-3xl" />
            
            {/* Tagline */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider text-emerald-400 uppercase bg-emerald-900/30 rounded-full">
                Since 2013
              </span>
            </motion.div>
            
            {/* Headline with animated gradient */}
            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
                A Decade of Impact.
              </span>
              <br />
              <span className="text-white">A Future of Hope.</span>
            </motion.h2>
            
            {/* Content */}
            <motion.p 
              className="text-lg text-gray-300 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              viewport={{ once: true }}
            >
              Founded by <span className="text-emerald-400 font-medium">Arifuzzaman</span>, Alor Foundation is a registered NGO working to uplift underserved communities through healthcare, education, and social innovation. Our dedicated team believes in creating <span className="text-white font-medium">lasting impact</span> — not just charity.
            </motion.p>
            
            {/* Button with hover effect */}
            <motion.a
              href="#story"
              className="inline-flex items-center group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-white font-medium flex items-center">
                Read Our Story
                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.span 
                className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              />
            </motion.a>
          </motion.div>

          {/* Right Column - Interactive Photo Collage */}
          <motion.div 
            ref={constraintsRef}
            className="relative h-full min-h-[400px] lg:min-h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Main video card */}
            <motion.div
              drag
              dragConstraints={constraintsRef}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3/4 aspect-video bg-gray-700 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 z-10"
              whileHover={{ scale: 1.02 }}
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -2 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {/* Replace with actual video component or thumbnail */}
              <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 border-[16px] border-transparent border-t-emerald-500/30 border-r-emerald-500/30 pointer-events-none" />
            </motion.div>

            {/* Floating collage items */}
            {collageItems.map((item) => (
              <motion.div
                key={item.id}
                drag
                dragConstraints={constraintsRef}
                className={`absolute bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-white/10 ${
                  item.size === 'sm' ? 'w-24 h-24' : 
                  item.size === 'md' ? 'w-32 h-32' : 'w-40 h-40'
                }`}
                style={{ rotate: item.rotation }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: item.delay, duration: 0.6 }}
                whileHover={{ zIndex: 20, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Replace with actual images */}
                <div className={`w-full h-full ${
                  item.type === 'image' ? 
                    'bg-gradient-to-br from-gray-700 to-gray-800' : 
                    'bg-gradient-to-br from-teal-900/50 to-emerald-900/50'
                } flex items-center justify-center`}>
                  {item.type === 'image' ? (
                    <svg className="w-1/2 h-1/2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-1/3 h-1/3 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    </svg>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Position the floating items */}
            <style jsx>{`
              .absolute:nth-child(2) { left: 0; top: 0; }
              .absolute:nth-child(3) { left: 20%; bottom: 10%; }
              .absolute:nth-child(4) { right: 10%; top: 10%; }
              .absolute:nth-child(5) { left: 10%; bottom: 0; }
            `}</style>

            {/* Connection lines (visible on hover) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.line
                x1="30%"
                y1="40%"
                x2="60%"
                y2="50%"
                stroke="url(#lineGradient)"
                strokeWidth="1"
                strokeDasharray="0"
                initial={{ strokeDashoffset: 100 }}
                whileInView={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, delay: 0.8 }}
              />
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
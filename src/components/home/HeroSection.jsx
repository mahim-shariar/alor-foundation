import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";
import bd from "../../assets/bd.svg";
import backgroundPattern from "../../assets/background-pattern.jpg";

const HeroSection = () => {
  const controls = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMapHovered, setIsMapHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // 3D effect values
  const rotateX = useTransform(y, [-200, 200], [20, -20]);
  const rotateY = useTransform(x, [-200, 200], [-20, 20]);

  // Pillars
  const foundationPillars = [
    { icon: "📚", label: "Education" },
    { icon: "🏥", label: "Healthcare" },
    { icon: "🌾", label: "Agriculture" },
    { icon: "💧", label: "Clean Water" },
    { icon: "🤝", label: "Community" },
  ];

  useEffect(() => {
    const sequence = async () => {
      await controls.start("visible");
      setIsLoaded(true);
    };
    sequence();
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 30,
      opacity: 0,
      filter: "blur(4px)",
    },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
      },
    },
  };

  const pillarVariants = {
    hover: {
      y: -10,
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50">
      {/* Background image and overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          src={backgroundPattern}
          alt="Background pattern"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 to-emerald-50/80" />
      </div>

      {/* Floating particles and organic shapes */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-teal-300/20"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-teal-200/40"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-20 w-80 h-80 rounded-full bg-emerald-300/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      {/* Mobile layout */}
      <div className="lg:hidden relative h-full flex flex-col">
        {/* Map */}
        <div className="h-1/3 min-h-[250px] flex items-center justify-center pt-8 px-4">
          <motion.div
            className="w-full h-full max-w-xs"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 1.5, ease: "easeOut" },
            }}
          >
            <motion.img
              src={bd}
              alt="Bangladesh Map"
              className="w-full h-full object-contain"
              style={{
                filter: `
                  drop-shadow(0 10px 20px rgba(5, 150, 105, 0.3))
                  brightness(1.1)
                  contrast(1.2)
                `,
              }}
            />
          </motion.div>
        </div>

        {/* Content for mobile */}
        <motion.div
          className="flex-1 flex flex-col justify-center px-6 pb-12"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Logo */}
          <motion.div className="mb-4 self-start" variants={itemVariants}>
            <motion.div
              className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 shadow-xl flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                  "0 15px 30px -5px rgba(16, 185, 129, 0.3)",
                  "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                ],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                },
              }}
            >
              <motion.span className="text-3xl">🌱</motion.span>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-3xl sm:text-4xl font-bold leading-tight mb-3"
            variants={itemVariants}
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                transition: {
                  duration: 10,
                  repeat: Infinity,
                },
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Alor Foundation
            </motion.span>
            <br />
            <span className="text-gray-800 text-2xl sm:text-3xl">
              Empowering <span className="text-emerald-600">Bangladesh</span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed"
            variants={itemVariants}
          >
            Transforming lives through{" "}
            <span className="font-medium text-teal-600">
              sustainable development
            </span>
            , education, and healthcare initiatives across the nation.
          </motion.p>

          {/* Pillars */}
          <motion.div
            className="flex gap-3 mb-6 overflow-x-auto pb-2 -mx-6 px-6"
            variants={itemVariants}
          >
            {foundationPillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg flex items-center gap-2 flex-shrink-0"
                variants={pillarVariants}
                whileHover="hover"
                animate={{
                  boxShadow: [
                    "0 4px 15px -5px rgba(5, 150, 105, 0.2)",
                    "0 8px 20px -5px rgba(5, 150, 105, 0.3)",
                    "0 4px 15px -5px rgba(5, 150, 105, 0.2)",
                  ],
                  transition: {
                    duration: 4 + index,
                    repeat: Infinity,
                  },
                }}
              >
                <span className="text-2xl">{pillar.icon}</span>
                <span className="font-medium text-teal-800">
                  {pillar.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div className="flex flex-col gap-3" variants={itemVariants}>
            <motion.a
              href="#mission"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-medium text-base shadow-xl hover:shadow-2xl transition-all relative overflow-hidden text-center"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Our Mission & Impact</span>
              <motion.span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
            <motion.a
              href="#donate"
              className="px-6 py-3 rounded-xl bg-white/90 backdrop-blur-sm border-2 border-emerald-500 text-emerald-600 font-medium text-base shadow-lg hover:shadow-xl transition-all text-center"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(5, 150, 105, 0.1)",
                boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Donate Now
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:flex h-full w-full">
        {/* Hero content on the left */}
        <motion.div
          className="relative flex-1 flex flex-col justify-center pr-8 xl:pr-16 pl-6"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          {/* Logo */}
          <motion.div className="mb-6 self-start" variants={itemVariants}>
            <motion.div
              className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/30 shadow-xl flex items-center justify-center"
              animate={{
                boxShadow: [
                  "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                  "0 15px 30px -5px rgba(16, 185, 129, 0.3)",
                  "0 10px 25px -5px rgba(16, 185, 129, 0.2)",
                ],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                },
              }}
            >
              <motion.span className="text-4xl">🌱</motion.span>
            </motion.div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight max-w-3xl mb-4"
            variants={itemVariants}
          >
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                transition: {
                  duration: 10,
                  repeat: Infinity,
                },
              }}
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              Alor Foundation
            </motion.span>
            <br />
            <span className="text-gray-800 text-3xl sm:text-4xl md:text-5xl">
              Empowering <span className="text-emerald-600">Bangladesh</span>
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="text-lg sm:text-xl text-gray-700 max-w-3xl mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Transforming lives through{" "}
            <span className="font-medium text-teal-600">
              sustainable development
            </span>
            , education, and healthcare initiatives across the nation.
          </motion.p>

          {/* Pillars */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            variants={itemVariants}
          >
            {foundationPillars.map((pillar, index) => (
              <motion.div
                key={index}
                className="px-5 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-white/30 shadow-lg flex items-center gap-2"
                variants={pillarVariants}
                whileHover="hover"
                animate={{
                  boxShadow: [
                    "0 4px 15px -5px rgba(5, 150, 105, 0.2)",
                    "0 8px 20px -5px rgba(5, 150, 105, 0.3)",
                    "0 4px 15px -5px rgba(5, 150, 105, 0.2)",
                  ],
                  transition: {
                    duration: 4 + index,
                    repeat: Infinity,
                  },
                }}
              >
                <span className="text-2xl">{pillar.icon}</span>
                <span className="font-medium text-teal-800">
                  {pillar.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            variants={itemVariants}
          >
            <motion.a
              href="#mission"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-medium text-base shadow-xl hover:shadow-2xl transition-all relative overflow-hidden"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Our Mission & Impact</span>
              <motion.span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
            <motion.a
              href="#donate"
              className="px-6 py-3 rounded-xl bg-white/90 backdrop-blur-sm border-2 border-emerald-500 text-emerald-600 font-medium text-base shadow-lg hover:shadow-xl transition-all"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(5, 150, 105, 0.1)",
                boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.3)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Donate Now
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Centered Bangladesh Map on the right */}
        <div className="relative flex-1 flex items-center justify-center">
          <motion.div
            className="p-10"
            style={{
              transform: "translate(-50%, -50%)",
              perspective: 1200,
              transformStyle: "preserve-3d",
              left: "50%",
              top: "50%",
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { duration: 1.5, ease: "easeOut" },
            }}
            onHoverStart={() => setIsMapHovered(true)}
            onHoverEnd={() => setIsMapHovered(false)}
            onPointerMove={(e) => {
              if (isMapHovered) {
                const bounds = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - bounds.left - bounds.width / 2);
                y.set(e.clientY - bounds.top - bounds.height / 2);
              }
            }}
          >
            {/* Holographic glow base */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: isMapHovered
                  ? "radial-gradient(circle at center, rgba(16, 185, 129, 0.3) 0%, transparent 70%)"
                  : "radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)",
                filter: "blur(20px)",
                transform: "translateZ(-40px)",
                opacity: isMapHovered ? 0.8 : 0.4,
                transition: "all 0.3s ease-out",
              }}
              animate={{
                backgroundSize: ["100% 100%", "150% 150%", "100% 100%"],
                transition: {
                  duration: 8,
                  repeat: Infinity,
                },
              }}
            />

            {/* Depth layer with grid pattern */}
            <motion.div
              className="absolute inset-0 rounded-full overflow-hidden"
              style={{
                transform: "translateZ(-30px) scale(0.95)",
                backgroundImage: `
                  linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
                filter: "blur(1px)",
              }}
            />

            {/* Main map */}
            <motion.div
              className="relative w-full h-full"
              style={{
                transformStyle: "preserve-3d",
                rotateX: isMapHovered ? rotateX : 0,
                rotateY: isMapHovered ? rotateY : 0,
              }}
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <motion.img
                src={bd}
                alt="Bangladesh Map"
                className="w-full h-full object-contain"
                style={{
                  imageRendering: "crisp-edges",
                  filter: `
                    drop-shadow(0 20px 30px rgba(5, 150, 105, 0.4))
                    brightness(1.1)
                    contrast(1.2)
                  `,
                  transform: `translateZ(${isMapHovered ? 60 : 40}px)`,
                  clipPath: "inset(0 0 0 0 round 10%)",
                  mixBlendMode: isMapHovered ? "hard-light" : "normal",
                }}
              />

              {/* ... your map hover particles/lines can go here ... */}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Additional floating particles */}
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={`floating-particle-${i}`}
          className="absolute rounded-full bg-teal-400/20 z-0"
          style={{
            width: Math.random() * 8 + 3,
            height: Math.random() * 8 + 3,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 80],
            x: [0, (Math.random() - 0.5) * 80],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default HeroSection;

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const stories = [
  {
    photo:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400",
    name: "Sumiya Akter",
    title: "From Illiteracy to Teaching",
    quote: "Alor Foundation believed in me when no one else did.",
    location: "Gaibandha",
    date: "2023",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400",
    name: "Rafiul Hasan",
    title: "From Patient to Paramedic",
    quote: "Now I help save lives, thanks to the support I received.",
    location: "Kurigram",
    date: "2024",
  },
  {
    photo:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=400",
    name: "Khadija Khatun",
    title: "Clean Water, New Hope",
    quote: "For the first time, our village drinks safe water.",
    location: "Khulna",
    date: "2023",
  },
];

const cardVariants = {
  initial: { opacity: 0, scale: 0.97, y: 48 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 60, damping: 16 },
  },
  exit: { opacity: 0, scale: 0.97, y: -48, transition: { duration: 0.4 } },
};

export default function FeaturedStoriesSection() {
  const [current, setCurrent] = useState(0);
  const autoSlideRef = useRef();

  useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % stories.length);
    }, 9000);
    return () => clearInterval(autoSlideRef.current);
  }, []);

  const nextStory = () => setCurrent((i) => (i + 1) % stories.length);
  const prevStory = () =>
    setCurrent((i) => (i - 1 + stories.length) % stories.length);

  const stats = [
    { label: "Children Educated", value: "12,300+" },
    { label: "Villages Reached", value: "117" },
    { label: "Wells Built", value: "53" },
  ];

  // Floating background shapes (added: stars, leaves, more variety)
  const floatingShapes = [
    // Circles and dots
    { top: "18%", left: "10%", size: 38, color: "bg-emerald-100/60", z: 0 },
    { top: "60%", left: "8%", size: 24, color: "bg-teal-200/50", z: 0 },
    { top: "28%", left: "85%", size: 42, color: "bg-emerald-200/50", z: 0 },
    { top: "75%", left: "80%", size: 26, color: "bg-emerald-100/60", z: 0 },
    { top: "13%", left: "55%", size: 14, color: "bg-emerald-300/40", z: 0 },
    { top: "80%", left: "33%", size: 18, color: "bg-teal-300/40", z: 0 },
    { top: "45%", left: "90%", size: 12, color: "bg-emerald-200/40", z: 0 },
    { top: "8%", left: "23%", size: 16, color: "bg-emerald-200/60", z: 0 },
    { top: "67%", left: "70%", size: 30, color: "bg-emerald-100/40", z: 0 },

    // Hearts
    {
      top: "40%",
      left: "17%",
      size: 28,
      color: "text-teal-200/70",
      heart: true,
      z: 1,
    },
    {
      top: "72%",
      left: "52%",
      size: 36,
      color: "text-emerald-300/60",
      heart: true,
      z: 1,
    },
    {
      top: "58%",
      left: "87%",
      size: 20,
      color: "text-emerald-300/30",
      heart: true,
      z: 1,
    },

    // Stars
    {
      top: "20%",
      left: "67%",
      size: 22,
      color: "text-yellow-200/60",
      star: true,
      z: 1,
    },
    {
      top: "82%",
      left: "17%",
      size: 28,
      color: "text-yellow-300/70",
      star: true,
      z: 1,
    },

    // Leaves (SVG)
    {
      top: "50%",
      left: "28%",
      size: 40,
      color: "text-emerald-200/70",
      leaf: true,
      z: 1,
    },
    {
      top: "11%",
      left: "78%",
      size: 30,
      color: "text-emerald-300/60",
      leaf: true,
      z: 1,
    },
  ];

  return (
    <section className="relative py-24 md:py-32 px-4 bg-gradient-to-br from-white via-teal-50 to-emerald-50 overflow-hidden">
      {/* Blurred Gradient Bubbles (WhatWeDo style) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full opacity-15"
            style={{
              background: `linear-gradient(45deg, 
                ${
                  i % 3 === 0 ? "#5eead4" : i % 3 === 1 ? "#f59e0b" : "#34d399"
                },
                ${i % 3 === 0 ? "#0d9488" : i % 3 === 1 ? "#f97316" : "#059669"}
              )`,
              width: `${Math.random() * 180 + 120}px`,
              height: `${Math.random() * 180 + 120}px`,
              top: `${Math.random() * 85}%`,
              left: `${Math.random() * 80}%`,
              filter: "blur(48px)",
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 70],
              y: [0, (Math.random() - 0.5) * 70],
              opacity: [0.12, 0.18, 0.12],
            }}
            transition={{
              duration: Math.random() * 20 + 14,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Floating SVG Elements (hearts, stars, leaves, circles) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {floatingShapes.map((shape, i) =>
          shape.heart ? (
            <motion.div
              key={`heart-${i}`}
              className={`absolute ${shape.color}`}
              style={{
                top: shape.top,
                left: shape.left,
                width: shape.size,
                height: shape.size,
                opacity: 0.54,
                zIndex: shape.z,
              }}
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.13, 1],
                rotate: [0, 9, -7, 0],
              }}
              transition={{
                duration: 8 + i * 0.7,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {/* Heart */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full"
              >
                <path d="M12 21s-4.27-3.47-6.67-5.87C3.1 13.67 2 11.99 2 10.2 2 7.69 4.04 6 6.13 6c1.18 0 2.36.55 3.13 1.6C10.51 5.75 11.92 5 13.11 5c2.12 0 4.06 1.69 4.06 5.2 0 1.79-1.1 3.47-3.33 4.93C16.27 17.53 12 21 12 21z" />
              </svg>
            </motion.div>
          ) : shape.star ? (
            <motion.div
              key={`star-${i}`}
              className={`absolute ${shape.color}`}
              style={{
                top: shape.top,
                left: shape.left,
                width: shape.size,
                height: shape.size,
                opacity: 0.47,
                zIndex: shape.z,
              }}
              animate={{
                y: [0, 10, 0],
                scale: [1, 1.09, 1],
                rotate: [0, 12, -6, 0],
              }}
              transition={{
                duration: 7 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {/* Star */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full"
              >
                <polygon points="12 2 15 9 22 10 17 15 18 22 12 19 6 22 7 15 2 10 9 9 12 2" />
              </svg>
            </motion.div>
          ) : shape.leaf ? (
            <motion.div
              key={`leaf-${i}`}
              className={`absolute ${shape.color}`}
              style={{
                top: shape.top,
                left: shape.left,
                width: shape.size,
                height: shape.size,
                opacity: 0.37,
                zIndex: shape.z,
              }}
              animate={{
                y: [0, -9, 0],
                scale: [1, 1.08, 1],
                rotate: [0, 15, -8, 0],
              }}
              transition={{
                duration: 10 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            >
              {/* Leaf */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full"
              >
                <path d="M12 2C6.5 8.25 4.75 13.14 8.12 17.31C10.62 20.31 14.03 21.19 18 18.5C20.53 16.77 21.16 13.66 19.86 10.61C18.48 7.36 15.19 3.87 12 2Z" />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key={`circle-${i}`}
              className={`absolute rounded-full ${shape.color}`}
              style={{
                top: shape.top,
                left: shape.left,
                width: shape.size,
                height: shape.size,
                opacity: 0.4,
                filter: "blur(0.5px)",
                zIndex: shape.z,
              }}
              animate={{
                y: [0, 14, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 9 + i,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          )
        )}
      </div>

      {/* Section header */}
      <div className="relative z-10 max-w-2xl mx-auto text-center mb-14">
        <motion.h2
          className="text-3xl md:text-4xl font-extrabold text-emerald-700"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Real Stories of Change
        </motion.h2>
        <p className="mt-5 text-lg md:text-xl text-gray-600">
          Every donation changes a real life. Read how your support brings hope
          and opportunity to families and children in need.
        </p>
      </div>
      {/* Impact stats bar */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold text-emerald-600">
              {stat.value}
            </span>
            <span className="text-sm md:text-base text-gray-500">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
      {/* Carousel + Story */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto">
        {/* Image and donor badge */}
        <div className="w-full max-w-[360px] flex-shrink-0">
          <div className="relative rounded-3xl overflow-hidden shadow-lg border-4 border-white">
            <motion.img
              key={stories[current].photo}
              src={stories[current].photo}
              alt={stories[current].name}
              className="w-full h-72 md:h-80 object-cover"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            />
            <span className="absolute top-4 left-4 bg-white/90 text-emerald-600 text-xs px-4 py-1 rounded-xl shadow font-bold tracking-wide">
              Supported by Donors Like You
            </span>
          </div>
        </div>
        {/* Story card */}
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={stories[current].name}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-white/90 rounded-2xl shadow-2xl border border-teal-100 p-8 md:p-10 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-200 shadow">
                  <img
                    src={stories[current].photo}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                </span>
                <div>
                  <div className="text-lg font-bold text-emerald-700">
                    {stories[current].name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {stories[current].title}
                  </div>
                </div>
              </div>
              <blockquote className="italic text-lg text-gray-700 mb-4 relative pl-5 border-l-4 border-emerald-400">
                <span className="absolute -left-4 top-0 text-3xl text-emerald-300">
                  “
                </span>
                {stories[current].quote}
                <span className="absolute -right-4 bottom-0 text-3xl text-emerald-300">
                  ”
                </span>
              </blockquote>
              <div className="flex items-center gap-3 text-emerald-500 text-sm font-medium">
                <span>📍 {stories[current].location}</span>
                <span>•</span>
                <span>{stories[current].date}</span>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* Carousel controls */}
          <div className="flex justify-between mt-6 gap-2">
            <button
              className="px-4 py-2 rounded-lg bg-teal-50 border border-teal-100 hover:bg-emerald-100 text-emerald-600 font-bold shadow transition-all"
              onClick={prevStory}
            >
              ‹ Prev
            </button>
            <div className="flex gap-2">
              {stories.map((_, i) => (
                <button
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all ${
                    current === i
                      ? "bg-emerald-500 border-emerald-500 scale-110"
                      : "bg-white border-emerald-200"
                  }`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Show story ${i + 1}`}
                />
              ))}
            </div>
            <button
              className="px-4 py-2 rounded-lg bg-teal-50 border border-teal-100 hover:bg-emerald-100 text-emerald-600 font-bold shadow transition-all"
              onClick={nextStory}
            >
              Next ›
            </button>
          </div>
        </div>
      </div>
      {/* CTA Bar */}
      <motion.div
        className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <a
          href="#donate"
          className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold rounded-2xl shadow-lg transition-all"
        >
          Give Hope Today
        </a>
        <span className="text-gray-500 text-sm">
          100% of your gift goes directly to people in need.
        </span>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2143/2143150.png"
          alt="Verified charity"
          className="w-8 h-8 ml-3"
          title="Verified, Trusted Charity"
        />
      </motion.div>
    </section>
  );
}

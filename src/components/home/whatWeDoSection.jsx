import { motion } from "framer-motion";
import { useMemo } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const initiatives = [
  {
    icon: "🎓",
    title: "Education Initiatives",
    description: "Bringing classroom experiences to rural children through digital learning hubs and teacher training programs.",
    topBar: "from-teal-400 to-emerald-500",
    glow: "rgba(20,184,166,0.15)",
    linkColor: "text-teal-600",
    delay: 0.1,
  },
  {
    icon: "🏥",
    title: "Health Services",
    description: "Mobile clinics, awareness programs & maternal care reaching remote communities with essential healthcare.",
    topBar: "from-amber-400 to-orange-500",
    glow: "rgba(245,158,11,0.12)",
    linkColor: "text-amber-600",
    delay: 0.2,
  },
  {
    icon: "🌱",
    title: "Sustainability Projects",
    description: "Green farming techniques and clean water campaigns for environmentally conscious development.",
    topBar: "from-emerald-400 to-teal-500",
    glow: "rgba(16,185,129,0.15)",
    linkColor: "text-emerald-600",
    delay: 0.3,
  },
  {
    icon: "👩‍💼",
    title: "Women Empowerment",
    description: "Skill training and entrepreneurship programs creating economic opportunities for women.",
    topBar: "from-teal-500 to-emerald-600",
    glow: "rgba(20,184,166,0.15)",
    linkColor: "text-teal-700",
    delay: 0.4,
  },
];

const WhatWeDoSection = () => {
  const bubbles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      color: i % 2 === 0 ? ["#5eead4","#0d9488"] : ["#34d399","#059669"],
      w: Math.random() * 160 + 80,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      dx: (Math.random() - 0.5) * 80,
      dy: (Math.random() - 0.5) * 80,
      dur: Math.random() * 18 + 10,
    })), []);

  return (
    <section id="projects" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50 py-28 px-6 sm:px-12 lg:px-24">

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.3]" style={{
        backgroundImage: "radial-gradient(circle,#14b8a6 1px,transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      {/* Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((b) => (
          <motion.div key={b.id} className="absolute rounded-full opacity-[0.07]"
            style={{ background: `linear-gradient(45deg,${b.color[0]},${b.color[1]})`, width: b.w, height: b.w, top: b.top, left: b.left, filter: "blur(44px)" }}
            animate={{ x: [0, b.dx], y: [0, b.dy] }}
            transition={{ duration: b.dur, repeat: Infinity, repeatType: "reverse" }} />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />◈ 02 — WHAT WE DO
          </div>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Our Work,</span>{" "}
            <span className="text-gray-900">Your Impact.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Discover how we're transforming communities through innovative programs and your generous support.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {initiatives.map((ini, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: ini.delay, duration: 0.55 }} viewport={{ once: true, margin: "-40px" }}
              className="group relative">
              <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-100/80 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden">
                {/* Gradient top bar */}
                <div className={`h-1 w-full bg-gradient-to-r ${ini.topBar}`} />
                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at top,${ini.glow} 0%,transparent 70%)` }} />
                <div className="p-6 flex flex-col h-full">
                  <div className={`text-3xl w-14 h-14 rounded-xl bg-gradient-to-br ${ini.topBar} flex items-center justify-center shadow-md mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    {ini.icon}
                  </div>
                  <h3 className="text-lg font-black text-gray-900 mb-2 tracking-tight">{ini.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-5">{ini.description}</p>
                  <Link to="/projects" className={`inline-flex items-center gap-1 text-sm font-bold self-start ${ini.linkColor}`}>
                    Learn more <FiArrowRight className="text-xs" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div className="text-center mt-14" initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }} transition={{ delay: 0.35 }} viewport={{ once: true }}>
          <Link to="/projects">
            <motion.div
              className="relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl text-white font-bold shadow-lg shadow-teal-500/25 btn-shimmer overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <span className="text-lg">🔎</span>
              Explore All Projects
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;

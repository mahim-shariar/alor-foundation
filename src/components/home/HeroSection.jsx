import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import bd from "../../assets/bd.svg";
import backgroundPattern from "../../assets/background-pattern.jpg";
import * as api from "../../services/api.js";
import { Link } from "react-router-dom";

const pillars = [
  { icon: "📚", label: "Education" },
  { icon: "🏥", label: "Healthcare" },
  { icon: "🌾", label: "Agriculture" },
  { icon: "💧", label: "Clean Water" },
  { icon: "🤝", label: "Community" },
];

const FALLBACK_STATS = [
  { value: "12K+", label: "Children Helped" },
  { value: "117", label: "Villages Reached" },
  { value: "10Y+", label: "Years of Impact" },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};
const item = {
  hidden: { y: 24, opacity: 0, filter: "blur(4px)" },
  visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 70, damping: 14 } },
};

const HeroSection = () => {
  const controls = useAnimation();
  const [mapHovered, setMapHovered] = useState(false);
  const [stats, setStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    api.getStats().then(d => {
      if (d.data?.length > 0) setStats(d.data.map(s => ({ value: s.value, label: s.label })).slice(0, 3));
    }).catch(() => {});
  }, []);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useTransform(my, [-200, 200], [15, -15]);
  const rotY = useTransform(mx, [-200, 200], [-15, 15]);

  const particles = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      w: Math.random() * 8 + 4,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      dy: (Math.random() - 0.5) * 70,
      dx: (Math.random() - 0.5) * 70,
      dur: Math.random() * 10 + 8,
    })), []);

  useEffect(() => { controls.start("visible"); }, [controls]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src={backgroundPattern} alt="" className="w-full h-full object-cover opacity-[0.06]" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/90 via-teal-50/60 to-emerald-50/90" />
      </div>

      {/* Dot grid */}
      <div className="absolute inset-0 z-0 opacity-[0.35]" style={{
        backgroundImage: "radial-gradient(circle, #14b8a6 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }} />

      {/* Orbs + particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-teal-300/20"
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div className="absolute -bottom-24 -right-24 w-[360px] h-[360px] rounded-full bg-emerald-300/20"
          animate={{ scale: [1, 1.18, 1], opacity: [0.25, 0.4, 0.25] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
        {particles.map((p) => (
          <motion.div key={p.id} className="absolute rounded-full bg-teal-400/30"
            style={{ width: p.w, height: p.w, top: p.top, left: p.left }}
            animate={{ y: [0, p.dy], x: [0, p.dx], opacity: [0.15, 0.5, 0.15] }}
            transition={{ duration: p.dur, repeat: Infinity, repeatType: "reverse" }} />
        ))}
      </div>

      {/* ── Mobile ── */}
      <div className="lg:hidden relative z-10 min-h-screen flex flex-col pt-24 pb-12">
        <div className="flex justify-center px-8 mb-6">
          <motion.img src={bd} alt="Bangladesh" className="h-48 w-auto object-contain"
            initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ filter: "drop-shadow(0 12px 28px rgba(5,150,105,0.35)) brightness(1.1) contrast(1.15)" }} />
        </div>

        <motion.div className="flex-1 px-6" initial="hidden" animate={controls} variants={container}>
          <motion.div variants={item} className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Since 2013
            </span>
          </motion.div>

          <motion.h1 variants={item} className="text-[2.4rem] sm:text-5xl font-black leading-[1.08] tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
              Alor<br />Foundation
            </span>
            <br />
            <span className="text-gray-900 text-3xl sm:text-4xl font-bold">
              Empowering <span className="text-emerald-600">Bangladesh</span>
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-gray-600 text-base leading-relaxed mb-6 max-w-sm">
            Transforming lives through <span className="font-semibold text-teal-600">sustainable development</span>, education, and healthcare.
          </motion.p>

          <motion.div variants={item} className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-6 px-6 scrollbar-hide">
            {pillars.map((p, i) => (
              <motion.div key={i} whileHover={{ y: -4, scale: 1.05 }}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border border-teal-100 shadow-sm text-sm font-semibold text-teal-800">
                <span>{p.icon}</span><span>{p.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex flex-col gap-3 mb-8">
            <motion.a href="#about" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden px-6 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold text-center shadow-lg shadow-teal-500/30 btn-shimmer">
              Our Mission & Impact
            </motion.a>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-6 py-3.5 rounded-xl border-2 border-emerald-500 text-emerald-700 font-bold text-center bg-white/60 cursor-pointer">
                Donate Now
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div variants={item} className="grid grid-cols-3 gap-2">
            {stats.map((s) => (
              <div key={s.label} className="bg-white/70 border border-emerald-100 rounded-xl p-3 text-center shadow-sm">
                <div className="text-xl font-black text-emerald-700">{s.value}</div>
                <div className="text-[10px] text-gray-500 font-semibold leading-tight mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Desktop ── */}
      <div className="hidden lg:flex min-h-screen w-full z-10 relative">
        {/* Left */}
        <motion.div className="flex-1 flex flex-col justify-center pl-12 xl:pl-20 pr-8"
          initial="hidden" animate={controls} variants={container}>
          <motion.div variants={item} className="mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Since 2013 · Bangladesh
            </span>
          </motion.div>

          <motion.h1 variants={item} className="text-6xl xl:text-7xl font-black leading-[1.0] tracking-tight mb-5 max-w-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">
              Alor Foundation
            </span>
            <br />
            <span className="text-gray-900 text-4xl xl:text-5xl font-bold">
              Empowering <span className="text-emerald-600">Bangladesh</span>
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-gray-600 text-lg xl:text-xl leading-relaxed mb-7 max-w-xl">
            Transforming lives through <span className="font-semibold text-teal-600">sustainable development</span>,
            education, and healthcare initiatives across the nation.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-2 mb-8">
            {pillars.map((p, i) => (
              <motion.div key={i} whileHover={{ y: -5, scale: 1.07 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 border border-teal-100 shadow-sm font-semibold text-teal-800 text-sm cursor-default">
                <span className="text-lg">{p.icon}</span><span>{p.label}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={item} className="flex gap-4 mb-10">
            <motion.a href="#about" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden px-7 py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold shadow-lg shadow-teal-500/30 btn-shimmer">
              Our Mission & Impact
            </motion.a>
            <Link to="/contact">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                className="px-7 py-3.5 rounded-xl border-2 border-emerald-500 text-emerald-700 font-bold bg-white/60 hover:bg-emerald-50 transition-colors cursor-pointer">
                Donate Now
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="flex gap-5">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl font-black text-emerald-700 leading-none">{s.value}</span>
                <span className="text-xs text-gray-500 font-semibold tracking-wide mt-1">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Map */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div className="relative w-[440px] h-[440px] xl:w-[500px] xl:h-[500px]"
            initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            onHoverStart={() => setMapHovered(true)}
            onHoverEnd={() => { setMapHovered(false); mx.set(0); my.set(0); }}
            onPointerMove={(e) => {
              if (!mapHovered) return;
              const b = e.currentTarget.getBoundingClientRect();
              mx.set(e.clientX - b.left - b.width / 2);
              my.set(e.clientY - b.top - b.height / 2);
            }}>
            {/* Glow rings */}
            <motion.div className="absolute inset-0 rounded-full"
              style={{ background: "radial-gradient(circle,rgba(16,185,129,0.22) 0%,transparent 68%)", filter: "blur(28px)" }}
              animate={{ opacity: mapHovered ? 0.9 : 0.45, scale: mapHovered ? 1.1 : 1 }}
              transition={{ duration: 0.4 }} />
            <motion.div className="absolute inset-[-10%] rounded-full border border-teal-300/20"
              animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
            <motion.div className="absolute inset-[-20%] rounded-full border border-emerald-200/15"
              animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} />

            <motion.div style={{ rotateX: mapHovered ? rotX : 0, rotateY: mapHovered ? rotY : 0, perspective: 1200 }}
              animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <img src={bd} alt="Bangladesh Map" draggable={false}
                className="w-full h-full object-contain select-none"
                style={{ filter: "drop-shadow(0 24px 48px rgba(5,150,105,0.5)) brightness(1.1) contrast(1.15)" }} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { FiChevronLeft, FiChevronRight, FiMapPin, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as api from "../../services/api.js";

const TAG_COLORS = {
  Education: "bg-teal-500/20 text-teal-300 border border-teal-500/25",
  Healthcare: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/25",
  "Clean Water": "bg-sky-500/20 text-sky-300 border border-sky-500/25",
  Empowerment: "bg-rose-500/20 text-rose-300 border border-rose-500/25",
  Agriculture: "bg-amber-500/20 text-amber-300 border border-amber-500/25",
};
const DEFAULT_TAG_COLOR = "bg-gray-500/20 text-gray-300 border border-gray-500/25";

const FALLBACK_STORIES = [
  { photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&h=1200", name: "Sumiya Akter", title: "From Illiteracy to Teaching", quote: "Alor Foundation believed in me when no one else did. Today I teach 40 children in my own village.", location: "Gaibandha", date: "2023", tag: "Education", tagColor: TAG_COLORS.Education },
  { photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&h=1200", name: "Rafiul Hasan", title: "From Patient to Paramedic", quote: "Now I help save lives — thanks to the support I received when I needed it most.", location: "Kurigram", date: "2024", tag: "Healthcare", tagColor: TAG_COLORS.Healthcare },
  { photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=900&h=1200", name: "Khadija Khatun", title: "Clean Water, New Hope", quote: "For the first time in my life, our entire village drinks safe, clean water every single day.", location: "Khulna", date: "2023", tag: "Clean Water", tagColor: TAG_COLORS["Clean Water"] },
];

const stats = [
  { value: "12,300+", label: "Children Educated", icon: "🎓" },
  { value: "117",     label: "Villages Reached",  icon: "🏘️" },
  { value: "53",      label: "Wells Built",        icon: "💧" },
  { value: "10+",     label: "Years Active",       icon: "📅" },
];

const textV = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 44 : -44, filter: "blur(6px)" }),
  center: { opacity: 1, x: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 80, damping: 18 } },
  exit:  (dir) => ({ opacity: 0, x: dir > 0 ? -44 : 44, filter: "blur(6px)", transition: { duration: 0.22 } }),
};

export default function FeaturedStoriesSection() {
  const [stories, setStories] = useState(FALLBACK_STORIES);
  const [current, setCurrent] = useState(0);
  const [dir, setDir]         = useState(1);
  const timerRef              = useRef(null);

  useEffect(() => {
    api.getStories({ limit: 3 }).then(d => {
      if (d.data?.length > 0) {
        setStories(d.data.map(s => ({ photo: s.photo, name: s.name, title: s.title, quote: s.quote, location: s.location, date: s.year, tag: s.tag, tagColor: TAG_COLORS[s.tag] || DEFAULT_TAG_COLOR })));
      }
    }).catch(() => {});
  }, []);

  const resetTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setCurrent((i) => (i + 1) % stories.length);
    }, 9000);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const go = (d) => {
    setDir(d);
    setCurrent((i) => (i + d + stories.length) % stories.length);
    resetTimer();
  };

  const orbs = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      w: [300, 220, 260, 180][i],
      top: ["15%", "65%", "5%", "75%"][i],
      left: ["5%", "8%", "45%", "50%"][i],
      dx: [30, -25, 20, -18][i],
      dy: [15, 28, -22, 24][i],
      dur: [20, 16, 24, 18][i],
    })), []);

  return (
    <section className="relative overflow-hidden bg-[#020b07]">

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {orbs.map((o) => (
          <motion.div key={o.id} className="absolute rounded-full"
            style={{ width: o.w, height: o.w, top: o.top, left: o.left,
              background: "radial-gradient(circle,rgba(20,184,166,0.1),transparent 65%)", filter: "blur(55px)" }}
            animate={{ x: [0, o.dx], y: [0, o.dy], opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: o.dur, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(20,184,166,1) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,1) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      {/* ── Main two-panel layout ── */}
      <div className="flex flex-col lg:flex-row min-h-[88vh]">

        {/* Left — text content */}
        <div className="order-2 lg:order-1 flex-1 flex flex-col justify-center
          px-7 sm:px-14 lg:px-16 xl:px-24 py-16 lg:py-20 relative z-10">

          {/* Section label */}
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-10 px-3 py-1 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-bold tracking-widest uppercase border border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ◈ 04 — REAL STORIES
            </div>
          </motion.div>

          {/* Story number */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={current + "num"} custom={dir}
              variants={textV} initial="enter" animate="center" exit="exit"
              className="flex items-baseline gap-2 mb-5">
              <span className="text-5xl sm:text-6xl font-black text-white/10 leading-none tabular-nums">
                {String(current + 1).padStart(2, "0")}
              </span>
              <span className="text-gray-700 text-sm font-bold">/ {String(stories.length).padStart(2, "0")}</span>
            </motion.div>
          </AnimatePresence>

          {/* Tag */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.span key={current + "tag"} custom={dir}
              variants={textV} initial="enter" animate="center" exit="exit"
              className={`inline-flex self-start text-xs font-bold px-3 py-1 rounded-full mb-6 ${stories[current].tagColor}`}>
              {stories[current].tag}
            </motion.span>
          </AnimatePresence>

          {/* Quote */}
          <div className="relative mb-8">
            <span className="absolute -top-8 -left-3 text-[5rem] leading-none font-black text-teal-500/15 select-none">"</span>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.p key={current + "q"} custom={dir}
                variants={textV} initial="enter" animate="center" exit="exit"
                className="text-2xl sm:text-3xl xl:text-[2.1rem] text-white/88 font-light leading-[1.45] tracking-tight relative z-10">
                {stories[current].quote}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Person info */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={current + "person"} custom={dir}
              variants={textV} initial="enter" animate="center" exit="exit"
              className="flex items-center gap-4 mb-12">
              <div className="relative">
                <img src={stories[current].photo} alt={stories[current].name}
                  className="w-12 h-12 rounded-xl object-cover border border-teal-800/60 shadow-lg" />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 border-2 border-[#020b07]" />
              </div>
              <div>
                <p className="text-white font-black text-base tracking-tight">{stories[current].name}</p>
                <p className="text-teal-500/60 text-xs font-semibold">{stories[current].title}</p>
                <div className="flex items-center gap-1.5 mt-0.5 text-gray-600 text-xs">
                  <FiMapPin className="text-[10px] text-emerald-600" />
                  {stories[current].location} · {stories[current].date}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center gap-5">
            {/* Arrows */}
            <div className="flex gap-2">
              {[-1, 1].map((d) => (
                <motion.button key={d} onClick={() => go(d)}
                  className="w-11 h-11 rounded-xl border border-teal-900/60 bg-white/4 flex items-center justify-center text-gray-500 hover:text-teal-400 hover:border-teal-700/70 hover:bg-teal-950/50 transition-all"
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.94 }}>
                  {d === -1 ? <FiChevronLeft className="text-base" /> : <FiChevronRight className="text-base" />}
                </motion.button>
              ))}
            </div>

            {/* Dot strip */}
            <div className="flex items-center gap-2">
              {stories.map((_, i) => (
                <button key={i} onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i); resetTimer(); }}
                  className={`rounded-full transition-all duration-400 ${
                    i === current ? "w-7 h-2 bg-gradient-to-r from-teal-500 to-emerald-400" : "w-2 h-2 bg-gray-800 hover:bg-gray-600"
                  }`} />
              ))}
            </div>

            {/* Link */}
            <Link to="/stories"
              className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-teal-500/60 hover:text-teal-400 transition-colors group">
              All Stories
              <FiArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Right — photo panel */}
        <div className="order-1 lg:order-2 relative w-full lg:w-[44%] min-h-[42vh] lg:min-h-auto overflow-hidden">

          {/* Crossfade photo */}
          <AnimatePresence mode="wait">
            <motion.img key={current}
              src={stories[current].photo}
              alt={stories[current].name}
              className="absolute inset-0 w-full h-full object-cover object-center"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: "easeOut" }} />
          </AnimatePresence>

          {/* Gradient overlays */}
          {/* Mobile: fade bottom to dark */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#020b07] to-transparent lg:hidden" />
          {/* Desktop: fade left into text panel */}
          <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-[#020b07] via-[#020b07]/60 to-transparent hidden lg:block" />
          {/* Desktop: subtle bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020b07]/70 to-transparent hidden lg:block" />

          {/* Floating name card (bottom right) */}
          <AnimatePresence mode="wait">
            <motion.div key={current + "card"}
              className="absolute bottom-5 right-5 hidden lg:block"
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ delay: 0.25, type: "spring", stiffness: 120, damping: 18 }}>
              <div className="bg-black/55 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                <p className="text-white font-black text-sm tracking-tight">{stories[current].name}</p>
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mt-0.5">
                  <FiMapPin className="text-teal-500 text-[10px]" />
                  {stories[current].location}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Photo progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5 z-10">
            <motion.div key={current}
              className="h-full bg-gradient-to-r from-teal-500 to-emerald-400"
              initial={{ width: "0%" }} animate={{ width: "100%" }}
              transition={{ duration: 9, ease: "linear" }} />
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        className="relative z-10 grid grid-cols-2 sm:grid-cols-4 border-t border-teal-950/80"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }} viewport={{ once: true }}>
        {stats.map((s, i) => (
          <div key={i} className={`flex flex-col items-center justify-center gap-1 py-7 px-4
            ${i < stats.length - 1 ? "border-r border-teal-950/60" : ""}
            ${i >= 2 ? "border-t sm:border-t-0 border-teal-950/60" : ""}
            group hover:bg-teal-950/20 transition-colors`}>
            <span className="text-lg mb-0.5 opacity-60 group-hover:opacity-100 transition-opacity">{s.icon}</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 leading-none tabular-nums">{s.value}</span>
            <span className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">{s.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

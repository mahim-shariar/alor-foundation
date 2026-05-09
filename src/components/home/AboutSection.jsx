import { motion, AnimatePresence } from "framer-motion";
import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { FiArrowRight, FiX } from "react-icons/fi";
import * as api from "../../services/api.js";

const collagePositions = [
  { left: "0%", top: "0%" },
  { left: "20%", bottom: "10%" },
  { right: "10%", top: "10%" },
  { left: "10%", bottom: "0%" },
];

const collageItems = [
  { id: 1, type: "image", size: "md", rotation: -3, delay: 0.1 },
  { id: 2, type: "image", size: "lg", rotation: 2, delay: 0.3 },
  { id: 3, type: "video", size: "sm", rotation: 5, delay: 0.2 },
  { id: 4, type: "image", size: "sm", rotation: -2, delay: 0.4 },
];

const DEFAULT_MILESTONES = [
  { year: "2013", text: "Founded in Dhaka" },
  { year: "2017", text: "100th village reached" },
  { year: "2021", text: "10,000 students enrolled" },
  { year: "2024", text: "117 communities served" },
];

const FULL_STORY = `Alor Foundation was born in 2013 from a simple but powerful belief: that every person in Bangladesh deserves a dignified life, regardless of where they were born.

Founded by Arifuzzaman in Dhaka, the organization started with a small team of volunteers and a single mission — to bring light (alor means "of light" in Bengali) to the communities left behind by progress.

**The Early Years (2013–2016)**
Our first programs focused on emergency food distribution and basic healthcare in Gaibandha and Kurigram — two of Bangladesh's most flood-prone districts. We learned quickly that charity alone was not enough. We needed to build capacity from within.

**Building Infrastructure (2017–2019)**
By 2017, we had reached our 100th village with clean water and sanitation projects. In 2019, we launched the Women's Entrepreneurship Program, recognizing that empowering women was the fastest path to generational change. 200 women graduated in the first cohort — 87% had launched small businesses within six months.

**Digital Education (2020–2022)**
During the pandemic, when schools closed across Bangladesh, we pivoted quickly. We distributed tablets, trained teachers in digital pedagogy, and built offline learning libraries for 120 rural schools. By 2021, 10,000 children were enrolled in our programs.

**Scaling Impact (2023–Present)**
Today, Alor Foundation operates in 117 villages across 5 divisions with 99 full-time staff and 200+ volunteers. Our mobile health clinics serve 300,000+ patients annually. Our clean water projects have reached 180,000 people.

We are proud of what we have built — but we know the work is far from done. Millions of Bangladeshis still live without clean water, quality education, or access to healthcare. Every donation, every volunteer hour, every partnership moves us closer to the world we believe is possible.

Join us. Be the light.`;

function StoryModal({ milestones, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <motion.div className="relative bg-[#050f0a] border border-teal-900/60 rounded-2xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
          <div className="flex items-center justify-between px-6 py-5 border-b border-teal-900/40">
            <div>
              <div className="text-xs font-bold text-emerald-400 tracking-widest uppercase mb-1">Our Journey</div>
              <h2 className="text-2xl font-black text-white">The Alor Foundation Story</h2>
            </div>
            <button onClick={onClose} className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0">
              <FiX />
            </button>
          </div>

          {/* Timeline */}
          {milestones.length > 0 && (
            <div className="px-6 py-5 border-b border-teal-900/40">
              <div className="flex flex-wrap gap-4">
                {milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-2 bg-teal-900/30 border border-teal-800/40 rounded-xl px-3 py-2">
                    <span className="text-teal-400 font-black text-sm font-mono">{m.year}</span>
                    <span className="text-gray-300 text-xs">{m.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8">
            <div className="text-gray-300 text-sm leading-relaxed space-y-4">
              {FULL_STORY.split("\n\n").map((para, i) => (
                <p key={i} className={para.startsWith("**") ? "text-white font-bold text-base" : ""}>
                  {para.startsWith("**") ? para.replace(/\*\*/g, "") : para}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function VideoModal({ videoId, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <motion.div className="relative w-full max-w-3xl"
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}>
          <button onClick={onClose} className="absolute -top-12 right-0 w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors">
            <FiX />
          </button>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl">
            {videoId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="Alor Foundation"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-3">
                <div className="text-5xl">🎬</div>
                <p className="text-sm">No video configured yet.<br />Set <code className="text-teal-400 text-xs">about_video_id</code> in admin settings.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const AboutSection = () => {
  const constraintsRef = useRef(null);
  const [storyOpen, setStoryOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [milestones, setMilestones] = useState(DEFAULT_MILESTONES);

  useEffect(() => {
    api.getPublicSettings().then(d => {
      if (d.map?.about_video_id) setVideoId(d.map.about_video_id);
    }).catch(() => {});
    api.getMilestones().then(d => {
      if (d.data?.length > 0) setMilestones(d.data.map(m => ({ year: String(m.year), text: m.title })));
    }).catch(() => {});
  }, []);

  const closeStory = useCallback(() => setStoryOpen(false), []);
  const closeVideo = useCallback(() => setVideoOpen(false), []);

  const orbs = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      w: Math.random() * 220 + 100,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      dx: (Math.random() - 0.5) * 70,
      dy: (Math.random() - 0.5) * 70,
      dur: Math.random() * 18 + 10,
    })), []);

  return (
    <section id="about" className="relative overflow-hidden bg-[#050f0a] py-24 px-6 sm:px-12 lg:px-24">

      {storyOpen && <StoryModal milestones={milestones} onClose={closeStory} />}
      {videoOpen && <VideoModal videoId={videoId} onClose={closeVideo} />}

      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(rgba(20,184,166,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,0.8) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map((o) => (
          <motion.div key={o.id} className="absolute rounded-full"
            style={{ width: o.w, height: o.w, top: o.top, left: o.left, background: "radial-gradient(circle,rgba(16,185,129,0.12),transparent 70%)", filter: "blur(48px)" }}
            animate={{ x: [0, o.dx], y: [0, o.dy], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: o.dur, repeat: Infinity, repeatType: "reverse" }} />
        ))}
        <div className="absolute top-12 left-12 w-20 h-20 border-l-2 border-t-2 border-teal-500/30 rounded-tl-lg" />
        <div className="absolute bottom-12 right-12 w-20 h-20 border-r-2 border-b-2 border-emerald-500/30 rounded-br-lg" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }} className="relative z-10">

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15 }} viewport={{ once: true }} className="mb-5 flex items-center gap-3">
              <span className="text-teal-400/60 font-mono text-xs tracking-[0.2em]">◈ 01</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-bold tracking-widest uppercase border border-emerald-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Since 2013
              </span>
            </motion.div>

            <motion.h2 className="text-4xl sm:text-5xl xl:text-6xl font-black leading-[1.05] tracking-tight mb-6"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                A Decade of Impact.
              </span>
              <br />
              <span className="text-white">A Future of Hope.</span>
            </motion.h2>

            <motion.p className="text-gray-400 text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }} viewport={{ once: true }}>
              Founded by <span className="text-emerald-400 font-semibold">Arifuzzaman</span>, Alor Foundation is a
              registered NGO working to uplift underserved communities through healthcare, education, and social
              innovation. We create <span className="text-white font-semibold">lasting impact</span> — not just charity.
            </motion.p>

            {/* Timeline */}
            <motion.div className="mb-8 space-y-3" initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }} viewport={{ once: true }}>
              {milestones.map((m, i) => (
                <motion.div key={i} className="flex items-center gap-3 group"
                  initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i + 0.4 }} viewport={{ once: true }}>
                  <span className="w-12 text-right text-xs font-black text-teal-500 font-mono flex-shrink-0">{m.year}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60 group-hover:bg-teal-400 transition-colors flex-shrink-0" />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">{m.text}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button onClick={() => setStoryOpen(true)}
              className="inline-flex items-center gap-2 group relative overflow-hidden px-7 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-xl shadow-lg shadow-teal-900/40 btn-shimmer font-bold text-white"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }} viewport={{ once: true }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              Read Our Story
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>

          {/* Right — Collage */}
          <motion.div ref={constraintsRef} className="relative h-full min-h-[420px] lg:min-h-[520px]"
            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}>

            {/* Main video card — clickable */}
            <motion.div drag dragConstraints={constraintsRef}
              onClick={() => setVideoOpen(true)}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-3/4 aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-teal-900/60 z-10 cursor-pointer group"
              whileHover={{ scale: 1.03 }}
              initial={{ scale: 0.9, opacity: 0, rotate: -2 }}
              whileInView={{ scale: 1, opacity: 1, rotate: -2 }}
              transition={{ delay: 0.2, duration: 0.6 }}>
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-[#050f0a] flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-900">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-teal-500/0 group-hover:bg-teal-500/5 transition-colors duration-300" />
              <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-teal-500/30 rounded-tr-2xl pointer-events-none" />
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span className="text-xs text-teal-400/60 font-semibold tracking-wide group-hover:text-teal-400 transition-colors">Click to watch</span>
              </div>
            </motion.div>

            {/* Floating collage items */}
            {collageItems.map((ci, idx) => (
              <motion.div key={ci.id} drag dragConstraints={constraintsRef}
                className={`absolute bg-gray-900 rounded-xl overflow-hidden shadow-xl border border-teal-900/50 ${
                  ci.size === "sm" ? "w-20 h-20" : ci.size === "md" ? "w-28 h-28" : "w-36 h-36"
                }`}
                style={{ rotate: ci.rotation, ...collagePositions[idx] }}
                initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: ci.delay, duration: 0.5 }}
                whileHover={{ zIndex: 20, scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <div className={`w-full h-full flex items-center justify-center ${
                  ci.type === "image" ? "bg-gradient-to-br from-gray-800 to-gray-900" : "bg-gradient-to-br from-teal-950 to-emerald-950"}`}>
                  {ci.type === "image"
                    ? <svg className="w-1/2 h-1/2 text-gray-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                    : <svg className="w-1/3 h-1/3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" /></svg>}
                </div>
              </motion.div>
            ))}

            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient id="lg-ab" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <motion.line x1="30%" y1="40%" x2="60%" y2="50%" stroke="url(#lg-ab)" strokeWidth="1"
                strokeDasharray="200" initial={{ strokeDashoffset: 200 }}
                whileInView={{ strokeDashoffset: 0 }} transition={{ duration: 1.5, delay: 0.8 }} />
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

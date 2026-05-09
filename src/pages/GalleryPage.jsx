import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import {
  FiX, FiPlay, FiZoomIn, FiYoutube,
  FiChevronLeft, FiChevronRight, FiArrowRight,
} from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import { Link } from "react-router-dom";
import * as api from "../services/api.js";

function extractYoutubeId(input) {
  if (!input) return null;
  const m = input.match(/(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
  if (m) return m[1];
  if (/^[A-Za-z0-9_-]{11}$/.test(input.trim())) return input.trim();
  return input;
}

const FALLBACK_ITEMS = [
  { id: 1,  type: "image", title: "Rural School Opening",          category: "Education", url: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 2,  type: "video", title: "Mobile Health Clinic",          category: "Medical",   url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop", youtubeId: "9No-FiEInLA" },
  { id: 3,  type: "image", title: "Women's Workshop",              category: "Events",    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 4,  type: "video", title: "Clean Water Project",           category: "Events",    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&auto=format&fit=crop", youtubeId: "7wtfhZwyrcc" },
  { id: 5,  type: "image", title: "Teacher Training",              category: "Education", url: "https://images.unsplash.com/photo-1524179091875-b49498615b6a?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 6,  type: "image", title: "Vaccination Drive",             category: "Medical",   url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 7,  type: "image", title: "Flood Relief Distribution",     category: "Relief",    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 8,  type: "image", title: "Scholarship Award Ceremony",    category: "Education", url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 9,  type: "video", title: "Village Clean Water Launch",    category: "Relief",    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&auto=format&fit=crop", youtubeId: "7wtfhZwyrcc" },
  { id: 10, type: "image", title: "Children's Art Exhibition",     category: "Education", url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 11, type: "image", title: "Maternal Health Workshop",      category: "Medical",   url: "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 12, type: "image", title: "Volunteer Orientation 2024",    category: "Events",    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 13, type: "image", title: "Harvest Festival",              category: "Events",    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 14, type: "image", title: "Well Inauguration Ceremony",    category: "Relief",    url: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 15, type: "video", title: "Annual Report 2023 — In Field", category: "Events",    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop", youtubeId: "9No-FiEInLA" },
];

const catBadge = {
  Education: "bg-teal-500/25 text-teal-300 border border-teal-500/20",
  Medical:   "bg-emerald-500/25 text-emerald-300 border border-emerald-500/20",
  Events:    "bg-sky-500/25 text-sky-300 border border-sky-500/20",
  Relief:    "bg-amber-500/25 text-amber-300 border border-amber-500/20",
};

const aspectClass = (i) => {
  const p = i % 5;
  if (p === 0) return "aspect-[4/5]";
  if (p === 2) return "aspect-[4/3]";
  if (p === 4) return "aspect-square";
  return "aspect-video";
};

const cardHoverV  = { rest: {}, hover: {} };
const overlayV    = {
  rest:  { y: "104%", transition: { type: "spring", stiffness: 360, damping: 30 } },
  hover: { y: "0%",   transition: { type: "spring", stiffness: 360, damping: 30 } },
};
const imgScaleV   = {
  rest:  { scale: 1,    transition: { duration: 0.55, ease: "easeOut" } },
  hover: { scale: 1.08, transition: { duration: 0.55, ease: "easeOut" } },
};
const iconV       = {
  rest:  { scale: 0.7, opacity: 0 },
  hover: { scale: 1,   opacity: 1, transition: { type: "spring", stiffness: 400, damping: 22, delay: 0.04 } },
};
const borderGlowV = {
  rest:  { opacity: 0, transition: { duration: 0.2 } },
  hover: { opacity: 1, transition: { duration: 0.2 } },
};

const FLOAT_STYLES = [
  { rotate: -9, x: "-62%", y: "8%",  delay: 0 },
  { rotate:  5, x:  "48%", y: "-6%", delay: 0.08 },
  { rotate: -3, x: "-22%", y: "32%", delay: 0.16 },
  { rotate:  8, x:  "68%", y: "28%", delay: 0.24 },
];

export default function GalleryPage() {
  const [allItems, setAllItems] = useState(FALLBACK_ITEMS);
  const [cats, setCats]         = useState(["All", "Education", "Medical", "Events", "Relief"]);
  const [filter, setFilter]     = useState("All");
  const [selected, setSelected] = useState(null);
  const heroRef                 = useRef(null);

  useEffect(() => {
    api.getGallery({ limit: 100 }).then(d => {
      if (d.data?.length > 0) {
        const items = d.data.map(g => ({
          id: g._id,
          type: g.type || "image",
          title: g.title,
          category: g.category,
          url: g.url || g.image_url || "",
          youtubeId: extractYoutubeId(g.youtubeId || g.youtube_id || null),
        }));
        setAllItems(items);
        setCats(["All", ...new Set(items.map(i => i.category).filter(Boolean))]);
      }
    }).catch(() => {});
  }, []);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroO = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const catCount  = (cat) => cat === "All" ? allItems.length : allItems.filter(i => i.category === cat).length;
  const filtered  = filter === "All" ? allItems : allItems.filter(m => m.category === filter);
  const selIdx    = selected ? filtered.findIndex(i => i.id === selected.id) : -1;

  const goNext = useCallback(
    () => setSelected(filtered[(selIdx + 1) % filtered.length]),
    [filtered, selIdx]
  );
  const goPrev = useCallback(
    () => setSelected(filtered[(selIdx - 1 + filtered.length) % filtered.length]),
    [filtered, selIdx]
  );

  useEffect(() => {
    if (!selected) return;
    const h = (e) => {
      if (e.key === "Escape")     setSelected(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [selected, goNext, goPrev]);

  return (
    <PageTransition>

      {/* ── Hero with parallax collage ── */}
      <div ref={heroRef} className="relative overflow-hidden bg-[#030d06] min-h-[82vh] flex items-center justify-center">

        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: heroY, opacity: heroO }}>
          {FLOAT_STYLES.map((fc, i) => {
            const item = allItems[i * 4];
            if (!item) return null;
            return (
              <motion.div key={i}
                className="absolute w-52 sm:w-64 aspect-[4/3] rounded-2xl overflow-hidden border border-teal-900/40 shadow-2xl shadow-teal-950"
                style={{ rotate: fc.rotate, left: "50%", top: "50%", translateX: fc.x, translateY: fc.y }}
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 0.32, scale: 1 }}
                transition={{ delay: fc.delay + 0.35, duration: 1, ease: "easeOut" }}>
                <img src={item.url} alt="" className="w-full h-full object-cover" />
              </motion.div>
            );
          })}
          <div className="absolute inset-0 bg-[#030d06]/60 backdrop-blur-[2px]" />
        </motion.div>

        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(20,184,166,1) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,1) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

        <div className="relative z-10 text-center px-6 pt-28 pb-20 max-w-4xl mx-auto">
          <motion.div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/40 text-emerald-400 text-xs font-bold tracking-widest uppercase"
            initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Media Gallery
          </motion.div>

          <motion.h1 className="text-5xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[0.95] mb-6"
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}>
            Stories Told in<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-400">
              Photos & Film
            </span>
          </motion.h1>

          <motion.p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
            From rural classrooms to clean-water inaugurations — every image is a window into the lives your support changes.
          </motion.p>

          <motion.div className="flex flex-wrap justify-center gap-8"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            {[[String(allItems.length), "Media Items"], [String(cats.length - 1), "Categories"], ["2013–2024", "Archive Span"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black text-teal-400 leading-none">{v}</div>
                <div className="text-xs text-gray-500 font-semibold tracking-wide mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-teal-500/50 to-transparent" />
          <span className="text-[9px] text-gray-600 font-bold tracking-widest uppercase">Scroll</span>
        </motion.div>
      </div>

      {/* ── Masonry Grid ── */}
      <section className="bg-[#050f0a] py-20 px-6 sm:px-10 lg:px-20">
        <div className="max-w-7xl mx-auto">

          <motion.div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div>
              <div className="inline-flex items-center gap-2 mb-1.5 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-800/50 text-emerald-400 text-xs font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Full Archive
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
                  {filtered.length}
                </span>{" "}
                {filter === "All" ? "Media Items" : `${filter} Items`}
              </h2>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap">
              {cats.map((cat) => (
                <motion.button key={cat} onClick={() => setFilter(cat)}
                  className="relative px-3.5 py-1.5 rounded-full text-xs font-bold overflow-hidden"
                  style={{ color: filter === cat ? "#fff" : "rgb(156,163,175)" }}
                  whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.94 }}>
                  {filter === cat && (
                    <motion.div layoutId="page-gallery-pill"
                      className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                  )}
                  <span className="relative z-10">
                    {cat} <span className="opacity-60">({catCount(cat)})</span>
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35 }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {filtered.map((item, i) => (
              <motion.div key={item.id}
                className="break-inside-avoid mb-4"
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: (i % 3) * 0.06, type: "spring", stiffness: 78, damping: 18 }}>

                <motion.div
                  className="relative overflow-hidden rounded-2xl cursor-pointer"
                  variants={cardHoverV}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  onClick={() => setSelected(item)}>

                  {item.type === "video" ? (
                    /* ── Video card — YouTube branded, no thumbnail ── */
                    <div className={`relative overflow-hidden ${aspectClass(i)} bg-[#0d0d0d] flex flex-col items-center justify-center gap-4 px-6`}
                      style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "20px 20px" }}>

                      <div className="flex flex-col items-center gap-3 text-center z-10">
                        <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-xl shadow-red-900/60">
                          <FiYoutube className="text-white text-2xl" />
                        </div>
                        <p className="text-white font-black text-sm leading-snug tracking-tight max-w-[180px]">{item.title}</p>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${catBadge[item.category] ?? "bg-gray-700/60 text-gray-300"}`}>
                          {item.category}
                        </span>
                      </div>

                      {/* Play button shown on hover */}
                      <motion.div variants={iconV}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/50">
                        <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-900/70">
                          <FiPlay className="text-white text-xl ml-1" />
                        </div>
                      </motion.div>

                      <motion.div variants={borderGlowV}
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ boxShadow: "inset 0 0 0 2px rgba(239,68,68,0.5), 0 0 32px rgba(239,68,68,0.07)" }} />
                    </div>
                  ) : (
                    /* ── Image card ── */
                    <div className={`relative overflow-hidden ${aspectClass(i)}`}>
                      <motion.img src={item.url} alt={item.title} className="w-full h-full object-cover" variants={imgScaleV} />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10 pointer-events-none" />

                      <motion.div variants={overlayV}
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/96 via-black/75 to-transparent pt-10 pb-4 px-4">
                        <span className={`inline-flex text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${catBadge[item.category] ?? "bg-gray-700/60 text-gray-300"}`}>
                          {item.category}
                        </span>
                        <p className="text-white font-black text-sm leading-snug tracking-tight">{item.title}</p>
                      </motion.div>

                      <motion.div variants={iconV} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center shadow-2xl">
                          <FiZoomIn className="text-white text-lg" />
                        </div>
                      </motion.div>

                      <motion.div variants={borderGlowV}
                        className="absolute inset-0 rounded-2xl pointer-events-none"
                        style={{ boxShadow: "inset 0 0 0 2px rgba(45,212,191,0.55), 0 0 32px rgba(45,212,191,0.06)" }} />
                    </div>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setSelected(null)}>

            <motion.div className="absolute inset-0 bg-black/97 backdrop-blur-2xl" />

            <motion.div
              className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-5 sm:px-8 py-4"
              initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${catBadge[selected.category] ?? "bg-gray-700 text-gray-300"}`}>
                {selected.category}
              </span>
              <span className="text-sm font-bold text-gray-500 tabular-nums">
                {selIdx + 1} <span className="text-gray-700">/</span> {filtered.length}
              </span>
              <motion.button
                className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white hover:bg-white/20 transition-all"
                onClick={() => setSelected(null)}
                whileHover={{ scale: 1.12, rotate: 90 }} whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                <FiX className="text-base" />
              </motion.button>
            </motion.div>

            {filtered.length > 1 && (
              <motion.button
                className="absolute left-3 sm:left-6 z-10 w-12 h-12 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white hover:bg-teal-500/25 hover:border-teal-500/40 transition-all"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}
                whileHover={{ scale: 1.12, x: -2 }} whileTap={{ scale: 0.9 }}>
                <FiChevronLeft className="text-xl" />
              </motion.button>
            )}

            {filtered.length > 1 && (
              <motion.button
                className="absolute right-3 sm:right-6 z-10 w-12 h-12 rounded-full bg-white/8 border border-white/12 flex items-center justify-center text-white hover:bg-teal-500/25 hover:border-teal-500/40 transition-all"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}
                whileHover={{ scale: 1.12, x: 2 }} whileTap={{ scale: 0.9 }}>
                <FiChevronRight className="text-xl" />
              </motion.button>
            )}

            <motion.div
              className="relative z-10 w-full max-w-5xl px-14 sm:px-20"
              initial={{ scale: 0.88, opacity: 0, y: 36 }}
              animate={{ scale: 1,    opacity: 1, y: 0 }}
              exit={{ scale: 0.88,    opacity: 0, y: 22 }}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
              onClick={(e) => e.stopPropagation()}>

              <AnimatePresence mode="wait">
                <motion.div key={selected.id}
                  initial={{ opacity: 0, scale: 0.96, x: 28 }}
                  animate={{ opacity: 1, scale: 1,    x: 0 }}
                  exit={{ opacity: 0,   scale: 0.96, x: -28 }}
                  transition={{ type: "spring", stiffness: 320, damping: 28 }}>
                  {selected.type === "video" ? (
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-teal-900/25 shadow-2xl"
                      style={{ boxShadow: "0 0 80px rgba(20,184,166,0.08)" }}>
                      <iframe
                        src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1`}
                        className="w-full h-full" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
                    </div>
                  ) : (
                    <img src={selected.url} alt={selected.title}
                      className="w-full max-h-[72vh] object-contain rounded-2xl border border-teal-900/20 shadow-2xl"
                      style={{ boxShadow: "0 0 80px rgba(20,184,166,0.07)" }} />
                  )}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div key={selected.id + "c"}
                  className="flex items-center gap-3 mt-4 px-1"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }} transition={{ delay: 0.06 }}>
                  <h3 className="text-white font-black text-base flex-1">{selected.title}</h3>
                  {selected.type === "video" && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold flex-shrink-0">
                      <FiYoutube className="text-sm" /> YouTube
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>

              {filtered.length > 1 && (
                <motion.div
                  className="flex justify-center gap-2 mt-5 overflow-x-auto pb-2"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}>
                  {filtered.map((item, i) => (
                    <motion.button key={item.id}
                      onClick={(e) => { e.stopPropagation(); setSelected(item); }}
                      className={`flex-shrink-0 w-12 h-9 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        i === selIdx
                          ? "border-teal-400 shadow-md shadow-teal-900/50 opacity-100"
                          : "border-white/10 opacity-35 hover:opacity-60"
                      }`}
                      whileHover={{ scale: i === selIdx ? 1 : 1.1 }}>
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-teal-700 to-emerald-700 py-14 px-6 text-center">
        <motion.div className="max-w-xl mx-auto"
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
            Be Part of the Next Story
          </h2>
          <p className="text-white/75 text-sm mb-7">
            Every image here was made possible by donors, volunteers, and partners like you.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-teal-700 font-bold rounded-xl shadow-lg hover:scale-105 transition-all">
              Donate Today <FiArrowRight />
            </Link>
            <Link to="/stories"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/15 border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/25 transition-all">
              Read Impact Stories
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}

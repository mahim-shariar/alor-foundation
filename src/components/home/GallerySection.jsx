import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useState, useMemo, useEffect, useCallback } from "react";
import { FiYoutube, FiPlay, FiZoomIn, FiX, FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as api from "../../services/api.js";

const FALLBACK_ITEMS = [
  { id: 1, type: "image", title: "Rural School Opening", category: "Education", url: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 2, type: "video", title: "Mobile Health Clinic", category: "Medical",   url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&auto=format&fit=crop", youtubeId: "9No-FiEInLA" },
  { id: 3, type: "image", title: "Women's Workshop",     category: "Events",    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 4, type: "video", title: "Clean Water Project",  category: "Events",    url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=1200&auto=format&fit=crop", youtubeId: "7wtfhZwyrcc" },
  { id: 5, type: "image", title: "Teacher Training",     category: "Education", url: "https://images.unsplash.com/photo-1524179091875-b49498615b6a?w=1200&auto=format&fit=crop", youtubeId: null },
  { id: 6, type: "image", title: "Vaccination Drive",    category: "Medical",   url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop", youtubeId: null },
];

const CATS = ["All", "Education", "Medical", "Events"];

const catBadge = {
  Education: "bg-teal-500/25 text-teal-300 border border-teal-500/20",
  Medical:   "bg-emerald-500/25 text-emerald-300 border border-emerald-500/20",
  Events:    "bg-sky-500/25 text-sky-300 border border-sky-500/20",
};

const overlayV = {
  rest:  { y: "102%", transition: { type: "spring", stiffness: 340, damping: 28 } },
  hover: { y: "0%",   transition: { type: "spring", stiffness: 340, damping: 28 } },
};

const iconV = {
  rest:  { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
  hover: { scale: 1,   opacity: 1, transition: { type: "spring", stiffness: 380, damping: 22, delay: 0.05 } },
};

const containerV = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardV = {
  hidden:  { opacity: 0, y: 32, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1, transition: { type: "spring", stiffness: 75, damping: 18 } },
};

export default function GallerySection() {
  const [allItems, setAllItems] = useState(FALLBACK_ITEMS);
  const [filter, setFilter]   = useState("All");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    api.getGallery({ limit: 6 }).then(d => {
      if (d.data?.length > 0) setAllItems(d.data.map(m => {
        const raw = m.youtubeId || m.youtube_id || null;
        const ytMatch = raw && raw.match(/(?:youtube\.com\/watch\?.*v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/);
        const youtubeId = ytMatch ? ytMatch[1] : (raw && /^[A-Za-z0-9_-]{11}$/.test(raw.trim()) ? raw.trim() : raw);
        return { id: m._id, type: m.type, title: m.title, category: m.category, url: m.url, youtubeId };
      }));
    }).catch(() => {});
  }, []);

  const filtered = filter === "All" ? allItems : allItems.filter((m) => m.category === filter);

  const selIdx  = selected ? filtered.findIndex((i) => i.id === selected.id) : -1;
  const goNext  = useCallback(() => setSelected(filtered[(selIdx + 1) % filtered.length]), [filtered, selIdx]);
  const goPrev  = useCallback(() => setSelected(filtered[(selIdx - 1 + filtered.length) % filtered.length]), [filtered, selIdx]);

  useEffect(() => {
    if (!selected) return;
    const handler = (e) => {
      if (e.key === "Escape")     setSelected(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft")  goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selected, goNext, goPrev]);

  const orbs = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      w: [280, 220, 320, 180, 260][i],
      top: ["10%","60%","30%","80%","5%"][i],
      left: ["5%","70%","40%","15%","80%"][i],
      dx: [40, -30, 25, -40, 30][i],
      dy: [20, 35, -25, 30, -20][i],
      dur: [18, 14, 20, 16, 22][i],
    })), []);

  return (
    <section className="relative overflow-hidden bg-[#050f0a] py-28 px-6 sm:px-12 lg:px-24">

      {/* Animated grid bg */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(20,184,166,1) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,1) 1px,transparent 1px)",
        backgroundSize: "44px 44px",
      }} />

      {/* Glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {orbs.map((o) => (
          <motion.div key={o.id} className="absolute rounded-full"
            style={{ width: o.w, height: o.w, top: o.top, left: o.left,
              background: "radial-gradient(circle,rgba(16,185,129,0.12),transparent 68%)", filter: "blur(55px)" }}
            animate={{ x: [0, o.dx], y: [0, o.dy], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: o.dur, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
        ))}
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-teal-500/20 rounded-tr-2xl pointer-events-none" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-emerald-500/20 rounded-bl-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
          initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div>
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-bold tracking-widest uppercase border border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />◈ 06 — GALLERY
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none">
              A Glimpse Into<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Our Work</span>
            </h2>
          </div>

          {/* Filter pills — layoutId animated indicator */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {CATS.map((cat) => (
              <motion.button key={cat} onClick={() => setFilter(cat)}
                className="relative px-4 py-2 rounded-full text-sm font-semibold overflow-hidden"
                style={{ color: filter === cat ? "#fff" : "rgb(156 163 175)" }}
                whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
                {filter === cat && (
                  <motion.div layoutId="gallery-active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                )}
                <span className={`relative z-10 ${filter !== cat ? "hover:text-white transition-colors" : ""}`}>{cat}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Bento Grid */}
        <motion.div key={filter} variants={containerV} initial="hidden" animate="visible"
          className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          style={{ gridAutoRows: "220px" }}>
          {filtered.map((item, idx) => (
            <motion.div key={item.id} variants={cardV}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group
                ${idx === 0 ? "col-span-2 lg:col-span-2 row-span-2" : ""}
              `}
              whileHover="hover"
              initial="rest"
              animate="rest"
              onClick={() => setSelected(item)}>

              {item.type === "video" ? (
                /* ── Video card — YouTube branded, no thumbnail ── */
                <>
                  <div className="absolute inset-0 bg-[#0d0d0d] flex flex-col items-center justify-center gap-3 px-6 text-center"
                    style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "20px 20px" }}>
                    <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-xl shadow-red-900/60 flex-shrink-0">
                      <FiYoutube className="text-white text-2xl" />
                    </div>
                    <p className="text-white font-black text-sm leading-snug tracking-tight">{item.title}</p>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${catBadge[item.category] ?? "bg-gray-700/50 text-gray-300"}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Play button on hover */}
                  <motion.div variants={iconV}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/50">
                    <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center shadow-2xl shadow-red-900/70">
                      <FiPlay className="text-white text-xl ml-1" />
                    </div>
                  </motion.div>

                  {/* Red border glow on hover */}
                  <motion.div className="absolute inset-0 rounded-2xl pointer-events-none"
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.2 }}
                    style={{ boxShadow: "inset 0 0 0 2px rgba(239,68,68,0.5), 0 0 32px rgba(239,68,68,0.07)" }} />
                </>
              ) : (
                /* ── Image card ── */
                <>
                  <motion.img src={item.url} alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }} />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

                  <motion.div variants={overlayV}
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-12 pb-5 px-5">
                    <span className={`inline-flex text-[10px] font-bold px-2.5 py-0.5 rounded-full mb-2 ${catBadge[item.category] ?? "bg-gray-700/50 text-gray-300"}`}>
                      {item.category}
                    </span>
                    <p className="text-white font-black text-sm sm:text-base leading-snug tracking-tight">{item.title}</p>
                  </motion.div>

                  <motion.div variants={iconV}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-2xl">
                      <FiZoomIn className="text-white text-xl" />
                    </div>
                  </motion.div>

                  <motion.div className="absolute inset-0 rounded-2xl border-2 border-teal-400/0 pointer-events-none"
                    variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.2 }}
                    style={{ boxShadow: "inset 0 0 0 2px rgba(45,212,191,0.5)" }} />
                </>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* View Full Gallery */}
        <motion.div className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }} viewport={{ once: true }}>
          <Link to="/gallery">
            <motion.span
              className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-teal-700/50 rounded-2xl text-white font-bold text-sm hover:bg-white/10 hover:border-teal-500/70 transition-all group"
              whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <span className="text-base">🖼️</span>
              View Full Gallery
              <FiArrowRight className="transition-transform group-hover:translate-x-1.5" />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelected(null)}>

            {/* Backdrop */}
            <motion.div className="absolute inset-0 bg-black/96 backdrop-blur-2xl" />

            {/* Counter */}
            <motion.div className="absolute top-6 left-1/2 -translate-x-1/2 text-sm font-bold text-gray-400 z-10"
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              {selIdx + 1} / {filtered.length}
            </motion.div>

            {/* Close */}
            <motion.button
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all"
              onClick={() => setSelected(null)}
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <FiX className="text-lg" />
            </motion.button>

            {/* Prev */}
            {filtered.length > 1 && (
              <motion.button
                className="absolute left-4 sm:left-8 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-teal-500/30 hover:border-teal-500/40 transition-all"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FiChevronLeft className="text-xl" />
              </motion.button>
            )}

            {/* Next */}
            {filtered.length > 1 && (
              <motion.button
                className="absolute right-4 sm:right-8 z-10 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-teal-500/30 hover:border-teal-500/40 transition-all"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <FiChevronRight className="text-xl" />
              </motion.button>
            )}

            {/* Media */}
            <motion.div
              className="relative z-10 w-full max-w-5xl px-16 sm:px-20"
              initial={{ scale: 0.92, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={(e) => e.stopPropagation()}>

              <AnimatePresence mode="wait">
                <motion.div key={selected.id}
                  initial={{ opacity: 0, x: 30, scale: 0.97 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -30, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 300, damping: 28 }}>
                  {selected.type === "video" ? (
                    <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-teal-900/40 shadow-2xl shadow-teal-950">
                      <iframe src={`https://www.youtube.com/embed/${selected.youtubeId}?autoplay=1`}
                        className="w-full h-full" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
                    </div>
                  ) : (
                    <img src={selected.url} alt={selected.title}
                      className="w-full max-h-[75vh] object-contain rounded-2xl border border-teal-900/30 shadow-2xl shadow-teal-950" />
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Caption */}
              <AnimatePresence mode="wait">
                <motion.div key={selected.id + "-cap"}
                  className="flex items-center gap-3 mt-4"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  transition={{ delay: 0.05 }}>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${catBadge[selected.category] ?? "bg-gray-700 text-gray-300"}`}>
                    {selected.category}
                  </span>
                  <h3 className="text-white font-bold text-sm">{selected.title}</h3>
                  {selected.type === "video" && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold ml-auto">
                      <FiYoutube /> YouTube
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Dot indicators */}
              {filtered.length > 1 && (
                <div className="flex justify-center gap-1.5 mt-4">
                  {filtered.map((_, i) => (
                    <button key={i} onClick={(e) => { e.stopPropagation(); setSelected(filtered[i]); }}
                      className={`rounded-full transition-all duration-300 ${
                        i === selIdx ? "w-6 h-1.5 bg-teal-400" : "w-1.5 h-1.5 bg-gray-600 hover:bg-gray-400"
                      }`} />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

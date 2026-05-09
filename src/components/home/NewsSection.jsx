import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState, useEffect, useCallback } from "react";
import { FiArrowRight, FiClock, FiCalendar, FiX } from "react-icons/fi";
import * as api from "../../services/api.js";

const FALLBACK_POSTS = [
  { id: 1, title: "Digital Education Reaches 100 Rural Schools", excerpt: "How our tech initiative is bridging the urban-rural education gap with innovative learning solutions.", date: "2023-11-15", readTime: "4 min", category: "Education", thumbnail: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=800&auto=format&fit=crop", content: "" },
  { id: 2, title: "Annual Health Camp Serves 5,000 Patients", excerpt: "Recap of our largest medical initiative yet, providing free healthcare to underserved communities.", date: "2023-10-28", readTime: "6 min", category: "Health", thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop", content: "" },
  { id: 3, title: "Women's Entrepreneurship Program Graduation", excerpt: "Celebrating the first cohort of 50 women who completed our business training program.", date: "2023-10-12", readTime: "5 min", category: "Empowerment", thumbnail: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&auto=format&fit=crop", content: "" },
  { id: 4, title: "Clean Water Project: Phase 2 Completed", excerpt: "Expanding access to safe drinking water in the northern regions of Bangladesh.", date: "2023-09-30", readTime: "7 min", category: "Sustainability", thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop", content: "" },
  { id: 5, title: "Volunteer Spotlight: Meet Our Field Team", excerpt: "Behind-the-scenes look at the dedicated individuals making our work possible.", date: "2023-09-18", readTime: "8 min", category: "Team", thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop", content: "" },
  { id: 6, title: "Sustainable Farming Training Results", excerpt: "How our agricultural program increased crop yields by 40% for participating farmers.", date: "2023-09-05", readTime: "5 min", category: "Agriculture", thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop", content: "" },
];

const catColor = { Education: "bg-teal-100 text-teal-700", Health: "bg-emerald-100 text-emerald-700", Empowerment: "bg-rose-100 text-rose-700", Sustainability: "bg-green-100 text-green-700", Team: "bg-blue-100 text-blue-700", Agriculture: "bg-amber-100 text-amber-700" };

function ArticleModal({ article, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <motion.div className="relative bg-white rounded-2xl w-full max-w-2xl my-8 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }}>
          <button onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors">
            <FiX />
          </button>
          {article.thumbnail && (
            <div className="relative aspect-video overflow-hidden">
              <img src={article.thumbnail} alt={article.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {article.category && (
                <span className={`absolute bottom-3 left-4 text-xs font-bold px-2.5 py-1 rounded-full ${catColor[article.category] ?? "bg-gray-100 text-gray-600"}`}>
                  {article.category}
                </span>
              )}
            </div>
          )}
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
              {article.date && <span className="flex items-center gap-1"><FiCalendar className="text-teal-500" />{new Date(article.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>}
              {article.readTime && <span className="flex items-center gap-1"><FiClock className="text-teal-500" />{article.readTime} read</span>}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-4 leading-snug">{article.title}</h2>
            <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed">
              {article.content ? (
                <p style={{ whiteSpace: "pre-line" }}>{article.content}</p>
              ) : (
                <p>{article.excerpt}</p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

const NewsSection = () => {
  const [blogPosts, setBlogPosts] = useState(FALLBACK_POSTS);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    api.getNews({ limit: 6 }).then(d => {
      if (d.data?.length > 0) setBlogPosts(d.data.map(n => ({ id: n._id, title: n.title, excerpt: n.excerpt, content: n.content || '', date: n.date, readTime: n.read_time || '5 min', category: n.category, thumbnail: n.thumbnail })));
    }).catch(() => {});
  }, []);

  const openArticle = useCallback((post) => setSelectedArticle(post), []);
  const closeArticle = useCallback(() => setSelectedArticle(null), []);

  const particles = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      color: i % 2 === 0 ? ["#5eead4","#0d9488"] : ["#34d399","#059669"],
      w: Math.random() * 140 + 80,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      dx: (Math.random() - 0.5) * 60,
      dy: (Math.random() - 0.5) * 60,
      dur: Math.random() * 18 + 10,
    })), []);

  return (
    <section id="news" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50 py-28 px-6 sm:px-12 lg:px-24">

      {selectedArticle && <ArticleModal article={selectedArticle} onClose={closeArticle} />}

      <div className="absolute inset-0 opacity-[0.25]" style={{
        backgroundImage: "radial-gradient(circle,#14b8a6 1px,transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div key={p.id} className="absolute rounded-full opacity-[0.07]"
            style={{ background: `linear-gradient(45deg,${p.color[0]},${p.color[1]})`, width: p.w, height: p.w, top: p.top, left: p.left, filter: "blur(44px)" }}
            animate={{ x: [0, p.dx], y: [0, p.dy] }}
            transition={{ duration: p.dur, repeat: Infinity, repeatType: "reverse" }} />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">

        <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />◈ 07 — NEWSROOM
          </div>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">News, Updates</span>{" "}
            <span className="text-gray-900">& Insights</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Stay informed about our latest initiatives, success stories, and field reports.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Featured (large) */}
          <motion.article className="lg:col-span-1 group relative"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="h-full bg-white/90 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img src={blogPosts[0].thumbnail} alt={blogPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className={`absolute bottom-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${catColor[blogPosts[0].category] ?? "bg-gray-100 text-gray-600"}`}>
                  {blogPosts[0].category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="flex items-center gap-1"><FiCalendar className="text-teal-500" />
                    {new Date(blogPosts[0].date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  </span>
                  <span className="flex items-center gap-1"><FiClock className="text-teal-500" />{blogPosts[0].readTime} read</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-2 leading-snug tracking-tight">{blogPosts[0].title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{blogPosts[0].excerpt}</p>
                <motion.button onClick={() => openArticle(blogPosts[0])}
                  className="inline-flex items-center text-sm font-bold text-teal-600 gap-1.5 self-start" whileHover={{ x: 4 }}>
                  Read full story <FiArrowRight />
                </motion.button>
              </div>
            </div>
          </motion.article>

          {/* Right column */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {blogPosts.slice(1).map((post, i) => (
              <motion.article key={post.id} className="group relative"
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.55 }} viewport={{ once: true, margin: "-40px" }}>
                <div className="h-full bg-white/90 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-400 overflow-hidden flex flex-col">
                  <div className="relative aspect-video overflow-hidden">
                    <img src={post.thumbnail} alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className={`absolute bottom-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${catColor[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                      <span className="flex items-center gap-1"><FiClock className="text-teal-500" />{post.readTime}</span>
                      <span>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</span>
                    </div>
                    <h3 className="text-sm font-black text-gray-900 leading-snug mb-2">{post.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed flex-1 mb-3 line-clamp-2">{post.excerpt}</p>
                    <motion.button onClick={() => openArticle(post)}
                      className="inline-flex items-center text-xs font-bold text-teal-600 gap-1 self-start" whileHover={{ x: 3 }}>
                      Read more <FiArrowRight />
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default NewsSection;

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { FiArrowRight, FiClock, FiCalendar, FiSearch, FiX } from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import NewsSection from "../components/home/NewsSection";
import { Link } from "react-router-dom";
import * as api from "../services/api.js";

const FALLBACK_NEWS = [
  { id: 1, title: "Digital Education Reaches 100 Rural Schools", excerpt: "How our tech initiative is bridging the urban-rural education gap with innovative learning solutions deployed across Gaibandha district.", date: "2023-11-15", readTime: "4 min", category: "Education", thumbnail: "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=800&auto=format&fit=crop" },
  { id: 2, title: "Annual Health Camp Serves 5,000 Patients", excerpt: "Recap of our largest medical initiative yet, providing free healthcare to underserved communities across Kurigram and Gaibandha.", date: "2023-10-28", readTime: "6 min", category: "Health", thumbnail: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop" },
  { id: 3, title: "Women's Entrepreneurship Program Graduation", excerpt: "Celebrating the first cohort of 50 women who completed our business training program — 42 have already launched businesses.", date: "2023-10-12", readTime: "5 min", category: "Empowerment", thumbnail: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&auto=format&fit=crop" },
  { id: 4, title: "Clean Water Project: Phase 2 Completed", excerpt: "Expanding access to safe drinking water in the northern regions of Bangladesh. 23 new tube wells now serve 40,000 additional people.", date: "2023-09-30", readTime: "7 min", category: "Sustainability", thumbnail: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop" },
  { id: 5, title: "Volunteer Spotlight: Meet Our Field Team", excerpt: "Behind-the-scenes look at the dedicated individuals making our work possible in 117 villages across Bangladesh.", date: "2023-09-18", readTime: "8 min", category: "Team", thumbnail: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop" },
  { id: 6, title: "Sustainable Farming Training Results", excerpt: "How our agricultural program increased crop yields by 40% for 3,400 participating farmers in the Rangpur division.", date: "2023-09-05", readTime: "5 min", category: "Agriculture", thumbnail: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop" },
  { id: 7, title: "New Partnership with UNICEF Bangladesh", excerpt: "Alor Foundation and UNICEF announce a joint initiative to deliver integrated early childhood development programs in 30 upazilas.", date: "2023-08-22", readTime: "3 min", category: "Partnership", thumbnail: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop" },
  { id: 8, title: "Flood Response: Emergency Relief Distributed", excerpt: "Our rapid response team reached 12,000 flood-affected families in Sylhet within 48 hours with food, medicine, and emergency supplies.", date: "2023-07-14", readTime: "6 min", category: "Relief", thumbnail: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop" },
  { id: 9, title: "10-Year Anniversary Gala Raises 2 Crore BDT", excerpt: "Supporters, partners, and community leaders gathered in Dhaka to celebrate a decade of impact and raise funds for 2024 programs.", date: "2023-06-30", readTime: "4 min", category: "Events", thumbnail: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop" },
];

const catColor = {
  Education: "bg-teal-100 text-teal-700",
  Health: "bg-emerald-100 text-emerald-700",
  Empowerment: "bg-rose-100 text-rose-700",
  Sustainability: "bg-green-100 text-green-700",
  Team: "bg-blue-100 text-blue-700",
  Agriculture: "bg-amber-100 text-amber-700",
  Partnership: "bg-purple-100 text-purple-700",
  Relief: "bg-orange-100 text-orange-700",
  Events: "bg-sky-100 text-sky-700",
};

function ArticleModal({ article, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const catColor = {
    Education: "bg-teal-100 text-teal-700", Health: "bg-emerald-100 text-emerald-700",
    Empowerment: "bg-rose-100 text-rose-700", Sustainability: "bg-green-100 text-green-700",
    Team: "bg-blue-100 text-blue-700", Agriculture: "bg-amber-100 text-amber-700",
    Partnership: "bg-purple-100 text-purple-700", Relief: "bg-orange-100 text-orange-700",
    Events: "bg-sky-100 text-sky-700",
  };

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
            <div className="text-gray-600 leading-relaxed text-sm">
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

const PER_PAGE = 6;

export default function NewsPage() {
  const [allNews, setAllNews]             = useState(FALLBACK_NEWS);
  const [categories, setCategories]       = useState(["All", "Education", "Health", "Empowerment", "Sustainability", "Team", "Agriculture", "Partnership", "Relief", "Events"]);
  const [filter, setFilter]               = useState("All");
  const [search, setSearch]               = useState("");
  const [page, setPage]                   = useState(1);
  const [newsEmail, setNewsEmail]         = useState("");
  const [newsStatus, setNewsStatus]       = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    api.getNews({ limit: 50 }).then(d => {
      if (d.data?.length > 0) {
        const posts = d.data.map(n => ({
          id: n._id,
          title: n.title,
          excerpt: n.excerpt || n.content?.substring(0, 150) || "",
          date: n.date || "",
          readTime: n.read_time || "5 min",
          content: n.content || "",
          category: n.category,
          thumbnail: n.thumbnail || n.image || "",
        }));
        setAllNews(posts);
        setCategories(["All", ...new Set(posts.map(p => p.category).filter(Boolean))]);
      }
    }).catch(() => {});
  }, []);

  const filtered = allNews.filter(n => {
    const matchCat    = filter === "All" || n.category === filter;
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const setFilterAndReset = useCallback((cat) => { setFilter(cat); setPage(1); }, []);
  const setSearchAndReset = useCallback((val) => { setSearch(val); setPage(1); }, []);

  const openArticle  = useCallback((article) => setSelectedArticle(article), []);
  const closeArticle = useCallback(() => setSelectedArticle(null), []);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!newsEmail) return;
    setNewsStatus("loading");
    try {
      await api.subscribeNewsletter(newsEmail);
      setNewsStatus("ok");
      setNewsEmail("");
    } catch {
      setNewsStatus("err");
    }
  };

  return (
    <PageTransition>
      {selectedArticle && <ArticleModal article={selectedArticle} onClose={closeArticle} />}
      {/* Page Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/40 to-emerald-50 border-b border-teal-100 pt-24 pb-16 px-6">
        <div className="absolute inset-0 opacity-[0.2]" style={{
          backgroundImage: "radial-gradient(circle,#14b8a6 1px,transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <motion.div className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Newsroom
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-gray-900 tracking-tight mb-5">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">News</span> & Updates
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            Stay informed about our programs, partnerships, field reports, and the communities we serve.
          </p>
          <div className="relative max-w-md mx-auto">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={search}
              onChange={(e) => setSearchAndReset(e.target.value)}
              className="w-full pl-11 pr-5 py-3.5 rounded-xl border border-emerald-200 bg-white shadow-sm text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            />
          </div>
        </motion.div>
      </div>

      {/* Featured Posts */}
      <NewsSection />

      {/* All Articles with filter */}
      <section className="bg-white py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-10"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div>
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All Articles
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
                Full <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Archive</span>
              </h2>
            </div>
            <span className="text-sm text-gray-400 font-semibold">{filtered.length} article{filtered.length !== 1 ? "s" : ""} found</span>

          </motion.div>

          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilterAndReset(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filter === cat
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-teal-700"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400 font-semibold">No articles match your search.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginated.map((post, i) => (
                  <motion.article key={post.id} className="group"
                    initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.45 }}>
                    <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                      <div className="relative aspect-video overflow-hidden">
                        <img src={post.thumbnail} alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <span className={`absolute bottom-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${catColor[post.category] ?? "bg-gray-100 text-gray-600"}`}>
                          {post.category}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-xs text-gray-400 mb-2">
                          <span className="flex items-center gap-1"><FiCalendar className="text-teal-500" />
                            {post.date ? new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) : ""}
                          </span>
                          <span className="flex items-center gap-1"><FiClock className="text-teal-500" />{post.readTime} read</span>
                        </div>
                        <h3 className="text-base font-black text-gray-900 leading-snug mb-2 tracking-tight">{post.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{post.excerpt}</p>
                        <motion.button onClick={() => openArticle(post)} className="inline-flex items-center text-sm font-bold text-teal-600 gap-1.5 self-start" whileHover={{ x: 4 }}>
                          Read full story <FiArrowRight />
                        </motion.button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-12">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button key={p} onClick={() => setPage(p)}
                      className={`w-10 h-10 rounded-xl text-sm font-bold transition-all ${
                        p === page
                          ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md"
                          : "bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-teal-700"
                      }`}>
                      {p}
                    </button>
                  ))}

                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-600 hover:bg-emerald-50 hover:text-teal-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 py-16 px-6">
        <motion.div className="max-w-xl mx-auto text-center"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">Stay Updated</h2>
          <p className="text-white/80 mb-7 text-sm">Get our monthly newsletter with field updates, stories, and ways to help.</p>
          {newsStatus === "ok" ? (
            <p className="text-white font-bold text-lg">✅ You're subscribed! Thank you.</p>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={newsEmail}
                onChange={e => setNewsEmail(e.target.value)}
                className="flex-1 px-5 py-3.5 rounded-xl bg-white text-gray-700 text-sm font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/40"
              />
              <button
                type="submit"
                disabled={newsStatus === "loading"}
                className="px-6 py-3.5 bg-white/20 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/30 transition-all whitespace-nowrap flex items-center gap-2 justify-center disabled:opacity-60">
                {newsStatus === "loading" ? "Subscribing..." : <><span>Subscribe</span><FiArrowRight /></>}
              </button>
            </form>
          )}
          {newsStatus === "err" && <p className="text-white/80 text-sm mt-3">Something went wrong. Please try again.</p>}
        </motion.div>
      </section>
    </PageTransition>
  );
}

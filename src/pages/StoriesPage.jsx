import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMapPin, FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import FeaturedStoriesSection from "../components/home/FeaturedStoriesSection";
import { Link } from "react-router-dom";
import * as api from "../services/api.js";

const TAG_GRADIENT = {
  Education:   "from-teal-400 to-emerald-500",
  Healthcare:  "from-amber-400 to-orange-500",
  "Clean Water": "from-blue-400 to-cyan-500",
  Empowerment: "from-rose-400 to-pink-500",
  Agriculture: "from-emerald-400 to-teal-500",
  default:     "from-teal-400 to-emerald-500",
};
const TAG_COLOR = {
  Education:   "bg-teal-100 text-teal-700",
  Healthcare:  "bg-amber-100 text-amber-700",
  "Clean Water": "bg-blue-100 text-blue-700",
  Empowerment: "bg-rose-100 text-rose-700",
  Agriculture: "bg-emerald-100 text-emerald-700",
  default:     "bg-teal-100 text-teal-700",
};

const FALLBACK_STORIES = [
  { id: 1, name: "Sumiya Akter", title: "From Illiteracy to Teaching", tag: "Education", location: "Gaibandha", year: "2023", photo: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=400", quote: "Alor Foundation believed in me when no one else did. Today I teach 40 children in my village.", story: "Sumiya grew up in a household where girls were not allowed to attend school. At 22, she enrolled in Alor Foundation's Adult Literacy Campaign. Within 8 months, she could read and write fluently. She then joined the teacher training program, and in 2023 opened a small learning center in her home. Now she teaches 40 children — many of them girls, just like her.", color: "from-teal-400 to-emerald-500", tagColor: "bg-teal-100 text-teal-700" },
  { id: 2, name: "Rafiul Hasan", title: "From Patient to Paramedic", tag: "Healthcare", location: "Kurigram", year: "2024", photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400", quote: "Now I help save lives, thanks to the support I received when I needed it most.", story: "In 2019, Rafiul was rushed to the Alor Foundation mobile clinic with severe dengue fever. The treatment was free. Inspired by the care he received, he asked to volunteer. After 2 years of training, he is now a certified paramedic running his own community health station in Ulipur, Kurigram.", color: "from-amber-400 to-orange-500", tagColor: "bg-amber-100 text-amber-700" },
  { id: 3, name: "Khadija Khatun", title: "Clean Water, New Hope", tag: "Clean Water", location: "Khulna", year: "2023", photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=facearea&w=400&h=400", quote: "For the first time in my life, our entire village drinks safe, clean water every day.", story: "Khadija's village of 800 people relied on pond water riddled with arsenic and bacteria. When Alor Foundation drilled a deep tube well in 2022 and installed a filtration system, diarrheal disease dropped by 80% in six months.", color: "from-blue-400 to-cyan-500", tagColor: "bg-blue-100 text-blue-700" },
  { id: 4, name: "Nasrin Sultana", title: "A Business Born from Courage", tag: "Empowerment", location: "Rajshahi", year: "2023", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=facearea&w=400&h=400", quote: "I used to depend on my husband for every taka. Now I employ three women from my street.", story: "Nasrin joined the Women's Entrepreneurship Program in 2021 with zero savings. After 6 months of training and a BDT 8,000 micro-loan, her tailoring shop now generates BDT 25,000 per month.", color: "from-rose-400 to-pink-500", tagColor: "bg-rose-100 text-rose-700" },
  { id: 5, name: "Abdur Rahim Farooq", title: "Harvest of a Different Kind", tag: "Agriculture", location: "Rangpur", year: "2024", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&w=400&h=400", quote: "Before the training, floods destroyed everything every year. Now I plan for it — and I profit.", story: "After joining Alor Foundation's Sustainable Farming Program, Abdur's yield doubled. He now heads a 40-member cooperative selling direct to Dhaka markets, cutting out middlemen.", color: "from-emerald-400 to-teal-500", tagColor: "bg-emerald-100 text-emerald-700" },
  { id: 6, name: "Meherunnesa Begum", title: "Reading at 58", tag: "Education", location: "Mymensingh", year: "2024", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=facearea&w=400&h=400", quote: "I signed papers with a thumbprint my entire life. Last week, I wrote my own name for the first time.", story: "At 58, Meherunnesa was told she was too old to learn. After 4 months of evening classes, she could read Bengali. She is now helping two younger women in her village enroll.", color: "from-teal-400 to-emerald-500", tagColor: "bg-teal-100 text-teal-700" },
];

export default function StoriesPage() {
  const [allStories, setAllStories] = useState(FALLBACK_STORIES);
  const [tagFilters, setTagFilters] = useState(["All", "Education", "Healthcare", "Clean Water", "Empowerment", "Agriculture"]);
  const [filter, setFilter]         = useState("All");
  const [expanded, setExpanded]     = useState(null);

  useEffect(() => {
    api.getStories({ limit: 50 }).then(d => {
      if (d.data?.length > 0) {
        const stories = d.data.map(s => ({
          id: s._id,
          name: s.name || s.person_name || "",
          title: s.title,
          tag: s.tag || s.category || "Education",
          location: s.location || "",
          year: s.year || "",
          photo: s.photo || s.image || "",
          quote: s.quote || "",
          story: s.story || s.content || s.description || "",
          color: TAG_GRADIENT[s.tag || s.category] || TAG_GRADIENT.default,
          tagColor: TAG_COLOR[s.tag || s.category] || TAG_COLOR.default,
        }));
        setAllStories(stories);
        setTagFilters(["All", ...new Set(stories.map(s => s.tag).filter(Boolean))]);
      }
    }).catch(() => {});
  }, []);

  const filtered = filter === "All" ? allStories : allStories.filter(s => s.tag === filter);

  return (
    <PageTransition>
      {/* Page Banner */}
      <div className="relative overflow-hidden bg-[#050f0a] pt-24 pb-16 px-6">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "linear-gradient(rgba(20,184,166,1) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,1) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }} />
        <motion.div className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-700/40 text-emerald-400 text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Real Lives, Real Change
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight mb-5">
            Impact <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Stories</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Behind every statistic is a human story. Read about the real people whose lives have been transformed by your generosity and our programs.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[[String(allStories.length) + "+", "Stories Below"], ["12,300+", "Lives Changed"], ["10+", "Years of Impact"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-black text-teal-400">{v}</div>
                <div className="text-xs text-gray-500 font-semibold tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured Carousel from Home */}
      <FeaturedStoriesSection />

      {/* All Stories Grid */}
      <section className="bg-gradient-to-br from-slate-50 via-teal-50/20 to-emerald-50 py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All Stories
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Every Story <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Matters</span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {tagFilters.map((t) => (
              <button key={t} onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === t
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-700"
                }`}>
                {t}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((s, i) => (
              <motion.div key={s.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }} viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className={`h-1.5 w-full bg-gradient-to-r ${s.color}`} />
                <div className="p-7 flex flex-col gap-5">
                  <div className="flex items-start gap-5">
                    <img src={s.photo} alt={s.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-100 flex-shrink-0 shadow-sm" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${s.tagColor}`}>{s.tag}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-400"><FiMapPin className="text-teal-500 text-xs" />{s.location} · {s.year}</span>
                      </div>
                      <h3 className="font-black text-gray-900 text-lg tracking-tight leading-snug">{s.title}</h3>
                      <p className="text-sm text-gray-500 font-semibold">{s.name}</p>
                    </div>
                  </div>

                  <div className="border-l-2 border-teal-400 pl-4">
                    <p className="text-gray-600 text-sm italic leading-relaxed">"{s.quote}"</p>
                  </div>

                  <AnimatePresence>
                    {expanded === s.id && (
                      <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }} className="text-gray-500 text-sm leading-relaxed">
                        {s.story}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors self-start">
                    {expanded === s.id ? (
                      <><FiChevronLeft className="text-xs" /> Show less</>
                    ) : (
                      <>Read full story <FiArrowRight className="text-xs" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 py-16 px-6 text-center">
        <motion.div className="max-w-2xl mx-auto" initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
            Help Write the Next Story
          </h2>
          <p className="text-white/80 mb-8">Every donation creates a story like these. Be the reason someone's life changes forever.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-teal-700 font-bold rounded-xl shadow-lg hover:scale-105 transition-all">
              Donate Now <FiArrowRight />
            </Link>
            <Link to="/projects"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/20 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/30 transition-all">
              See Our Programs
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowRight, FiUsers, FiMapPin, FiCheckCircle } from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import WhatWeDoSection from "../components/home/whatWeDoSection";
import { Link } from "react-router-dom";
import * as api from "../services/api.js";

const CAT_STYLES = {
  Education: { bar: "from-teal-400 to-emerald-500", tag: "bg-teal-100 text-teal-700", icon: "🎓" },
  Healthcare: { bar: "from-amber-400 to-orange-500", tag: "bg-amber-100 text-amber-700", icon: "🏥" },
  "Clean Water": { bar: "from-blue-400 to-cyan-500", tag: "bg-blue-100 text-blue-700", icon: "💧" },
  "Women Empowerment": { bar: "from-rose-400 to-pink-500", tag: "bg-rose-100 text-rose-700", icon: "👩‍💼" },
  Agriculture: { bar: "from-emerald-400 to-teal-500", tag: "bg-emerald-100 text-emerald-700", icon: "🌾" },
  default: { bar: "from-teal-400 to-emerald-500", tag: "bg-teal-100 text-teal-700", icon: "📌" },
};

const FALLBACK_PROJECTS = [
  { id: 1, icon: "🎓", category: "Education", title: "Digital Learning Hubs", subtitle: "Bridging the digital divide in rural schools", desc: "We partner with government primary schools to set up solar-powered computer labs and train teachers in interactive digital pedagogy.", impact: ["120+ schools equipped", "28,000 students impacted", "450 teachers trained"], location: "Gaibandha, Kurigram, Jamalpur", year: "2015–ongoing", bar: "from-teal-400 to-emerald-500", tag: "bg-teal-100 text-teal-700" },
  { id: 2, icon: "🏥", category: "Healthcare", title: "Mobile Health Clinics", subtitle: "Bringing essential care to the doorstep", desc: "Our fleet of 12 mobile clinics provides free consultations, maternal care, vaccinations, and chronic-disease management.", impact: ["300K+ patients served", "12 mobile units", "53 sub-districts covered"], location: "Northern & Southern Bangladesh", year: "2018–ongoing", bar: "from-amber-400 to-orange-500", tag: "bg-amber-100 text-amber-700" },
  { id: 3, icon: "💧", category: "Clean Water", title: "Safe Water Initiative", subtitle: "Clean water for every household", desc: "We install tube wells, rainwater harvesting systems, and arsenic-removal filters at the village level.", impact: ["53 deep tube wells", "117 villages served", "180K+ people benefited"], location: "Khulna, Satkhira, Bagerhat", year: "2014–ongoing", bar: "from-blue-400 to-cyan-500", tag: "bg-blue-100 text-blue-700" },
];

export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState(FALLBACK_PROJECTS);
  const [categories, setCategories] = useState(["All", "Education", "Healthcare", "Clean Water", "Women Empowerment", "Agriculture"]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.getProjects({ limit: 50 }).then(d => {
      if (d.data?.length > 0) {
        const projects = d.data.map(p => {
          const style = CAT_STYLES[p.category] || CAT_STYLES.default;
          return { id: p._id, icon: p.icon || style.icon, category: p.category, title: p.title, subtitle: p.description?.split('.')[0] || '', desc: p.description, impact: Array.isArray(p.impact) ? p.impact : [], location: Array.isArray(p.locations) ? p.locations.join(', ') : (p.locations || ''), year: p.year || '', bar: style.bar, tag: style.tag };
        });
        setAllProjects(projects);
        const cats = ["All", ...new Set(projects.map(p => p.category).filter(Boolean))];
        setCategories(cats);
      }
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = filter === "All" ? allProjects : allProjects.filter((p) => p.category === filter);

  return (
    <PageTransition>
      {/* Page Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 pt-24 pb-16 px-6">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "radial-gradient(circle,#14b8a6 1px,transparent 1px)",
          backgroundSize: "30px 30px",
        }} />
        <motion.div className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-teal-900/50 border border-teal-700/40 text-teal-400 text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            What We Do
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight mb-5">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Programs</span> & Projects
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Six core programs. Thousands of lives changed. Every initiative is designed to create lasting, measurable impact across Bangladesh's most underserved communities.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[["6", "Active Programs"], ["117", "Villages"], ["40K+", "Lives Impacted"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black text-teal-400">{v}</div>
                <div className="text-xs text-gray-500 font-semibold tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* What We Do overview from Home */}
      <WhatWeDoSection />

      {/* All Projects Deep Dive */}
      <section className="bg-gradient-to-br from-slate-50 via-teal-50/20 to-emerald-50 py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> All Programs
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              In-Depth <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Project Details</span>
            </h2>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === cat
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-teal-300 hover:text-teal-700"
                }`}>
                {cat}
              </button>
            ))}
          </div>

          {/* Project cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.55 }} viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <div className={`h-1.5 w-full bg-gradient-to-r ${p.bar}`} />
                <div className="p-7">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${p.bar} flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform`}>
                      {p.icon}
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.tag}`}>{p.category}</span>
                  </div>
                  <h3 className="text-xl font-black text-gray-900 mb-1 tracking-tight">{p.title}</h3>
                  <p className="text-sm text-teal-600 font-semibold mb-3">{p.subtitle}</p>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">{p.desc}</p>

                  <div className="space-y-1.5 mb-5">
                    {p.impact.map((item, j) => (
                      <div key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <FiCheckCircle className="text-emerald-500 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 border-t border-gray-100 pt-4">
                    <span className="flex items-center gap-1"><FiMapPin className="text-teal-500" />{p.location}</span>
                    <span className="flex items-center gap-1"><FiUsers className="text-emerald-500" />{p.year}</span>
                  </div>
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
            Want to Support a Program?
          </h2>
          <p className="text-white/80 mb-8">Your donation directly funds the program of your choice. 100% goes to the field.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-teal-700 font-bold rounded-xl shadow-lg hover:scale-105 transition-all">
              Donate to a Program <FiArrowRight />
            </Link>
            <Link to="/stories"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/20 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/30 transition-all">
              Read Impact Stories
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowRight, FiAward, FiHeart, FiUsers, FiGlobe } from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import AboutSection from "../components/home/AboutSection";
import { Link } from "react-router-dom";
import * as api from "../services/api.js";

const VALUE_COLORS = ["from-rose-400 to-pink-500", "from-teal-400 to-emerald-500", "from-amber-400 to-orange-500", "from-blue-400 to-indigo-500", "from-purple-400 to-violet-500", "from-emerald-400 to-cyan-500"];
const VALUE_ICONS = { Compassion: <FiHeart />, "Community First": <FiUsers />, Accountability: <FiAward />, Inclusion: <FiGlobe /> };

const FALLBACK_VALUES = [
  { icon: <FiHeart />, title: "Compassion", desc: "We lead with empathy — every decision centers the dignity and well-being of the people we serve.", color: "from-rose-400 to-pink-500" },
  { icon: <FiUsers />, title: "Community First", desc: "Sustainable change comes from within. We build local capacity before scaling any initiative.", color: "from-teal-400 to-emerald-500" },
  { icon: <FiAward />, title: "Accountability", desc: "Every taka donated is tracked, reported, and delivered directly to the communities in need.", color: "from-amber-400 to-orange-500" },
  { icon: <FiGlobe />, title: "Inclusion", desc: "Our programs actively prioritize women, minorities, and the most marginalized in rural Bangladesh.", color: "from-blue-400 to-indigo-500" },
];

const FALLBACK_MILESTONES = [
  { year: "2013", title: "Founded", desc: "Dr. Ayesha Rahman establishes Alor Foundation in Dhaka with a vision to serve rural Bangladesh." },
  { year: "2015", title: "First 10 Schools", desc: "Launched digital learning labs in 10 government primary schools across Gaibandha district." },
  { year: "2017", title: "100th Village", desc: "Clean water and sanitation initiatives reached our 100th village in Kurigram." },
  { year: "2019", title: "Women's Program", desc: "Launched the Women's Entrepreneurship Program, graduating 200 women in the first year." },
  { year: "2021", title: "10,000 Students", desc: "10,000 children enrolled in our education programs across 5 districts." },
  { year: "2023", title: "Healthcare Expansion", desc: "Mobile health clinics now operate in 53 sub-districts, serving 300,000+ patients annually." },
  { year: "2024", title: "117 Communities", desc: "Active presence in 117 villages with integrated development programs." },
];

const FALLBACK_ACHIEVEMENTS = [
  { value: "12,300+", label: "Children Educated", icon: "🎓" },
  { value: "117", label: "Villages Reached", icon: "🏘️" },
  { value: "53", label: "Clean Water Wells", icon: "💧" },
  { value: "10+", label: "Years of Service", icon: "📅" },
  { value: "300K+", label: "Healthcare Patients", icon: "🏥" },
  { value: "2,000+", label: "Women Empowered", icon: "👩‍💼" },
];

export default function AboutPage() {
  const [values, setValues] = useState(FALLBACK_VALUES);
  const [milestones, setMilestones] = useState(FALLBACK_MILESTONES);
  const [achievements, setAchievements] = useState(FALLBACK_ACHIEVEMENTS);

  useEffect(() => {
    api.getValues().then(d => {
      if (d.data?.length > 0) setValues(d.data.map((v, i) => ({ icon: VALUE_ICONS[v.title] || <FiAward />, title: v.title, desc: v.description, color: VALUE_COLORS[i % VALUE_COLORS.length] })));
    }).catch(() => {});
    api.getMilestones().then(d => {
      if (d.data?.length > 0) setMilestones(d.data.map(m => ({ year: String(m.year), title: m.title, desc: m.description })));
    }).catch(() => {});
    api.getStats().then(d => {
      if (d.data?.length > 0) setAchievements(d.data.slice(0, 6).map(s => ({ value: s.value, label: s.label, icon: s.icon || "📊" })));
    }).catch(() => {});
  }, []);

  return (
    <PageTransition>
      {/* Page Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-950 via-emerald-950 to-slate-950 pt-24 pb-16 px-6">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "linear-gradient(rgba(20,184,166,1) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,1) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        <motion.div className="relative max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-700/40 text-emerald-400 text-xs font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white tracking-tight mb-5">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Alor Foundation</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Since 2013, we have dedicated every resource to uplifting the most underserved communities across Bangladesh — one village, one family, one life at a time.
          </p>
        </motion.div>
      </div>

      {/* About Section from Home */}
      <AboutSection />

      {/* Achievements Grid */}
      <section className="bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50 py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Impact by Numbers
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Measurable <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Change</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {achievements.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }} viewport={{ once: true }}
                className="bg-white border border-emerald-100 rounded-2xl p-5 text-center shadow-sm hover:shadow-lg hover:border-teal-200 transition-all">
                <div className="text-3xl mb-2">{a.icon}</div>
                <div className="text-2xl font-black text-emerald-700 leading-none">{a.value}</div>
                <div className="text-xs text-gray-500 font-semibold mt-1 tracking-wide leading-tight">{a.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative bg-[#050f0a] py-20 px-6 sm:px-12 lg:px-24">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(20,184,166,1) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,1) 1px,transparent 1px)",
          backgroundSize: "44px 44px",
        }} />
        <div className="relative max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-800/50 text-emerald-400 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> What Guides Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Values</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.55 }} viewport={{ once: true }}
                className="relative bg-white/5 border border-teal-900/50 rounded-2xl p-7 hover:bg-white/8 hover:border-teal-700/50 transition-all group">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center text-white text-xl mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  {v.icon}
                </div>
                <h3 className="text-white font-black text-lg mb-2 tracking-tight">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-gradient-to-br from-slate-50 via-teal-50/20 to-emerald-50 py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Our Journey
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              A Decade of <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Impact</span>
            </h2>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-400 via-emerald-400 to-transparent" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }} viewport={{ once: true }}
                  className={`relative flex gap-6 sm:gap-0 ${i % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "sm:pr-10 sm:text-right" : "sm:pl-10"} pl-14 sm:pl-0`}>
                    <div className="bg-white border border-emerald-100 rounded-2xl shadow-sm p-5 hover:shadow-lg hover:border-teal-200 transition-all">
                      <span className="inline-block bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full mb-2">{m.year}</span>
                      <h3 className="font-black text-gray-900 text-base mb-1">{m.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                  <div className="absolute left-4 sm:left-1/2 sm:-translate-x-1/2 w-5 h-5 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 border-4 border-white shadow-md top-5" />
                  <div className="hidden sm:block flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="bg-gradient-to-r from-teal-600 to-emerald-600 py-16 px-6 text-center">
        <motion.div className="max-w-3xl mx-auto" initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <p className="text-white/80 text-sm font-bold tracking-widest uppercase mb-4">Our Mission</p>
          <blockquote className="text-white text-2xl sm:text-3xl font-black leading-snug tracking-tight mb-8">
            "To create a Bangladesh where every child has access to education, every family has clean water, and every woman has the opportunity to thrive."
          </blockquote>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/projects"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-teal-700 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
              See Our Projects <FiArrowRight />
            </Link>
            <Link to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/20 border-2 border-white/40 text-white font-bold rounded-xl hover:bg-white/30 transition-all">
              Get Involved
            </Link>
          </div>
        </motion.div>
      </section>
    </PageTransition>
  );
}

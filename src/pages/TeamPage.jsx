import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import PageTransition from "../components/PageTransition";
import TeamSection from "../components/home/TeamSection";
import { Link } from "react-router-dom";
import * as api from "../services/api.js";

const ACCENT_COLORS = [
  "from-teal-400 to-emerald-500",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-pink-500",
  "from-blue-400 to-indigo-500",
  "from-purple-400 to-violet-500",
  "from-emerald-400 to-cyan-500",
];

const FALLBACK_LEADERSHIP = [
  { name: "Dr. Ayesha Rahman", role: "Founder & CEO", bio: "With a PhD in Public Health from BRAC University, Ayesha spent 10 years as a WHO consultant before founding Alor Foundation in 2013.", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop", accent: "from-teal-400 to-emerald-500" },
  { name: "Rahim Khan", role: "Field Operations Director", bio: "Rahim leads our 60-person field team across 5 divisions. His background in civil engineering and WASH has been instrumental in our clean water programs reaching 180,000+ people.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop", accent: "from-amber-400 to-orange-500" },
  { name: "Priya Chakraborty", role: "Education Program Lead", bio: "Priya's digital learning curriculum has been adopted by 200+ rural schools. She previously led e-learning initiatives at BRAC Education Programme.", photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop", accent: "from-rose-400 to-pink-500" },
];

const FALLBACK_DEPARTMENTS = [
  { name: "Field Operations", count: 42, icon: "🌾", desc: "On-ground team managing village programs, distributions, and community engagement across all divisions." },
  { name: "Healthcare", count: 18, icon: "🏥", desc: "Doctors, paramedics, and nurses running our 12 mobile health clinics and maternal care programs." },
  { name: "Education", count: 15, icon: "🎓", desc: "Curriculum designers, digital learning specialists, and teacher trainers supporting 120+ schools." },
  { name: "Tech & Data", count: 8, icon: "💻", desc: "Engineers and analysts building our impact measurement tools and digital infrastructure." },
  { name: "Communications", count: 6, icon: "📢", desc: "Storytellers, designers, and media specialists amplifying our mission to the world." },
  { name: "Finance & Admin", count: 10, icon: "📊", desc: "Ensuring every donation is tracked, audited, and reported with full transparency." },
];

const FALLBACK_VOLUNTEERS = [
  { name: "Tariq Hossain", skill: "Web Development", city: "Dhaka", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop" },
  { name: "Nusrat Jahan", skill: "Social Media", city: "Chittagong", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop" },
  { name: "Karim Molla", skill: "Field Logistics", city: "Rajshahi", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop" },
  { name: "Sadia Islam", skill: "Healthcare", city: "Sylhet", photo: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop" },
  { name: "Mehedi Hasan", skill: "Photography", city: "Dhaka", photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop" },
  { name: "Fatema Begum", skill: "Community Training", city: "Khulna", photo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&auto=format&fit=crop" },
];

export default function TeamPage() {
  const [leadership, setLeadership]   = useState(FALLBACK_LEADERSHIP);
  const [departments, setDepartments] = useState(FALLBACK_DEPARTMENTS);
  const [volunteers, setVolunteers]   = useState(FALLBACK_VOLUNTEERS);

  useEffect(() => {
    api.getLeadership().then(d => {
      if (d.data?.length > 0) {
        setLeadership(d.data.map((m, i) => ({
          name: m.name,
          role: m.role,
          bio: m.bio || m.story || "",
          photo: m.photo || "",
          accent: ACCENT_COLORS[i % ACCENT_COLORS.length],
        })));
      }
    }).catch(() => {});

    api.getDepartments().then(d => {
      if (d.data?.length > 0) {
        setDepartments(d.data.map(dep => ({
          name: dep.name,
          count: dep.member_count || dep.count || 0,
          icon: dep.icon || "🏢",
          desc: dep.description || "",
        })));
      }
    }).catch(() => {});

    api.getVolunteers().then(d => {
      if (d.data?.length > 0) {
        setVolunteers(d.data.slice(0, 6).map(v => ({
          name: v.name,
          skill: v.skill || v.role || "",
          city: v.city || v.location || "",
          photo: v.photo || "",
        })));
      }
    }).catch(() => {});
  }, []);

  return (
    <PageTransition>
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
            The People Behind the Mission
          </div>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-gray-900 tracking-tight mb-5">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Team</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
            99 full-time staff members and 200+ volunteers — united by a single belief: that every person in Bangladesh deserves a dignified life.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            {[["99", "Staff Members"], ["200+", "Active Volunteers"], ["5", "Divisions Covered"]].map(([v, l]) => (
              <div key={l} className="text-center">
                <div className="text-3xl font-black text-teal-600">{v}</div>
                <div className="text-xs text-gray-500 font-semibold tracking-wide">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Leadership */}
      <section className="bg-white py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Leadership
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Executive <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Leadership</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {leadership.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.55 }} viewport={{ once: true }}
                className="group bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden">
                <div className={`h-1.5 w-full bg-gradient-to-r ${m.accent}`} />
                <div className="relative h-64 overflow-hidden">
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className={`absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r ${m.accent} text-white`}>
                    {m.role}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-black text-gray-900 text-lg mb-2 tracking-tight">{m.name}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{m.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Team Section from Home */}
      <TeamSection />

      {/* Departments */}
      <section className="bg-white py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Our Structure
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              Teams & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Departments</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {departments.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 }} viewport={{ once: true }}
                className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-100 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="text-3xl mb-3">{d.icon}</div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-gray-900">{d.name}</h3>
                  <span className="text-2xl font-black text-teal-600">{d.count}</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Spotlight */}
      <section className="bg-[#050f0a] py-20 px-6 sm:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-emerald-900/50 border border-emerald-800/50 text-emerald-400 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Volunteer Spotlight
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Volunteers</span>
            </h2>
            <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">200+ volunteers give their time, skills, and passion to make our programs possible.</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {volunteers.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }} viewport={{ once: true }}
                className="text-center group">
                <div className="relative w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-teal-800/60 group-hover:border-teal-500 transition-all shadow-lg">
                  <img src={v.photo} alt={v.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <p className="text-white font-bold text-xs">{v.name}</p>
                <p className="text-teal-400 text-xs font-semibold">{v.skill}</p>
                <p className="text-gray-600 text-xs">{v.city}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className="max-w-2xl mx-auto text-center bg-white/5 border border-teal-900/50 rounded-2xl p-8 sm:p-10"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Join Our Team</h3>
            <p className="text-gray-400 text-sm mb-7">We're always looking for passionate individuals — whether you have 2 hours a week or are ready for a full-time role.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact"
                className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-teal-900/50 btn-shimmer">
                Volunteer with Us <FiArrowRight />
              </Link>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border-2 border-teal-800 text-teal-400 font-bold rounded-xl hover:bg-teal-900/20 transition-all">
                View Open Positions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

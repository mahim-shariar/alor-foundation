import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as api from "../../services/api.js";

const FALLBACK_MEMBERS = [
  { id: 1, name: "Dr. Ayesha Rahman", role: "Founder & CEO", story: "Former public health specialist turned social entrepreneur with 15+ years in rural development across Bangladesh.", photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop" },
  { id: 2, name: "Rahim Khan", role: "Field Operations Director", story: "Led water sanitation projects reaching 50,000+ people across 117 villages in northern Bangladesh.", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop" },
  { id: 3, name: "Priya Chakraborty", role: "Education Program Lead", story: "Developed digital learning programs adopted by 200+ rural schools, educating over 12,000 children.", photo: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&auto=format&fit=crop" },
  { id: 4, name: "Jamal Hossain", role: "Tech & Innovation Lead", story: "Software engineer building open-source solutions bridging digital access gaps in rural healthcare.", photo: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=600&auto=format&fit=crop" },
];

const cardV    = { rest: {}, hover: {} };
const photoV   = {
  rest:  { scale: 1,    transition: { duration: 0.6, ease: "easeOut" } },
  hover: { scale: 1.07, transition: { duration: 0.6, ease: "easeOut" } },
};
const overlayV = {
  rest:  { opacity: 0.55, transition: { duration: 0.4 } },
  hover: { opacity: 0.75, transition: { duration: 0.4 } },
};
const panelV   = {
  rest:  { height: "5.5rem",  transition: { type: "spring", stiffness: 220, damping: 30 } },
  hover: { height: "13.5rem", transition: { type: "spring", stiffness: 220, damping: 30 } },
};
const bioV     = {
  rest:  { opacity: 0, y: 10, transition: { duration: 0.15 } },
  hover: { opacity: 1, y: 0,  transition: { delay: 0.14, duration: 0.28 } },
};
const socialV  = {
  rest:  { opacity: 0, y: 6, transition: { duration: 0.12 } },
  hover: { opacity: 1, y: 0, transition: { delay: 0.22, duration: 0.28 } },
};
const arrowV   = {
  rest:  { x: 0,   transition: { duration: 0.2 } },
  hover: { x: 3,   transition: { duration: 0.2 } },
};

const orbs = [
  { w: 380, top: "10%",  left: "2%",  dx: 28,  dy: 14,  dur: 22 },
  { w: 260, top: "60%",  left: "6%",  dx: -20, dy: 25,  dur: 17 },
  { w: 300, top: "8%",   left: "70%", dx: 18,  dy: -20, dur: 20 },
  { w: 200, top: "70%",  left: "75%", dx: -16, dy: 22,  dur: 15 },
];

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState(FALLBACK_MEMBERS);

  useEffect(() => {
    api.getLeadership().then(d => {
      if (d.data?.length > 0) setTeamMembers(d.data.slice(0, 4).map(m => ({ id: m._id, name: m.name, role: m.role, story: m.bio, photo: m.photo })));
    }).catch(() => {});
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#050f0a] py-28 px-6 sm:px-12 lg:px-20 xl:px-28">

      {/* Ambient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {orbs.map((o, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ width: o.w, height: o.w, top: o.top, left: o.left,
              background: "radial-gradient(circle,rgba(16,185,129,0.09),transparent 65%)", filter: "blur(60px)" }}
            animate={{ x: [0, o.dx], y: [0, o.dy], opacity: [0.45, 0.85, 0.45] }}
            transition={{ duration: o.dur, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }} />
        ))}
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(rgba(20,184,166,1) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,1) 1px,transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }} viewport={{ once: true }}>
          <div>
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full bg-emerald-900/50 text-emerald-400 text-xs font-bold tracking-widest uppercase border border-emerald-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ◈ 05 — OUR TEAM
            </div>
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white leading-[1.08]">
              The People Behind<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Every Change</span>
            </h2>
          </div>
          <p className="text-gray-500 text-sm sm:text-base max-w-xs sm:max-w-sm leading-relaxed sm:text-right">
            Passionate individuals driving sustainable development across Bangladesh through innovation and dedication.
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {teamMembers.map((m, i) => (
            <motion.div key={m.id}
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, margin: "-40px" }}>

              {/* Card — variant propagation root */}
              <motion.div
                className="relative cursor-pointer select-none"
                initial="rest" whileHover="hover" animate="rest"
                variants={cardV}>

                {/* Ghost index number */}
                <span className="absolute top-3 right-4 text-[88px] font-black leading-none text-white/[0.04] select-none pointer-events-none z-10 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Photo + glass panel container */}
                <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "3/4" }}>

                  {/* Photo */}
                  <motion.img src={m.photo} alt={m.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    variants={photoV} />

                  {/* Dark gradient overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"
                    variants={overlayV} />

                  {/* Teal accent line at top */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-teal-500 to-emerald-400 opacity-0 group-hover:opacity-100 z-20" />

                  {/* Glass bottom panel */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 bg-black/60 backdrop-blur-xl border-t border-white/[0.08] px-4 py-4 overflow-hidden z-20"
                    variants={panelV}>

                    {/* Always visible: name + role + arrow */}
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white font-black text-sm tracking-tight leading-tight">{m.name}</p>
                        <p className="text-teal-400 text-[11px] font-semibold mt-0.5">{m.role}</p>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center flex-shrink-0 ml-2">
                        <motion.div variants={arrowV}>
                          <FiArrowRight className="text-teal-400 text-xs" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Bio — revealed on hover */}
                    <motion.p className="text-gray-400 text-[11px] leading-relaxed mt-4" variants={bioV}>
                      {m.story}
                    </motion.p>

                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          className="mt-20 border-t border-teal-950/60 pt-14 flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15 }} viewport={{ once: true }}>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Ready to make a difference?
            </h3>
            <p className="text-gray-600 text-sm mt-2 max-w-md">
              Join our team of passionate volunteers and contribute your skills to meaningful, lasting change.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link to="/contact">
              <motion.div
                className="relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl text-white text-sm font-bold shadow-lg shadow-teal-900/40 cursor-pointer"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <span>✋</span> Join as Volunteer
                <FiArrowRight className="text-xs" />
              </motion.div>
            </Link>
            <Link to="/team">
              <motion.div
                className="inline-flex items-center gap-2 px-6 py-3 border border-teal-900/60 bg-teal-950/30 rounded-xl text-teal-400 text-sm font-bold hover:bg-teal-950/50 hover:border-teal-800/60 transition-colors"
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                Meet Full Team
                <FiArrowRight className="text-xs" />
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

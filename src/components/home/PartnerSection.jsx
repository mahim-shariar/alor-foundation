import { motion } from "framer-motion";
import { useMemo, useState, useEffect } from "react";
import { FiArrowRight, FiHeart, FiUserPlus, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import * as api from "../../services/api.js";

const FALLBACK_LOGOS = [
  { id: 1, name: "UNICEF", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Logo_of_UNICEF.svg/250px-Logo_of_UNICEF.svg.png" },
  { id: 2, name: "BRAC", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/BRAC_logo.svg/250px-BRAC_logo.svg.png" },
  { id: 3, name: "World Vision", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/World_Vision_logo_2017.svg/250px-World_Vision_logo_2017.svg.png" },
  { id: 4, name: "Save the Children", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Save_the_Children_Logo.svg/250px-Save_the_Children_Logo.svg.png" },
  { id: 5, name: "Oxfam", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/35/Oxfam_logo_vertical.svg/150px-Oxfam_logo_vertical.svg.png" },
  { id: 6, name: "Plan International", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Plan_International_Logo.svg/250px-Plan_International_Logo.svg.png" },
];

const ctaItems = [
  { to: "/contact", icon: <FiUserPlus />, label: "Volunteer With Us", style: "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/25" },
  { to: "/contact", icon: <FiHeart className="text-pink-400" />, label: "Make a Donation", style: "bg-white border-2 border-teal-500 text-teal-700 hover:bg-teal-50" },
  { to: "/contact", icon: <FiMail className="text-emerald-500" />, label: "Contact Our Team", style: "bg-white border-2 border-emerald-400 text-emerald-700 hover:bg-emerald-50" },
];

const PartnerSection = () => {
  const [partnerLogos, setPartnerLogos] = useState(FALLBACK_LOGOS);

  useEffect(() => {
    api.getPartners().then(d => {
      if (d.data?.length > 0) setPartnerLogos(d.data.map(p => ({ id: p._id, name: p.name, logo: p.logo_url })));
    }).catch(() => {});
  }, []);

  const blobs = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => {
      const colors = [["#5eead4","#0d9488"],["#f59e0b","#f97316"],["#f472b6","#db2777"],["#60a5fa","#3b82f6"]];
      const c = colors[i % colors.length];
      return { id: i, color: c, w: Math.random() * 110 + 80, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, dx: (Math.random()-0.5)*60, dy: (Math.random()-0.5)*60, dur: Math.random()*18+12 };
    }), []);

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50/30 to-emerald-50 py-28 px-4 sm:px-12">

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.25]" style={{
        backgroundImage: "radial-gradient(circle,#14b8a6 1px,transparent 1px)",
        backgroundSize: "28px 28px",
      }} />

      <div className="absolute inset-0 pointer-events-none z-0">
        {blobs.map((b) => (
          <motion.div key={b.id} className="absolute rounded-full opacity-[0.08]"
            style={{ background: `linear-gradient(45deg,${b.color[0]},${b.color[1]})`, width: b.w, height: b.w, top: b.top, left: b.left, filter: "blur(32px)" }}
            animate={{ x: [0, b.dx], y: [0, b.dy] }}
            transition={{ duration: b.dur, repeat: Infinity, repeatType: "reverse" }} />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-20">

        {/* Partners */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />◈ 08 — PARTNERS
            </div>
            <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Trusted by Our Partners</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">Organizations that power our mission for change.</p>
          </div>

          {/* Marquee — uses CSS class from index.css */}
          <div className="overflow-hidden w-full relative">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
              style={{ background: "linear-gradient(to right,rgb(248,250,251),transparent)" }} />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
              style={{ background: "linear-gradient(to left,rgb(248,250,251),transparent)" }} />
            <div className="marquee-track">
              {[...partnerLogos, ...partnerLogos].map((logo, i) => (
                <div key={`${logo.id}-${i}`} className="mx-6 flex items-center justify-center flex-shrink-0 w-44 h-24">
                  <div className="bg-white/80 backdrop-blur border border-teal-100 rounded-xl shadow-sm flex items-center justify-center h-16 px-6 hover:shadow-lg hover:border-teal-300 transition-all duration-300">
                    <img src={logo.logo} alt={logo.name}
                      className="h-10 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                      title={logo.name} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-8"
          initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }} viewport={{ once: true }}>
          <div>
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black tracking-tight mb-3">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
                Ready to Make a Difference?
              </span>
            </h2>
            <p className="text-gray-500 text-lg">
              Whether you want to volunteer, donate, or collaborate — your step changes lives.
            </p>
          </div>

          <div className="w-full bg-white/80 border border-emerald-100 rounded-2xl shadow-xl p-8 sm:p-10 backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {ctaItems.map((cta, i) => (
                <Link key={i} to={cta.to}>
                <motion.div
                  className={`relative overflow-hidden flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all btn-shimmer cursor-pointer ${cta.style}`}
                  whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                  {cta.icon}
                  {cta.label}
                  <FiArrowRight className="ml-0.5 text-xs" />
                </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnerSection;

import { motion } from "framer-motion";

const TEXT = "ALOR FOUNDATION";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#020b07] flex flex-col items-center justify-center select-none"
      exit={{
        y: "-100%",
        transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] },
      }}>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(20,184,166,1) 1px,transparent 1px),linear-gradient(90deg,rgba(20,184,166,1) 1px,transparent 1px)",
        backgroundSize: "44px 44px",
      }} />

      {/* Radial glow bloom behind logo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="w-[480px] h-[480px] rounded-full"
          style={{ background: "radial-gradient(circle,rgba(20,184,166,0.09) 0%,transparent 65%)", filter: "blur(48px)" }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      {/* Content stack */}
      <div className="relative z-10 flex flex-col items-center gap-8">

        {/* ── Logo + SVG ring ── */}
        <div className="relative w-[108px] h-[108px] flex items-center justify-center">

          {/* Outer faint track */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full"
            style={{ transform: "rotate(-90deg)" }}>
            <circle cx="50" cy="50" r="46"
              fill="none" stroke="rgba(20,184,166,0.07)" strokeWidth="1.5" />
          </svg>

          {/* Animated fill ring */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full"
            style={{ transform: "rotate(-90deg)" }}>
            <defs>
              <linearGradient id="ring-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%"   stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="50" cy="50" r="46"
              fill="none"
              stroke="url(#ring-grad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2.2, ease: [0.4, 0, 0.2, 1] },
                opacity:    { duration: 0.5 },
              }} />
          </svg>

          {/* Dot that travels along the ring edge */}
          <motion.div
            className="absolute w-2 h-2 rounded-full bg-teal-400 shadow-lg shadow-teal-400/60"
            style={{ top: "2px", left: "50%", translateX: "-50%" }}
            initial={{ rotate: 0, opacity: 0 }}
            animate={{ rotate: 360, opacity: [0, 1, 1, 0] }}
            transition={{ rotate: { duration: 2.2, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 2.2, times: [0, 0.05, 0.9, 1] } }}
            transformTemplate={({ rotate }) => `translateX(-50%) rotate(${rotate})`} />

          {/* Logo box */}
          <motion.div
            className="relative w-[62px] h-[62px] rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-teal-900/50 overflow-hidden"
            initial={{ scale: 0.55, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 14, delay: 0.1 }}>
            {/* Shimmer sweep inside logo */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
              initial={{ x: "-120%" }}
              animate={{ x: "220%" }}
              transition={{ delay: 0.5, duration: 0.7, ease: "easeInOut" }} />
            <span className="relative text-white font-black text-2xl tracking-tighter">A</span>
          </motion.div>
        </div>

        {/* ── Brand name ── letter-by-letter */}
        <div className="flex items-center overflow-hidden" aria-label="Alor Foundation">
          {TEXT.split("").map((char, i) =>
            char === " " ? (
              <span key={i} style={{ display: "inline-block", width: "0.55em" }} />
            ) : (
              <motion.span
                key={i}
                style={{ display: "inline-block", letterSpacing: "0.22em" }}
                className="text-[11px] font-black text-white/88"
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: 0.38 + i * 0.042,
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}>
                {char}
              </motion.span>
            )
          )}
        </div>

        {/* ── Tagline ── */}
        <motion.p
          className="text-[9.5px] font-semibold tracking-[0.28em] text-teal-500/45 uppercase"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.55, ease: "easeOut" }}>
          Empowering Lives · Since 2013
        </motion.p>

        {/* ── Animated dots ── */}
        <motion.div
          className="flex items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}>
          {[0, 1, 2].map((i) => (
            <motion.span key={i}
              className="w-1 h-1 rounded-full bg-teal-600"
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }} />
          ))}
        </motion.div>
      </div>

      {/* ── Bottom progress bar ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal-950/60">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-600 via-emerald-400 to-teal-500 relative overflow-hidden"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2.3, ease: [0.4, 0, 0.2, 1] }}>
          {/* Shimmer sweep along bar */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent"
            animate={{ x: ["-100%", "250%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4 }} />
        </motion.div>
      </div>

      {/* Version label */}
      <motion.span
        className="absolute bottom-4 right-5 text-[9px] font-semibold text-gray-800 tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}>
        v1.0
      </motion.span>
    </motion.div>
  );
}

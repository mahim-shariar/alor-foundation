import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";

export default function NotFoundPage() {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500 mb-4">
            404
          </div>
          <h1 className="text-2xl font-black text-gray-800 mb-3">Page not found</h1>
          <p className="text-gray-500 mb-8 max-w-sm">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/25 hover:scale-105 transition-transform">
            ← Back to Home
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
}

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiYoutube,
  FiFilter,
  FiX,
  FiPlay,
  FiZoomIn,
  FiArrowRight,
} from "react-icons/fi";

const GallerySection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState(null);

  const mediaItems = [
    {
      id: 1,
      type: "image",
      title: "Rural School Opening",
      category: "Education",
      url: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800&auto=format&fit=crop",
      youtubeId: null,
    },
    {
      id: 2,
      type: "video",
      title: "Mobile Health Clinic",
      category: "Medical",
      url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
      youtubeId: "9No-FiEInLA",
    },
    {
      id: 3,
      type: "image",
      title: "Women's Workshop",
      category: "Events",
      url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
      youtubeId: null,
    },
    {
      id: 4,
      type: "video",
      title: "Clean Water Project",
      category: "Events",
      url: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop",
      youtubeId: "7wtfhZwyrcc",
    },
    {
      id: 5,
      type: "image",
      title: "Teacher Training",
      category: "Education",
      url: "https://images.unsplash.com/photo-1524179091875-b49498615b6a?w=800&auto=format&fit=crop",
      youtubeId: null,
    },
    {
      id: 6,
      type: "image",
      title: "Vaccination Drive",
      category: "Medical",
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop",
      youtubeId: null,
    },
  ];

  const filteredItems =
    activeFilter === "All"
      ? mediaItems
      : mediaItems.filter((item) => item.category === activeFilter);

  const categories = [
    "All",
    ...new Set(mediaItems.map((item) => item.category)),
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 py-24 px-6 sm:px-12 lg:px-24">
      {/* Futuristic background grid pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Floating orbs */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full bg-gradient-to-br from-teal-400/10 to-emerald-500/10 backdrop-blur-sm"
            style={{
              width: `${Math.random() * 200 + 120}px`,
              height: `${Math.random() * 200 + 120}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(40px)",
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 16 + 8,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Headline */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">
              A Glimpse Into
            </span>{" "}
            <span className="text-white">Our Work</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Explore our impact through immersive visuals and stories from the
            field.
          </p>
        </motion.div>

        {/* Filter Controls */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                activeFilter === category
                  ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === category ? <FiFilter /> : null}
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <motion.div
              key={item.id}
              className="relative group overflow-hidden rounded-xl bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
            >
              {/* Media thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {item.type === "video" ? (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center shadow-xl">
                      <FiPlay className="text-white text-xl ml-1" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-xl">
                      <FiZoomIn className="text-white text-xl" />
                    </div>
                  )}
                </div>
              </div>

              {/* Media info */}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.category === "Education"
                        ? "bg-teal-500/20 text-teal-400"
                        : item.category === "Medical"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-sky-500/20 text-sky-400"
                    }`}
                  >
                    {item.category}
                  </span>
                  {item.type === "video" && (
                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                      <FiYoutube /> Video
                    </span>
                  )}
                </div>
                <h3 className="text-white font-medium">{item.title}</h3>
              </div>

              {/* Click handler */}
              <button
                className="absolute inset-0 w-full h-full"
                onClick={() => setSelectedMedia(item)}
              />
            </motion.div>
          ))}
        </div>

        {/* View More */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-white/10 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center justify-center">
              View More Media
              <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-teal-500/30 to-emerald-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Media Modal */}
      {selectedMedia && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white text-2xl"
            onClick={() => setSelectedMedia(null)}
          >
            <FiX />
          </button>

          <div className="relative w-full max-w-4xl">
            {selectedMedia.type === "video" ? (
              <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedMedia.youtubeId}?autoplay=1`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  className="w-full max-h-[80vh] object-contain rounded-xl"
                />
              </div>
            )}

            <div className="mt-4 text-white">
              <h3 className="text-xl font-bold">{selectedMedia.title}</h3>
              <p className="text-gray-300">
                {selectedMedia.category} Initiative
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default GallerySection;

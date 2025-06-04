import { motion } from "framer-motion";
import { FiArrowRight, FiClock, FiCalendar } from "react-icons/fi";

const NewsSection = () => {
  const blogPosts = [
    // ...same as before...
    {
      id: 1,
      title: "Digital Education Reaches 100 Rural Schools",
      excerpt:
        "How our tech initiative is bridging the urban-rural education gap with innovative learning solutions.",
      date: "2023-11-15",
      readTime: "4 min",
      category: "Education",
      thumbnail:
        "https://images.unsplash.com/photo-1584697964358-3e14ca57658b?w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Annual Health Camp Serves 5,000 Patients",
      excerpt:
        "Recap of our largest medical initiative yet, providing free healthcare to underserved communities.",
      date: "2023-10-28",
      readTime: "6 min",
      category: "Health",
      thumbnail:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Women's Entrepreneurship Program Graduation",
      excerpt:
        "Celebrating the first cohort of 50 women who completed our business training program.",
      date: "2023-10-12",
      readTime: "5 min",
      category: "Empowerment",
      thumbnail:
        "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=800&auto=format&fit=crop",
    },
    {
      id: 4,
      title: "Clean Water Project: Phase 2 Completed",
      excerpt:
        "Expanding access to safe drinking water in the northern regions of Bangladesh.",
      date: "2023-09-30",
      readTime: "7 min",
      category: "Sustainability",
      thumbnail:
        "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&auto=format&fit=crop",
    },
    {
      id: 5,
      title: "Volunteer Spotlight: Meet Our Field Team",
      excerpt:
        "Behind-the-scenes look at the dedicated individuals making our work possible.",
      date: "2023-09-18",
      readTime: "8 min",
      category: "Team",
      thumbnail:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop",
    },
    {
      id: 6,
      title: "Sustainable Farming Training Results",
      excerpt:
        "How our agricultural program increased crop yields by 40% for participating farmers.",
      date: "2023-09-05",
      readTime: "5 min",
      category: "Agriculture",
      thumbnail:
        "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 py-24 px-6 sm:px-12 lg:px-24">
      {/* Floating color particles (TeamSection style) */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute rounded-full opacity-10"
            style={{
              background: `linear-gradient(45deg, 
                ${
                  i % 4 === 0
                    ? "#5eead4"
                    : i % 4 === 1
                    ? "#f59e0b"
                    : i % 4 === 2
                    ? "#f472b6"
                    : "#60a5fa"
                }, 
                ${
                  i % 4 === 0
                    ? "#0d9488"
                    : i % 4 === 1
                    ? "#f97316"
                    : i % 4 === 2
                    ? "#db2777"
                    : "#3b82f6"
                })`,
              width: `${Math.random() * 180 + 60}px`,
              height: `${Math.random() * 180 + 60}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(44px)",
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 80],
              y: [0, (Math.random() - 0.5) * 80],
              opacity: [0.08, 0.18, 0.08],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">
              News, Updates
            </span>{" "}
            <span className="text-gray-900">& Insights</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay informed about our latest initiatives, success stories, and
            field reports.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              {/* Hover effect background */}
              <div className="absolute -inset-2 rounded-xl bg-gradient-to-br from-teal-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none" />

              <div className="relative h-full bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* Thumbnail */}
                <motion.div className="relative aspect-video overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow">
                      {post.category}
                    </span>
                  </div>
                </motion.div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <FiCalendar className="text-teal-500" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <FiClock className="text-teal-500" />
                      {post.readTime} read
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-5">{post.excerpt}</p>

                  <motion.a
                    href="#"
                    className="inline-flex items-center text-sm font-medium text-teal-600 group-hover:text-emerald-700 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    Read full story
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </motion.a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination/Load More */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Pagination */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            {[1, 2, 3].map((page) => (
              <motion.button
                key={page}
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  page === 1
                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
                whileHover={{ scale: page === 1 ? 1 : 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {page}
              </motion.button>
            ))}
            <span className="text-gray-500 mx-1">...</span>
            <motion.button
              className="w-10 h-10 rounded-lg flex items-center justify-center bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              5
            </motion.button>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="#blog"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-3 text-xl">📰</span>
                Visit Blog
                <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
              </span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
              />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

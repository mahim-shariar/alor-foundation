import { motion } from "framer-motion";
import { FiArrowRight, FiLinkedin, FiTwitter, FiGithub } from "react-icons/fi";

const TeamSection = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Ayesha Rahman",
      role: "Founder & CEO",
      quote: "Empowering communities through sustainable change.",
      story:
        "Former public health specialist turned social entrepreneur with 15+ years experience in rural development.",
      photo:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop",
      color: "from-teal-400 to-emerald-500",
    },
    {
      id: 2,
      name: "Rahim Khan",
      role: "Field Operations Director",
      quote: "Every village deserves access to clean water.",
      story:
        "Led water sanitation projects reaching 50,000+ people across Bangladesh.",
      photo:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
      color: "from-amber-400 to-orange-500",
    },
    {
      id: 3,
      name: "Priya Chakraborty",
      role: "Education Program Lead",
      quote: "Education is the most powerful equalizer.",
      story:
        "Developed digital learning programs adopted by 200+ rural schools.",
      photo:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop",
      color: "from-rose-400 to-pink-500",
    },
    {
      id: 4,
      name: "Jamal Hossain",
      role: "Tech Volunteer",
      quote: "Using tech to bridge the urban-rural divide.",
      story:
        "Software engineer building solutions for rural healthcare access.",
      photo:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=500&auto=format&fit=crop",
      color: "from-blue-400 to-indigo-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 py-24 px-6 sm:px-12 lg:px-24">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
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
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: "blur(40px)",
            }}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.2, 0.1],
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
              Meet Our Team
            </span>{" "}
            <span className="text-gray-900">& Volunteers</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The passionate individuals driving change across Bangladesh through
            innovation and dedication.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative group"
            >
              {/* Halo effect */}
              <div
                className={`absolute -inset-2 rounded-2xl bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-500 pointer-events-none`}
              />

              <div className="relative h-full bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                {/* 3D Card Effect */}
                <motion.div
                  className="h-full flex flex-col"
                  whileHover={{
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Photo with parallax effect */}
                  <motion.div
                    className="relative h-64 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent z-10" />
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Role badge */}
                    <div className="absolute bottom-4 left-4 z-20">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${member.color} text-white`}
                      >
                        {member.role}
                      </span>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>

                    {/* Quote with animated underline */}
                    <div className="relative mb-4">
                      <p className="text-gray-600 italic">"{member.quote}"</p>
                      <motion.div
                        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${member.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </div>

                    {/* Story (hidden until hover) */}
                    <motion.div
                      className="overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      whileHover={{ height: "auto", opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm text-gray-500 mb-4">
                        {member.story}
                      </p>
                    </motion.div>

                    {/* Social links */}
                    <div className="flex gap-3 mt-auto pt-4">
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                        whileHover={{ y: -2 }}
                      >
                        <FiLinkedin />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-sky-400 transition-colors"
                        whileHover={{ y: -2 }}
                      >
                        <FiTwitter />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="text-gray-400 hover:text-gray-700 transition-colors"
                        whileHover={{ y: -2 }}
                      >
                        <FiGithub />
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Volunteer CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto relative">
            {/* Floating elements around CTA */}
            <motion.div
              className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-teal-400/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            />
            <motion.div
              className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-emerald-400/20"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                delay: 1,
              }}
            />

            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to make a difference?
            </h3>
            <p className="text-gray-600 mb-8">
              Join our team of passionate volunteers and contribute your skills
              to meaningful projects.
            </p>

            <motion.div
              className="flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#volunteer"
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all group relative overflow-hidden flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  <span className="mr-3 text-xl">✋</span>
                  Join as Volunteer
                  <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                />
              </motion.a>

              <motion.a
                href="#open-positions"
                className="px-8 py-4 bg-white/90 backdrop-blur-sm border-2 border-emerald-500 text-emerald-600 font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(5, 150, 105, 0.1)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                View Open Positions
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;

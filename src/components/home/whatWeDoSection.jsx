import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const WhatWeDoSection = () => {
  const initiatives = [
    {
      icon: "🎓",
      title: "Education Initiatives",
      description:
        "Bringing classroom experiences to rural children through digital learning hubs and teacher training programs.",
      color: "from-teal-400 to-emerald-500",
      delay: 0.1,
    },
    {
      icon: "🏥",
      title: "Health Services",
      description:
        "Mobile clinics, awareness programs & maternal care reaching remote communities with essential healthcare.",
      color: "from-amber-400 to-orange-500",
      delay: 0.2,
    },
    {
      icon: "🌱",
      title: "Sustainability Projects",
      description:
        "Green farming techniques and clean water campaigns for environmentally conscious development.",
      color: "from-emerald-400 to-teal-500",
      delay: 0.3,
    },
    {
      icon: "👩‍💼",
      title: "Women Empowerment",
      description:
        "Skill training and entrepreneurship programs creating economic opportunities for women.",
      color: "from-teal-500 to-emerald-600",
      delay: 0.4,
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-50 to-emerald-50 py-24 px-6 sm:px-12 lg:px-24">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating bubbles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full opacity-10"
            style={{
              background: `linear-gradient(45deg, 
                ${
                  i % 3 === 0 ? "#5eead4" : i % 3 === 1 ? "#f59e0b" : "#34d399"
                }, 
                ${
                  i % 3 === 0 ? "#0d9488" : i % 3 === 1 ? "#f97316" : "#059669"
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
              Our Work,
            </span>{" "}
            <span className="text-gray-900">Your Impact.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how we're transforming communities through innovative
            programs and your generous support.
          </p>
        </motion.div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {initiatives.map((initiative, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: initiative.delay, duration: 0.6 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              {/* Floating card effect */}
              <div
                className="absolute -inset-2 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `linear-gradient(45deg, 
                       ${initiative.color.split(" ")[0].replace("from-", "")}, 
                       ${initiative.color.split(" ")[1].replace("to-", "")})`,
                }}
              />

              <div className="relative h-full bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                {/* Icon with gradient background */}
                <div
                  className={`absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br ${initiative.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                />

                <div className="p-6 h-full flex flex-col">
                  <div className="mb-6">
                    <div
                      className={`text-4xl mb-2 w-16 h-16 rounded-xl bg-gradient-to-br ${initiative.color} flex items-center justify-center shadow-md`}
                    >
                      {initiative.icon}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600 mb-6 flex-grow">
                    {initiative.description}
                  </p>

                  <motion.a
                    href="#"
                    className="inline-flex items-center text-sm font-medium self-start"
                    whileHover={{ x: 5 }}
                  >
                    <span
                      className={`bg-gradient-to-r ${initiative.color} bg-clip-text text-transparent`}
                    >
                      Learn more
                    </span>
                    <FiArrowRight
                      className={`ml-1 text-${initiative.color
                        .split(" ")[0]
                        .replace("to-", "")}`}
                    />
                  </motion.a>
                </div>

                {/* Hover effect border */}
                <div
                  className={`absolute inset-0 rounded-xl pointer-events-none border-2 border-transparent group-hover:border-${initiative.color
                    .split(" ")[0]
                    .replace("to-", "")}/30 transition-all duration-300`}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.a
            href="#projects"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl text-white font-medium shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center">
              <span className="mr-2 text-xl">🔎</span>
              Explore All Projects
              <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;

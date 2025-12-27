"use client";
import { ArrowDown, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToCollection = () => {
    const el = document.getElementById("collection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative w-full h-[100vh] flex items-center justify-center px-6 pt-24 overflow-hidden"
    >
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 bg-cover bg-center brightness-[1.15]"
        style={{ backgroundImage: "url('/heroImage.jpeg')" }}
      />

      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8e5]/50 to-[#f3dfb3]/60" />

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-28 left-12 w-2 h-2 bg-yellow-500 rounded-full"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute bottom-40 right-14 w-1.5 h-1.5 bg-yellow-400 rounded-full"
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center gap-3 text-yellow-600 mb-4"
        >
          <Sparkles className="w-5 h-5" />
          <span className="tracking-wide font-medium">
            Handcrafted Excellence Since Day One
          </span>
          <Sparkles className="w-5 h-5" />
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
          className="space-y-2 font-serif leading-tight"
        >
          <motion.div variants={textVariants} className="text-5xl md:text-7xl font-bold text-[#3b2d0d]">
            Tradition.
          </motion.div>

          <motion.div
            variants={textVariants}
            className="
              text-5xl md:text-7xl font-bold
              bg-gradient-to-r from-[#d9a94b] via-[#f6d98a] to-[#d9a94b]
              bg-clip-text text-transparent
            "
          >
            Trust.
          </motion.div>

          <motion.div variants={textVariants} className="text-5xl md:text-7xl font-bold text-[#3b2d0d]">
            Timeless Beauty.
          </motion.div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-6 text-lg md:text-2xl text-[#4c3a19] max-w-2xl mx-auto leading-relaxed"
        >
          Discover exquisite jewelry crafted with love in the heart of Pali,
          Korba. Where tradition meets modern elegance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <button
            onClick={scrollToCollection}
            className="
              px-8 py-4 rounded-full bg-[#f4c56a]
              font-semibold text-black 
              shadow-lg hover:bg-[#f7d48a] 
              hover:shadow-2xl hover:scale-105 transition-all 
              flex items-center gap-2
            "
          >
            View Our Collection
            <ArrowDown className="w-5 h-5" />
          </button>

          <button
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="
              px-8 py-4 rounded-full border-2 border-[#d2a24a]
              text-[#7b5918] bg-white/60 hover:bg-white/90
              transition-all font-medium
            "
          >
            Our Story
          </button>
        </motion.div>
      </div>
    </section>
  );
}

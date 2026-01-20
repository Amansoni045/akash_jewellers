"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import TryOnModal from "./TryOnModal";
import { useState } from "react";

export default function TryOnSection() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="tryon"
      className="relative py-28 bg-gradient-to-b from-[#fff8ec] via-white to-[#fff8ec] overflow-hidden"
    >
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-yellow-300/20 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/20 blur-[160px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 mb-4 text-yellow-600 font-semibold">
            <Sparkles size={18} />
            Virtual Jewellery Try-On
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            See Jewellery on You
          </h2>

          <p className="text-gray-600 text-lg mb-10">
            A next-generation virtual try-on experience that lets you preview
            earrings, necklaces and more on your own face — powered by AI.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(true)}
            className="px-10 py-4 rounded-full bg-yellow-500 text-black font-bold text-lg shadow-xl hover:bg-yellow-600 transition-all"
          >
            Try On (Coming Soon)
          </motion.button>
        </motion.div>
      </div>

      <TryOnModal open={open} onClose={() => setOpen(false)} />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingWhatsApp() {
  const phoneNumber = "917770889004";
  const message = "Hello I would like to enquire about a jewellery item.";
  const link = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-[#25D366] rounded-full blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"></div>

        <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-xl border-2 border-white/40 cursor-pointer transform group-hover:scale-110 transition-transform duration-300">
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white fill-white" />
        </div>

        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap bg-white px-3 py-1 rounded-lg shadow-md text-sm font-medium text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none hidden md:block">
          Chat on WhatsApp
        </div>
      </div>
    </motion.a>
  );
}

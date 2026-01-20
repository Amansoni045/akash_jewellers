"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

export default function TryOnModal({ open, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-md flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="bg-white rounded-3xl p-10 max-w-md w-full relative text-center shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="text-yellow-600" />
            </div>

            <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-3">
              Virtual Try-On Coming Soon
            </h3>

            <p className="text-gray-600 mb-6">
              We’re building an advanced AI-powered try-on experience, tailored for jewellery.
            </p>

            <p className="text-sm text-gray-400">
              Camera access • Face tracking • Real-time preview
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

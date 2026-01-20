"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import Image from "next/image";

export default function TryOnModal({ open, onClose }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <X />
          </button>

          <div className="p-6 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
            </div>

            <h2 className="text-2xl font-playfair font-bold mb-2">
              Virtual Jewellery Try-On
            </h2>

            <p className="text-gray-600 text-sm mb-6">
              Experience how jewellery looks on you using camera-based AR.
            </p>

            <div className="relative rounded-2xl overflow-hidden border border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100 p-12">
              <div className="flex flex-col items-center justify-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-16 h-16 text-yellow-600" />
                </motion.div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-gray-600 text-sm">
                    We're working on bringing you an amazing AR try-on experience
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              This feature is under active development.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

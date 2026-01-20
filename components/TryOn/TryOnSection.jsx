"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Camera, Zap, Gem } from "lucide-react";
import Image from "next/image";
import TryOnModal from "./TryOnModal";

export default function TryOnSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section
        id="tryon"
        className="relative py-24 bg-gradient-to-b from-[#fff9ec] via-white to-[#fffbf0] overflow-hidden"
      >
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-200/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-300/15 blur-[140px] rounded-full" />

        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-20 text-yellow-400/40"
        >
          <Sparkles size={24} />
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [360, 180, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-16 text-yellow-500/30"
        >
          <Sparkles size={32} />
        </motion.div>

        <div className="container mx-auto px-6 text-center max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 mb-4 px-4 py-2 text-xs font-semibold tracking-wide text-yellow-700 bg-gradient-to-r from-yellow-100 to-yellow-50 rounded-full border border-yellow-200/50 shadow-sm">
              <Sparkles size={14} className="animate-pulse" />
              Coming Soon
            </span>

            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
              Virtual Jewellery Try-On
            </h2>

            <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-16">
              Experience jewellery like never before with AI-powered augmented reality.
              See how pieces look on you before making a purchase.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-sm">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-8 -left-8 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-xl flex items-center justify-center z-10"
                >
                  <Gem className="text-white" size={32} />
                </motion.div>

                <motion.div
                  animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-xl shadow-lg flex items-center justify-center z-10"
                >
                  <Sparkles className="text-white" size={24} />
                </motion.div>

                <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-black rounded-[2.5rem] overflow-hidden">
                    <div className="h-6 bg-black relative">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl" />
                    </div>


                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 aspect-[9/16] flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center p-6">
                        <div className="relative w-full h-full">
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100/50 rounded-2xl overflow-hidden flex items-center justify-center">
                            <Image
                              src="/tryon-preview.png"
                              alt="Virtual Try-On Preview"
                              fill
                              className="object-contain"
                            />
                          </div>


                          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
                              AR Mode
                            </div>
                            <motion.div
                              animate={{ scale: [1, 1.1, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                              className="bg-red-500 w-2 h-2 rounded-full"
                            />
                          </div>

                          <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                              Necklaces
                            </div>
                            <div className="bg-yellow-500 px-4 py-2 rounded-full text-xs font-medium text-white shadow-sm">
                              Earrings
                            </div>
                            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                              Rings
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-left space-y-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">AI-Powered Recognition</h3>
                  <p className="text-gray-600">Advanced facial mapping technology for accurate jewellery placement</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">Real-Time Preview</h3>
                  <p className="text-gray-600">See how jewellery looks instantly with live camera feed</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Gem className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">Entire Collection</h3>
                  <p className="text-gray-600">Try on necklaces, earrings, rings, and more from our full catalogue</p>
                </div>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="mt-8 px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
              >
                <Camera size={20} />
                Try Virtual Try-On
              </button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            <div className="bg-white/60 backdrop-blur-sm border border-yellow-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <Camera className="text-yellow-600" size={20} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">No Download Required</h4>
              <p className="text-sm text-gray-600">Works directly in your browser on any device</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-yellow-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <Zap className="text-yellow-600" size={20} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Results</h4>
              <p className="text-sm text-gray-600">See yourself wearing jewellery in real-time</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm border border-yellow-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mb-3 mx-auto">
                <Sparkles className="text-yellow-600" size={20} />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Perfect Fit</h4>
              <p className="text-sm text-gray-600">Accurate sizing and positioning for confident purchases</p>
            </div>
          </motion.div>
        </div>
      </section>

      <TryOnModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

"use client";
import { ArrowDown, Sparkles } from "lucide-react";

export default function Hero() {
  const scrollToCollection = () => {
    const el = document.getElementById("collection");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="
        relative w-full h-[100vh]
        flex items-center justify-center 
        px-6 pt-24 overflow-hidden
      "
    >
      <div
        className="
          absolute inset-0 bg-cover bg-center 
          brightness-[1.15]
        "
        style={{
          backgroundImage: "url('/heroImage.jpeg')",
        }}
      />

      <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff8e5]/50 to-[#f3dfb3]/60" />

      <div className="absolute top-28 left-12 w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
      <div className="absolute bottom-40 right-14 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        
        <div className="flex justify-center items-center gap-3 text-yellow-600 mb-4">
          <Sparkles className="w-5 h-5" />
          <span className="tracking-wide font-medium">
            Handcrafted Excellence Since Day One
          </span>
          <Sparkles className="w-5 h-5" />
        </div>

        <h1 className="space-y-2 font-serif leading-tight">
          <div className="text-5xl md:text-7xl font-bold text-[#3b2d0d]">
            Tradition.
          </div>

          <div
            className="
              text-5xl md:text-7xl font-bold
              bg-gradient-to-r from-[#d9a94b] via-[#f6d98a] to-[#d9a94b]
              bg-clip-text text-transparent
            "
          >
            Trust.
          </div>

          <div className="text-5xl md:text-7xl font-bold text-[#3b2d0d]">
            Timeless Beauty.
          </div>
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-[#4c3a19] max-w-2xl mx-auto leading-relaxed">
          Discover exquisite jewelry crafted with love in the heart of Pali,
          Korba. Where tradition meets modern elegance.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={scrollToCollection}
            className="
              px-8 py-4 rounded-full bg-[#f4c56a]
              font-semibold text-black 
              shadow-md hover:bg-[#f7d48a] 
              hover:scale-105 transition-all 
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
              px-8 py-4 rounded-full border border-[#d2a24a]
              text-[#7b5918] bg-white/60 hover:bg-white/80
              transition-all
            "
          >
            Our Story
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 text-[#3b2d0d]">
          <div>
            <div className="text-4xl font-bold text-[#d2a24a]">1000+</div>
            <div className="text-sm mt-1">Happy Customers</div>
          </div>

          <div>
            <div className="text-4xl font-bold text-[#d2a24a]">25+</div>
            <div className="text-sm mt-1">Years of Trust</div>
          </div>

          <div>
            <div className="text-4xl font-bold text-[#d2a24a]">100%</div>
            <div className="text-sm mt-1">Authentic Gold</div>
          </div>
        </div>
      </div>
    </section>
  );
}

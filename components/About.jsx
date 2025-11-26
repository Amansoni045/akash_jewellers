"use client";
import { Heart, Award, Users, Star } from "lucide-react";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-white via-[#fff8ec] to-white overflow-hidden"
    >
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-200/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-yellow-300/20 blur-[140px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 tracking-wide mb-4">
            Our Story
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            From a humble dream to a trusted jewellery destination.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="bg-white/70 backdrop-blur-xl shadow-[0px_8px_30px_rgba(0,0,0,0.08)] rounded-2xl p-10 border border-white/40 hover:shadow-[0px_10px_40px_rgba(0,0,0,0.12)] transition-all">
            <blockquote className="text-lg text-gray-700 leading-relaxed italic mb-8">
              “Every piece we create carries the warmth of our hands and the dreams of
              our hearts. From being a ring maker to serving customers across Pali,
              our values remain unchanged — honesty, craftsmanship, and trust.”
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <div>
                <p className="font-semibold text-gray-900">
                  Ravi Shankar Soni
                </p>
                <p className="text-gray-500 text-sm">
                  Founder, Akash Jewellers
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-6">
              Our Journey
            </h3>

            <div className="space-y-8">
              {[
                {
                  year: "2002",
                  title: "Passionate Beginnings",
                  desc: "Started as a dedicated ring maker with a vision for fine craftsmanship.",
                },
                {
                  year: "2005",
                  title: "First Jewellery Shop",
                  desc: "Opened our first shop, offering handcrafted jewellery to the local community.",
                },
                {
                  year: "2023",
                  title: "Modern Expansion",
                  desc: "Expanded our store with new designs, modern tools, and wider collections.",
                },
                {
                  year: "2025",
                  title: "Digital Presence",
                  desc: "Bringing our traditional craftsmanship to the online world.",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-4 h-4 mt-1 rounded-full bg-yellow-500 shadow"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {item.year} — {item.title}
                    </h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-24">
          {[
            {
              icon: Heart,
              title: "Handcrafted With Love",
              text: "Every piece is crafted with precision and affection.",
            },
            {
              icon: Award,
              title: "Certified Quality",
              text: "100% authentic gold with trusted certification.",
            },
            {
              icon: Users,
              title: "A Family Legacy",
              text: "Three generations in jewellery craftsmanship.",
            },
            {
              icon: Star,
              title: "Trust & Transparency",
              text: "Honest pricing and customer-first approach.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="text-center group transition-transform hover:scale-105 cursor-pointer"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:shadow-yellow-300/50 transition-all">
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

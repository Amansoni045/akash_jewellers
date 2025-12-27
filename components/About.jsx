"use client";
import { Heart, Award, Users, Star } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const getYearsOfTrust = () => {
  const startDate = new Date(2002, 10, 28); 
  const today = new Date();
  let years = today.getFullYear() - startDate.getFullYear();
  const hasNotCompletedYearYet =
    today.getMonth() < startDate.getMonth() ||
    (today.getMonth() === startDate.getMonth() &&
      today.getDate() < startDate.getDate());

  if (hasNotCompletedYearYet) {
    years -= 1;
  }

  return years;
};


const AnimatedCounter = ({ from, to, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      let start = from;
      const end = to;
      const range = end - start;
      const increment = end > start ? 1 : -1;
      const stepTime = Math.abs(Math.floor((duration * 1000) / range));

      const timer = setInterval(() => {
        start += increment;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
};

const About = () => {
  return (
    <section
      id="about"
      className="relative py-24 bg-gradient-to-b from-white via-[#fff8ec] to-white overflow-hidden"
    >
      <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-200/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-52 h-52 bg-yellow-300/20 blur-[140px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 tracking-wide mb-4">
            Our Story
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            From a humble dream to a trusted jewellery destination.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { label: "Happy Customers", val: 5000, suffix: "+" },
            { label: "Years of Trust", val: getYearsOfTrust(), suffix: "+" },
            { label: "Unique Designs", val: 1000, suffix: "+" },
            { label: "Authentic", val: 100, suffix: "%" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center p-6 bg-white/50 border border-yellow-100 rounded-2xl shadow-sm"
            >
              <div className="text-4xl font-bold text-yellow-600 font-playfair mb-2">
                <AnimatedCounter from={0} to={stat.val} />{stat.suffix}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-xl shadow-[0px_8px_30px_rgba(0,0,0,0.08)] rounded-2xl p-10 border border-white/40 hover:shadow-[0px_10px_40px_rgba(0,0,0,0.12)] transition-all"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
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
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-4 h-4 mt-1 rounded-full bg-yellow-500 shadow group-hover:scale-125 transition-transform"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {item.year} — {item.title}
                    </h4>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group transition-transform hover:scale-105 cursor-pointer"
            >
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mb-4 group-hover:shadow-yellow-300/50 transition-all">
                <item.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

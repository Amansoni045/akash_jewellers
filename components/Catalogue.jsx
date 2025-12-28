"use client";

import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Collection = () => {
  const router = useRouter();

  const items = [
    {
      id: 1,
      slug: "necklaces",
      title: "Necklaces",
      description: "Exquisite handcrafted designs for every occasion",
      image: "/necklace.jpg",
      popular: "Bridal Sets",
      delay: "0s",
    },
    {
      id: 2,
      slug: "rings",
      title: "Rings",
      description: "Engagement rings, solitaires and elegant bands",
      image: "/rings.jpg",
      popular: "Solitaire",
      delay: "0.15s",
    },
    {
      id: 3,
      slug: "earrings",
      title: "Earrings",
      description: "From timeless studs to luxurious chandeliers",
      image: "/earrings.jpg",
      popular: "Jhumkas",
      delay: "0.3s",
    },
    {
      id: 4,
      slug: "bangles",
      title: "Bangles",
      description: "Traditional and modern bangles crafted with love",
      image: "/bangles.jpg",
      popular: "Kada Sets",
      delay: "0.45s",
    },
  ];

  const openCategory = (slug) => {
    router.push(`/catalogue/${slug}`);
  };

  return (
    <section
      id="collection"
      className="relative py-24 bg-gradient-to-b from-white via-[#fff9ec] to-white overflow-hidden"
    >
      <div className="absolute -top-10 -left-10 w-60 h-60 bg-yellow-200/30 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-yellow-300/25 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">

        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-yellow-600 w-5 h-5" />
            <span className="text-yellow-600 font-medium">Our Collection</span>
            <Sparkles className="text-yellow-600 w-5 h-5" />
          </div>

          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            Timeless Elegance
          </h2>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of handcrafted jewellery crafted with
            precision, love, and tradition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {items.map((item) => (
            <div
              key={item.id}
              onClick={() => openCategory(item.slug)}
              style={{ animationDelay: item.delay }}
              className="group cursor-pointer opacity-100"
            >
              <div className="relative bg-white/80 backdrop-blur-xl shadow-lg border border-yellow-100 rounded-2xl overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:scale-105">

                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70"></div>

                  <Sparkles className="absolute top-4 right-4 w-6 h-6 text-yellow-400 opacity-0 group-hover:opacity-100 transition duration-500 animate-pulse" />
                  <Sparkles className="absolute bottom-6 left-6 w-4 h-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition duration-700 animate-pulse" />

                  <div className="absolute top-4 left-4 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium">
                    Popular: {item.popular}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-playfair font-semibold text-gray-900 mb-1 group-hover:text-yellow-600 transition">
                    {item.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-2 text-yellow-600 font-medium group-hover:gap-3 transition-all">
                    Explore Collection
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-white/70 backdrop-blur-xl border border-yellow-100 rounded-2xl shadow-xl p-10 text-center max-w-4xl mx-auto">
          <h3 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
            Looking for Something Special?
          </h3>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-6">
            We create custom jewellery crafted to perfection. Whether it&apos;s an
            engagement ring or a family heirloom — we bring your dream design to
            life.
          </p>

          <button
            onClick={() => {
              const base = window.location.origin;

              if (window.location.pathname !== "/") {
                window.location.href = `${base}/#contact`;
              } else {
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-10 py-3 bg-yellow-500 text-white font-medium rounded-full shadow-lg hover:bg-yellow-600 hover:shadow-2xl transition-all"
          >
            Custom Design Request
          </button>


        </div>
      </div>
    </section>
  );
};

export default Collection;

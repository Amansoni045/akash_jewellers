"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { MessageCircle, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/jewellery?id=${id}`);
        const currentItem = res.data.data?.[0];

        if (currentItem) {
          setItem(currentItem);
          setSelectedImage(currentItem.image || "/placeholder.png");

          const similarRes = await api.get(`/jewellery?category=${currentItem.category}&limit=4`);
          setSimilarItems(similarRes.data.data.filter(i => i.id !== currentItem.id).slice(0, 3));
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
    </div>
  );

  if (!item) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
      <button onClick={() => router.back()} className="text-yellow-600 hover:underline">
        Go Back
      </button>
    </div>
  );

  const whatsappMessage = `Hi, I am interested in this product:
Name: ${item.name}
Price: ₹${item.price}
Link: ${typeof window !== "undefined" ? window.location.href : ""}
`;

  const whatsappLink = `https://wa.me/917770889004?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-yellow-600 mb-8 transition"
        >
          <ArrowLeft size={18} /> Back to Collection
        </button>

        <div className="grid md:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-gray-100">

          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden bg-gray-50 group cursor-zoom-in">
              <img
                src={selectedImage}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-150 origin-center"
                alt={item.name}
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-gray-900 shadow-sm">
                {item.category.toUpperCase()}
              </div>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2">
              {[item.image, ...(item.images || [])].filter(Boolean).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${selectedImage === img ? 'border-yellow-500' : 'border-transparent'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-2">
              {item.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">In Stock</span>
              <span className="text-gray-500 text-sm">ID: {item.id.slice(0, 8)}</span>
            </div>

            <p className="text-4xl font-bold text-yellow-600 mb-8">
              ₹ {item.price.toLocaleString()}
            </p>

            <div className="space-y-4 mb-8 text-gray-600">
              <p>Explore the elegance of this handcrafted piece. Perfect for occasions that matter.</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="block text-sm text-gray-500">Weight</span>
                  <span className="font-semibold text-gray-900">{item.weight || "N/A"} grams</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <span className="block text-sm text-gray-500">Purity</span>
                  <span className="font-semibold text-gray-900">22K / 24K Gold</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-200 transition-all hover:-translate-y-1"
              >
                <MessageCircle /> Enquire on WhatsApp
              </a>
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              * Prices may vary based on live gold rates. Contact us for final pricing.
            </p>
          </div>
        </div>

        {similarItems.length > 0 && (
          <div className="mt-24">
            <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-8">You Might Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {similarItems.map((sim, i) => (
                <div
                  key={i}
                  onClick={() => router.push(`/catalogue/item/${sim.id}`)}
                  className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 cursor-pointer transition-all group"
                >
                  <div className="h-48 rounded-xl bg-gray-50 overflow-hidden mb-4 relative">
                    <img src={sim.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-yellow-600">{sim.name}</h4>
                  <p className="text-yellow-600 font-bold">₹{sim.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

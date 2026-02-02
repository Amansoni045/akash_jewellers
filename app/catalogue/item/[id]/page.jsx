"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import { MessageCircle, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import ProductTryOn from "@/components/TryOn/ProductTryOn";


export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [similarItems, setSimilarItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [livePrices, setLivePrices] = useState(null);

  useEffect(() => {
    const fetchPrices = fetch("/api/livePrices").then(r => r.json());

    const fetchItem = api.get(`/jewellery?id=${id}`);

    Promise.all([fetchPrices, fetchItem]).then(([pricesData, itemRes]) => {
      setLivePrices(pricesData);

      const currentItem = itemRes.data.data?.[0];
      if (currentItem) {
        setItem(currentItem);
        setSelectedImage(currentItem.image || "/placeholder.png");

        api.get(`/jewellery?category=${currentItem.category}&limit=4`)
          .then(res => setSimilarItems(res.data.data.filter(i => i.id !== currentItem.id).slice(0, 3)));
      }
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
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

  const livePricesAvailable = livePrices?.prices?.gold && livePrices?.prices?.silver;

  let ratePerGram = 0;
  if (livePricesAvailable) {
    if (item.category === 'silver' || item.name.toLowerCase().includes('silver')) {
      ratePerGram = livePrices.prices.silver / 1000;
    } else {
      ratePerGram = livePrices.prices.gold / 10;
    }
  }

  const basePrice = ratePerGram * item.weight;
  const makingCharges = item.makingCharges || 0;
  const gst = item.gst !== undefined ? item.gst : 3;

  let gross = 0, originalPrice = 0, finalPrice = 0, discount = 0;
  let suffix = "";

  if (makingCharges === 0 && gst === 0) {

    suffix = "+ Making Charges + GST";
    originalPrice = Math.round(basePrice);
    finalPrice = Math.round(basePrice);
    discount = 0;
  } else if (makingCharges === 0 && gst > 0) {

    suffix = "+ Making Charges";
    const tax = basePrice * (gst / 100);
    const total = basePrice + tax;
    originalPrice = Math.round(total);
    finalPrice = Math.round(total);
    discount = 0;
  } else if (makingCharges > 0 && gst === 0) {

    suffix = "+ GST";
    const total = basePrice + makingCharges;
    originalPrice = Math.round(total);
    finalPrice = Math.round(total);
    discount = item.discount || 0;
    finalPrice = Math.max(0, finalPrice - discount);
  } else {

    suffix = "";
    gross = basePrice + makingCharges;
    const gstAmount = gross * (gst / 100);
    originalPrice = Math.round(gross + gstAmount);
    discount = item.discount || 0;
    finalPrice = Math.max(0, originalPrice - discount);
  }


  const whatsappMessage = `Hi, I am interested in this product:
Name: ${item.name}
ID: ${item.id}
Price: ${!livePricesAvailable ? "Price on Request - Please provide current pricing" : `₹${finalPrice.toLocaleString()} ${suffix}`}
Link: ${typeof window !== "undefined" ? window.location.href : ""}
`;

  const whatsappLink = `https://wa.me/917770889004?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-20 md:pt-28 pb-24 md:pb-12">
      <div className="container mx-auto px-4 max-w-6xl">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-yellow-600 mb-6 md:mb-8 transition text-sm md:text-base"
        >
          <ArrowLeft size={18} /> Back to Collection
        </button>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 bg-white p-4 md:p-10 rounded-2xl md:rounded-3xl shadow-sm border border-gray-100">

          <div className="space-y-4">
            <div className="relative h-[350px] md:h-[500px] w-full rounded-xl md:rounded-2xl overflow-hidden bg-gray-50 group cursor-zoom-in">
              <img
                src={selectedImage}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-150 origin-center"
                alt={item.name}
              />
              <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] md:text-xs font-bold text-gray-900 shadow-sm uppercase tracking-wide">
                {item.category}
              </div>
              {discount > 0 && suffix === "" && (
                <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] md:text-xs font-bold shadow-sm uppercase tracking-wide">
                  Discount Offer
                </div>
              )}
            </div>

            <div className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-none">
              {[item.image, ...(item.images || [])].filter(Boolean).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg md:rounded-xl overflow-hidden border-2 transition ${selectedImage === img ? 'border-yellow-500' : 'border-transparent'}`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h1 className="text-2xl md:text-4xl font-playfair font-bold text-gray-900 mb-2">
              {item.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm font-medium">In Stock</span>
              <span className="text-gray-500 text-xs md:text-sm">ID: {item.id.slice(0, 8)}</span>
            </div>

            <div className="mb-6 md:mb-8">
              {!livePricesAvailable ? (
                <div className="flex flex-col">
                  <p className="text-3xl md:text-4xl font-bold text-yellow-600">
                    Price on Request
                  </p>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Contact us for current pricing
                  </p>
                </div>
              ) : suffix !== "" ? (
                <div className="flex flex-col">
                  <p className="text-3xl md:text-4xl font-bold text-yellow-600">
                    ₹ {finalPrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    {suffix}
                  </p>
                </div>
              ) : discount > 0 ? (
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl md:text-4xl font-bold text-yellow-600">
                    ₹ {finalPrice.toLocaleString()}
                  </span>
                  <span className="text-xl md:text-2xl text-gray-400 line-through decoration-red-500">
                    ₹ {originalPrice.toLocaleString()}
                  </span>
                </div>
              ) : (
                <p className="text-3xl md:text-4xl font-bold text-yellow-600">
                  ₹ {finalPrice.toLocaleString()}
                </p>
              )}
              {livePricesAvailable && suffix === "" && <p className="text-xs text-gray-400 mt-1">*Price includes GST and Making Charges</p>}
            </div>

            <ProductTryOn />


            <div className="space-y-4 mb-8 text-gray-600 text-sm md:text-base">
              <p>Explore the elegance of this handcrafted piece. Perfect for occasions that matter.</p>

              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gray-50 rounded-xl">
                  <span className="block text-xs text-gray-500 mb-1">Weight</span>
                  <span className="font-semibold text-gray-900 text-sm md:text-base">{item.weight || "N/A"} grams</span>
                </div>
                <div className="p-3 md:p-4 bg-gray-50 rounded-xl">
                  <span className="block text-xs text-gray-500 mb-1">Purity</span>
                  <span className="font-semibold text-gray-900 text-sm md:text-base">22K / 24K Gold</span>
                </div>
                <div className="p-3 md:p-4 bg-gray-50 rounded-xl">
                  <span className="block text-xs text-gray-500 mb-1">Making Charges</span>
                  <span className="font-semibold text-gray-900 text-sm md:text-base">
                    {makingCharges === 0 ? "Excluded" : `₹${item.makingCharges}`}
                  </span>
                </div>
                <div className="p-3 md:p-4 bg-gray-50 rounded-xl">
                  <span className="block text-xs text-gray-500 mb-1">GST</span>
                  <span className="font-semibold text-gray-900 text-sm md:text-base">
                    {gst === 0 ? "Excluded" : `${item.gst}%`}
                  </span>
                </div>
              </div>
            </div>

            {item.description && (
              <div className="mb-8">
                <h3 className="font-playfair font-bold text-lg text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {item.description}
                </p>
              </div>
            )}

            <div className="hidden md:flex gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-green-200 transition-all hover:-translate-y-1"
              >
                <MessageCircle /> Enquire on WhatsApp
              </a>
            </div>

            <p className="hidden md:block text-xs text-gray-400 mt-4 text-center">
              * Prices vary based on live gold rates.
            </p>
          </div>
        </div>

        {similarItems.length > 0 && (
          <div className="mt-16 md:mt-24">
            <h3 className="text-xl md:text-2xl font-playfair font-bold text-gray-900 mb-6 md:mb-8">You Might Also Like</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {similarItems.map((sim, i) => (
                <div
                  key={i}
                  onClick={() => router.push(`/catalogue/item/${sim.id}`)}
                  className="bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 cursor-pointer transition-all group"
                >
                  <div className="h-40 md:h-48 rounded-lg md:rounded-xl bg-gray-50 overflow-hidden mb-3 md:mb-4 relative">
                    <img src={sim.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h4 className="font-semibold text-sm md:text-base text-gray-900 group-hover:text-yellow-600 line-clamp-1">{sim.name}</h4>
                  <p className="text-yellow-600 font-bold text-sm md:text-base">View Price</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <div className="fixed md:hidden bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30 flex items-center gap-4">
        <div className="flex-1">
          <p className="text-xs text-gray-500">Net Price</p>
          <p className="text-lg font-bold text-gray-900">
            {!livePricesAvailable ? "Price on Request" : `₹${finalPrice.toLocaleString()}`}
          </p>
        </div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} /> Enquire Now
        </a>
      </div>
    </div>
  );
}

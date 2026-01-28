"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight, Filter, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt_desc");
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [weightRange, setWeightRange] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  const [livePrices, setLivePrices] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const pricesRes = await fetch("/api/livePrices").then(r => r.json());
      setLivePrices(pricesRes);

      const res = await api.get(
        `/jewellery?category=${category}&search=${search}&sort=${sort}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}&minWeight=${weightRange[0]}&maxWeight=${weightRange[1]}`
      );
      setItems(res.data.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [category, search, sort, priceRange, weightRange]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadData();
    }, 500);
    return () => clearTimeout(timeout);
  }, [loadData]);

  const getPrice = (item) => {
    if (!livePrices?.prices) return null;
    let rate = 0;
    if (item.category === 'silver' || item.name.toLowerCase().includes('silver')) {
      rate = livePrices.prices.silver / 1000;
    } else {
      rate = livePrices.prices.gold / 10;
    }

    const weight = item.weight || 0;
    const making = item.makingCharges || 0;
    const gst = item.gst !== undefined ? item.gst : 3;
    const base = rate * weight;

    if (making === 0 && gst === 0) {
      return {
        final: Math.round(base),
        original: Math.round(base),
        discount: 0,
        suffix: "+ Making Charges + GST",
        isFaint: true
      };
    }

    if (making > 0 && gst === 0) {
      const gross = base + making;
      return {
        final: Math.round(gross),
        original: Math.round(gross),
        discount: item.discount || 0,
        suffix: "+ GST",
        isFaint: true
      };
    }

    if (making === 0 && gst > 0) {
      const tax = base * (gst / 100);
      const final = base + tax;
      return {
        final: Math.round(final),
        original: Math.round(final),
        discount: 0,
        suffix: "+ Making Charges",
        isFaint: true
      };
    }

    const gross = base + making;
    const tax = gross * (gst / 100);
    const original = Math.round(gross + tax);
    const final = Math.max(0, original - (item.discount || 0));

    return { original, final, discount: item.discount || 0, suffix: "", isFaint: false };
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="container mx-auto px-4">

        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-4">
            {formattedCategory} Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our exclusive range of {category}, handcrafted with precision and passion.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 sticky top-24 z-20">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

            <div className="flex w-full md:w-auto gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition"
              >
                <Filter size={18} /> Filters
              </button>

              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  placeholder={`Search ${category}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
                />
              </div>
            </div>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full md:w-auto px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-yellow-500 outline-none cursor-pointer"
            >
              <option value="createdAt_desc">Newest First</option>
              <option value="createdAt_asc">Oldest First</option>
              <option value="price_asc">Price Low to High</option>
              <option value="price_desc">Price High to Low</option>
              <option value="name_asc">Name (A-Z)</option>
            </select>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 pb-2 border-t mt-4 grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000000"
                      step="1000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Weight: {weightRange[1]}g
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="500"
                      step="1"
                      value={weightRange[1]}
                      onChange={(e) => setWeightRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-600"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-64 md:h-80 animate-pulse shadow-sm">
                <div className="h-40 md:h-56 bg-gray-200 rounded-t-xl" />
                <div className="p-3 md:p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-block p-4 bg-yellow-50 rounded-full mb-4">
              <Search className="w-8 h-8 text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">No items found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
            <button
              onClick={() => { setSearch(""); setPriceRange([0, 500000]); setWeightRange([0, 100]); }}
              className="mt-6 text-yellow-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <AnimatePresence>
              {items.map((item) => {
                const priceData = getPrice(item);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden cursor-pointer flex flex-col"
                    onClick={() => router.push(`/catalogue/item/${item.id}`)}
                  >
                    <div className="relative h-40 md:h-64 overflow-hidden bg-gray-50 flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.png"}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                      {priceData?.discount > 0 && priceData?.suffix === "" && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                          OFFER
                        </div>
                      )}
                    </div>

                    <div className="p-3 md:p-5 flex flex-col flex-1">
                      <p className="text-[10px] md:text-xs text-yellow-600 font-medium uppercase tracking-wider mb-1">
                        {item.category}
                      </p>
                      <h3 className="font-playfair font-semibold text-sm md:text-lg text-gray-900 line-clamp-2 md:line-clamp-1 group-hover:text-yellow-700 transition-colors mb-auto">
                        {item.name}
                      </h3>

                      <div className="mt-3">
                        {priceData ? (
                          priceData.suffix !== "" ? (
                            <div className="flex flex-col">
                              <p className="text-base md:text-xl font-bold text-gray-900">
                                ₹{priceData.final.toLocaleString()}
                              </p>
                              <p className="text-[10px] md:text-xs text-gray-500 font-medium">
                                {priceData.suffix}
                              </p>
                            </div>
                          ) : priceData.discount > 0 ? (
                            <div className="flex flex-col">
                              <span className="text-xs md:text-sm text-gray-400 line-through">₹{priceData.original.toLocaleString()}</span>
                              <span className="text-base md:text-xl font-bold text-gray-900">₹{priceData.final.toLocaleString()}</span>
                            </div>
                          ) : (
                            <p className="text-base md:text-xl font-bold text-gray-900">
                              ₹{priceData.final.toLocaleString()}
                            </p>
                          )
                        ) : (
                          <p className="text-sm text-gray-400">Loading price...</p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

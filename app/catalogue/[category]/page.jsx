"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useParams, useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = useParams();
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt_desc");
  const [loading, setLoading] = useState(false);

  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/jewellery?category=${category}&search=${search}&sort=${sort}`
        );

        setItems(res.data.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    loadData();
  }, [category, search, sort]);

  return (
    <div className="mt-28 p-6 max-w-7xl mx-auto bg-white text-black min-h-screen">

      <h1 className="text-4xl font-bold text-center mb-2 text-gray-900">
        {formattedCategory}
      </h1>

      <p className="text-center text-gray-600 mb-10">
        Explore handcrafted {category} made with elegance.
      </p>

      <div className="flex items-center justify-between mb-8">
        <input
          placeholder={`Search ${category}...`}
          className="border p-3 rounded-lg w-1/2 shadow-sm focus:ring-2 focus:ring-yellow-500 outline-none bg-white text-black"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-3 rounded-lg shadow-sm bg-white text-black focus:ring-2 focus:ring-yellow-500 outline-none"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="createdAt_desc">Newest</option>
          <option value="createdAt_asc">Oldest</option>
          <option value="price_asc">Price Low → High</option>
          <option value="price_desc">Price High → Low</option>
          <option value="name_asc">Name A → Z</option>
          <option value="name_desc">Name Z → A</option>
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">No items found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
            >
              <img
                src={item.image || "/placeholder.png"}
                className="h-56 w-full object-cover rounded-lg mb-4"
              />

              <h3 className="font-semibold text-xl text-gray-900">
                {item.name}
              </h3>

              <p className="text-gray-600">{item.category}</p>

              <p className="font-bold text-yellow-700 mt-1">
                ₹ {item.price}
              </p>

              <button
                onClick={() => router.push(`/catalogue/item/${item.id}`)}
                className="mt-4 flex items-center gap-2 text-yellow-700 hover:text-yellow-800 font-medium"
              >
                View Details <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

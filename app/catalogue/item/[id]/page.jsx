"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const res = await api.get(`/jewellery?id=${id}`);
      setItem(res.data.data?.[0]);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  if (loading) return <p className="mt-24 text-center">Loading...</p>;
  if (!item) return <p className="mt-24 text-center">Item not found.</p>;

  return (
    <div className="mt-28 p-6 max-w-3xl mx-auto bg-white text-black">
      <img
        src={item.image || "/placeholder.png"}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />

      <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
      <p className="text-gray-600 mb-2 capitalize">{item.category}</p>

      <p className="text-2xl font-semibold text-yellow-700 mb-6">
        ₹ {item.price}
      </p>

      {item.weight && (
        <p className="text-gray-700 mb-4">Weight: {item.weight} grams</p>
      )}

    <button
    className="px-6 py-3 bg-yellow-600 text-white rounded-lg"
    onClick={() => {
        const base = window.location.origin;

        if (window.location.pathname !== "/") {
        sessionStorage.setItem("scrollTarget", "contact");
        window.location.href = "/";
        } 
        else {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }
    }}
    >
    Enquire Now
    </button>

    </div>
  );
}

"use client";

import { TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function LivePrices() {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    fetch("/api/livePrices")
      .then(res => res.json())
      .then(setPrices);
  }, []);

  if (!prices) {
    return (
      <div className="relative group z-50">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-full font-medium shadow-sm animate-pulse">
          <TrendingUp className="w-4 h-4" />
          <span className="hidden md:inline">Loading...</span>
        </button>
      </div>
    );
  }

  return (
    <div className="relative group z-50">
      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-full font-medium shadow-md">
        <TrendingUp className="w-4 h-4" />
        <span className="hidden md:inline">Live Rates</span>
      </button>

      <div className="absolute right-0 mt-2 w-64 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
        <div className="bg-white rounded-xl shadow-xl border px-4 py-3 text-sm">

          <div className="flex justify-between">
            <span>Silver (per kg)</span>
            <span>₹{prices.silver?.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between mt-1">
            <span>Gold (per 10g)</span>
            <span>₹{prices.gold?.toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between text-xs text-gray-600">
            <span>Gold (RTGS)</span>
            <span>₹{prices.goldRTGS?.toLocaleString("en-IN")}</span>
          </div>

          <div className="my-2 h-px bg-gray-200" />

          <p className="text-xs text-gray-500 text-center">
            Last updated:{" "}
            {prices.updatedAt
              ? new Date(prices.updatedAt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })
              : "—"}{" "}
            · Estimated rates
          </p>
        </div>
      </div>
    </div>
  );
}

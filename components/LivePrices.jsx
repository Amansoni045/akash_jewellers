"use client";

import { TrendingUp } from "lucide-react";

export default function LivePrices() {
  return (
    <div className="relative group z-50">
      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-full font-medium shadow-md">
        <TrendingUp className="w-4 h-4" />
        <span className="hidden md:inline">Live Rates</span>
      </button>

      <div className="absolute right-0 mt-2 w-56 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 px-4 py-3 text-center">
          <p className="text-sm text-gray-600">
            Not available right now
          </p>
        </div>
      </div>
    </div>
  );
}

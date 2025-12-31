"use client";

import { TrendingUp, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useEffect, useState } from "react";

function formatDelta(value) {
  if (value === 0 || value == null) return "0";
  return Math.abs(value).toLocaleString("en-IN");
}

function formatPercent(p) {
  if (!Number.isFinite(p)) return "0%";
  return `${p > 0 ? "+" : ""}${p.toFixed(2)}%`;
}

function Indicator({ delta, percent }) {
  if (delta == null) {
    return <span className="text-xs text-gray-500">—</span>;
  }

  if (delta > 0) {
    return (
      <div className="flex flex-col items-end text-green-700 leading-tight">
        <div className="flex items-center gap-1">
          <ArrowUp className="w-4 h-4" />
          <span className="font-semibold">+₹{formatDelta(delta)}</span>
        </div>
        <span className="text-xs">({formatPercent(percent)})</span>
      </div>
    );
  }

  if (delta < 0) {
    return (
      <div className="flex flex-col items-end text-red-700 leading-tight">
        <div className="flex items-center gap-1">
          <ArrowDown className="w-4 h-4" />
          <span className="font-semibold">-₹{formatDelta(delta)}</span>
        </div>
        <span className="text-xs">({formatPercent(percent)})</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-gray-600">
      <Minus className="w-4 h-4" />
      <span className="text-xs">No change</span>
    </div>
  );
}

export default function LivePrices() {
  const [data, setData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("/api/livePrices")
      .then((r) => r.json())
      .then((res) => {
        if (res) {
          setData(res);
        }
      })
      .catch((err) => console.error("Failed to fetch live prices:", err));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".live-prices-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!data?.prices) return null;

  const { prices, diffs, updatedAt } = data;

  const date = new Date(updatedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = new Date(updatedAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="relative z-50 live-prices-container">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-full shadow-md hover:from-yellow-500 hover:to-yellow-600 transition-all"
      >
        <TrendingUp className="w-4 h-4" />
        <span className="font-medium">Live Rates</span>
      </button>

      <div
        className={`absolute right-0 mt-3 w-[calc(100vw-2rem)] md:w-80 max-w-[320px] transition-all duration-300 transform origin-top-right ${isOpen
          ? "opacity-100 scale-100 pointer-events-auto"
          : "opacity-0 scale-95 pointer-events-none"
          }`}
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-5 py-6 text-sm space-y-5">

          <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
            <div>
              <p className="font-bold text-gray-800 text-base">Silver (1 kg)</p>
              <span className="text-xs text-gray-500 font-medium">Market rate</span>
            </div>
            <div className="text-right space-y-1">
              <p className="font-bold text-lg text-gray-900">
                ₹{prices.silver?.toLocaleString("en-IN") ?? "—"}
              </p>
              <Indicator {...(diffs?.silver ?? { delta: 0, percent: 0 })} />
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
            <div>
              <p className="font-bold text-gray-800 text-base">Gold (10 g)</p>
              <span className="text-xs text-gray-500 font-medium">Standard rate</span>
            </div>
            <div className="text-right space-y-1">
              <p className="font-bold text-lg text-gray-900">
                ₹{prices.gold?.toLocaleString("en-IN") ?? "—"}
              </p>
              <Indicator {...(diffs?.gold ?? { delta: 0, percent: 0 })} />
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="grid grid-cols-[1fr_auto] gap-4 items-center">
            <div>
              <p className="font-bold text-gray-800 text-base">Gold (RTGS)</p>
              <span className="text-xs text-gray-500 font-medium">Bulk / RTGS</span>
            </div>
            <div className="text-right space-y-1">
              <p className="font-bold text-lg text-gray-900">
                ₹{prices.goldRTGS?.toLocaleString("en-IN") ?? "—"}
              </p>
              <Indicator {...(diffs?.goldRTGS ?? { delta: 0, percent: 0 })} />
            </div>
          </div>

          <div className="h-px bg-gray-100" />

          <div className="space-y-3 pt-1">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>updated: {date}, {time}</span>
            </div>

            <div className="flex flex-wrap gap-3 text-[10px] uppercase font-bold tracking-wider text-gray-400">
              <span className="flex items-center gap-1">
                <ArrowUp className="w-3 h-3 text-green-600" /> Increase
              </span>
              <span className="flex items-center gap-1">
                <ArrowDown className="w-3 h-3 text-red-600" /> Decrease
              </span>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 text-center font-medium">
            * Rates are indicative and subject to change.
          </p>
        </div>
      </div>
    </div>
  );
}

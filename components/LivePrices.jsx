"use client";

import { TrendingUp, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { useEffect, useState } from "react";

function formatDelta(value) {
  if (value === 0 || value == null) return "0";
  return Math.abs(value).toLocaleString("en-IN");
}

function formatPercent(p) {
  if (!isFinite(p)) return "0%";
  return `${p > 0 ? "+" : ""}${p.toFixed(2)}%`;
}

function Indicator({ delta, percent }) {
  if (delta == null)
    return <span className="text-xs text-gray-500">—</span>;

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
  const [prices, setPrices] = useState(null);
  const [diffs, setDiffs] = useState(null);

  useEffect(() => {
    fetch("/api/livePrices")
      .then(r => r.json())
      .then(data => {
        const lastPrices = JSON.parse(localStorage.getItem("lastPrices") || "null");
        const lastDiffs = JSON.parse(localStorage.getItem("lastDiffs") || "null");

        let currentDiffs = lastDiffs;

        // If we have stored prices and the server data is newer/different
        if (lastPrices && lastPrices.updatedAt !== data.updatedAt) {
          currentDiffs = {
            silver: {
              delta: data.silver - lastPrices.silver,
              pct: ((data.silver - lastPrices.silver) / lastPrices.silver) * 100,
            },
            gold: {
              delta: data.gold - lastPrices.gold,
              pct: ((data.gold - lastPrices.gold) / lastPrices.gold) * 100,
            },
            goldRTGS: {
              delta: data.goldRTGS - lastPrices.goldRTGS,
              pct: ((data.goldRTGS - lastPrices.goldRTGS) / lastPrices.goldRTGS) * 100,
            },
          };

          localStorage.setItem("lastDiffs", JSON.stringify(currentDiffs));
          localStorage.setItem("lastPrices", JSON.stringify(data));
        } else if (!lastPrices) {
          // First visit, just store current prices
          localStorage.setItem("lastPrices", JSON.stringify(data));
        }

        setDiffs(currentDiffs);
        setPrices(data);
      });
  }, []);

  if (!prices) return null;

  const date = new Date(prices.updatedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const time = new Date(prices.updatedAt).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div className="relative group z-50">
      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-white rounded-full shadow-md">
        <TrendingUp className="w-4 h-4" />
        <span className="hidden md:inline font-medium">Live Rates</span>
      </button>

      <div className="absolute right-0 mt-3 w-80 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
        <div className="bg-white rounded-2xl shadow-xl border px-5 py-4 text-sm space-y-5">

          <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
            <div>
              <p className="font-medium">Silver (1 kg)</p>
              <span className="text-xs text-gray-500">Market rate</span>
            </div>
            <div className="text-right space-y-1">
              <p className="font-semibold">
                ₹{prices.silver.toLocaleString("en-IN")}
              </p>
              <Indicator {...diffs?.silver} />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-4 items-start">
            <div>
              <p className="font-medium">Gold (10 g)</p>
              <span className="text-xs text-gray-500">Standard rate</span>
            </div>
            <div className="text-right space-y-1">
              <p className="font-semibold">
                ₹{prices.gold.toLocaleString("en-IN")}
              </p>
              <Indicator {...diffs?.gold} />
            </div>
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-4 items-start text-xs">
            <div>
              <p className="font-medium">Gold (RTGS)</p>
              <span className="text-gray-500">Bulk / RTGS</span>
            </div>
            <div className="text-right space-y-1">
              <p className="font-medium">
                ₹{prices.goldRTGS.toLocaleString("en-IN")}
              </p>
              <Indicator {...diffs?.goldRTGS} />
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          <div className="text-xs text-gray-500 space-y-2">
            <p>
              Updated on <b>{date}</b> at <b>{time}</b>
            </p>

            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <span className="flex items-center gap-1 text-green-700">
                <ArrowUp className="w-3 h-3" /> Increased
              </span>
              <span className="flex items-center gap-1 text-red-700">
                <ArrowDown className="w-3 h-3" /> Decreased
              </span>
              <span className="flex items-center gap-1 text-gray-600">
                <Minus className="w-3 h-3" /> No change
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 text-center">
            Rates are indicative.
          </p>
        </div>
      </div>
    </div>
  );
}

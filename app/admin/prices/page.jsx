"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/getToken";

export default function AdminPricesPage() {
  const [prices, setPrices] = useState({
    gold: "",
    goldRTGS: "",
    silver: "",
  });
  const [updatedAt, setUpdatedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/livePrices")
      .then(r => r.json())
      .then(d => {
        setPrices({
          gold: d?.gold ?? "",
          goldRTGS: d?.goldRTGS ?? "",
          silver: d?.silver ?? "",
        });
        setUpdatedAt(d?.updatedAt ?? null);
      })
      .finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    const token = getToken();

    await fetch("/api/livePrices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        gold: Number(prices.gold),
        goldRTGS: Number(prices.goldRTGS),
        silver: Number(prices.silver),
      }),
    });

    location.reload();
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-10">Live Metal Prices</h1>

      {loading && (
        <div className="bg-white border rounded-2xl p-6 space-y-5 animate-pulse">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-11 bg-gray-200 rounded-lg" />
          <div className="h-11 bg-gray-200 rounded-lg" />
          <div className="h-11 bg-gray-200 rounded-lg" />
          <div className="h-12 bg-gray-200 rounded-xl mt-4" />
        </div>
      )}

      {!loading && (
        <div className="bg-white border rounded-2xl p-6 space-y-6 shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gold Price (10g)
            </label>
            <input
              value={prices.gold}
              onChange={e => setPrices({ ...prices, gold: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter gold price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Gold RTGS
            </label>
            <input
              value={prices.goldRTGS}
              onChange={e =>
                setPrices({ ...prices, goldRTGS: e.target.value })
              }
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter RTGS price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Silver Price (1kg)
            </label>
            <input
              value={prices.silver}
              onChange={e => setPrices({ ...prices, silver: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 focus:outline-none"
              placeholder="Enter silver price"
            />
          </div>

          <button
            onClick={save}
            disabled={saving}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black py-3 rounded-xl font-semibold transition disabled:opacity-60"
          >
            {saving ? "Updating..." : "Update Prices"}
          </button>

          {updatedAt && (
            <p className="text-xs text-gray-500 text-center">
              Last updated on{" "}
              {new Date(updatedAt).toLocaleString("en-IN")}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

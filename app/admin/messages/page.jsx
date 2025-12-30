"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/getToken";

export default function MessagesPage() {
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();

    fetch("/api/contact", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(d => setMsgs(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-10">Customer Messages</h1>

      {loading && (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse rounded-2xl border bg-white p-6"
            >
              <div className="flex justify-between mb-4">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 rounded" />
                <div className="h-3 w-11/12 bg-gray-200 rounded" />
                <div className="h-3 w-9/12 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && msgs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-semibold mb-2">No messages yet</h2>
          <p className="text-gray-500">
            Customer inquiries will appear here once received.
          </p>
        </div>
      )}

      {!loading && msgs.length > 0 && (
        <div className="space-y-6">
          {msgs.map(m => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-500">
                <div className="font-medium text-gray-700">
                  {m.name} <span className="text-gray-400">({m.email})</span>
                </div>
                <div>
                  {new Date(m.createdAt).toLocaleString("en-IN")}
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {m.message}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

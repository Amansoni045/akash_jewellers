"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/getToken";

export default function AdminMessagesPage() {
  const [msgs, setMsgs] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch("/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setMsgs(json.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const sendReply = async (id) => {
    const token = getToken();
    await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ replyText }),
    });
    setReplyText("");
    setSelected(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete message?")) return;
    const token = getToken();
    await fetch(`/api/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-24">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      {loading && <p>Loading...</p>}

      {msgs.map((m) => (
        <div key={m.id} className="p-4 border rounded bg-white mb-4">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold">
                {m.name} ({m.email})
              </div>
              <div className="text-sm text-gray-500">{m.phone || "-"}</div>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(m.createdAt).toLocaleString()}
            </div>
          </div>

          <pre className="mt-3 bg-gray-50 p-3 rounded">
            {m.message}
          </pre>

          {m.reply && (
            <div className="mt-3 bg-yellow-50 p-3 border-l-4 border-yellow-400">
              Reply: {m.reply}
            </div>
          )}

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => {
                setSelected(m.id);
                setReplyText(m.reply || "");
              }}
              className="px-3 py-1 bg-yellow-500 rounded"
            >
              Reply
            </button>
            <button
              onClick={() => handleDelete(m.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>

          {selected === m.id && (
            <div className="mt-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full p-2 border rounded"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => sendReply(m.id)}
                  className="px-4 py-2 bg-yellow-500 rounded"
                >
                  Send
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

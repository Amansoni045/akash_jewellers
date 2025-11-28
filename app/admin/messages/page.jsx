"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminMessagesPage() {
  const router = useRouter();
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selected, setSelected] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Failed");
      setMsgs(json.data || []);
    } catch (err) {
      console.error(err);
      if (
        err.message.includes("Unauthorized") ||
        err.message.includes("Forbidden")
      ) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this message?")) return;
    await fetch(`/api/contact/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  const sendReply = async (id) => {
    if (!replyText.trim()) return alert("Enter reply");
    await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action: "reply", replyText }),
    });
    setReplyText("");
    setSelected(null);
    load();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-24">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="space-y-4">
          {msgs.length === 0 && (
            <p className="text-gray-600">No messages yet.</p>
          )}

          {msgs.map((m) => (
            <div
              key={m.id}
              className="p-4 border rounded bg-white"
            >
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">
                    {m.name}{" "}
                    <span className="text-sm text-gray-500">
                      ({m.email})
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    {m.phone || "—"}
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  {new Date(m.createdAt).toLocaleString()}
                </div>
              </div>

              <pre className="whitespace-pre-wrap mt-3 bg-gray-50 p-3 rounded">
                {m.message}
              </pre>

              {m.reply && (
                <div className="mt-3 p-3 bg-yellow-50 border-l-4 border-yellow-400">
                  Reply: {m.reply}
                </div>
              )}

              <div className="mt-3 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelected(m.id);
                    setReplyText(m.reply || "");
                  }}
                  className="px-3 py-1 bg-yellow-500 text-black rounded"
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
                    rows={4}
                  ></textarea>

                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => sendReply(m.id)}
                      className="px-4 py-2 bg-yellow-500 rounded text-black"
                    >
                      Send Reply
                    </button>
                    <button
                      onClick={() => {
                        setSelected(null);
                        setReplyText("");
                      }}
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
      )}
    </div>
  );
}

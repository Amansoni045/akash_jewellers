"use client";

import { useEffect, useState } from "react";
import { getToken } from "@/lib/getToken";
import { Trash2, Mail, MessageCircle, X, Send } from "lucide-react";

export default function MessagesPage() {
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("inbox"); // 'inbox' or 'replied'

  useEffect(() => {
    const token = getToken();

    fetch("/api/contact", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(d => setMsgs(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  const [replyModalOpen, setReplyModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const handleReplyClick = (msg) => {
    setSelectedMessage(msg);
    setReplySubject(`Re: Inquiry from ${msg.name}`);
    setReplyBody(`\n\nBest regards,\nAkash Jewellers Team`);
    setReplyModalOpen(true);
  };

  const sendReply = async () => {
    if (!replySubject || !replyBody) return alert("Please fill all fields");

    setSendingReply(true);
    try {
      const token = getToken();
      const res = await fetch("/api/contact/reply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: selectedMessage.id, // Add ID
          email: selectedMessage.email,
          name: selectedMessage.name,
          subject: replySubject,
          message: replyBody,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.warning || "Reply sent successfully!");
        setReplyModalOpen(false);
        setReplyBody("");
        // Move to Replied tab locally
        setMsgs((prev) =>
          prev.map((m) =>
            m.id === selectedMessage.id ? { ...m, status: "replied", reply: replyBody, repliedAt: new Date() } : m
          )
        );
      } else {
        alert(data.error || "Failed to send reply");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending reply");
    } finally {
      setSendingReply(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const token = getToken();
      const res = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setMsgs(msgs.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete message");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const displayedMsgs = msgs.filter((m) =>
    activeTab === "inbox" ? m.status !== "replied" : m.status === "replied"
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold mb-6">Customer Messages</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b">
        <button
          onClick={() => setActiveTab("inbox")}
          className={`pb-2 px-1 font-medium text-lg transition-colors relative ${activeTab === "inbox"
            ? "text-yellow-600 border-b-2 border-yellow-600"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Inbox ({msgs.filter((m) => m.status !== "replied").length})
        </button>
        <button
          onClick={() => setActiveTab("replied")}
          className={`pb-2 px-1 font-medium text-lg transition-colors relative ${activeTab === "replied"
            ? "text-yellow-600 border-b-2 border-yellow-600"
            : "text-gray-500 hover:text-gray-700"
            }`}
        >
          Replied ({msgs.filter((m) => m.status === "replied").length})
        </button>
      </div>

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

      {!loading && displayedMsgs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-semibold mb-2">
            {activeTab === "inbox" ? "No new messages" : "No replied messages"}
          </h2>
          <p className="text-gray-500">
            {activeTab === "inbox"
              ? "Your inbox is all caught up!"
              : "Messages you reply to will appear here."}
          </p>
        </div>
      )}

      {!loading && displayedMsgs.length > 0 && (
        <div className="space-y-6">
          {displayedMsgs.map((m) => (
            <div
              key={m.id}
              className="bg-white rounded-2xl border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-gray-500">
                <div className="font-medium text-gray-700">
                  {m.name} <span className="text-gray-400">({m.email})</span>
                </div>
                <div>{new Date(m.createdAt).toLocaleString("en-IN")}</div>
              </div>

              <div className="mt-4 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {m.message}
              </div>

              <div className="mt-6 pt-4 border-t flex flex-wrap gap-3">
                <button
                  onClick={() => handleReplyClick(m)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition text-sm font-medium"
                >
                  <Mail size={16} />
                  Reply Email
                </button>

                {m.phone && (
                  <a
                    href={`https://wa.me/${m.phone.replace(/\+/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition text-sm font-medium"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                )}

                <button
                  onClick={() => deleteMessage(m.id)}
                  className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition text-sm font-medium"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {replyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl p-6 relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setReplyModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>

            <h2 className="text-xl font-semibold mb-6">Reply to Customer</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To
                </label>
                <input
                  type="text"
                  value={`${selectedMessage?.name} <${selectedMessage?.email}>`}
                  disabled
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setReplyModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={sendReply}
                  disabled={sendingReply}
                  className="px-6 py-2 rounded-lg bg-yellow-500 text-black hover:bg-yellow-600 font-medium flex items-center gap-2 disabled:opacity-50"
                >
                  {sendingReply ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send size={16} /> Send Reply
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

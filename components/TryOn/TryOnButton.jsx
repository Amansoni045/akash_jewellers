"use client";

import { Sparkles } from "lucide-react";

export default function TryOnButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full border-2 border-yellow-500 text-yellow-700 font-semibold hover:bg-yellow-50 transition-all"
    >
      <Sparkles size={16} />
      Try On (Coming Soon)
    </button>
  );
}

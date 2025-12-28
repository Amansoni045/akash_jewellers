"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const modalRef = useRef(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        router.back();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [router]);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    setLoading(true);

    try {
      const res = await api.post("/login", form);

      if (res.data?.token) {
        document.cookie = `token=${res.data.token}; path=/; max-age=604800; SameSite=Lax`;
        localStorage.setItem("token", res.data.token);

        window.location.href = "/";
      }
    } catch (err) {
      setMsg(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/30 backdrop-blur-md">

      <div
        ref={modalRef}
        className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl text-center"
      >
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-white hover:text-yellow-300"
        >
          <X size={22} />
        </button>

        <h2 className="text-3xl font-extrabold text-white mb-2">
          Welcome Back
        </h2>
        <p className="text-white/70 text-sm mb-6">
          Login to continue
        </p>

        {msg && (
          <div className="mb-4 p-2 rounded-md bg-red-900/40 text-red-300 text-sm">
            {msg}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black font-semibold shadow-md transition disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-white/70 text-sm">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-yellow-300 hover:text-yellow-400 underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

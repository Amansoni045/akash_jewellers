"use client";

import { useState, useEffect, useRef } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [showPass, setShowPass] = useState(false);
  const modalRef = useRef(null);
  const router = useRouter();

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/login", form);
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/";
      }
    } catch (err) {
      setMsg(err?.response?.data?.error || "Login failed");
    }
  };

  useEffect(() => {
    function handleOutsideClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        router.back();
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 z-[999]">

      <div
        ref={modalRef}
        className="relative w-full max-w-md p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-xl text-center"
      >
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 text-white hover:text-yellow-300"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-extrabold text-white tracking-wide mb-3">
          Welcome Back
        </h2>

        <p className="text-white/70 text-sm mb-6">
          Login to continue ✨
        </p>

        {msg && (
          <div className="mb-4 text-red-300 bg-red-900/40 p-2 rounded-md">
            {msg}
          </div>
        )}

        <form onSubmit={submit} className="space-y-4">
          <input
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
          />

          <div className="relative">
            <input
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              type={showPass ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400/50"
            />

            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute top-1/2 -translate-y-1/2 right-4 text-white/70 hover:text-white"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button className="w-full py-3 text-lg font-semibold rounded-lg bg-yellow-500 hover:bg-yellow-600 text-black shadow-md shadow-yellow-900/30 transition">
            Login
          </button>
        </form>

        <p className="mt-6 text-white/70 text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-yellow-300 hover:text-yellow-400 underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

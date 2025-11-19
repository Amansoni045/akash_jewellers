"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/login", form);
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        // redirect to home or dashboard
        window.location.href = "/";
      }
    } catch (err) {
      setMsg(err?.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-2 border" />
        <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} type="password" placeholder="Password" className="w-full p-2 border" />
        <div>
          <button className="bg-yellow-500 px-4 py-2 rounded">Login</button>
        </div>
        {msg && <div className="text-red-600">{msg}</div>}
      </form>
    </div>
  );
}

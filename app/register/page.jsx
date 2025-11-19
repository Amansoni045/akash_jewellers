"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await api.post("/register", form);
      if (res.data?.message) {
        setMsg("Registered. You can login now.");
      }
    } catch (err) {
      setMsg(err?.response?.data?.error || "Register failed");
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={submit} className="space-y-3">
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full p-2 border" />
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-2 border" />
        <input value={form.password} onChange={e=>setForm({...form, password:e.target.value})} type="password" placeholder="Password" className="w-full p-2 border" />
        <div>
          <button className="bg-yellow-500 px-4 py-2 rounded">Register</button>
        </div>
        {msg && <div className="text-red-600">{msg}</div>}
      </form>
    </div>
  );
}

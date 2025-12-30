"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Edit, Trash2, Plus } from "lucide-react";
import { getToken } from "@/lib/getToken";

export default function JewelleryPage() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
    image: "",
  });
  const [editId, setEditId] = useState(null);

  const load = async () => {
    const token = getToken();
    const res = await api.get("/jewellery", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setItems(res.data.data || []);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async e => {
    e.preventDefault();
    const token = getToken();
    const payload = {
      ...form,
      price: Number(form.price),
      weight: form.weight ? Number(form.weight) : null,
    };

    if (editId) {
      await api.put(`/jewellery/${editId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await api.post("/jewellery", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setForm({ name: "", category: "", price: "", weight: "", image: "" });
    setEditId(null);
    load();
  };

  const del = async id => {
    if (!confirm("Delete this jewellery item?")) return;
    const token = getToken();
    await fetch(`/api/jewellery/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    load();
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10 space-y-12">
      <h1 className="text-3xl font-semibold">Jewellery Management</h1>

      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">
            {editId ? "Edit Jewellery" : "Add New Jewellery"}
          </h2>
        </div>

        <form onSubmit={submit} className="grid md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Jewellery name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm bg-white focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              <option value="">Select category</option>
              <option value="rings">Rings</option>
              <option value="necklaces">Necklaces</option>
              <option value="earrings">Earrings</option>
              <option value="bangles">Bangles</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price (₹)</label>
            <input
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Price"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Weight (gm)</label>
            <input
              value={form.weight}
              onChange={e => setForm({ ...form, weight: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Optional"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Image URL</label>
            <input
              value={form.image}
              onChange={e => setForm({ ...form, image: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="https://"
            />
          </div>

          <button className="md:col-span-2 bg-yellow-500 hover:bg-yellow-600 transition text-black py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
            <Plus size={18} />
            {editId ? "Update Jewellery" : "Add Jewellery"}
          </button>
        </form>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map(i => (
          <div
            key={i.id}
            className="bg-white border rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
          >
            <div className="h-44 bg-gray-100">
              <img
                src={i.image}
                alt={i.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4 space-y-1">
              <h3 className="font-semibold">{i.name}</h3>
              <p className="text-xs text-gray-500 capitalize">{i.category}</p>
              <p className="font-bold text-lg mt-1">₹ {i.price}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    setEditId(i.id);
                    setForm({
                      ...i,
                      weight: i.weight || "",
                      image: i.image || "",
                    });
                  }}
                  className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-yellow-50 transition"
                >
                  <Edit size={16} />
                  Edit
                </button>

                <button
                  onClick={() => del(i.id)}
                  className="flex-1 flex items-center justify-center gap-2 border border-red-200 text-red-600 rounded-lg py-2 hover:bg-red-50 transition"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

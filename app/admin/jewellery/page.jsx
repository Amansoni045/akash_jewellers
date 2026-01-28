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
    weight: "",
    makingCharges: "",
    gst: "3",
    discount: "0",
    description: "",
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
    try {
      const token = getToken();
      const payload = {
        ...form,
        weight: Number(form.weight),
        makingCharges: Number(form.makingCharges),
        gst: Number(form.gst),
        discount: Number(form.discount),
        description: form.description,
        price: 0,
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

      setForm({ name: "", category: "", weight: "", makingCharges: "", gst: "3", discount: "0", description: "", image: "" });
      setEditId(null);
      load();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.error || "An error occurred");
    }
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
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Jewellery name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              required
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
            <label className="block text-sm font-medium mb-1">Weight (grams)</label>
            <input
              required
              type="number"
              step="0.01"
              value={form.weight}
              onChange={e => setForm({ ...form, weight: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="e.g. 10.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Making Charges (₹)</label>
            <input
              type="number"
              value={form.makingCharges}
              onChange={e => setForm({ ...form, makingCharges: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="e.g. 5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">GST (%)</label>
            <input
              type="number"
              step="0.1"
              value={form.gst}
              onChange={e => setForm({ ...form, gst: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="e.g. 3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Discount (₹)</label>
            <input
              type="number"
              value={form.discount}
              onChange={e => setForm({ ...form, discount: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
              placeholder="Optional discount amount"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows="3"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-yellow-400 outline-none resize-none"
              placeholder="Product description..."
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

            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{i.name}</h3>
              <p className="text-xs text-gray-500 capitalize">{i.category}</p>

              <div className="grid grid-cols-2 text-xs text-gray-600 gap-y-1">
                <span>Weight:</span> <span className="font-medium">{i.weight}g</span>
                <span>Making:</span> <span className="font-medium">₹{i.makingCharges}</span>
                <span>GST:</span> <span className="font-medium">{i.gst}%</span>
                {i.discount > 0 && (
                  <><span>Discount:</span> <span className="font-medium text-green-600">-₹{i.discount}</span></>
                )}
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t">
                <button
                  onClick={() => {
                    setEditId(i.id);
                    setForm({
                      ...i,
                      weight: i.weight || "",
                      makingCharges: i.makingCharges || "",
                      gst: i.gst || "3",
                      discount: i.discount || "0",
                      description: i.description || "",
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

"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Edit, Trash2, Plus } from "lucide-react";
import { getToken } from "@/lib/getToken";

export default function AdminPage() {
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    weight: "",
    image: "",
  });

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt_desc");
  const [page, setPage] = useState(1);
  const limit = 6;

  const loadItems = async () => {
    try {
      const token = getToken();
      const res = await api.get(
        `/jewellery?page=${page}&limit=${limit}&search=${search}&sort=${sort}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadItems();
  }, [page, search, sort]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();
    const price = parseFloat(form.price);

    if (isNaN(price)) {
      alert("Invalid price");
      return;
    }

    const payload = {
      ...form,
      price,
      weight: form.weight ? parseFloat(form.weight) : null,
    };

    try {
      if (editId) {
        await api.put(`/jewellery/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.post(`/jewellery`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setEditId(null);
      setForm({ name: "", category: "", price: "", weight: "", image: "" });
      loadItems();
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;

    try {
      const token = getToken();
      await fetch(`/api/jewellery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      loadItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      name: item.name,
      category: item.category,
      price: item.price,
      weight: item.weight || "",
      image: item.image || "",
    });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto mt-24">
      <h1 className="text-4xl font-bold text-center mb-10">
        Admin Dashboard
      </h1>

      <div className="p-8 border rounded-xl mb-12 bg-white">
        <h2 className="text-2xl font-semibold mb-6 flex gap-2">
          <Plus /> {editId ? "Edit Item" : "Add Jewellery"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 border rounded"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-3 border rounded"
          >
            <option value="">Select Category</option>
            <option value="necklaces">Necklaces</option>
            <option value="rings">Rings</option>
            <option value="earrings">Earrings</option>
            <option value="bangles">Bangles</option>
          </select>

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="p-3 border rounded"
          />

          <input
            type="number"
            placeholder="Weight"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            className="p-3 border rounded"
          />

          <input
            placeholder="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="p-3 border rounded md:col-span-2"
          />

          <button className="md:col-span-2 bg-yellow-600 text-white py-3 rounded">
            {editId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="p-5 border rounded-xl bg-white">
            <img src={item.image} className="h-48 w-full object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p>{item.category}</p>
            <p className="font-bold mt-2">₹ {item.price}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 bg-yellow-400 text-white py-2 rounded"
              >
                <Edit size={16} /> Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

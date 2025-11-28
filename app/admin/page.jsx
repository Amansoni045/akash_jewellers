"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { Edit, Trash2, Plus } from "lucide-react";

export default function AdminPage() {
  const router = useRouter();

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

  useEffect(() => {
    async function validateAdmin() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      const res = await fetch("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!data.user || data.user.role !== "admin") {
        router.push("/");
      }
    }

    validateAdmin();
  }, [router]);

  const loadItems = async () => {
    try {
      const res = await api.get(
        `/jewellery?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
      );
      setItems(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadItems();
  }, [page, search, sort]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const payload = {
      ...form,
      price: parseFloat(form.price),
      weight: form.weight ? parseFloat(form.weight) : null,
    };

    try {
      if (editId) {
        await api.put(`/jewellery/${editId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Item updated");
      } else {
        await api.post(`/jewellery`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Item added");
      }

      setEditId(null);
      setForm({ name: "", category: "", price: "", weight: "", image: "" });
      loadItems();
    } catch (err) {
      console.log(err);
      alert("Error saving item");
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!confirm("Delete this item?")) return;

    try {
      const res = await fetch(`/api/jewellery/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        alert("Deleted!");
        loadItems();
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.log(err);
      alert("Error deleting item");
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
    <div className="p-6 max-w-6xl mx-auto mt-24 bg-white text-black">

      <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard</h1>

      <div className="bg-white p-8 rounded-xl shadow-md border mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Plus className="w-6 h-6 text-yellow-600" />
          {editId ? "Edit Item" : "Add New Jewellery"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <input
            placeholder="Name"
            className="p-3 border rounded-lg"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <select
            className="p-3 border rounded-lg"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
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
            className="p-3 border rounded-lg"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <input
            type="number"
            placeholder="Weight (optional)"
            className="p-3 border rounded-lg"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
          />

          <input
            placeholder="Image URL"
            className="p-3 border rounded-lg md:col-span-2"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <button
            type="submit"
            className="md:col-span-2 bg-yellow-600 text-white py-3 rounded-lg"
          >
            {editId ? "Update Item" : "Add Item"}
          </button>
        </form>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl shadow-md border">
            <img
              src={item.image}
              className="h-48 w-full object-cover rounded-lg mb-4"
            />

            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.category}</p>
            <p className="font-bold text-yellow-700 mt-2">₹ {item.price}</p>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => handleEdit(item)}
                className="flex-1 bg-yellow-400 text-white py-2 rounded-lg"
              >
                <Edit className="inline w-4 h-4" /> Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg"
              >
                <Trash2 className="inline w-4 h-4" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

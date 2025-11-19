"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    (async () => {
      try {
        const res = await api.get("/me", { headers: { Authorization: `Bearer ${token}` }});
        setUser(res.data.user);
      } catch {
        setUser(null);
      }
    })();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-yellow-400">Akash Jewellers</Link>

      <div className="flex items-center space-x-4">
        {!user ? (
          <>
            <Link href="/register" className="hover:text-yellow-300">Register</Link>
            <Link href="/login" className="hover:text-yellow-300">Login</Link>
          </>
        ) : (
          <>
            <span>{user.name}</span>
            <button onClick={handleLogout} className="bg-yellow-500 px-3 py-1 rounded">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

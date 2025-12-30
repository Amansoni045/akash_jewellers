"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gem,
  IndianRupee,
  MessageSquare,
} from "lucide-react";

const NAVBAR_HEIGHT = "72px";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const nav = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/jewellery", label: "Jewellery", icon: Gem },
    { href: "/admin/prices", label: "Live Prices", icon: IndianRupee },
    { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div
      className="min-h-screen bg-[#f7f7f8] grid grid-cols-[260px_1fr]"
      style={{ paddingTop: NAVBAR_HEIGHT }}
    >
      <aside
        className="bg-white border-r px-6 py-8"
        style={{ minHeight: `calc(100vh - ${NAVBAR_HEIGHT})` }}
      >
        <h2 className="text-xl font-bold mb-10">Admin Panel</h2>

        <nav className="space-y-1">
          {nav.map(item => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition
                  ${
                    active
                      ? "bg-yellow-50 text-yellow-700"
                      : "text-gray-700 hover:bg-gray-100"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="px-10 py-10">
        {children}
      </main>
    </div>
  );
}

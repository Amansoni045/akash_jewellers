"use client";

import { useEffect, useState } from "react";
import { Gem, MessageSquare, IndianRupee, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getToken } from "@/lib/getToken";

export default function AdminDashboard() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const token = getToken();

        fetch("/api/dashboard", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(r => r.json())
            .then(setData);
    }, []);

    if (!data) {
        return (
            <div className="space-y-6">
                <div className="h-8 w-40 bg-gray-200 rounded animate-pulse" />
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div
                            key={i}
                            className="h-28 bg-white border rounded-2xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl space-y-12">
            <h1 className="text-3xl font-semibold">Dashboard</h1>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Stat icon={IndianRupee} label="Gold (10g)" value={`₹ ${data.gold?.toLocaleString("en-IN")}`} />
                <Stat icon={IndianRupee} label="Silver (10 gms)" value={`₹ ${data.silver?.toLocaleString("en-IN")}`} />
                <Stat icon={Gem} label="Jewellery Items" value={data.jewelleryCount} />
                <Stat icon={MessageSquare} label="Messages" value={data.messageCount} />
            </div>

            <div className="bg-white border rounded-2xl p-6 flex items-start gap-4">
                <TrendingUp className="text-yellow-600 mt-1" />
                <div>
                    <p className="font-medium">Price Status</p>
                    <p className="text-sm text-gray-600">
                        Last updated{" "}
                        {data.lastPriceUpdate
                            ? new Date(data.lastPriceUpdate).toLocaleString("en-IN")
                            : "not yet"}
                    </p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-white border rounded-2xl p-6">
                    <h2 className="font-semibold mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <QuickLink href="/admin/jewellery" label="Manage Jewellery" />
                        <QuickLink href="/admin/prices" label="Update Live Prices" />
                        <QuickLink href="/admin/messages" label="View Messages" />
                    </div>
                </div>

                <InfoCard title="Latest Message">
                    {data.latestMessage
                        ? data.latestMessage.message.slice(0, 120)
                        : "No messages yet"}
                </InfoCard>

                <InfoCard title="Recently Added">
                    {data.latestJewellery
                        ? data.latestJewellery.name
                        : "No jewellery yet"}
                </InfoCard>
            </div>
        </div>
    );
}

function Stat({ icon: Icon, label, value }) {
    return (
        <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3 text-gray-500 mb-3">
                <Icon size={18} />
                <span className="text-sm">{label}</span>
            </div>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    );
}

function QuickLink({ href, label }) {
    return (
        <Link
            href={href}
            className="flex items-center justify-between border rounded-xl px-4 py-3 hover:bg-yellow-50 transition"
        >
            <span className="font-medium">{label}</span>
            <ArrowRight size={18} />
        </Link>
    );
}

function InfoCard({ title, children }) {
    return (
        <div className="bg-white border rounded-2xl p-6">
            <h2 className="font-semibold mb-3">{title}</h2>
            <p className="text-sm text-gray-600">{children}</p>
        </div>
    );
}

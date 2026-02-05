"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import WishlistButton from "@/components/WishlistButton";
import { Loader2, Heart, ArrowRight, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function WishlistPage() {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [livePrices, setLivePrices] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                setIsLoggedIn(false);
                return;
            }
            setIsLoggedIn(true);

            try {
                const [wishlistRes, pricesRes] = await Promise.all([
                    fetch("/api/wishlist", { headers: { Authorization: `Bearer ${token}` } }),
                    fetch("/api/livePrices")
                ]);

                if (!wishlistRes.ok) throw new Error("Failed to fetch wishlist");

                const wishlistData = await wishlistRes.json();
                const pricesData = await pricesRes.json();

                setWishlist(wishlistData.wishlist || []);
                setLivePrices(pricesData);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleRemove = (jewelleryId) => {
        setWishlist((prev) => prev.filter((item) => item.jewelleryId !== jewelleryId));
    };

    const calculatePrice = (product) => {
        if (!livePrices?.prices?.gold || !livePrices?.prices?.silver) return null;

        let ratePerGram = 0;
        if (product.category === 'silver' || product.name.toLowerCase().includes('silver')) {
            ratePerGram = livePrices.prices.silver / 1000;
        } else {
            ratePerGram = livePrices.prices.gold / 10;
        }

        const basePrice = ratePerGram * product.weight;
        const makingCharges = product.makingCharges || 0;
        const gst = product.gst !== undefined ? product.gst : 3;

        let finalPrice = 0;
        if (makingCharges === 0 && gst === 0) {
            finalPrice = basePrice;
        } else if (makingCharges === 0 && gst > 0) {
            finalPrice = basePrice + (basePrice * (gst / 100));
        } else if (makingCharges > 0 && gst === 0) {
            let total = basePrice + makingCharges;
            let discount = product.discount || 0;
            finalPrice = Math.max(0, total - discount);
        } else {
            let gross = basePrice + makingCharges;
            let gstAmount = gross * (gst / 100);
            let discount = product.discount || 0;
            finalPrice = Math.max(0, (gross + gstAmount) - discount);
        }
        return Math.round(finalPrice);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="flex-grow flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-gold-500" />
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-stone-50">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8 mt-20">

                <header className="mb-12 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-playfair font-bold text-stone-900 mb-4"
                    >
                        My Wishlist
                    </motion.h1>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 100 }}
                        className="h-1 bg-yellow-500 mx-auto rounded-full"
                    />
                </header>

                {!isLoggedIn ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20 bg-white rounded-3xl shadow-sm border border-stone-100 max-w-2xl mx-auto"
                    >
                        <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-red-500 fill-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-stone-900 mb-2">Login to View Your Wishlist</h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                            Sign in to sync your favorite items across devices and keep track of what you love.
                        </p>
                        <Link href="/login" className="inline-flex items-center gap-2 px-8 py-3 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition active:scale-95">
                            Login Now <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                ) : error ? (
                    <div className="text-center py-20 text-red-500">
                        <p>Error: {error}</p>
                    </div>
                ) : wishlist.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-24"
                    >
                        <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Heart className="w-10 h-10 text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-stone-900 mb-3">Your Wishlist is Empty</h2>
                        <p className="text-lg text-gray-600 mb-8">Start exploring our collection and save your favorites here.</p>
                        <Link href="/catalogue/all" className="inline-flex items-center gap-2 px-8 py-3 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-600 transition active:scale-95 shadow-lg shadow-yellow-200">
                            <ShoppingBag size={18} /> Browse Collection
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {wishlist.map((item, index) => {
                            const product = item.jewellery;
                            const price = calculatePrice(product);
                            const displayImage = product.image || product.images?.[0];

                            return (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={item.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-stone-100"
                                >
                                    <Link href={`/catalogue/item/${product.id}`}>
                                        <div className="aspect-[4/5] relative overflow-hidden bg-gray-100">
                                            {displayImage ? (
                                                <img
                                                    src={displayImage}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                                            )}
                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />

                                            <div className="absolute top-3 right-3 bg-white rounded-full shadow-md z-10 p-1">
                                                <WishlistButton
                                                    jewelleryId={product.id}
                                                    initialIsWishlisted={true}
                                                    onToggle={(added) => {
                                                        if (!added) handleRemove(product.id);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="p-5">
                                        <div className="mb-2">
                                            <span className="text-xs font-bold text-yellow-600 uppercase tracking-wider">{product.category}</span>
                                        </div>
                                        <Link href={`/catalogue/item/${product.id}`}>
                                            <h3 className="font-playfair font-bold text-lg text-stone-900 line-clamp-1 hover:text-yellow-600 transition mb-2">{product.name}</h3>
                                        </Link>
                                        <div className="flex items-center justify-between">
                                            <p className="text-stone-600 font-semibold">
                                                {price ? `₹${price.toLocaleString('en-IN')}` : "Price on Request"}
                                            </p>
                                            <Link href={`/catalogue/item/${product.id}`} className="text-xs font-bold text-stone-900 border-b border-stone-900 pb-0.5 hover:text-yellow-600 hover:border-yellow-600 transition">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

"use client";
import { useState, useEffect } from "react";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function WishlistButton({ jewelleryId, initialIsWishlisted = false, onToggle }) {
    const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
    const [loading, setLoading] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        setIsWishlisted(initialIsWishlisted);
    }, [initialIsWishlisted]);

    const handleToggle = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const token = localStorage.getItem("token");
        if (!token) {
            setShowLoginModal(true);
            return;
        }

        setLoading(true);
        const previousState = isWishlisted;
        setIsWishlisted(!previousState);

        try {
            const res = await fetch("/api/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ jewelleryId }),
            });

            if (!res.ok) {
                throw new Error("Failed to update wishlist");
            }

            const data = await res.json();
            setIsWishlisted(data.added);
            if (onToggle) onToggle(data.added);
        } catch (error) {
            console.error(error);
            setIsWishlisted(previousState);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={handleToggle}
                disabled={loading}
                className={`p-2 rounded-full transition-colors duration-200 relative z-10 ${isWishlisted ? "text-red-500 bg-red-50 hover:bg-red-100" : "text-gray-400 hover:text-red-500 hover:bg-gray-100"
                    }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
                <Heart
                    className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                />
            </motion.button>

            <AnimatePresence>
                {showLoginModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center isolate">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={(e) => { e.stopPropagation(); setShowLoginModal(false); }}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-2xl shadow-2xl p-6 w-[90%] max-w-sm relative z-50 overflow-hidden"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setShowLoginModal(false); }}
                                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 text-gray-500"
                            >
                                <X size={20} />
                            </button>

                            <div className="text-center">
                                <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="w-8 h-8 text-red-500 fill-red-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Login to Wishlist</h3>
                                <p className="text-gray-500 mb-6 font-medium">
                                    Save your favorite jewellery items to your wishlist and view them anytime.
                                </p>

                                <div className="space-y-3">
                                    <Link
                                        href="/login"
                                        className="block w-full py-3 px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl transition-all transform hover:scale-[1.02] shadow-yellow-200 shadow-lg"
                                    >
                                        Login Now
                                    </Link>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowLoginModal(false); }}
                                        className="block w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                                    >
                                        Continue Browsing
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

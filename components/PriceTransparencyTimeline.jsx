"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Calculator, Info, Check } from "lucide-react";

/**
 * PriceTransparencyTimeline Component
 * 
 * Visualizes the breakdown of the final jewellery price.
 * 
 * Props:
 * @param {string} metalType - 'gold' | 'silver'
 * @param {number} ratePerGram - Current metal rate per gram
 * @param {number} weight - Weight of the item in grams
 * @param {number} makingCharges - Making charges (flat amount)
 * @param {number} gstPercentage - GST percentage
 * @param {number} discount - Discount amount
 * @param {number} finalPrice - The final calculated price 
 */
export default function PriceTransparencyTimeline({
    metalType = "gold",
    ratePerGram = 0,
    weight = 0,
    makingCharges = 0,
    gstPercentage = 3,
    discount = 0,
    finalPrice = 0,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const basePrice = ratePerGram * weight;
    const grossBeforeTax = basePrice + makingCharges;
    const gstAmount = grossBeforeTax * (gstPercentage / 100);
    const totalBeforeDiscount = grossBeforeTax + gstAmount;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const steps = [
        {
            label: `Base Price (${weight}g × ${formatCurrency(ratePerGram)}/g)`,
            value: basePrice,
            icon: <Calculator size={16} />,
            detail: `Current Live ${metalType} Rate`,
            isAddition: true,
        },
        {
            label: "Making Charges",
            value: makingCharges,
            icon: <Info size={16} />,
            detail: makingCharges === 0 ? "Waived for you" : "Craftsmanship fee",
            isAddition: true,
            highlight: makingCharges === 0,
        },
        {
            label: `GST (${gstPercentage}%)`,
            value: gstAmount,
            icon: <Info size={16} />,
            detail: "Govt. Goods & Services Tax",
            isAddition: true,
            highlight: gstPercentage === 0,
        },
    ];

    if (discount > 0) {
        steps.push({
            label: "Special Discount",
            value: -discount,
            icon: <Check size={16} />,
            detail: "Applied on total",
            isAddition: false,
            isDiscount: true,
        });
    }

    return (
        <div className="w-full mt-6 mb-8 border border-gray-100 rounded-2xl bg-white shadow-sm overflow-hidden">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
                <div className="flex items-center gap-2 text-gray-800 font-semibold">
                    <Calculator className="text-yellow-600" size={20} />
                    <span>See Price Breakdown</span>
                </div>
                {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-5 space-y-6 relative">
                            <div className="absolute left-[29px] top-5 bottom-12 w-0.5 bg-gray-100 dark:bg-gray-100"></div>

                            {steps.map((step, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ x: -10, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 relative z-10"
                                >
                                    <div className={`p-2 rounded-full border-2 ${step.isDiscount ? 'bg-green-50 border-green-200 text-green-600' : 'bg-white border-yellow-100 text-yellow-600'}`}>
                                        {step.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="text-sm font-medium text-gray-900">{step.label}</h4>
                                            <span className={`text-sm font-semibold ${step.isDiscount ? 'text-green-600' : 'text-gray-900'}`}>
                                                {step.isDiscount ? "-" : ""}{formatCurrency(Math.abs(step.value))}
                                            </span>
                                        </div>
                                        {step.detail && (
                                            <p className={`text-xs mt-0.5 ${step.highlight ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                                                {step.detail}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: steps.length * 0.1 }}
                                className="pt-4 mt-4 border-t border-dashed border-gray-200 flex items-center justify-between"
                            >
                                <span className="font-bold text-gray-900 text-base">Final Price</span>
                                <span className="font-bold text-xl text-yellow-600">{formatCurrency(finalPrice)}</span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      alert("Message sent successfully!");
      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      alert("Error submitting form.");
    }

    setLoading(false);
  };

  return (
    <section
      id="contact"
      className="pt-40 pb-24 bg-gradient-to-b from-white via-[#fff9ec] to-white"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900">
            Contact Us
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-lg">
            Have a question or want a custom jewellery design? We’re here to
            help you create something unforgettable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Details */}
          <div className="bg-white/70 backdrop-blur-xl shadow-xl border border-yellow-100 rounded-2xl p-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-playfair">
              Get in Touch
            </h2>

            <div className="space-y-6 text-gray-700">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Mail className="text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p>amansoni.pali001@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Phone className="text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p>+91 77708 89004</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <MapPin className="text-yellow-700" />
                </div>
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p>Pali, Korba — 495449, Chhattisgarh</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-semibold mb-3 font-playfair">
                Business Hours
              </h3>
              <p className="text-gray-600">Mon – Sun: 10:00 AM — 9:00 PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/80 backdrop-blur-xl shadow-xl border border-yellow-100 rounded-2xl p-10"
          >
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 font-playfair">
              Send Us a Message
            </h2>

            <div className="grid grid-cols-1 gap-6">
              <input
                type="text"
                placeholder="Full Name*"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address*"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />

              <textarea
                placeholder="Your Message*"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 px-6 py-4 bg-yellow-600 text-white rounded-lg shadow-lg hover:bg-yellow-700 transition-all font-medium text-lg"
              >
                {loading ? <Loader2 className="animate-spin" /> : <Send />}
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

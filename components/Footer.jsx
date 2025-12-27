"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const goTo = (id) => {
    if (window.location.pathname !== "/") {
      sessionStorage.setItem("scrollTarget", id);
      window.location.href = "/";
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#fef8e7] border-t border-yellow-200 text-[#3b2d0d] mt-20">
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        <div>
          <Image
            src="/logo1.png"
            alt="Akash Jewellers Logo"
            width={150}
            height={80}
            className="mb-4"
          />
          <p className="text-gray-700 leading-relaxed">
            Handcrafted jewellery built with tradition, trust, and timeless
            beauty.
            Discover elegance from the heart of Pali, Korba.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-700">
            <li>
              <button onClick={() => goTo("home")} className="hover:text-yellow-700">
                Home
              </button>
            </li>
            <li>
              <button onClick={() => goTo("about")} className="hover:text-yellow-700">
                About Us
              </button>
            </li>
            <li>
              <button onClick={() => goTo("collection")} className="hover:text-yellow-700">
                Catalogue
              </button>
            </li>
            <li>
              <button onClick={() => goTo("contact")} className="hover:text-yellow-700">
                Contact
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>

          <div className="space-y-4 text-gray-700">
            <div className="flex gap-3 items-start">
              <Mail className="text-yellow-700 mt-1" />
              <p>amansoni.pali001@gmail.com</p>
            </div>

            <div className="flex gap-3 items-start">
              <Phone className="text-yellow-700 mt-1" />
              <p>+91 77708 89004</p>
            </div>

            <div className="flex gap-3 items-start">
              <MapPin className="text-yellow-700 mt-1" />
              <div>
                <p>Pali, Korba — 495449, Chhattisgarh</p>
                <a
                  href="https://maps.app.goo.gl/dHhVn6dDskssBvaW8"
                  target="_blank"
                  rel="noreferrer"
                  className="text-yellow-700 text-sm font-medium hover:underline block mt-1"
                >
                  View Location on Map →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-yellow-300 py-4 text-center text-gray-700 bg-[#fff9ed]">
        © {year} Akash Jewellers — All Rights Reserved.
      </div>
    </footer>
  );
}

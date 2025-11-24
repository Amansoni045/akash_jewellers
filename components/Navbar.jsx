"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/70 backdrop-blur-md shadow-sm dark:bg-black/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">

        <div className="flex items-center justify-between">
          
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Logo"
              width={120}
              height={60}
              className="h-14 w-auto cursor-pointer hover:scale-110 transition-transform"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">

            <button
              onClick={() => scrollToSection("home")}
              className="hover:text-primary font-medium"
            >
              Home
            </button>

            <button
              onClick={() => scrollToSection("about")}
              className="hover:text-primary font-medium"
            >
              About Us
            </button>

            <button
              onClick={() => scrollToSection("collection")}
              className="hover:text-primary font-medium"
            >
              Catalogue
            </button>

            <button
              onClick={() => scrollToSection("contact")}
              className="hover:text-primary font-medium"
            >
              Contact
            </button>

            <Link
              href="/login"
              className="ml-4 px-4 py-2 bg-primary text-white font-medium rounded-md flex items-center gap-2 hover:opacity-90"
            >
              <User className="h-4 w-4" />
              Login
            </Link>

          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border">
            <nav className="flex flex-col mt-4 space-y-4">

              <button
                onClick={() => scrollToSection("home")}
                className="text-left font-medium"
              >
                Home
              </button>

              <button
                onClick={() => scrollToSection("about")}
                className="text-left font-medium"
              >
                About Us
              </button>

              <button
                onClick={() => scrollToSection("collection")}
                className="text-left font-medium"
              >
                Catalogue
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="text-left font-medium"
              >
                Contact
              </button>

              <Link
                href="/login"
                className="px-4 py-2 bg-primary text-white rounded-md flex items-center gap-2 justify-center"
              >
                <User className="h-4 w-4" />
                Login
              </Link>

            </nav>
          </div>
        )}

      </div>
    </header>
  );
}
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";
import LivePrices from "./LivePrices";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/lib/getToken";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    fetch("/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setIsLoggedIn(true);
        }
      })
      .catch(() => {
        setUser(null);
        setIsLoggedIn(false);
      });
  }, []);


  useEffect(() => {
    const close = (e) => {
      if (!e.target.closest(".profile-menu")) setProfileMenuOpen(false);
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const logout = () => {
    document.cookie = "token=; path=/; max-age=0";
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    router.push("/login");
  };


  const goToSection = (id) => {
    if (window.location.pathname !== "/") {
      sessionStorage.setItem("scrollTarget", id);
      router.push("/");
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (target && pathname === "/") {
      const el = document.getElementById(target);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 300);
      }
      sessionStorage.removeItem("scrollTarget");
    }
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? "bg-white/70 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-4">

        <div className="flex items-center justify-between">

          <Link href="/">
            <Image
              src="/logo1.png"
              alt="Logo"
              width={120}
              height={60}
              className="h-14 w-auto cursor-pointer hover:scale-110 transition-transform"
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">

            <button
              onClick={() => goToSection("home")}
              className="text-black hover:text-yellow-600 font-medium"
            >
              Home
            </button>

            <button
              onClick={() => goToSection("about")}
              className="text-black hover:text-yellow-600 font-medium"
            >
              About Us
            </button>

            <button
              onClick={() => goToSection("collection")}
              className="text-black hover:text-yellow-600 font-medium"
            >
              Catalogue
            </button>

            <button
              onClick={() => goToSection("contact")}
              className="text-black hover:text-yellow-600 font-medium"
            >
              Contact
            </button>


            {user?.role === "admin" && (
              <>
                <Link
                  href="/admin/messages"
                  className="text-black font-medium hover:text-yellow-600"
                >
                  Messages
                </Link>
                <Link
                  href="/admin"
                  className="text-black font-medium hover:text-yellow-600"
                >
                  Admin Panel
                </Link>
              </>
            )}

            <LivePrices />

            {!isLoggedIn ? (
              <Link
                href="/login"
                className="px-4 py-2 bg-yellow-500 text-black rounded-md flex items-center gap-2 hover:bg-yellow-600"
              >
                <User className="h-4 w-4" /> Login
              </Link>
            ) : (
              <div className="relative ml-4 profile-menu">
                <button
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-md text-black hover:bg-yellow-600"
                >
                  <User className="h-5 w-5" />
                  {user?.name?.split(" ")[0] || "User"}
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md p-2 z-50">
                    <button
                      onClick={logout}
                      className="w-full text-left text-black px-3 py-2 hover:bg-gray-100 rounded"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-300">
            <nav className="flex flex-col mt-4 space-y-4">

              <button onClick={() => goToSection("home")} className="text-left font-medium">Home</button>
              <button onClick={() => goToSection("about")} className="text-left font-medium">About Us</button>
              <button onClick={() => goToSection("collection")} className="text-left font-medium">Catalogue</button>

              <button onClick={() => goToSection("contact")} className="text-left font-medium">
                Contact
              </button>


              {user?.role === "admin" && (
                <>
                  <Link href="/admin/messages" className="text-left font-medium">
                    Messages
                  </Link>
                  <Link href="/admin" className="text-left font-medium">
                    Admin Panel
                  </Link>
                </>
              )}

              <div className="flex justify-start">
                <LivePrices />
              </div>

              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-yellow-500 text-black rounded-md flex items-center gap-2 justify-center"
                >
                  <User className="h-4 w-4" /> Login
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-yellow-500 text-black rounded-md flex items-center gap-2 justify-center"
                >
                  <User className="h-4 w-4" /> Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

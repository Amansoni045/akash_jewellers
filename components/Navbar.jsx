"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User, Heart } from "lucide-react";
import LivePrices from "./LivePrices";
import { usePathname, useRouter } from "next/navigation";
import { getToken } from "@/lib/getToken";
import { Sparkles } from "lucide-react";


export default function Navbar({ initialPrices }) {
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
      if (!e.target.closest(".profile-menu")) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    router.push("/login");
  };

  const goToSection = (id) => {
    setIsMobileMenuOpen(false);

    if (window.location.pathname !== "/") {
      sessionStorage.setItem("scrollTarget", id);
      router.push("/");
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const target = sessionStorage.getItem("scrollTarget");
    if (target && pathname === "/") {
      setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }, 300);
      sessionStorage.removeItem("scrollTarget");
    }
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm"
        : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo1.png"
              alt="Akash Jewellers"
              width={120}
              height={60}
              priority
              className="h-10 w-auto md:h-14 hover:scale-105 transition-transform"
            />
          </Link>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="scale-90 md:scale-100 origin-right">
              <LivePrices initialData={initialPrices} />
            </div>

            <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8 ml-6">

              <button onClick={() => goToSection("home")} className="nav-btn">
                Home
              </button>

              <button
                onClick={() => goToSection("tryon")}
                className="nav-btn relative flex items-center gap-1.5 pr-8"
              >
                <Sparkles size={14} className="text-yellow-600" />
                Try-On
                <span className="absolute -top-1 -right-1 text-[8px] px-1.5 py-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-bold shadow-sm">
                  NEW
                </span>
              </button>

              <button onClick={() => goToSection("about")} className="nav-btn">
                About Us
              </button>

              <button
                onClick={() => goToSection("collection")}
                className="nav-btn"
              >
                Catalogue
              </button>

              <button onClick={() => goToSection("contact")} className="nav-btn">
                Contact
              </button>

              {user?.role === "admin" && (
                <Link href="/admin" className="nav-btn">
                  Admin Panel
                </Link>
              )}

              <Link href="/wishlist" className="p-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors relative group" title="Wishlist">
                <Heart size={20} className="group-hover:fill-red-500 transition-colors" />
              </Link>

              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-yellow-500 text-black rounded-md flex items-center gap-2 hover:bg-yellow-600 transition-colors"
                >
                  <User className="h-4 w-4" /> Login
                </Link>
              ) : (
                <div className="relative profile-menu">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-md text-black hover:bg-yellow-600 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="max-w-[100px] truncate">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                  </button>

                  {profileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg p-2 z-50 border border-gray-100">
                      <div className="px-3 py-2 text-xs text-gray-500 border-b mb-1">
                        Signed in as
                        <span className="font-medium text-gray-900 block truncate">
                          {user?.email}
                        </span>
                      </div>
                      <Link
                        href="/wishlist"
                        onClick={() => setProfileMenuOpen(false)}
                        className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        My Wishlist
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </nav>


            <button
              className="lg:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t shadow-xl">
            <nav className="flex flex-col p-4 space-y-2">
              <button
                onClick={() => goToSection("home")}
                className="mobile-nav-btn"
              >
                Home
              </button>

              <button
                onClick={() => goToSection("tryon")}
                className="mobile-nav-btn flex items-center gap-2 border-l-4 border-yellow-500"
              >
                <Sparkles size={16} className="text-yellow-600" />
                Try-On
                <span className="ml-auto text-[10px] px-2 py-0.5 bg-yellow-500 text-white rounded-full font-bold">
                  NEW
                </span>
              </button>

              <button
                onClick={() => goToSection("about")}
                className="mobile-nav-btn"
              >
                About Us
              </button>

              <button
                onClick={() => goToSection("collection")}
                className="mobile-nav-btn"
              >
                Catalogue
              </button>

              <button
                onClick={() => goToSection("contact")}
                className="mobile-nav-btn"
              >
                Contact
              </button>

              {user?.role === "admin" && (
                <Link href="/admin" className="mobile-nav-btn text-blue-600">
                  Admin Panel
                </Link>
              )}

              <Link href="/wishlist" className="mobile-nav-btn flex items-center gap-2">
                Wishlist
              </Link>


              {!isLoggedIn ? (
                <Link
                  href="/login"
                  className="mobile-nav-btn text-yellow-600"
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="mobile-nav-btn text-red-600 text-left"
                >
                  Logout ({user?.name?.split(" ")[0]})
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

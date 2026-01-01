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
      if (!e.target.closest(".profile-menu")) {
        setProfileMenuOpen(false);
      }
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
              <LivePrices />
            </div>

            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 ml-6">

              <button onClick={() => goToSection("home")} className="nav-btn">
                Home
              </button>
              <button onClick={() => goToSection("about")} className="nav-btn">
                About Us
              </button>
              <button onClick={() => goToSection("collection")} className="nav-btn">
                Catalogue
              </button>
              <button onClick={() => goToSection("contact")} className="nav-btn">
                Contact
              </button>

              {user?.role === "admin" && (
                <>
                  <Link href="/admin" className="nav-btn">
                    Admin Panel
                  </Link>
                </>
              )}

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
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-xl rounded-lg p-2 z-50 border border-gray-100 ring-1 ring-black ring-opacity-5">
                      <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100 mb-1">
                        Signed in as <br />
                        <span className="font-medium text-gray-900 truncate block">
                          {user?.email}
                        </span>
                      </div>
                      <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </nav>

            <button
              className="md:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col p-4 space-y-2">

              <button onClick={() => goToSection("home")} className="mobile-nav-btn text-lg py-3 px-4 rounded-lg hover:bg-yellow-50 text-left font-medium">
                Home
              </button>
              <button onClick={() => goToSection("about")} className="mobile-nav-btn text-lg py-3 px-4 rounded-lg hover:bg-yellow-50 text-left font-medium">
                About Us
              </button>
              <button onClick={() => goToSection("collection")} className="mobile-nav-btn text-lg py-3 px-4 rounded-lg hover:bg-yellow-50 text-left font-medium">
                Catalogue
              </button>
              <button onClick={() => goToSection("contact")} className="mobile-nav-btn text-lg py-3 px-4 rounded-lg hover:bg-yellow-50 text-left font-medium">
                Contact
              </button>

              {user?.role === "admin" && (
                <div className="pt-2 border-t border-gray-100 mt-2">
                  <p className="text-xs font-semibold text-gray-400 uppercase px-4 mb-1">Admin</p>
                  <Link href="/admin/messages" className="block mobile-nav-btn text-lg py-3 px-4 rounded-lg hover:bg-yellow-50 font-medium">
                    Messages
                  </Link>
                  <Link href="/admin" className="block mobile-nav-btn text-lg py-3 px-4 rounded-lg hover:bg-yellow-50 font-medium">
                    Dashboard
                  </Link>
                </div>
              )}

              <div className="pt-4 mt-2 border-t border-gray-100">
                {!isLoggedIn ? (
                  <Link
                    href="/login"
                    className="w-full py-3.5 bg-yellow-500 text-black rounded-lg flex items-center gap-2 justify-center font-semibold text-lg hover:bg-yellow-600 transition-colors shadow-yellow-200 shadow-md"
                  >
                    <User className="h-5 w-5" /> Login
                  </Link>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-800 font-bold text-lg">
                        {user?.name?.[0] || "U"}
                      </div>
                      <div className="overflow-hidden">
                        <p className="font-medium text-gray-900 truncate">{user?.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full py-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 justify-center font-medium hover:bg-red-100 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

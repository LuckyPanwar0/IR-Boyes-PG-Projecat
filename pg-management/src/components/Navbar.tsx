"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Rooms & Pricing", href: "/rooms" },
    { name: "Facilities", href: "/facilities" },
    { name: "Gallery", href: "/gallery" },
    { name: "Tiffin Service", href: "/tiffin" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-card py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
            IR
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block text-slate-800 dark:text-white">
            Boys PG & Tiffin
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary relative ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {link.name}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center gap-4">
            <Link
              href="tel:7229976031"
              className="hidden lg:flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
            >
              <Phone size={16} />
              <span>7229976031</span>
            </Link>
            <Link
              href="/student/login"
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full text-sm font-semibold shadow-md shadow-primary/20 transition-all hover:shadow-lg active:scale-95"
            >
              Student Portal
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-700 dark:text-slate-200"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full glass-card border-t border-slate-200 dark:border-slate-800 py-4 shadow-xl"
        >
          <ul className="flex flex-col px-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block py-3 text-base font-medium border-b border-slate-100 dark:border-slate-800 ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
               <Link
                href="/student/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex justify-center bg-primary text-white px-5 py-3 rounded-xl font-semibold shadow-md shadow-primary/20"
              >
                Student Portal
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}

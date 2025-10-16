"use client";

import Link from "next/link";
import { Radio } from "lucide-react";
import { useEffect, useState } from "react";
import { useQuote } from "@/contexts/QuoteContext";
import { motion } from "motion/react";
import { ShoppingCart } from "lucide-react";
interface HeaderProps {
  onOpenModal: () => void;
}

export default function Header({ onOpenModal }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  const { getTotalItems } = useQuote();
  const totalItems = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-200"
          : "bg-white/90 backdrop-blur-sm border-b border-gray-200"
      }`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
            aria-label="WalkieRentals Home"
          >
            <Radio
              className="h-8 w-8 text-primary group-hover:scale-110 transition-transform"
              aria-hidden="true"
            />
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
              WalkieRentals
            </span>
          </Link>

          {/* Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="text-gray-700 hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            >
              Home
            </Link>
            <Link
              href="/packages"
              className="text-gray-700 hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            >
              Packages
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            {totalItems >= 0 ? (
              <Link
              href="/packages"
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Get a quote for walkie talkie rentals"
            >
              Get Quote
            </Link>
              
            ) : (
              <div>
                
                <motion.button
                  onClick={onOpenModal}
                  className="fixed bottom-6 right-6 bg-primary hover:bg-primary-hover text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 z-40 flex items-center space-x-2 group"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`View quote with ${totalItems} ${
                    totalItems === 1 ? "item" : "items"
                  }`}
                >
                  <div className="relative">
                    <ShoppingCart className="h-6 w-6" />
                    <motion.span
                      className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      key={totalItems}
                    >
                      {totalItems}
                    </motion.span>
                  </div>
                  <span className="hidden sm:block font-semibold pr-2">
                    View Quote
                  </span>
                </motion.button>

              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

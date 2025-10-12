'use client'

import Link from 'next/link'
import { Radio } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-200' 
          : 'bg-white/90 backdrop-blur-sm border-b border-gray-200'
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
            <Radio className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">WalkieRentals</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
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
            <Link 
              href="/packages" 
              className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg transition-all duration-300 font-medium hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Get a quote for walkie talkie rentals"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
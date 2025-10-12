import Link from 'next/link'
import { Radio, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4 group w-fit">
              <Radio className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-xl font-bold group-hover:text-primary transition-colors">WalkieRentals</span>
            </Link>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Professional walkie talkie rentals for events, productions, and communication needs. 
              Reliable equipment, nationwide shipping, and expert support.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-2 text-sm text-gray-400 group">
                <Phone className="h-4 w-4 group-hover:text-primary transition-colors" aria-hidden="true" />
                <a href="tel:5551234567" className="hover:text-white transition-colors">(555) 123-4567</a>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400 group">
                <Mail className="h-4 w-4 group-hover:text-primary transition-colors" aria-hidden="true" />
                <a href="mailto:info@walkierentals.com" className="hover:text-white transition-colors">info@walkierentals.com</a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Home</Link></li>
              <li><Link href="/packages" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Packages</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">Contact</Link></li>
              <li><Link href="/#faq" className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block">FAQ</Link></li>
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2" aria-label="Services offered">
              <li><span className="text-gray-400">Event Rentals</span></li>
              <li><span className="text-gray-400">Production Support</span></li>
              <li><span className="text-gray-400">Corporate Events</span></li>
              <li><span className="text-gray-400">Nationwide Shipping</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} WalkieRentals. All rights reserved.
          </p>
          <nav aria-label="Legal navigation" className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1">
              Terms of Service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
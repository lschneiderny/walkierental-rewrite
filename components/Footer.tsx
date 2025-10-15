import Link from 'next/link'
import { Radio, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white" role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <Link 
              href="/" 
              className="flex items-center space-x-2 mb-4 group w-fit focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded"
              aria-label="WalkieRentals home"
            >
              <Radio className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" aria-hidden="true" />
              <span className="text-xl font-bold group-hover:text-primary transition-colors">WalkieRentals</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              Professional production communication equipment rental for film, TV, and live events. 
              Broadcast-grade Motorola radios with experienced technical support.
            </p>
            
          </div>

          {/* Quick Links */}
          <nav aria-labelledby="footer-navigation-heading">
            <h3 id="footer-navigation-heading" className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3" role="list">
              <li>
                <Link 
                  href="/" 
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Home</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/packages" 
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Production Packages</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">Contact & Quote</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/#faq" 
                  className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center group focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  <span className="group-hover:translate-x-1 transition-transform inline-block">FAQ</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Our Services</h3>
            <ul className="space-y-3" role="list">
              <li className="text-sm text-gray-400 flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" aria-hidden="true"></span>
                <span>Film & TV Production</span>
              </li>
              <li className="text-sm text-gray-400 flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" aria-hidden="true"></span>
                <span>Live Event Production</span>
              </li>
              <li className="text-sm text-gray-400 flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" aria-hidden="true"></span>
                <span>Corporate Events</span>
              </li>
              <li className="text-sm text-gray-400 flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" aria-hidden="true"></span>
                <span>Concert & Festival Support</span>
              </li>
              <li className="text-sm text-gray-400 flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0" aria-hidden="true"></span>
                <span>Same-Day Shipping</span>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Support</h3>
            <ul className="space-y-3" role="list">
            <li> 
              <a 
                href="mailto:info@walkierentals.com" 
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors group focus:outline-none focus:ring-2 focus:ring-primary rounded"
                aria-label="Email us at info@walkierentals.com"
              >
                <Mail className="h-4 w-4 flex-shrink-0 group-hover:text-primary transition-colors" aria-hidden="true" />
                <span>info@walkierentals.com</span>
              </a>
              </li>
              <li>
              <li>  
              <a 
                href="tel:5551234567" 
                className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors group focus:outline-none focus:ring-2 focus:ring-primary rounded"
                aria-label="Call us at (555) 123-4567"
              >
                <Phone className="h-4 w-4 flex-shrink-0 group-hover:text-primary transition-colors" aria-hidden="true" />
                <span>(555) 123-4567</span>
              </a>
              </li>
              </li>
              
              <li className="pt-8">
              </li>
              <li>
                <span className="text-sm text-gray-400 block">
                  <strong className="text-white">Hours:</strong><br />
                  Mon-Fri: 8am-6pm EST<br />
                </span>
              </li>
              
            </ul>
          </div>
        </div>
        <div>
              <h3 className="text-sm font-semibold text-white mb-3 sr-only">Contact Information</h3>
              
              
              </div>
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} WalkieRentals. All rights reserved.
            </p>
            <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-6">
              <Link 
                href="/privacy" 
                className="text-gray-400 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-gray-400 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              >
                Terms of Service
              </Link>
              <Link 
                href="/accessibility" 
                className="text-gray-400 hover:text-white text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              >
                Accessibility
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
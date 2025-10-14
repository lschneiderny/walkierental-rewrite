'use client'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative pt-16 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      {/* Static background elements - removed animations for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Professional 
              <span className="gradient-text block">
                Production Comms
              </span>
              Rental
            </h1>
            
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Crystal-clear communication for film, TV, and live event productions. 
              Broadcast-quality equipment with nationwide delivery and 24/7 production support.
            </p>

            {/* Features */}
            <div className="mt-8 space-y-3">
              {[
                'Broadcast-grade Motorola equipment',
                'Pre-programmed & production-ready',
                '24/7 on-set technical support',
                'Same-day shipping available'
              ].map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/packages" 
                className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-105"
              >
                View Production Packages
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 hover:border-primary bg-white text-gray-700 hover:text-primary font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                Request Production Quote
              </Link>
            </div>
          </motion.div>

          {/* Right Content - Image Placeholder */}
          <motion.div 
            className="lg:pl-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-soft-lg transition-transform duration-300 hover:scale-[1.02]">
                <div className="text-center">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-primary" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.5 2C5.67 2 5 2.67 5 3.5v17c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5h-11zm11 2v16h-11V4h11z"/>
                      <path d="M8 6h8v1H8V6zm0 2h8v1H8V8zm0 2h8v1H8v-1zm0 2h8v1H8v-1z"/>
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">Professional Walkie Talkie</p>
                </div>
              </div>
              
              {/* Floating Stats - Using CSS animations instead */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-soft-lg p-4 border border-gray-100 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-2xl font-bold gradient-text">1000+</div>
                <div className="text-sm text-gray-600">Productions Supported</div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-soft-lg p-4 border border-gray-100 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className="text-2xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-gray-600">On-Set Support</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
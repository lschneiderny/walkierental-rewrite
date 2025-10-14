"use client";

import Link from 'next/link'
import { Radio, Signal, Battery, Users, ShoppingCart } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState, useMemo } from 'react'
import { Package } from '@/lib/types'
import { useQuote } from '@/contexts/QuoteContext'

// Simplified animation variants for better performance
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0
    }
  }
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const { addToQuote } = useQuote()

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch('/api/packages', {
          next: { revalidate: 60 }
        })
        const data = await res.json()
        setPackages(data)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])
  
  // Memoize structured data - only recalculate when packages change
  const packagesSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": packages.map((pkg, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": pkg.name,
        "description": pkg.description,
        "brand": {
          "@type": "Brand",
          "name": "WalkieRentals"
        },
        "offers": {
          "@type": "Offer",
          "price": pkg.dailyRate,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "priceSpecification": [
            {
              "@type": "UnitPriceSpecification",
              "price": pkg.dailyRate,
              "priceCurrency": "USD",
              "unitText": "DAY"
            },
            {
              "@type": "UnitPriceSpecification",
              "price": pkg.weeklyRate,
              "priceCurrency": "USD",
              "unitText": "WEEK"
            }
          ]
        }
      }
    }))
  }), [packages])
  
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(packagesSchema) }}
      />
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Production Communication Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Broadcast-quality communication systems for film, TV, and live event productions. 
            All packages include pre-programming, same-day shipping, and 24/7 on-set support.
          </p>
        </motion.div>

        {/* Filter/Sort Section */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Showing {packages.length} packages</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {/* Packages Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
          initial="hidden"
          animate={loading ? "hidden" : "visible"}
          variants={staggerContainer}
        >
          {loading ? (
            // Loading skeleton
            [1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            packages.map((pkg) => (
            <motion.div 
              key={pkg.id} 
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-200 hover-lift-fast transform-gpu"
              variants={fadeInUp}
              transition={{ duration: 0.3 }}
            >
              {/* Package Header */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-white to-blue-50/20">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">{pkg.name}</h3>
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold gradient-text">${pkg.dailyRate}</div>
                    <div className="text-sm text-gray-500">per day</div>
                    <div className="text-sm text-gray-400">${pkg.weeklyRate}/week</div>
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column - What's Included */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {pkg.includes.map((item, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right Column - Specifications & Best For */}
                  <div className="space-y-4">
                    {/* Specifications */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Specifications:</h4>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-600">
                          <Signal className="h-4 w-4 mr-2 text-primary" />
                          Range: {pkg.specifications.range}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Radio className="h-4 w-4 mr-2 text-primary" />
                          {pkg.specifications.channels} Channels
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Battery className="h-4 w-4 mr-2 text-primary" />
                          {pkg.specifications.batteryLife} Battery
                        </div>
                      </div>
                    </div>

                    {/* Best For */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Best for:</h4>
                      <div className="flex flex-wrap gap-1">
                        {pkg.bestFor.map((use, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                          >
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

                  {/* Package Footer */}
                  <div className="px-6 pb-6">
                    <div className="flex gap-3">
                      <button
                        onClick={() => addToQuote(pkg)}
                        className="flex-1 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white text-center py-3 rounded-lg transition-all duration-200 font-semibold flex items-center justify-center gap-2"
                        aria-label={`Add ${pkg.name} to quote`}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Add to Quote
                      </button>
                      <Link
                        href={`/packages/${pkg.id}`}
                        className="flex-1 bg-primary hover:bg-primary-hover text-white text-center py-3 rounded-lg transition-colors duration-200 font-semibold flex items-center justify-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
            </motion.div>
          ))
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center py-16 border-t border-gray-200"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-4">Need a custom production package?</h2>
          <p className="text-gray-600 mb-6">
            Large crew or unique production requirements? We'll create a custom comms package tailored to your shoot.
          </p>
          <Link 
            href="/contact"
            className="inline-flex items-center bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            <Users className="mr-2 h-5 w-5" />
            Get Custom Quote
          </Link>
        </motion.div>
      </div>
    </div>
    </>
  )
}
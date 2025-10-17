"use client"

import { Radio, Battery, ShoppingCart, Headphones, Check } from 'lucide-react'
import { motion } from "motion/react"
import { useEffect, useState, useMemo } from 'react'
import { WalkiePackage } from '@/lib/types'
import { useQuote } from '@/contexts/QuoteContext'
import { scaleIn, smoothTransition } from '@/lib/animations'
import Hero from '@/components/Hero'

export default function PackagesPage() {
  const [packages, setPackages] = useState<WalkiePackage[]>([])
  const [loading, setLoading] = useState(true)
  const { addToQuote } = useQuote()

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch('/api/walkie-packages', {
          cache: 'no-store',
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

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
        "description": `Production comms package with ${pkg.walkieCount} walkie-talkies, ${pkg.walkieCount * pkg.batteriesPerWalkie} batteries, and ${pkg.walkieCount * pkg.headsetsPerWalkie} headsets`,
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

      <Hero>
        <motion.div
          className="text-center mt-8 -mb-1"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
          transition={smoothTransition}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Production Communication Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-4">
            Complete walkie talkie rental packages for film, TV, and live events. Each walkie
            includes 2 batteries and 1 headset. Customize your headset types in the quote.
          </p>
        </motion.div>
      </Hero>

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
 
          {/* Filter/Sort Section */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Showing {packages.length} packages
              </span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-16">
            {loading ? (
              // Loading skeleton
              [1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-200 rounded-2xl p-6 animate-pulse"
                >
                  <div className="h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              ))
            ) : packages.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <p className="text-xl text-gray-600">
                  No packages available at this time.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Please check back later or contact us for custom quotes.
                </p>
              </div>
            ) : (
              packages.map((pkg) => {
                const totalBatteries = pkg.walkieCount * pkg.batteriesPerWalkie
                const totalHeadsets = pkg.walkieCount * pkg.headsetsPerWalkie

                return (
                  <motion.div
                    key={pkg.id}
                    className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={smoothTransition}
                  >

                    {/* Package Content */}
                    <div className="p-6">
                      {/* Package Name */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {pkg.name}
                      </h3>

                      {/* Pricing */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-primary">
                            ${pkg.dailyRate}
                          </span>
                          <span className="text-gray-500">/day</span>
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          ${pkg.weeklyRate}/week
                        </div>
                      </div>

                      {/* Description */}
                      {pkg.description && (
                        <p className="text-gray-600 mb-6">
                          {pkg.description}
                        </p>
                      )}

                      {/* Equipment Grid */}
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-gray-700">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Radio className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{pkg.walkieCount} Walkie Talkies</div>
                            <div className="text-sm text-gray-500">Motorola MOTOTRBO</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Battery className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{totalBatteries} Batteries</div>
                            <div className="text-sm text-gray-500">2 per walkie</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-700">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Headphones className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{totalHeadsets} Headsets</div>
                            <div className="text-sm text-gray-500">Customizable types</div>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="border-t border-gray-200 pt-4 mb-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>Same-day shipping</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>24/7 on-set support</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Check className="h-4 w-4 text-green-600" />
                            <span>Pre-programmed channels</span>
                          </div>
                        </div>
                      </div>

                      {/* Add to Quote Button */}
                      <button
                        onClick={() => addToQuote(pkg)}
                        className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-lg transition-all duration-200 font-semibold flex items-center justify-center gap-2 group-hover:scale-105"
                        aria-label={`Add ${pkg.name} to quote`}
                      >
                        <ShoppingCart className="h-5 w-5" />
                        Add to Quote
                      </button>
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>


        </div>
      </div>
    </>
  )
}

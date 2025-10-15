"use client";

import Link from 'next/link'
import { Radio, Battery, Users, ShoppingCart, Headphones } from 'lucide-react'
import { motion } from "motion/react"
import { useEffect, useState, useMemo } from 'react'
import { WalkiePackage } from '@/lib/types'
import { HeadsetDistribution } from '@/lib/quote-types'
import { useQuote } from '@/contexts/QuoteContext'
import { scaleIn, scrollViewport } from '@/lib/animations'


const HEADSET_TYPES = [
  { key: '2-Wire Surveillance Kit' as const, label: '2-Wire Surveillance', shortLabel: '2-Wire' },
  { key: 'HMN9013B Lightweight Headset' as const, label: 'HMN9013B Lightweight', shortLabel: 'Lightweight' },
  { key: 'Remote Speaker Microphone' as const, label: 'Remote Speaker Mic', shortLabel: 'Speaker Mic' },
]

export default function PackagesPage() {
  const [packages, setPackages] = useState<WalkiePackage[]>([])
  const [loading, setLoading] = useState(true)
  const { addToQuote } = useQuote()
  
  // Track headset distributions for each package
  const [headsetSelections, setHeadsetSelections] = useState<Record<string, HeadsetDistribution>>({})

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch('/api/walkie-packages', {
          cache: 'no-store'
        })
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        setPackages(data)
        
        // Initialize headset selections with default distributions
        const initialSelections: Record<string, HeadsetDistribution> = {}
        data.forEach((pkg: WalkiePackage) => {
          initialSelections[pkg.id] = pkg.headsetDistribution
        })
        setHeadsetSelections(initialSelections)
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])
  
  const updateHeadsetCount = (packageId: string, headsetType: keyof HeadsetDistribution, value: number) => {
    const pkg = packages.find(p => p.id === packageId)
    if (!pkg) return
    
    const currentDistribution = headsetSelections[packageId]
    if (!currentDistribution) return
    
    // Calculate current total excluding the type we're updating
    const currentTotalExcludingType = Object.entries(currentDistribution)
      .filter(([key]) => key !== headsetType)
      .reduce((sum, [, count]) => sum + count, 0)
    
    const maxHeadsets = pkg.walkieCount
    const maxForThisType = maxHeadsets - currentTotalExcludingType
    const clampedValue = Math.max(0, Math.min(maxForThisType, value))
    
    setHeadsetSelections(prev => ({
      ...prev,
      [packageId]: {
        ...prev[packageId],
        [headsetType]: clampedValue
      }
    }))
  }
  
  const getTotalHeadsets = (packageId: string) => {
    const dist = headsetSelections[packageId]
    if (!dist) return 0
    return dist['2-Wire Surveillance Kit'] + dist['HMN9013B Lightweight Headset'] + dist['Remote Speaker Microphone']
  }
  
  const handleAddToQuote = (pkg: WalkiePackage) => {
    const customPkg = {
      ...pkg,
      headsetDistribution: headsetSelections[pkg.id] || pkg.headsetDistribution
    }
    addToQuote(customPkg)
  }
  
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
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={scaleIn}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Turnkey Walkie Talkie Rental Packages
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete production communication packages for film, TV, and live events.
            Each walkie includes 2 batteries and 1 headset. Customize your headset selection below.
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
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
          ) : packages.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-xl text-gray-600">No packages available at this time.</p>
              <p className="text-sm text-gray-500 mt-2">Please check back later or contact us for custom quotes.</p>
            </div>
          ) : (
            packages.map((pkg) => {
              const distribution = headsetSelections[pkg.id]
              const totalHeadsets = getTotalHeadsets(pkg.id)
              const totalBatteries = pkg.walkieCount * pkg.batteriesPerWalkie
              const expectedHeadsets = pkg.walkieCount * pkg.headsetsPerWalkie
              
              return (
            <div 
              key={pkg.id} 
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-primary/50 transition-colors duration-200"
            >
              {/* Package Header */}
              <div className="p-6 border-b border-gray-100 bg-gradient-to-br from-white to-blue-50/20">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-200">{pkg.name}</h3>
                    <p className="text-gray-600">{pkg.description || 'Complete turnkey production package'}</p>
                    {pkg.popular && (
                      <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-full mt-2">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold gradient-text">${pkg.dailyRate}</div>
                    <div className="text-sm text-gray-500">per day</div>
                    <div className="text-sm text-gray-400">${pkg.weeklyRate}/week</div>
                  </div>
                </div>
              </div>

              {/* Package Contents */}
              <div className="p-6 space-y-6">
                {/* Equipment Summary */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Package Contents:</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3 text-center">
                      <Radio className="h-6 w-6 text-primary mx-auto mb-1" />
                      <div className="text-2xl font-bold text-gray-900">{pkg.walkieCount}</div>
                      <div className="text-xs text-gray-600">Walkies</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <Battery className="h-6 w-6 text-green-600 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-gray-900">{totalBatteries}</div>
                      <div className="text-xs text-gray-600">Batteries</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <Headphones className="h-6 w-6 text-purple-600 mx-auto mb-1" />
                      <div className="text-2xl font-bold text-gray-900">{expectedHeadsets}</div>
                      <div className="text-xs text-gray-600">Headsets</div>
                    </div>
                  </div>
                </div>

                {/* Headset Selection */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Customize Your Headsets:</h4>
                  <div className="space-y-3">
                    {HEADSET_TYPES.map(({ key, label, shortLabel }) => {
                      const currentValue = distribution?.[key] || 0
                      const currentTotal = getTotalHeadsets(pkg.id)
                      const remainingSlots = expectedHeadsets - currentTotal
                      const maxForThisType = currentValue + remainingSlots
                      
                      return (
                      <div key={key} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                        <span className="text-sm font-medium text-gray-700">
                          <span className="hidden sm:inline">{label}</span>
                          <span className="sm:hidden">{shortLabel}</span>
                        </span>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateHeadsetCount(pkg.id, key, currentValue - 1)}
                            disabled={currentValue === 0}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors text-gray-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="0"
                            max={maxForThisType}
                            value={currentValue}
                            onChange={(e) => {
                              const value = parseInt(e.target.value) || 0
                              updateHeadsetCount(pkg.id, key, value)
                            }}
                            className="w-14 text-center font-semibold text-gray-900 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            onClick={() => updateHeadsetCount(pkg.id, key, currentValue + 1)}
                            disabled={currentValue >= maxForThisType}
                            className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-100 transition-colors text-gray-700 font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      )
                    })}
                  </div>
                  
                  {/* Headset Total Indicator */}
                  <div className={`mt-3 p-3 rounded-lg text-sm text-center font-medium ${
                    totalHeadsets === expectedHeadsets 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : totalHeadsets < expectedHeadsets
                      ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    Total: {totalHeadsets} / {expectedHeadsets} headsets
                    {totalHeadsets !== expectedHeadsets && (
                      <span className="ml-2">
                        {totalHeadsets < expectedHeadsets ? '(Add more)' : '(Too many)'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Package Footer */}
              <div className="px-6 pb-6">
                <button
                  onClick={() => handleAddToQuote(pkg)}
                  disabled={totalHeadsets !== expectedHeadsets}
                  className="w-full bg-primary hover:bg-primary-hover text-white text-center py-3 rounded-lg transition-all duration-200 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Add ${pkg.name} to quote`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Quote
                </button>
              </div>
            </div>
              )
            })
          )}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center py-16 border-t border-gray-200"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={scaleIn}
        >
          <h2 className="text-2xl font-bold mb-4">Need a custom production package?</h2>
          <p className="text-gray-600 mb-6">
            Large crew or unique production requirements? We&apos;ll create a custom comms package tailored to your shoot.
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
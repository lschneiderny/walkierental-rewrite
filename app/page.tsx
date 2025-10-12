'use client'

import Link from 'next/link'
import Hero from '@/components/Hero'
import { Truck, Shield, Clock, Phone, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Package } from '@/lib/types'

export default function Home() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch('/api/packages')
        const data = await res.json()
        setPackages(data.slice(0, 3)) // Get first 3 for popular packages
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  // Structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WalkieRentals",
    "url": "https://walkierentals.com",
    "logo": "https://walkierentals.com/logo.png",
    "description": "Professional walkie talkie rentals for events, productions, and communication needs",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "Customer Service",
      "email": "info@walkierentals.com",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": []
  }

  // Structured data for products
  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": packages.map((pkg, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": pkg.name,
        "description": pkg.description,
        "offers": {
          "@type": "Offer",
          "price": pkg.dailyRate,
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": pkg.dailyRate,
            "priceCurrency": "USD",
            "unitText": "DAY"
          }
        }
      }
    }))
  }
  const howItWorksRef = useRef(null)
  const packagesRef = useRef(null)
  const featuresRef = useRef(null)
  const faqRef = useRef(null)
  const ctaRef = useRef(null)
  
  const howItWorksInView = useInView(howItWorksRef, { once: true, margin: "-100px" })
  const packagesInView = useInView(packagesRef, { once: true, margin: "-100px" })
  const featuresInView = useInView(featuresRef, { once: true, margin: "-100px" })
  const faqInView = useInView(faqRef, { once: true, margin: "-100px" })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-100px" })

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />
      
      <div>
        {/* Hero Section */}
        <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* How it Works Section */}
        <section ref={howItWorksRef} className="py-16 border-t border-gray-200">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            How it works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: 1,
                title: "CHOOSE PACKAGE",
                description: "Browse our packages and select the perfect communication solution for your needs."
              },
              {
                step: 2,
                title: "RESERVE & SHIP",
                description: "Reserve your dates and we'll ship your equipment to arrive when you need it."
              },
              {
                step: 3,
                title: "COMMUNICATE",
                description: "Use professional-grade equipment for clear, reliable communication during your event."
              },
              {
                step: 4,
                title: "RETURN",
                description: "Send equipment back using the included prepaid return shipping label."
              }
            ].map((step, index) => (
              <motion.div 
                key={step.step} 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={howItWorksInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 text-white font-bold text-xl rounded-full mx-auto mb-4 shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {step.step}
                </motion.div>
                <h3 className="font-semibold text-sm uppercase tracking-wide mb-2 text-gray-900">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Popular Packages Section */}
        <section ref={packagesRef} className="py-16">
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={packagesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold">Popular packages</h2>
            <Link 
              href="/packages" 
              className="inline-flex items-center text-primary hover:text-primary-hover transition-colors group"
            >
              View all packages
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading skeleton
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))
            ) : (
              packages.map((pkg, index) => (
              <motion.div 
                key={pkg.id} 
                className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-soft-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={packagesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{pkg.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold gradient-text">${pkg.dailyRate}</span>
                    <span className="text-sm text-gray-500">/ day</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500">${pkg.weeklyRate} / week</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-sm text-gray-900 mb-2">Includes:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {pkg.includes.slice(0, 3).map((item, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                        {item}
                      </li>
                    ))}
                    {pkg.includes.length > 3 && (
                      <li className="text-gray-400">+ {pkg.includes.length - 3} more items</li>
                    )}
                  </ul>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium text-sm text-gray-900 mb-2">Best for:</h4>
                  <div className="flex flex-wrap gap-1">
                    {pkg.bestFor.slice(0, 2).map((use, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
                
                <Link 
                  href={`/packages/${pkg.id}`}
                  className="w-full bg-primary hover:bg-primary-hover text-white text-center py-3 rounded-lg transition-all duration-300 font-medium block group-hover:shadow-lg"
                >
                  View Details
                </Link>
              </motion.div>
            ))
            )}
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} className="py-16 border-t border-gray-200">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Why choose WalkieRentals?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Truck className="h-8 w-8" />,
                title: "Nationwide Shipping",
                description: "Fast, reliable shipping to anywhere in the continental US with prepaid return labels."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Professional Grade",
                description: "Commercial-quality equipment tested and maintained to ensure peak performance."
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "Flexible Rentals",
                description: "Daily, weekly, and monthly rental options to fit your project timeline."
              },
              {
                icon: <Phone className="h-8 w-8" />,
                title: "Expert Support",
                description: "24/7 customer support and technical assistance from communication professionals."
              }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 text-primary rounded-full mx-auto mb-4 group-hover:shadow-lg transition-shadow"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section ref={faqRef} className="py-16 border-t border-gray-200">
          <motion.h2 
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={faqInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How far in advance should I book?",
                answer: "We recommend booking at least 1-2 weeks in advance to guarantee availability, especially during peak event seasons."
              },
              {
                question: "Do you ship nationwide?",
                answer: "Yes, we ship across the continental United States with reliable shipping partners and include prepaid return labels."
              },
              {
                question: "What happens if equipment is damaged?",
                answer: "Contact us immediately if equipment is damaged. We'll assess the situation and guide you through next steps based on our damage policy."
              },
              {
                question: "Can I extend my rental period?",
                answer: "Extensions are possible subject to availability. Contact us as early as possible to arrange an extension."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index} 
                className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-lg p-6 hover:shadow-soft transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={faqInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section ref={ctaRef} className="py-16 border-t border-gray-200">
          <motion.div 
            className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center overflow-hidden shadow-soft-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={ctaInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div 
                className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full mix-blend-soft-light opacity-10"
                animate={{ 
                  scale: [1, 1.2, 1],
                  x: [0, 30, 0],
                  y: [0, 20, 0],
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-white rounded-full mix-blend-soft-light opacity-10"
                animate={{ 
                  scale: [1, 1.3, 1],
                  x: [0, -30, 0],
                  y: [0, -20, 0],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />
            </div>
            
            <div className="relative z-10">
              <motion.h2 
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to get started?
              </motion.h2>
              <motion.p 
                className="text-xl opacity-90 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Browse our packages or contact us for a custom quote tailored to your needs.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link 
                  href="/packages"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Browse Packages
                </Link>
                <Link 
                  href="/contact"
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl"
                >
                  Get Custom Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
    </>
  )
}
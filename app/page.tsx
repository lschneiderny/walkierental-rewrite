'use client'

import Link from 'next/link'
import Hero from '@/components/Hero'
import { Truck, Shield, Clock, Phone, ArrowRight, ShoppingCart } from 'lucide-react'
import { motion } from "motion/react"
import { useEffect, useState, useMemo } from 'react'
import { Package } from '@/lib/types'
import { useQuote } from '@/contexts/QuoteContext'
import { fadeInUp, staggerContainer, scaleIn, scrollViewport, staggerTransition } from '@/lib/animations'
import { CheckCircle } from 'lucide-react'

export default function Home() {
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
        setPackages(data.slice(0, 3))
      } catch (error) {
        console.error('Error fetching packages:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchPackages()
  }, [])

  // Memoize structured data to prevent recalculation
  const organizationSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WalkieRentals",
    "url": "https://walkierentals.com",
    "logo": "https://walkierentals.com/logo.png",
    "description": "Professional production communication equipment rental for film, TV, and live event productions. Production-ready equipment with knowlagable technical support.",
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
  }), [])

  // Memoize products schema - only recalculate when packages change
  const productsSchema = useMemo(() => ({
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
  }), [packages])

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
        <Hero>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Professional
                <span className="gradient-text block">Production Comms</span>
                Rental
              </h1>

              <p className="mt-6 text-xl text-gray-600 leading-relaxed">
                Reliable communication for film, TV, and live event productions.
                Production-ready equipment with nationwide delivery and support.
              </p>

              {/* Features */}
              <motion.div
                className="mt-8 space-y-3"
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                transition={{ ...staggerTransition, delayChildren: 0.3 }}
              >
                {[
                  "Broadcast-grade Motorola equipment",
                  "Pre-programmed & production-ready",
                  "technical support",
                  "Same-day shipping available",
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    variants={fadeInUp}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

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
                  Contact Support
                </Link>
              </div>
            </motion.div>

            {/* Right Content - Image Placeholder */}
            <motion.div
              className="lg:pl-8 self-start"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="relative">
                <div className="aspect-[4/3] bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-soft-lg transition-transform duration-300 hover:scale-[1.02]">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-12 h-12 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6.5 2C5.67 2 5 2.67 5 3.5v17c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5h-11zm11 2v16h-11V4h11z" />
                        <path d="M8 6h8v1H8V6zm0 2h8v1H8V8zm0 2h8v1H8v-1zm0 2h8v1H8v-1z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-sm">
                      Professional Walkie Talkie
                    </p>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-soft-lg p-4 border border-gray-100 transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <div className="text-2xl font-bold gradient-text">1000+</div>
                  <div className="text-sm text-gray-600">
                    Productions Supported
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-soft-lg p-4 border border-gray-100 transition-all duration-300 hover:scale-105 hover:-translate-y-1"></div>
              </div>
            </motion.div>
          </div>
        </Hero>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* How it Works Section */}
          <section className="py-16 border-t border-gray-200">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold mb-4">How it works</h2>
              <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                Welcome to WalkieRentals, your trusted partner for production
                communication equipment.
              </p>
            </motion.div>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              transition={staggerTransition}
            >
              {[
                {
                  step: 1,
                  title: "SELECT PACKAGE",
                  description:
                    "Choose production-ready comms packages tailored for film, TV, and live events.",
                },
                {
                  step: 2,
                  title: "SCHEDULE DELIVERY",
                  description:
                    "We ship pre-programmed equipment to your location or set. Same-day available.",
                },
                {
                  step: 3,
                  title: "PRODUCTION DAY",
                  description:
                    "Crystal-clear communication with technical support throughout your shoot.",
                },
                {
                  step: 4,
                  title: "EASY RETURN",
                  description:
                    "Wrap and return using the included prepaid shipping label. No hassle.",
                },
              ].map((step) => (
                <motion.div
                  key={step.step}
                  className="text-center group"
                  variants={scaleIn}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-blue-600 text-white font-bold text-xl rounded-full mx-auto mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-sm uppercase tracking-wide mb-2 text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>
          {/* fix Link position to be under the text, centered.
              Popular Packages Section */}
          <section className="py-16">
            <motion.div
              className="flex flex-col items-center justify-center mb-8 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeInUp}
            >
              <h2 className="text-3xl font-bold text-center">
                Production Packages
              </h2>
              <Link
                href="/packages"
                className="inline-flex items-center text-primary hover:text-primary-hover transition-colors group"
              >
                View all production packages
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              transition={staggerTransition}
            >
              {loading
                ? // Loading skeleton
                  [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse"
                    >
                      <div className="h-6 bg-gray-200 rounded mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded"></div>
                    </div>
                  ))
                : packages.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-soft-lg will-change-transform"
                      variants={fadeInUp}
                    >
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {pkg.name}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {pkg.description}
                        </p>
                        <div className="flex items-baseline space-x-2">
                          <span className="text-2xl font-bold gradient-text">
                            ${pkg.dailyRate}
                          </span>
                          <span className="text-sm text-gray-500">/ day</span>
                          <span className="text-sm text-gray-400">•</span>
                          <span className="text-sm text-gray-500">
                            ${pkg.weeklyRate} / week
                          </span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-medium text-sm text-gray-900 mb-2">
                          Includes:
                        </h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          {pkg.includes.slice(0, 3).map((item, index) => (
                            <li key={index} className="flex items-center">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                              {item}
                            </li>
                          ))}
                          {pkg.includes.length > 3 && (
                            <li className="text-gray-400">
                              + {pkg.includes.length - 3} more items
                            </li>
                          )}
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-medium text-sm text-gray-900 mb-2">
                          Best for:
                        </h4>
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

                      <div className="flex gap-2">
                        <button
                          onClick={() => addToQuote(pkg)}
                          className="flex-1 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white text-center py-3 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2 group/btn"
                          aria-label={`Add ${pkg.name} to quote`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span className="hidden sm:inline">Add to Quote</span>
                          <span className="sm:hidden">Quote</span>
                        </button>
                        <Link
                          href={`/packages/${pkg.id}`}
                          className="flex-1 bg-primary hover:bg-primary-hover text-white text-center py-3 rounded-lg transition-all duration-300 font-medium block"
                        >
                          Details
                        </Link>
                      </div>
                    </motion.div>
                  ))}
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="py-16 border-t border-gray-200">
            <motion.h2
              className="text-3xl font-bold text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={fadeInUp}
            >
              Why Production Teams Trust Us
            </motion.h2>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              transition={staggerTransition}
            >
              {[
                {
                  icon: <Truck className="h-8 w-8" />,
                  title: "Fast Delivery",
                  description:
                    "Same-day shipping available. Equipment arrives production-ready and pre-programmed tailored to your specs.",
                },
                {
                  icon: <Shield className="h-8 w-8" />,
                  title: "Broadcast Quality",
                  description:
                    "Motorola MOTOTRBO radios with superior audio quality, outstanding coverage, long-lasting battery life for on-set communication.",
                },
                {
                  icon: <Clock className="h-8 w-8" />,
                  title: "Flexible Periods",
                  description:
                    "Daily, weekly, and monthly rentals. Easy extensions if your production runs long.",
                },
                {
                  icon: <Phone className="h-8 w-8" />,
                  title: "Technical Support",
                  description:
                    "Real production professionals on call. We understand set life.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  variants={scaleIn}
                >
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-50 text-primary rounded-full mx-auto mb-4 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* CTA Section */}
          <section className="py-16 border-t border-gray-200">
            <motion.div
              className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-12 text-white text-center overflow-hidden shadow-soft-lg"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={scaleIn}
            >
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready for your next production?
                </h2>
                <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                  Get production-ready comms delivered fast. Same-day shipping
                  available for urgent shoots.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/packages"
                    className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
                  >
                    View Production Packages
                  </Link>
                  <a
                    href="https://gothamsound.com/rental"
                    className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Request Custom Quote
                  </a>
                </div>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </>
  );
}



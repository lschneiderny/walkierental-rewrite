'use client'

import Link from 'next/link'
import { motion } from "motion/react"
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { WalkiePackage } from '@/lib/types'
import { useQuote } from '@/contexts/QuoteContext'
import { fadeInUp, staggerContainer, staggerTransition, scrollViewport, smoothTransition } from '@/lib/animations'

interface PackageListProps {
  packages: WalkiePackage[]
}

export default function PackageList({ packages }: PackageListProps) {
  const { addToQuote } = useQuote()

  return (
    <section className="py-16">
      <motion.div
        className="flex flex-col items-center justify-center mb-8 gap-4"
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        variants={fadeInUp}
        transition={smoothTransition}
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
        layout
      >
        {packages.slice(0, 3).map((pkg) => (
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
                {pkg.description || `Complete package with ${pkg.walkieCount} walkies`}
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
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                  {pkg.walkieCount} Walkie Talkies
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                  {pkg.walkieCount * pkg.batteriesPerWalkie} Batteries
                </li>
                <li className="flex items-center">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                  {pkg.walkieCount * pkg.headsetsPerWalkie} Headsets
                </li>
              </ul>
            </div>

            <div className="mb-6">
              {pkg.popular && (
                <span className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-full">
                  Most Popular
                </span>
              )}
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
  )
}

'use client'

import Link from 'next/link'
import { motion } from "motion/react"
import { Truck, Shield, Clock, Phone } from 'lucide-react'
import { fadeInUp, staggerContainer, scaleIn, scrollViewport, staggerTransition, smoothTransition } from '@/lib/animations'

export default function HomeContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* How it Works Section */}
      <section className="py-16 border-t border-gray-200">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeInUp}
          transition={smoothTransition}
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
          layout
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
      
      <section className="py-3 border-t border-gray-200">
      {children}
      </section>

      {/* Features Section */}
      <section className="py-16 border-t border-gray-200">
        <motion.h2
          className="text-3xl font-bold text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeInUp}
          transition={smoothTransition}
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
          transition={smoothTransition}
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
  )
}

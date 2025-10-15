'use client'

import { Phone, Mail, MapPin, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from "motion/react"
// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Let&apos;s Talk About Your
              <span className="gradient-text block">Production Needs</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Whether you need same-day equipment or have questions about our services, 
              our production communications experts are here to help.
            </p>
            
            {/* Quick Stats */}
            <motion.div 
              className="flex flex-wrap justify-center gap-8 mt-8"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {[
                { icon: <Clock className="h-6 w-6" />, label: '2-Hour Response', text: 'Average' },
                { icon: <Phone className="h-6 w-6" />, label: '24/7 Support', text: 'Always Available' },
                { icon: <CheckCircle className="h-6 w-6" />, label: 'Expert Team', text: 'Production Pros' }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-soft"
                  variants={fadeInUp}
                >
                  <div className="text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">{stat.label}</div>
                    <div className="text-sm text-gray-600">{stat.text}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Contact Section */}
        <section className="py-16">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {/* Quick Contact Cards */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              variants={fadeInUp}
            >
              <a 
                href="tel:5551234567"
                className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="h-6 w-6" />
                      <span className="text-sm font-medium opacity-90">Call Us Now</span>
                    </div>
                    <div className="text-2xl font-bold">(555) 123-4567</div>
                    <div className="text-sm opacity-90 mt-1">Mon-Fri, 8am-6pm EST</div>
                  </div>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              <a 
                href="mailto:info@walkierentals.com"
                className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Mail className="h-6 w-6" />
                      <span className="text-sm font-medium opacity-90">Email Us</span>
                    </div>
                    <div className="text-xl font-bold">info@walkierentals.com</div>
                    <div className="text-sm opacity-90 mt-1">2-hour response time</div>
                  </div>
                  <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            </motion.div>

            {/* Additional Contact Info */}
            <motion.div 
              className="bg-white border border-gray-200 rounded-xl p-8"
              variants={fadeInUp}
            >
              <h3 className="font-bold text-gray-900 mb-6 text-xl">Other Ways to Reach Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Nationwide Shipping</div>
                    <div className="text-sm text-gray-600">Continental United States</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">Business Hours</div>
                    <div className="text-sm text-gray-600">Mon-Fri: 8am-6pm EST</div>
                    <div className="text-sm text-gray-600">Sat: 9am-3pm EST</div>
                    <div className="text-sm text-gray-600">Sun: Closed</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 border-t border-gray-200">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Quick answers to common questions about our production communication rentals
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                question: "Is the equipment really ready to use out of the box?",
                answer: "Absolutely! Our turnkey solution means every radio arrives fully charged, pre-programmed to your specifications, and tested. Simply unpack and you're ready to communicate."
              },
              {
                question: "What's included in the turnkey package?",
                answer: "Everything you need: pre-programmed radios, charged batteries, earpieces, carrying cases, and prepaid return shipping. No setup, no hassle - just open and use."
              },
              {
                question: "How does the turnkey delivery process work?",
                answer: "Order online or by phone, we program and ship same-day (orders before 2pm EST). Equipment arrives production-ready. After your shoot, use the included prepaid label to return - completely hassle-free."
              },
              {
                question: "What if I have technical issues during my rental?",
                answer: "Our 24/7 turnkey support includes instant troubleshooting, equipment replacement if needed, and rental extensions. You focus on production, we handle the rest."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl p-6 border border-gray-100 hover:shadow-soft transition-all duration-300"
                variants={fadeInUp}
              >
                <h3 className="font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-600 mb-6">
              Have more questions? We&apos;re here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:5551234567"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </a>
              <a 
                href="mailto:info@walkierentals.com"
                className="inline-flex items-center justify-center border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                <Mail className="mr-2 h-5 w-5" />
                Email Support
              </a>
            </div>
          </motion.div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16">
          <motion.div 
            className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-12 text-white text-center overflow-hidden shadow-soft-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Equip Your Production?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Get broadcast-quality communication equipment delivered fast. Same-day shipping available.
              </p>
              <a 
                href="/packages"
                className="inline-flex items-center bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                View Production Packages
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
'use client'

import { Phone, Mail, MessageSquare, Clock, CheckCircle, Send, ArrowRight, Plug } from 'lucide-react'
import { motion } from "motion/react"
import { fadeInUp, staggerContainer, scaleIn, slideInRight, scrollViewport, staggerTransition } from '@/lib/animations'
import { useState } from 'react'
import StickyBanner from '@/components/StickyBanner'
import Hero from '@/components/Hero'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div>
      {/* change text */}
      <StickyBanner
        message="Need a more specific quote? Talk to the walkie rental experts at "
        linkText="GothamSound"
        linkUrl="https://gothamsound.com"
        backgroundColor="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"
        textColor="text-white"
        dismissible={true}
        className=""
      />

      <Hero>
        <div className="text-center justify-center">
          <div className="mt-8 ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            Contact Us
          </h1>
          <p className="mt-4 text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Get in touch with us for any questions or inquiries.
          </p>
        </div>
        </div>
      </Hero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contact Cards & Form Section */}
        <section className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left Side - Contact Cards */}
            <motion.div
              className="lg:col-span-1 space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={staggerContainer}
              transition={staggerTransition}
            >
              {/* Phone Card */}
              <motion.a
                href="tel:5551234567"
                className="block bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                variants={scaleIn}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium opacity-90">
                      Call Us
                    </div>
                    <div className="text-xl font-bold">(212) 555-5555</div>
                  </div>
                </div>
                <p className="text-sm opacity-90">Mon-Fri: 8am-6pm EST</p>
              </motion.a>

              {/* Email Card */}
              <motion.a
                href="mailto:info@walkierentals.com"
                className="block bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                variants={scaleIn}
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white/20 p-3 rounded-lg group-hover:bg-white/30 transition-colors">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-sm font-medium opacity-90">
                      Email Us
                    </div>
                    <div className="text-lg font-bold">
                      info@walkierentals.com
                    </div>
                  </div>
                </div>
                <p className="text-sm opacity-90">2-hour response time</p>
              </motion.a>

              {/* Stats Card */}
              <motion.div
                className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 shadow-soft"
                variants={scaleIn}
              >
                <div className="space-y-4">
                  <div className="text-sm opacity-90">Mon-Fri: 8am-6pm EST</div>
                  <div className="text-sm opacity-90">Sat-Sun: 9am-5pm EST</div>
                  <div className="text-sm opacity-90">
                    Closed on major holidays
                  </div>
                  <div className="text-sm opacity-90">2-hour response time</div>
                  <div className="text-sm opacity-90">24/7 support</div>
                  <div className="text-sm opacity-90">Expert team</div>
                  <div className="text-sm opacity-90">GothamSound</div>
                  <div className="text-sm opacity-90">some shit</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form 
            add dropdown on name line for catagory*/}
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              variants={slideInRight}
            >
              <div className="bg-white rounded-2xl shadow-soft-lg p-8 border border-gray-100">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we will get back to you.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 mb-0"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-900 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all resize-none"
                      placeholder="Tell us about your production needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2 group"
                  >
                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section **ADD EXPANSION FOR FREQUENTLY ASKED QUESTIONS** */}
        <section className="py-16 border-t border-gray-200">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={fadeInUp}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Quick answers to common questions about our production
                communication rentals
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={staggerContainer}
            transition={staggerTransition}
          >
            {[
              {
                question:
                  "Is the equipment really ready to use out of the box?",
                answer:
                  "Absolutely! Our turnkey solution means every radio arrives fully charged, pre-programmed to your specifications, and tested. Simply unpack and you're ready to communicate.",
              },
              {
                question: "What's included in the turnkey package?",
                answer:
                  "Everything you need: pre-programmed radios, charged batteries, earpieces, carrying cases, and prepaid return shipping. No setup, no hassle - just open and use.",
              },
              {
                question: "How does the turnkey delivery process work?",
                answer:
                  "Order online or by phone, we program and ship same-day (orders before 2pm EST). Equipment arrives production-ready. After your shoot, use the included prepaid label to return - completely hassle-free.",
              },
              {
                question: "What if I have technical issues during my rental?",
                answer:
                  "Our 24/7 turnkey support includes instant troubleshooting, equipment replacement if needed, and rental extensions. You focus on production, we handle the rest.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-blue-50/30 rounded-xl p-6 border border-gray-100 hover:shadow-soft transition-all duration-300"
                variants={scaleIn}
              >
                <h3 className="font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
        {/* use sections for line breaks */}
        {/* Final CTA Section */}
        <section className="pb-16">
          <motion.div
            className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-12 text-white text-center overflow-hidden shadow-soft-lg"
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={scaleIn}
          >
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Equip Your Production?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Get broadcast-quality communication equipment delivered fast.
                Same-day shipping available.
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
  );
}
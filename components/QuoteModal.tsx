'use client'

import { motion, AnimatePresence } from "motion/react"
import { X, Trash2, Send, Package as PackageIcon, Headphones, ChevronDown, ChevronUp } from 'lucide-react'
import { useQuote } from '@/contexts/QuoteContext'
import { type HeadsetDistribution } from '@/lib/quote-types'
import { useState } from 'react'

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
}

const HEADSET_TYPES = [
  { key: '2-Wire Surveillance Kit' as const, label: '2-Wire Surveillance Kit' },
  { key: 'HMN9013B Lightweight Headset' as const, label: 'HMN9013B Lightweight' },
  { key: 'Remote Speaker Microphone' as const, label: 'Remote Speaker Mic' },
]

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const { quoteItems, removeFromQuote, updateQuantity, updateHeadsetDistribution, clearQuote } = useQuote()
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set())
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    eventType: '',
    startDate: '',
    endDate: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const toggleExpanded = (packageId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(packageId)) {
        newSet.delete(packageId)
      } else {
        newSet.add(packageId)
      }
      return newSet
    })
  }
  
  const updateHeadsetCount = (packageId: string, headsetType: keyof HeadsetDistribution, value: number) => {
    const item = quoteItems.find(i => i.packageId === packageId)
    if (!item || !item.headsetDistribution) return
    
    const newDistribution = {
      ...item.headsetDistribution,
      [headsetType]: Math.max(0, value)
    }
    updateHeadsetDistribution(packageId, newDistribution)
  }
  
  const getTotalHeadsets = (distribution: HeadsetDistribution) => {
    return distribution['2-Wire Surveillance Kit'] + 
           distribution['HMN9013B Lightweight Headset'] + 
           distribution['Remote Speaker Microphone']
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitSuccess(true)
    
    // Clear form and quote after success
    setTimeout(() => {
      clearQuote()
      setSubmitSuccess(false)
      onClose()
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        eventType: '',
        startDate: '',
        endDate: '',
        message: ''
      })
    }, 2000)
  }

  const calculateRentalDays = () => {
    if (!formData.startDate || !formData.endDate) return 0
    const start = new Date(formData.startDate)
    const end = new Date(formData.endDate)
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    return days > 0 ? days : 0
  }

  const rentalDays = calculateRentalDays()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden pointer-events-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <PackageIcon className="h-6 w-6" />
                  <h2 className="text-2xl font-bold">Request Quote</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-white/80 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
                {submitSuccess ? (
                  <div className="p-8 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 15 }}
                      className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Quote Request Sent!</h3>
                    <p className="text-gray-600">We&apos;ll get back to you within 2 hours with a detailed quote.</p>
                  </div>
                ) : (
                  <div className="p-6 space-y-6">
                    {/* Quote Items */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">Selected Packages ({quoteItems.length})</h3>
                        {quoteItems.length > 0 && (
                          <button
                            onClick={clearQuote}
                            className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
                          >
                            Clear All
                          </button>
                        )}
                      </div>

                      {quoteItems.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                          <PackageIcon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-gray-500">No packages selected yet</p>
                          <p className="text-sm text-gray-400 mt-1">Browse our packages and add them to your quote</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {quoteItems.map((item) => {
                            const isExpanded = expandedItems.has(item.packageId)
                            const hasHeadsets = item.headsetDistribution && item.walkieCount
                            const expectedHeadsets = hasHeadsets ? (item.walkieCount || 0) : 0
                            const totalHeadsets = hasHeadsets ? getTotalHeadsets(item.headsetDistribution!) : 0
                            
                            return (
                            <div
                              key={item.packageId}
                              className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
                            >
                              <div className="flex items-center justify-between p-4">
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">{item.packageName}</h4>
                                  <div className="flex items-center space-x-3 mt-1">
                                    <span className="text-sm text-gray-600">
                                      ${item.dailyRate}/day • ${item.weeklyRate}/week
                                    </span>
                                  </div>
                                  {hasHeadsets && (
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                        {item.walkieCount} walkies
                                      </span>
                                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                        {totalHeadsets} headsets
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center space-x-3">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => updateQuantity(item.packageId, item.quantity - 1)}
                                      className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                    >
                                      −
                                    </button>
                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                    <button
                                      onClick={() => updateQuantity(item.packageId, item.quantity + 1)}
                                      className="w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                                    >
                                      +
                                    </button>
                                  </div>
                                  {hasHeadsets && (
                                    <button
                                      onClick={() => toggleExpanded(item.packageId)}
                                      className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-200 rounded transition-colors"
                                      aria-label="Toggle headset details"
                                    >
                                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                    </button>
                                  )}
                                  <button
                                    onClick={() => removeFromQuote(item.packageId)}
                                    className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded transition-colors"
                                    aria-label="Remove from quote"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              
                              {/* Headset Distribution Editor */}
                              {hasHeadsets && isExpanded && item.headsetDistribution && (
                                <div className="px-4 pb-4 border-t border-gray-200 pt-4 bg-white">
                                  <div className="flex items-center gap-2 mb-3">
                                    <Headphones className="h-4 w-4 text-purple-600" />
                                    <h5 className="text-sm font-semibold text-gray-900">Customize Headsets</h5>
                                  </div>
                                  <div className="space-y-2">
                                    {HEADSET_TYPES.map(({ key, label }) => (
                                      <div key={key} className="flex items-center justify-between">
                                        <span className="text-xs text-gray-700">{label}</span>
                                        <div className="flex items-center space-x-2">
                                          <button
                                            onClick={() => updateHeadsetCount(item.packageId, key, item.headsetDistribution![key] - 1)}
                                            className="w-7 h-7 flex items-center justify-center bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors text-sm"
                                          >
                                            −
                                          </button>
                                          <span className="w-8 text-center text-sm font-semibold">{item.headsetDistribution![key]}</span>
                                          <button
                                            onClick={() => updateHeadsetCount(item.packageId, key, item.headsetDistribution![key] + 1)}
                                            className="w-7 h-7 flex items-center justify-center bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 transition-colors text-sm"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className={`mt-3 p-2 rounded text-xs text-center font-medium ${
                                    totalHeadsets === expectedHeadsets 
                                      ? 'bg-green-50 text-green-700' 
                                      : totalHeadsets < expectedHeadsets
                                      ? 'bg-yellow-50 text-yellow-700'
                                      : 'bg-red-50 text-red-700'
                                  }`}>
                                    Total: {totalHeadsets} / {expectedHeadsets} headsets
                                  </div>
                                </div>
                              )}
                            </div>
                            )
                          })}
                        </div>
                      )}
                    </div>

                    {/* Quote Form */}
                    {quoteItems.length > 0 && (
                      <form onSubmit={handleSubmit} className="space-y-4 border-t border-gray-200 pt-6">
                        <h3 className="text-lg font-semibold text-gray-900">Your Information</h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                              First Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="firstName"
                              type="text"
                              required
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                              Last Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="lastName"
                              type="text"
                              required
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="email"
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                            Company/Production Name
                          </label>
                          <input
                            id="company"
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                          />
                        </div>

                        <div>
                          <label htmlFor="eventType" className="block text-sm font-medium text-gray-700 mb-1">
                            Production Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="eventType"
                            required
                            value={formData.eventType}
                            onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                          >
                            <option value="">Select type</option>
                            <option value="film">Film Production</option>
                            <option value="tv">TV Production</option>
                            <option value="commercial">Commercial</option>
                            <option value="live-event">Live Event</option>
                            <option value="concert">Concert/Festival</option>
                            <option value="corporate">Corporate Event</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                              Start Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="startDate"
                              type="date"
                              required
                              value={formData.startDate}
                              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                              End Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="endDate"
                              type="date"
                              required
                              value={formData.endDate}
                              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                            />
                          </div>
                        </div>

                        {rentalDays > 0 && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                              <strong>Rental Duration:</strong> {rentalDays} {rentalDays === 1 ? 'day' : 'days'}
                            </p>
                          </div>
                        )}

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Additional Details
                          </label>
                          <textarea
                            id="message"
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                            placeholder="Tell us about your production needs..."
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-primary hover:bg-primary-hover text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Sending...</span>
                            </>
                          ) : (
                            <>
                              <Send className="h-5 w-5" />
                              <span>Request Quote</span>
                            </>
                          )}
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}


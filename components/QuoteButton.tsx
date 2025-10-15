'use client'

import { motion } from "motion/react"
import { ShoppingCart } from 'lucide-react'
import { useQuote } from '@/contexts/QuoteContext'
import { useState } from 'react'
import QuoteModal from './QuoteModal'

export default function QuoteButton() {
  const { getTotalItems } = useQuote()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const totalItems = getTotalItems()

  if (totalItems === 0) return null

  return (
    <>
      <motion.button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-hover text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 z-40 flex items-center space-x-2 group"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`View quote with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
      >
        <div className="relative">
          <ShoppingCart className="h-6 w-6" />
          <motion.span
            className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={totalItems}
          >
            {totalItems}
          </motion.span>
        </div>
        <span className="hidden sm:block font-semibold pr-2">View Quote</span>
      </motion.button>

      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}


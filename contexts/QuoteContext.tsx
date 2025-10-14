'use client'

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { Package } from '@/lib/types'
import { QuoteItem } from '@/lib/quote-types'

interface QuoteContextType {
  quoteItems: QuoteItem[]
  addToQuote: (pkg: Package, quantity?: number) => void
  removeFromQuote: (packageId: string) => void
  updateQuantity: (packageId: string, quantity: number) => void
  clearQuote: () => void
  getTotalItems: () => number
}

const QuoteContext = createContext<QuoteContextType | undefined>(undefined)

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([])

  const addToQuote = useCallback((pkg: Package, quantity: number = 1) => {
    setQuoteItems(prev => {
      const existingIndex = prev.findIndex(item => item.packageId === pkg.id)
      
      if (existingIndex >= 0) {
        // Update quantity if item already exists
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        }
        return updated
      }
      
      // Add new item
      return [...prev, {
        packageId: pkg.id,
        packageName: pkg.name,
        dailyRate: pkg.dailyRate,
        weeklyRate: pkg.weeklyRate,
        quantity
      }]
    })
  }, [])

  const removeFromQuote = useCallback((packageId: string) => {
    setQuoteItems(prev => prev.filter(item => item.packageId !== packageId))
  }, [])

  const updateQuantity = useCallback((packageId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuote(packageId)
      return
    }
    
    setQuoteItems(prev => 
      prev.map(item => 
        item.packageId === packageId 
          ? { ...item, quantity }
          : item
      )
    )
  }, [removeFromQuote])

  const clearQuote = useCallback(() => {
    setQuoteItems([])
  }, [])

  const getTotalItems = useCallback(() => {
    return quoteItems.reduce((total, item) => total + item.quantity, 0)
  }, [quoteItems])

  return (
    <QuoteContext.Provider
      value={{
        quoteItems,
        addToQuote,
        removeFromQuote,
        updateQuantity,
        clearQuote,
        getTotalItems
      }}
    >
      {children}
    </QuoteContext.Provider>
  )
}

export function useQuote() {
  const context = useContext(QuoteContext)
  if (context === undefined) {
    throw new Error('useQuote must be used within a QuoteProvider')
  }
  return context
}


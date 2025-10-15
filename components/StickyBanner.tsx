'use client'

import { motion } from "motion/react"
import { X, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { fadeInUp } from '@/lib/animations'

interface StickyBannerProps {
  message: string
  linkText?: string
  linkUrl?: string
  backgroundColor?: string
  textColor?: string
  dismissible?: boolean
  className?: string
}

export default function StickyBanner({
  message,
  linkText,
  linkUrl,
  backgroundColor = "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600",
  textColor = "text-white",
  dismissible = true,
  className = ""
}: StickyBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeInUp}
      className={`fixed bottom-0 left-0 z-50 flex justify-between w-full p-4 border-t ${backgroundColor} ${textColor} ${className}`}
    >
      <div className="flex items-center mx-auto">
        <p className="flex items-center text-sm font-normal">
          <span className="mr-2">{message}</span>
          {linkText && linkUrl && (
            <a
              href={linkUrl}
              className="inline-flex items-center font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkText}
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          )}
        </p>
      </div>
      {dismissible && (
        <motion.button
          onClick={() => setIsVisible(false)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="shrink-0 inline-flex justify-center w-7 h-7 items-center hover:bg-white/10 rounded-lg p-1.5"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </motion.button>
      )}
    </motion.div>
  )
}
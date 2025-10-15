'use client'

import { motion } from "motion/react"
import { X, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { fadeInUp, scaleIn } from '@/lib/animations'

interface AnimatedBannerProps {
  message: string
  linkText?: string
  linkUrl?: string
  backgroundColor?: string
  textColor?: string
  dismissible?: boolean
  className?: string
}

export default function AnimatedBanner({
  message,
  linkText,
  linkUrl,
  backgroundColor = "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600",
  textColor = "text-white",
  dismissible = true,
  className = ""
}: AnimatedBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <motion.div
      className={`relative overflow-hidden ${backgroundColor} ${className}`}
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      layout
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 bg-white/10 rounded-full"
          animate={{
            x: [0, 100, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 -right-4 w-6 h-6 bg-white/10 rounded-full"
          animate={{
            x: [0, -80, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-2 left-1/4 w-4 h-4 bg-white/10 rounded-full"
          animate={{
            x: [0, 60, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center flex-1 min-w-0"
            variants={fadeInUp}
          >
            <div className="flex-1 text-center sm:text-left">
              <p className={`text-sm sm:text-base font-medium ${textColor}`}>
                {message}
              </p>
              
              {linkText && linkUrl && (
                <motion.a
                  href={linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 mt-2 sm:mt-0 sm:ml-4 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 ${textColor} text-sm font-semibold transition-all duration-300 hover:scale-105`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {linkText}
                  <ExternalLink className="h-3 w-3" />
                </motion.a>
              )}
            </div>
          </motion.div>
          
          {dismissible && (
            <motion.button
              onClick={() => setIsVisible(false)}
              className={`flex-shrink-0 ml-4 p-1 rounded-full hover:bg-white/20 ${textColor} transition-colors duration-200`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Dismiss banner"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Animated shine effect */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)"
        }}
        animate={{
          x: ["-100%", "100%"]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 5
        }}
      />
    </motion.div>
  )
}
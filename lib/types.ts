// Type definitions for the application

// Headset Types - based on items.md
export type HeadsetType =
  | '2-Wire Surveillance Kit' // Also called surveillance headset
  | 'HMN9013B Lightweight Headset' // Also called Madonna headset
  | 'Remote Speaker Microphone' // Also called hand mic

// Headset distribution for a package
export interface HeadsetDistribution {
  '2-Wire Surveillance Kit': number
  'HMN9013B Lightweight Headset': number
  'Remote Speaker Microphone': number
}

// Package configuration - fixed sizes: 6, 8, 12, 16, 24, 32 walkies
export interface WalkiePackage {
  id: string
  name: string
  description?: string
  walkieCount: 6 | 8 | 12 | 16 | 24 | 32 // Only these sizes
  batteriesPerWalkie: 2 // Always 2 batteries per walkie
  headsetsPerWalkie: 1 // Always 1 headset per walkie
  dailyRate: number
  weeklyRate: number
  popular?: boolean
  headsetDistribution: HeadsetDistribution // User can customize this
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface WalkiePackageInput {
  name: string
  walkieCount: 6 | 8 | 12 | 16 | 24 | 32
  dailyRate: number
  weeklyRate: number
  headsetDistribution?: HeadsetDistribution
}


// Booking for walkie package rentals
export interface Booking {
  id: string
  walkiePackageId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  startDate: Date
  endDate: Date
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
  totalCost: number
  notes?: string
  // Custom headset distribution for this booking (user can modify from package default)
  customHeadsetDistribution?: HeadsetDistribution
  createdAt: Date
  updatedAt: Date
}


import { WalkiePackage } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ''

export async function getPackages(): Promise<WalkiePackage[]> {
  const res = await fetch(`${API_BASE_URL}/api/packages`, {
    next: { revalidate: 60 }, // Cache for 60 seconds
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch packages')
  }
  
  return res.json()
}

export async function getPackage(id: string): Promise<WalkiePackage> {
  const res = await fetch(`${API_BASE_URL}/api/packages/${id}`, {
    next: { revalidate: 30 }, // Cache for 30 seconds
  })
  
  if (!res.ok) {
    throw new Error('Failed to fetch package')
  }
  
  return res.json()
}

export async function checkAvailability(
  packageId: string,
  startDate: string,
  endDate: string
): Promise<{
  packageId: string
  availableCount: number
  totalCount: number
  isAvailable: boolean
}> {
  const res = await fetch(
    `${API_BASE_URL}/api/packages/${packageId}/availability?startDate=${startDate}&endDate=${endDate}`,
    {
      cache: 'no-store', // Don't cache availability checks
    }
  )
  
  if (!res.ok) {
    throw new Error('Failed to check availability')
  }
  
  return res.json()
}


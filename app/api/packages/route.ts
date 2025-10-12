import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Package } from '@/lib/types'

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      where: {
        isActive: true,
      },
      include: {
        inventoryItems: {
          select: {
            id: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    // Transform the data to match the expected format
    const transformedPackages: Package[] = packages.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      description: pkg.description,
      dailyRate: pkg.dailyRate,
      weeklyRate: pkg.weeklyRate,
      includes: JSON.parse(pkg.includes),
      bestFor: JSON.parse(pkg.bestFor),
      specifications: {
        range: pkg.range,
        channels: pkg.channels,
        batteryLife: pkg.batteryLife,
        accessories: JSON.parse(pkg.accessories),
      },
    }))

    return NextResponse.json(transformedPackages)
  } catch (error) {
    console.error('Error fetching packages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch packages' },
      { status: 500 }
    )
  }
}


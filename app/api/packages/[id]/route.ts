import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { Package } from '@/lib/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const packageData = await prisma.package.findUnique({
      where: {
        id: params.id,
      },
      include: {
        inventoryItems: {
          select: {
            id: true,
            status: true,
            condition: true,
          },
        },
      },
    })

    if (!packageData) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    // Transform the data to match the expected format
    const transformedPackage: Package = {
      id: packageData.id,
      name: packageData.name,
      description: packageData.description,
      dailyRate: packageData.dailyRate,
      weeklyRate: packageData.weeklyRate,
      includes: JSON.parse(packageData.includes),
      bestFor: JSON.parse(packageData.bestFor),
      specifications: {
        range: packageData.range,
        channels: packageData.channels,
        batteryLife: packageData.batteryLife,
        accessories: JSON.parse(packageData.accessories),
      },
    }

    return NextResponse.json({
      ...transformedPackage,
      availableCount: packageData.inventoryItems.filter(
        (item) => item.status === 'available'
      ).length,
      totalCount: packageData.inventoryItems.length,
    })
  } catch (error) {
    console.error('Error fetching package:', error)
    return NextResponse.json(
      { error: 'Failed to fetch package' },
      { status: 500 }
    )
  }
}


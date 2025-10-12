import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'Start date and end date are required' },
        { status: 400 }
      )
    }

    // Get all inventory items for this package
    const inventoryItems = await prisma.inventoryItem.findMany({
      where: {
        packageId: params.id,
        status: 'available',
      },
      include: {
        bookings: {
          where: {
            status: {
              in: ['pending', 'confirmed', 'active'],
            },
            OR: [
              {
                AND: [
                  { startDate: { lte: new Date(endDate) } },
                  { endDate: { gte: new Date(startDate) } },
                ],
              },
            ],
          },
        },
      },
    })

    // Filter out items that have conflicting bookings
    const availableItems = inventoryItems.filter(
      (item) => item.bookings.length === 0
    )

    return NextResponse.json({
      packageId: params.id,
      availableCount: availableItems.length,
      totalCount: inventoryItems.length,
      isAvailable: availableItems.length > 0,
    })
  } catch (error) {
    console.error('Error checking availability:', error)
    return NextResponse.json(
      { error: 'Failed to check availability' },
      { status: 500 }
    )
  }
}


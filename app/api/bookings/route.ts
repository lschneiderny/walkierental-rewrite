import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        package: {
          select: {
            id: true,
            name: true,
          },
        },
        inventoryItem: {
          select: {
            id: true,
            serialNumber: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      packageId,
      customerName,
      customerEmail,
      customerPhone,
      startDate,
      endDate,
      notes,
    } = body

    if (!packageId || !customerName || !customerEmail || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Find an available inventory item
    const availableItem = await prisma.inventoryItem.findFirst({
      where: {
        packageId,
        status: 'available',
        bookings: {
          none: {
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

    if (!availableItem) {
      return NextResponse.json(
        { error: 'No inventory available for the selected dates' },
        { status: 400 }
      )
    }

    // Get package to calculate cost
    const packageData = await prisma.package.findUnique({
      where: { id: packageId },
    })

    if (!packageData) {
      return NextResponse.json(
        { error: 'Package not found' },
        { status: 404 }
      )
    }

    // Calculate total cost based on days
    const days = Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    const totalCost = days * packageData.dailyRate

    const booking = await prisma.booking.create({
      data: {
        packageId,
        inventoryItemId: availableItem.id,
        customerName,
        customerEmail,
        customerPhone,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalCost,
        status: 'pending',
        notes,
      },
      include: {
        package: true,
        inventoryItem: true,
      },
    })

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error creating booking:', error)
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}


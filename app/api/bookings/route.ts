import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
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
      walkiePackageId,
      customerName,
      customerEmail,
      customerPhone,
      startDate,
      endDate,
      notes,
      customHeadsetDistribution,
    } = body

    if (!walkiePackageId || !customerName || !customerEmail || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get package to calculate cost
    const packageData = await prisma.walkiePackage.findUnique({
      where: { id: walkiePackageId },
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
    const totalCost = days >= 7 ? Math.ceil(days / 7) * packageData.weeklyRate : days * packageData.dailyRate

    const booking = await prisma.booking.create({
      data: {
        walkiePackageId,
        customerName,
        customerEmail,
        customerPhone,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        totalCost,
        status: 'pending',
        notes,
        customHeadsetDistribution,
      },
      include: {
        walkiePackage: true,
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


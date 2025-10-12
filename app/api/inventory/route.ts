import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const inventory = await prisma.inventoryItem.findMany({
      include: {
        package: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: [
        { packageId: 'asc' },
        { serialNumber: 'asc' },
      ],
    })

    return NextResponse.json(inventory)
  } catch (error) {
    console.error('Error fetching inventory:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { packageId, serialNumber, status, condition, notes } = body

    if (!packageId || !serialNumber) {
      return NextResponse.json(
        { error: 'Package ID and serial number are required' },
        { status: 400 }
      )
    }

    const inventoryItem = await prisma.inventoryItem.create({
      data: {
        packageId,
        serialNumber,
        status: status || 'available',
        condition: condition || 'excellent',
        notes,
      },
    })

    return NextResponse.json(inventoryItem, { status: 201 })
  } catch (error) {
    console.error('Error creating inventory item:', error)
    return NextResponse.json(
      { error: 'Failed to create inventory item' },
      { status: 500 }
    )
  }
}


import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const where = status ? { status } : {}
    
    const batteries = await prisma.battery.findMany({
      where,
      orderBy: [
        { serialNumber: 'asc' },
      ],
    })

    return NextResponse.json(batteries)
  } catch (error) {
    console.error('Error fetching batteries:', error)
    return NextResponse.json(
      { error: 'Failed to fetch batteries' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { model, serialNumber, status, condition, cycleCount, notes } = body

    if (!model || !serialNumber) {
      return NextResponse.json(
        { error: 'Model and serial number are required' },
        { status: 400 }
      )
    }

    const battery = await prisma.battery.create({
      data: {
        model,
        serialNumber,
        status: status || 'available',
        condition: condition || 'excellent',
        cycleCount: cycleCount || 0,
        notes,
      },
    })

    return NextResponse.json(battery, { status: 201 })
  } catch (error) {
    console.error('Error creating battery:', error)
    return NextResponse.json(
      { error: 'Failed to create battery' },
      { status: 500 }
    )
  }
}

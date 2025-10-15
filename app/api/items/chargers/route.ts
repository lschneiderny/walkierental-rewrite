import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const where = status ? { status } : {}
    
    const chargers = await prisma.charger.findMany({
      where,
      orderBy: [
        { bankCount: 'desc' },
        { serialNumber: 'asc' },
      ],
    })

    return NextResponse.json(chargers)
  } catch (error) {
    console.error('Error fetching chargers:', error)
    return NextResponse.json(
      { error: 'Failed to fetch chargers' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { model, serialNumber, bankCount, status, condition, notes } = body

    if (!model || !serialNumber || !bankCount) {
      return NextResponse.json(
        { error: 'Model, serial number, and bank count are required' },
        { status: 400 }
      )
    }

    const charger = await prisma.charger.create({
      data: {
        model,
        serialNumber,
        bankCount,
        status: status || 'available',
        condition: condition || 'excellent',
        notes,
      },
    })

    return NextResponse.json(charger, { status: 201 })
  } catch (error) {
    console.error('Error creating charger:', error)
    return NextResponse.json(
      { error: 'Failed to create charger' },
      { status: 500 }
    )
  }
}

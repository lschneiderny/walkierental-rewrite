import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const where = status ? { status } : {}
    
    const walkies = await prisma.walkie.findMany({
      where,
      orderBy: [
        { model: 'asc' },
        { serialNumber: 'asc' },
      ],
    })

    return NextResponse.json(walkies)
  } catch (error) {
    console.error('Error fetching walkies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch walkies' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { model, serialNumber, status, condition, notes } = body

    if (!model || !serialNumber) {
      return NextResponse.json(
        { error: 'Model and serial number are required' },
        { status: 400 }
      )
    }

    const walkie = await prisma.walkie.create({
      data: {
        model,
        serialNumber,
        status: status || 'available',
        condition: condition || 'excellent',
        notes,
      },
    })

    return NextResponse.json(walkie, { status: 201 })
  } catch (error) {
    console.error('Error creating walkie:', error)
    return NextResponse.json(
      { error: 'Failed to create walkie' },
      { status: 500 }
    )
  }
}

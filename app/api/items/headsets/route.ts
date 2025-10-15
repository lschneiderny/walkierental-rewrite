import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const type = searchParams.get('type')
    
    const where: any = {}
    if (status) where.status = status
    if (type) where.type = type
    
    const headsets = await prisma.headset.findMany({
      where,
      orderBy: [
        { type: 'asc' },
        { serialNumber: 'asc' },
      ],
    })

    return NextResponse.json(headsets)
  } catch (error) {
    console.error('Error fetching headsets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch headsets' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { model, type, serialNumber, status, condition, notes } = body

    if (!model || !type || !serialNumber) {
      return NextResponse.json(
        { error: 'Model, type, and serial number are required' },
        { status: 400 }
      )
    }

    const headset = await prisma.headset.create({
      data: {
        model,
        type,
        serialNumber,
        status: status || 'available',
        condition: condition || 'excellent',
        notes,
      },
    })

    return NextResponse.json(headset, { status: 201 })
  } catch (error) {
    console.error('Error creating headset:', error)
    return NextResponse.json(
      { error: 'Failed to create headset' },
      { status: 500 }
    )
  }
}

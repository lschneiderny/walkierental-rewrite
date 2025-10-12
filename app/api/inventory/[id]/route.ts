import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const inventoryItem = await prisma.inventoryItem.findUnique({
      where: { id: params.id },
      include: {
        package: true,
        bookings: {
          orderBy: { startDate: 'desc' },
        },
      },
    })

    if (!inventoryItem) {
      return NextResponse.json(
        { error: 'Inventory item not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(inventoryItem)
  } catch (error) {
    console.error('Error fetching inventory item:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory item' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, condition, notes, lastServiced } = body

    const inventoryItem = await prisma.inventoryItem.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(condition && { condition }),
        ...(notes !== undefined && { notes }),
        ...(lastServiced && { lastServiced: new Date(lastServiced) }),
      },
    })

    return NextResponse.json(inventoryItem)
  } catch (error) {
    console.error('Error updating inventory item:', error)
    return NextResponse.json(
      { error: 'Failed to update inventory item' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.inventoryItem.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Inventory item deleted successfully' })
  } catch (error) {
    console.error('Error deleting inventory item:', error)
    return NextResponse.json(
      { error: 'Failed to delete inventory item' },
      { status: 500 }
    )
  }
}


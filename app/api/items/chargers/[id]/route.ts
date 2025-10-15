import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, condition, notes, lastServiced } = body

    const charger = await prisma.charger.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(condition && { condition }),
        ...(notes !== undefined && { notes }),
        ...(lastServiced && { lastServiced: new Date(lastServiced) }),
      },
    })

    return NextResponse.json(charger)
  } catch (error) {
    console.error('Error updating charger:', error)
    return NextResponse.json(
      { error: 'Failed to update charger' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.charger.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting charger:', error)
    return NextResponse.json(
      { error: 'Failed to delete charger' },
      { status: 500 }
    )
  }
}

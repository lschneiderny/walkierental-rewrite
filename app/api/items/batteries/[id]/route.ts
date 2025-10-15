import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, condition, cycleCount, notes, lastServiced } = body

    const battery = await prisma.itemBattery.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(condition && { condition }),
        ...(cycleCount !== undefined && { cycleCount }),
        ...(notes !== undefined && { notes }),
        ...(lastServiced && { lastServiced: new Date(lastServiced) }),
      },
    })

    return NextResponse.json(battery)
  } catch (error) {
    console.error('Error updating battery:', error)
    return NextResponse.json(
      { error: 'Failed to update battery' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.itemBattery.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting battery:', error)
    return NextResponse.json(
      { error: 'Failed to delete battery' },
      { status: 500 }
    )
  }
}

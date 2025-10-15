import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { status, condition, notes, lastServiced } = body

    const walkie = await prisma.walkie.update({
      where: { id: params.id },
      data: {
        ...(status && { status }),
        ...(condition && { condition }),
        ...(notes !== undefined && { notes }),
        ...(lastServiced && { lastServiced: new Date(lastServiced) }),
      },
    })

    return NextResponse.json(walkie)
  } catch (error) {
    console.error('Error updating walkie:', error)
    return NextResponse.json(
      { error: 'Failed to update walkie' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.walkie.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting walkie:', error)
    return NextResponse.json(
      { error: 'Failed to delete walkie' },
      { status: 500 }
    )
  }
}

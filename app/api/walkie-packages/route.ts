import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { HeadsetDistribution } from '@/lib/types'

export async function GET() {
  try {
    const packages = await prisma.walkiePackage.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        walkieCount: 'asc',
      },
    })

    // Transform the data to match the WalkiePackage type
    const transformedPackages = packages.map((pkg) => ({
      ...pkg,
      headsetDistribution: JSON.parse(pkg.headsetDistribution) as HeadsetDistribution,
    }))

    return NextResponse.json(transformedPackages)
  } catch (error) {
    console.error('Error fetching walkie packages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch walkie packages' },
      { status: 500 }
    )
  }
}

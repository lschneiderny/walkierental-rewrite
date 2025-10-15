import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const walkiePackages = await prisma.walkiePackage.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        walkieCount: 'asc',
      },
    })

    // Transform the data to include parsed headset distribution
    const transformedPackages = walkiePackages.map((pkg) => ({
      id: pkg.id,
      name: pkg.name,
      walkieCount: pkg.walkieCount,
      batteriesPerWalkie: pkg.batteriesPerWalkie,
      headsetsPerWalkie: pkg.headsetsPerWalkie,
      dailyRate: pkg.dailyRate,
      weeklyRate: pkg.weeklyRate,
      headsetDistribution: JSON.parse(pkg.headsetDistribution),
      isActive: pkg.isActive,
      createdAt: pkg.createdAt,
      updatedAt: pkg.updatedAt,
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

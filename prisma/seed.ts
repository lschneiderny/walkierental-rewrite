import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clear existing data
  await prisma.booking.deleteMany()
  await prisma.walkiePackage.deleteMany()

  // Create walkie packages - only 6, 8, 12, 16, 24, 32 sizes
  // Each walkie includes 2 batteries and 1 headset
  // Default headset distribution (users can customize in quotes)
  console.log('Creating walkie packages...')
  const walkiePackages = [
    {
      id: 'crew-6',
      name: 'Crew of 6',
      description: 'Perfect for small production crews',
      walkieCount: 6,
      batteriesPerWalkie: 2,
      headsetsPerWalkie: 1,
      dailyRate: 150,
      weeklyRate: 750,
      popular: false,
      headsetDistribution: {
        '2-Wire Surveillance Kit': 5,
        'HMN9013B Lightweight Headset': 1,
        'Remote Speaker Microphone': 0,
      },
    },
    {
      id: 'crew-8',
      name: 'Crew of 8',
      description: 'Ideal for medium productions',
      walkieCount: 8,
      batteriesPerWalkie: 2,
      headsetsPerWalkie: 1,
      dailyRate: 200,
      weeklyRate: 1000,
      popular: true,
      headsetDistribution: {
        '2-Wire Surveillance Kit': 6,
        'HMN9013B Lightweight Headset': 1,
        'Remote Speaker Microphone': 1,
      },
    },
    {
      id: 'crew-12',
      name: 'Crew of 12',
      description: 'Great for larger production teams',
      walkieCount: 12,
      batteriesPerWalkie: 2,
      headsetsPerWalkie: 1,
      dailyRate: 300,
      weeklyRate: 1500,
      popular: false,
      headsetDistribution: {
        '2-Wire Surveillance Kit': 9,
        'HMN9013B Lightweight Headset': 2,
        'Remote Speaker Microphone': 1,
      },
    },
    {
      id: 'crew-16',
      name: 'Crew of 16',
      description: 'Perfect for large production crews',
      walkieCount: 16,
      batteriesPerWalkie: 2,
      headsetsPerWalkie: 1,
      dailyRate: 380,
      weeklyRate: 1900,
      popular: true,
      headsetDistribution: {
        '2-Wire Surveillance Kit': 12,
        'HMN9013B Lightweight Headset': 2,
        'Remote Speaker Microphone': 2,
      },
    },
    {
      id: 'crew-24',
      name: 'Crew of 24',
      description: 'Ideal for major film and TV productions',
      walkieCount: 24,
      batteriesPerWalkie: 2,
      headsetsPerWalkie: 1,
      dailyRate: 550,
      weeklyRate: 2750,
      popular: false,
      headsetDistribution: {
        '2-Wire Surveillance Kit': 18,
        'HMN9013B Lightweight Headset': 3,
        'Remote Speaker Microphone': 3,
      },
    },
    {
      id: 'crew-32',
      name: 'Crew of 32',
      description: 'Enterprise solution for the largest productions',
      walkieCount: 32,
      batteriesPerWalkie: 2,
      headsetsPerWalkie: 1,
      dailyRate: 700,
      weeklyRate: 3500,
      popular: false,
      headsetDistribution: {
        '2-Wire Surveillance Kit': 24,
        'HMN9013B Lightweight Headset': 4,
        'Remote Speaker Microphone': 4,
      },
    },
  ]

  for (const pkgData of walkiePackages) {
    const createdPackage = await prisma.walkiePackage.create({
      data: {
        ...pkgData,
        headsetDistribution: JSON.stringify(pkgData.headsetDistribution),
      },
    })
    console.log(
      `Created ${createdPackage.name} - ${createdPackage.walkieCount} walkies, ${
        createdPackage.walkieCount * 2
      } batteries, ${createdPackage.walkieCount} headsets`
    )
  }

  console.log('\nSeeding finished.')
  console.log('Package sizes: 6, 8, 12, 16, 24, 32 walkies')
  console.log('Each walkie includes: 2 batteries, 1 headset (customizable)')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

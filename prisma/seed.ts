import { PrismaClient } from '@prisma/client'
import { walkiePackages } from '../data/walkie-packages'

const prisma = new PrismaClient()

const packagesData = [
  {
    id: "basic-starter",
    name: "Basic Starter Package",
    description: "Perfect for small events and casual use. Reliable communication for up to 2 miles.",
    dailyRate: 15,
    weeklyRate: 75,
    includes: JSON.stringify([
      "2 Motorola T100 Walkie Talkies",
      "Belt clips",
      "User manual",
      "Carrying case"
    ]),
    bestFor: JSON.stringify([
      "Small events (up to 20 people)",
      "Outdoor activities",
      "Basic coordination needs"
    ]),
    range: "Up to 2 miles",
    channels: 22,
    batteryLife: "18 hours",
    accessories: JSON.stringify(["Belt clips", "Carrying case"])
  },
  {
    id: "professional-event",
    name: "Professional Event Package",
    description: "Commercial-grade radios with extended range and professional features for medium to large events.",
    dailyRate: 35,
    weeklyRate: 200,
    includes: JSON.stringify([
      "4 Motorola CP200d Digital Radios",
      "Chargers and batteries",
      "Headsets with PTT buttons",
      "Belt clips and holsters",
      "Programming included"
    ]),
    bestFor: JSON.stringify([
      "Corporate events",
      "Weddings and parties",
      "Security teams",
      "Production crews"
    ]),
    range: "Up to 5 miles",
    channels: 16,
    batteryLife: "12+ hours",
    accessories: JSON.stringify(["Headsets", "Chargers", "Holsters", "Programming"])
  },
  {
    id: "production-pro",
    name: "Production Pro Package",
    description: "High-end digital radios with noise cancellation and crystal-clear audio for professional productions.",
    dailyRate: 65,
    weeklyRate: 390,
    includes: JSON.stringify([
      "6 Motorola MOTOTRBO DP4400e Radios",
      "Noise-cancelling headsets",
      "Multi-unit chargers",
      "Spare batteries",
      "Custom programming",
      "Belt clips and cases"
    ]),
    bestFor: JSON.stringify([
      "Film and TV productions",
      "Large corporate events",
      "Concert and festival staff",
      "Emergency response teams"
    ]),
    range: "Up to 8 miles",
    channels: 32,
    batteryLife: "16+ hours",
    accessories: JSON.stringify(["Noise-cancelling headsets", "Multi chargers", "Spare batteries"])
  },
  {
    id: "construction-heavy",
    name: "Construction Heavy Duty",
    description: "Rugged, waterproof radios built for harsh construction and industrial environments.",
    dailyRate: 45,
    weeklyRate: 270,
    includes: JSON.stringify([
      "4 Motorola DP4800e Rugged Radios",
      "Heavy-duty cases",
      "Boom microphone headsets",
      "Vehicle chargers",
      "Emergency features enabled"
    ]),
    bestFor: JSON.stringify([
      "Construction sites",
      "Industrial facilities",
      "Outdoor work environments",
      "Emergency response"
    ]),
    range: "Up to 6 miles",
    channels: 32,
    batteryLife: "14+ hours",
    accessories: JSON.stringify(["Rugged cases", "Vehicle chargers", "Boom mics"])
  },
  {
    id: "long-range-outdoor",
    name: "Long Range Outdoor",
    description: "Maximum range radios for large outdoor areas, camping, and remote locations.",
    dailyRate: 25,
    weeklyRate: 150,
    includes: JSON.stringify([
      "2 Midland GXT1000VP4 Radios",
      "Weather alerts enabled",
      "Desktop chargers",
      "Vehicle adapters",
      "Privacy codes"
    ]),
    bestFor: JSON.stringify([
      "Large outdoor events",
      "Camping and hiking",
      "Remote work sites",
      "Search and rescue"
    ]),
    range: "Up to 10+ miles",
    channels: 50,
    batteryLife: "10+ hours",
    accessories: JSON.stringify(["Weather alerts", "Vehicle adapters", "Privacy codes"])
  },
  {
    id: "hospitality-discreet",
    name: "Hospitality Discreet",
    description: "Low-profile radios with earpieces for hotels, restaurants, and customer-facing businesses.",
    dailyRate: 30,
    weeklyRate: 180,
    includes: JSON.stringify([
      "4 Motorola SL300 Ultra-Thin Radios",
      "Discreet earpieces",
      "Vibrate alerts",
      "Desktop chargers",
      "Professional programming"
    ]),
    bestFor: JSON.stringify([
      "Hotels and resorts",
      "Restaurants and bars",
      "Retail establishments",
      "Customer service teams"
    ]),
    range: "Up to 3 miles",
    channels: 99,
    batteryLife: "11+ hours",
    accessories: JSON.stringify(["Discreet earpieces", "Vibrate alerts", "Ultra-thin design"])
  }
]

async function main() {
  console.log('Start seeding...')
  
  // Clear existing data
  await prisma.booking.deleteMany()
  await prisma.inventoryItem.deleteMany()
  await prisma.package.deleteMany()
  await prisma.walkiePackage.deleteMany()
  await prisma.walkie.deleteMany()
  await prisma.battery.deleteMany()
  await prisma.charger.deleteMany()
  await prisma.headset.deleteMany()
  
  // Create legacy packages (for backwards compatibility)
  for (const pkg of packagesData) {
    const createdPackage = await prisma.package.create({
      data: pkg,
    })
    console.log(`Created legacy package: ${createdPackage.name}`)
    
    // Create inventory items for each package (5 units per package)
    for (let i = 1; i <= 5; i++) {
      await prisma.inventoryItem.create({
        data: {
          packageId: createdPackage.id,
          serialNumber: `${pkg.id.toUpperCase()}-${String(i).padStart(3, '0')}`,
          status: 'available',
          condition: 'excellent',
        },
      })
    }
  }

  // Create walkie packages
  console.log('\nCreating walkie packages...')
  for (const pkgData of walkiePackages) {
    const createdPackage = await prisma.walkiePackage.create({
      data: {
        ...pkgData,
        headsetDistribution: JSON.stringify(pkgData.headsetDistribution),
      },
    })
    console.log(`Created ${createdPackage.name}`)
  }

  // Create sample walkies inventory
  console.log('\nCreating sample walkies inventory...')
  const walkieModels = ['Motorola CP200', 'Motorola CP200d']
  let walkieCount = 0
  
  // Create enough walkies to cover the largest package (32) with some spares
  for (let i = 1; i <= 40; i++) {
    const model = walkieModels[i % 2]
    await prisma.walkie.create({
      data: {
        model,
        serialNumber: `W-${String(i).padStart(4, '0')}`,
        status: 'available',
        condition: 'excellent',
      },
    })
    walkieCount++
  }
  console.log(`Created ${walkieCount} walkies`)

  // Create batteries (2 per walkie + spares)
  console.log('\nCreating batteries...')
  let batteryCount = 0
  for (let i = 1; i <= 90; i++) {
    await prisma.battery.create({
      data: {
        model: 'Motorola CP200 LiOn Battery',
        serialNumber: `BAT-${String(i).padStart(4, '0')}`,
        status: 'available',
        condition: 'excellent',
      },
    })
    batteryCount++
  }
  console.log(`Created ${batteryCount} batteries`)

  // Create chargers
  console.log('\nCreating chargers...')
  const chargerData = [
    { model: 'CP200D 6-Bank Charger', count: 3, bankCount: 6 },
    { model: 'CP200D 12-Bank Charger', count: 2, bankCount: 12 },
    { model: 'CP200D Single-Bank Charger', count: 5, bankCount: 1 },
  ]
  
  let chargerNum = 1
  for (const charger of chargerData) {
    for (let i = 1; i <= charger.count; i++) {
      await prisma.charger.create({
        data: {
          model: charger.model,
          serialNumber: `CHG-${String(chargerNum).padStart(4, '0')}`,
          bankCount: charger.bankCount,
          status: 'available',
          condition: 'excellent',
        },
      })
      chargerNum++
    }
    console.log(`Created ${charger.count} ${charger.model}s`)
  }

  // Create headsets
  console.log('\nCreating headsets...')
  const headsetTypes = [
    { type: '2-Wire Surveillance Kit', count: 50 },
    { type: 'HMN9013B Lightweight Headset', count: 10 },
    { type: 'Remote Speaker Microphone', count: 10 },
  ]
  
  let headsetNum = 1
  for (const headset of headsetTypes) {
    for (let i = 1; i <= headset.count; i++) {
      await prisma.headset.create({
        data: {
          type: headset.type as any,
          serialNumber: `HS-${String(headsetNum).padStart(4, '0')}`,
          status: 'available',
          condition: 'excellent',
        },
      })
      headsetNum++
    }
    console.log(`Created ${headset.count} ${headset.type} headsets`)
  }
  
  console.log('\nSeeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })


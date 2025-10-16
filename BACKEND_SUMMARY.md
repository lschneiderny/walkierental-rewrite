# Backend Summary - Walkie Talkie Rental System

## Overview
The backend has been simplified to handle only **Walkie Packages** with fixed configurations. All legacy package code has been removed.

## Package Configuration

### Available Package Sizes
- **6 walkies** - Crew of 6
- **8 walkies** - Crew of 8  
- **12 walkies** - Crew of 12
- **16 walkies** - Crew of 16
- **24 walkies** - Crew of 24
- **32 walkies** - Crew of 32

### Fixed Package Contents
Each walkie package includes:
- **2 batteries per walkie** (always)
- **1 headset per walkie** (always)

### Equipment Types (from items.md)

**Walkies:**
- Motorola CP200
- Motorola CP200d

**Batteries:**
- Motorola CP200 LiOn Battery

**Chargers:**
- CP200D 6-Bank Charger
- CP200D 12-Bank Charger
- CP200D Single-Bank Charger

**Headsets** (customizable by user):
- **2-Wire Surveillance Kit** (also called surveillance headset)
- **HMN9013B Lightweight Headset** (also called Madonna headset)
- **Remote Speaker Microphone** (also called hand mic)

## Headset Customization

Users can customize the **total number of each headset type** in their quote. The only constraint is that the total headsets must equal the number of walkies in the package.

### Example for 8-Walkie Package:
Default distribution:
```json
{
  "2-Wire Surveillance Kit": 6,
  "HMN9013B Lightweight Headset": 1,
  "Remote Speaker Microphone": 1
}
```

User can change to:
```json
{
  "2-Wire Surveillance Kit": 8,
  "HMN9013B Lightweight Headset": 0,
  "Remote Speaker Microphone": 0
}
```

Or any other combination that totals 8 headsets.

## Database Schema

### WalkiePackage Model
```prisma
model WalkiePackage {
  id                    String   @id @default(cuid())
  name                  String
  description           String?
  walkieCount           Int      // 6, 8, 12, 16, 24, or 32
  batteriesPerWalkie    Int      @default(2)
  headsetsPerWalkie     Int      @default(1)
  dailyRate             Float
  weeklyRate            Float
  popular               Boolean  @default(false)
  isActive              Boolean  @default(true)
  headsetDistribution   String   @default("{}")  // JSON
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
  bookings              Booking[]
}
```

### Booking Model
```prisma
model Booking {
  id                          String    @id @default(cuid())
  walkiePackageId             String
  customerName                String
  customerEmail               String
  customerPhone               String?
  startDate                   DateTime
  endDate                     DateTime
  status                      String    @default("pending")
  totalCost                   Float
  notes                       String?
  customHeadsetDistribution   String?   // JSON - user's custom distribution
  createdAt                   DateTime  @default(now())
  updatedAt                   DateTime  @updatedAt
  walkiePackage               WalkiePackage @relation(fields: [walkiePackageId], references: [id])
}
```

## API Endpoints

### GET /api/walkie-packages
Returns all active walkie packages with their default configurations.

**Response:**
```json
[
  {
    "id": "crew-6",
    "name": "Crew of 6",
    "description": "Perfect for small production crews",
    "walkieCount": 6,
    "batteriesPerWalkie": 2,
    "headsetsPerWalkie": 1,
    "dailyRate": 150,
    "weeklyRate": 750,
    "popular": false,
    "headsetDistribution": {
      "2-Wire Surveillance Kit": 5,
      "HMN9013B Lightweight Headset": 1,
      "Remote Speaker Microphone": 0
    },
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

### GET /api/walkie-packages/[id]
Returns a specific package by ID.

### POST /api/bookings
Create a new booking with optional custom headset distribution.

**Request Body:**
```json
{
  "walkiePackageId": "crew-8",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "555-1234",
  "startDate": "2024-06-01T00:00:00Z",
  "endDate": "2024-06-05T00:00:00Z",
  "customHeadsetDistribution": {
    "2-Wire Surveillance Kit": 7,
    "HMN9013B Lightweight Headset": 1,
    "Remote Speaker Microphone": 0
  }
}
```

## TypeScript Types

Located in `lib/types.ts`:

```typescript
export type HeadsetType =
  | '2-Wire Surveillance Kit'
  | 'HMN9013B Lightweight Headset'
  | 'Remote Speaker Microphone'

export interface HeadsetDistribution {
  '2-Wire Surveillance Kit': number
  'HMN9013B Lightweight Headset': number
  'Remote Speaker Microphone': number
}

export interface WalkiePackage {
  id: string
  name: string
  description?: string
  walkieCount: 6 | 8 | 12 | 16 | 24 | 32
  batteriesPerWalkie: 2
  headsetsPerWalkie: 1
  dailyRate: number
  weeklyRate: number
  popular?: boolean
  headsetDistribution: HeadsetDistribution
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  walkiePackageId: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  startDate: Date
  endDate: Date
  status: 'pending' | 'confirmed' | 'active' | 'completed' | 'cancelled'
  totalCost: number
  notes?: string
  customHeadsetDistribution?: HeadsetDistribution
  createdAt: Date
  updatedAt: Date
}
```

## Quote Context

Located in `contexts/QuoteContext.tsx`:

The Quote Context manages the user's cart and allows them to:
1. Add packages to their quote
2. Customize headset distribution for each package
3. Update quantities
4. Calculate totals

## Seeding the Database

Run to populate initial package data:
```bash
npx prisma db push
npx prisma db seed
```

This will create all 6 package sizes (6, 8, 12, 16, 24, 32 walkies) with default headset distributions.

## Key Business Rules

1. **Fixed Package Sizes**: Only 6, 8, 12, 16, 24, 32 walkies
2. **Fixed Ratios**: Always 2 batteries and 1 headset per walkie
3. **Customizable Headsets**: Users can change headset type distribution
4. **Headset Constraint**: Total headsets must equal walkie count
5. **Three Headset Types Only**: 2-Wire, HMN9013B, Remote Speaker Mic

## Removed Code

The following have been removed:
- Legacy `Package` model and types
- `InventoryItem` model
- `Walkie`, `Battery`, `Charger`, `Headset` inventory models
- `/api/packages` route (deprecated, kept for backward compatibility)
- All legacy package seeding code

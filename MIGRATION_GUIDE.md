# Database Migration Guide

## Updates Made

We've updated the WalkieRentals system with the following changes:

### 1. Package Updates
- **New Packages**: 6 packages with counts: 6, 8, 12, 16, 24, and 32 walkies
- **Actual Equipment**: All packages now use Motorola CP200/CP200d radios
- **Battery Allocation**: Each walkie includes 2 LiOn batteries
- **Headset Options**: Customers can choose from 3 types:
  - Madonna (Lightweight) Headset
  - Hand Mic (Remote Speaker Microphone)
  - Surveillance Headset (2-Wire Kit)

### 2. Database Schema Changes
- Added `headsetMadonna` field to Booking model
- Added `headsetHandMic` field to Booking model
- Added `headsetSurveillance` field to Booking model

### 3. Pricing Structure
- 6 Walkie Package: $120/day, $720/week
- 8 Walkie Package: $155/day, $930/week
- 12 Walkie Package: $225/day, $1,350/week (Most Popular)
- 16 Walkie Package: $295/day, $1,770/week
- 24 Walkie Package: $430/day, $2,580/week
- 32 Walkie Package: $560/day, $3,360/week

## Migration Steps

### Step 1: Stop Development Server
If your development server is running, stop it first:
```bash
# Press Ctrl+C in the terminal where the dev server is running
```

### Step 2: Generate Prisma Client
```bash
npx prisma generate
```

### Step 3: Create Migration (for production use)
If you're using a production database, create a migration:
```bash
npx prisma migrate dev --name add_headset_selections
```

For SQLite development, you can simply push the schema:
```bash
npx prisma db push
```

### Step 4: Seed the Database
Reset and seed the database with the new package data:
```bash
npx prisma db push --force-reset
npx prisma db seed
```

Or to just seed without reset:
```bash
npx prisma db seed
```

### Step 5: Restart Development Server
```bash
npm run dev
```

## Verification

After migration, verify that:
1. All 6 packages are visible on the packages page
2. Headset selection UI appears in the quote modal
3. Users can select quantities for each headset type
4. Total headset count validation works (must equal walkie count)

## Troubleshooting

### Prisma Generate Fails
- **Issue**: "EPERM: operation not permitted" error
- **Solution**: Stop the development server and any processes using the database, then retry

### Seed Fails
- **Issue**: Unique constraint violations
- **Solution**: Use `npx prisma db push --force-reset` to reset the database first

### Old Package Data Still Showing
- **Issue**: Browser cache showing old data
- **Solution**: Hard refresh the browser (Ctrl+Shift+R) or clear cache

## Rollback (If Needed)

If you need to rollback these changes:

1. Stop the development server
2. Restore the previous schema
3. Run `npx prisma db push`
4. Reseed with old data

## Notes

- The QuoteModal component already has headset selection UI implemented
- Quote validation ensures users select exactly the right number of headsets
- Default headset selection is all surveillance headsets
- Pricing is approximate and can be adjusted in `data/packages.ts`

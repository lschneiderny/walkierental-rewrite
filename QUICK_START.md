# Quick Start Guide

## Apply the Updates in 3 Steps

### Step 1: Stop the Dev Server
If you have the development server running, stop it:
```bash
# Press Ctrl+C in your terminal
```

### Step 2: Update the Database
Run these commands in order:
```bash
npx prisma generate
npx prisma db push --force-reset
npx prisma db seed
```

### Step 3: Start the Dev Server
```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## What Changed?

✅ **6 New Packages** with correct walkie counts (6, 8, 12, 16, 24, 32)
✅ **Real Equipment** - Motorola CP200/CP200d walkies from your inventory
✅ **Headset Selection** - Users can choose Madonna, Hand Mic, or Surveillance
✅ **Database Schema** - Now stores headset selections per booking
✅ **Updated Pricing** - Production-focused pricing structure

## Test the Changes

1. Go to the **Packages** page
2. Click **Get Quote** on any package
3. See the headset selection UI with 3 options
4. Adjust headset quantities (must total = walkie count)
5. Fill out the form and submit

## Need Help?

- **Full Details**: See `UPDATE_SUMMARY.md`
- **Migration Help**: See `MIGRATION_GUIDE.md`
- **Troubleshooting**: Check the Migration Guide

## Pricing Overview

| Package | Walkies | Daily Rate | Weekly Rate |
|---------|---------|------------|-------------|
| Small   | 6       | $120       | $720        |
| Medium  | 8       | $155       | $930        |
| Standard| 12      | $225       | $1,350      |
| Large   | 16      | $295       | $1,770      |
| Enterprise| 24    | $430       | $2,580      |
| Maximum | 32      | $560       | $3,360      |

Each package includes:
- Motorola CP200/CP200d radios
- 2 batteries per walkie
- Choice of 3 headset types
- Multi-bank chargers
- Professional programming

## That's It!

Your WalkieRentals site is now updated with your actual inventory and ready for production use. 🎉

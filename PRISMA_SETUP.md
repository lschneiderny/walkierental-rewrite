# Prisma Database Setup

This project now uses Prisma ORM with SQLite for database management of packages, inventory, and bookings.

## Database Schema

### Models

1. **Package** - Rental packages with pricing and specifications
   - Stores package details (name, description, rates, specifications)
   - Tracks active/inactive status
   - Related to inventory items and bookings

2. **InventoryItem** - Individual walkie talkie units
   - Each unit has a unique serial number
   - Tracks status: available, rented, maintenance, retired
   - Tracks condition: excellent, good, fair, poor
   - Records last service date and notes
   - Linked to a specific package

3. **Booking** - Customer reservations
   - Customer information (name, email, phone)
   - Rental period (start/end dates)
   - Status: pending, confirmed, active, completed, cancelled
   - Total cost calculation
   - Linked to package and specific inventory item

## Setup Instructions

### Initial Setup (Already Completed)

```bash
# Install dependencies
npm install prisma @prisma/client

# Initialize Prisma with SQLite
npx prisma init --datasource-provider sqlite

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init

# Seed the database
npx prisma db seed
```

### Database Commands

```bash
# Open Prisma Studio (GUI for database)
npx prisma studio

# Create a new migration after schema changes
npx prisma migrate dev --name migration_name

# Reset database and reseed
npx prisma migrate reset

# Generate Prisma Client after schema changes
npx prisma generate

# Seed database
npx prisma db seed
```

## API Endpoints

### Packages

- `GET /api/packages` - List all active packages
- `GET /api/packages/[id]` - Get specific package with availability
- `GET /api/packages/[id]/availability?startDate=...&endDate=...` - Check availability

### Inventory

- `GET /api/inventory` - List all inventory items
- `POST /api/inventory` - Create new inventory item
- `GET /api/inventory/[id]` - Get specific inventory item
- `PATCH /api/inventory/[id]` - Update inventory item
- `DELETE /api/inventory/[id]` - Delete inventory item

### Bookings

- `GET /api/bookings` - List all bookings
- `POST /api/bookings` - Create new booking
  - Automatically finds available inventory
  - Calculates total cost
  - Prevents double-booking

## Admin Pages

### Inventory Management

Visit `/admin/inventory` to:
- View all inventory items
- Filter by status (available, rented, maintenance, retired)
- Update item status
- See inventory statistics

## Development

### Database Location

The SQLite database file is located at:
```
prisma/dev.db
```

### Prisma Client

The Prisma Client is auto-generated in `node_modules/@prisma/client`. 

Use it in your code:
```typescript
import { prisma } from '@/lib/prisma'

// Query examples
const packages = await prisma.package.findMany()
const inventory = await prisma.inventoryItem.findFirst({ where: { status: 'available' } })
```

### Schema Updates

1. Edit `prisma/schema.prisma`
2. Run `npx prisma migrate dev --name describe_change`
3. Update seed file if needed
4. Update TypeScript types in `lib/types.ts`

## Features Implemented

✅ Database-backed package management
✅ Inventory tracking with serial numbers
✅ Real-time availability checking
✅ Booking system with conflict prevention
✅ Admin inventory management interface
✅ API routes for all CRUD operations
✅ Automatic cost calculation
✅ Status filtering and updates

## Next Steps

To further enhance the system:

1. Add user authentication for admin pages
2. Implement booking confirmation emails
3. Add payment integration
4. Create customer dashboard
5. Add reporting and analytics
6. Implement calendar view for bookings
7. Add image uploads for inventory items
8. Create maintenance scheduling system


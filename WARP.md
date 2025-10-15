# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Commands

### Development
```pwsh
npm run dev        # Start Next.js development server on http://localhost:3000
npm run build      # Build production bundle
npm start          # Start production server
npm run lint       # Run ESLint to check code quality
```

### Database (Prisma)
```pwsh
npx prisma generate                    # Generate Prisma Client after schema changes
npx prisma migrate dev                 # Create and apply database migrations (dev)
npx prisma migrate deploy              # Apply migrations (production)
npx prisma db push                     # Push schema changes without migrations (dev only)
npx prisma db seed                     # Seed database with initial data
npx prisma studio                      # Open Prisma Studio GUI for database inspection
```

### Testing & Validation
```pwsh
npx prisma validate                    # Validate Prisma schema
npm run lint                           # Run linter before committing
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (dev), Prisma ORM
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel

### Database Models

The application uses two parallel systems:

**WalkiePackage System (New)**: Granular inventory tracking with individual items
- `WalkiePackage`: Configurable rental packages (6, 8, 12, 16, 24, or 32 walkies)
- `Walkie`: Individual walkie-talkie units (CP200 or CP200d models)
- `Battery`: Individual batteries tracked separately
- `Charger`: Charger units (1, 6, or 12 bank configurations)
- `Headset`: Individual headsets (3 types: 2-Wire Surveillance, HMN9013B Lightweight, Remote Speaker Mic)

**Package System (Legacy)**: Backwards-compatible simplified packages
- `Package`: Original package configuration
- `InventoryItem`: Aggregated inventory items

Both systems share the `Booking` model which supports either system via `packageId` or `walkiePackageId`.

### Directory Structure

```
app/
├── api/                    # API routes (Next.js 14 route handlers)
│   ├── packages/route.ts   # Package CRUD operations
│   ├── bookings/route.ts   # Booking management
│   └── inventory/route.ts  # Inventory operations
├── admin/                  # Admin dashboard pages
│   └── inventory/page.tsx  # Inventory management UI
├── packages/               # Package browsing pages
│   └── page.tsx           # Package listing
├── contact/               # Contact page
├── layout.tsx             # Root layout with Header, Footer, QuoteProvider
├── page.tsx               # Homepage with Hero, Features, FAQ
└── globals.css            # Global styles and Tailwind

components/                 # React components
├── Header.tsx             # Site navigation
├── Footer.tsx             # Site footer
├── Hero.tsx               # Homepage hero section
├── QuoteButton.tsx        # Floating quote button
└── QuoteModal.tsx         # Quote request modal

contexts/
└── QuoteContext.tsx       # Shopping cart-like quote state management

lib/
├── prisma.ts              # Prisma client singleton
├── types.ts               # TypeScript type definitions
└── quote-types.ts         # Quote-specific types

prisma/
├── schema.prisma          # Database schema
└── seed.ts                # Database seeding script
```

### Key Architectural Patterns

**API Routes**: All API routes follow Next.js 14 App Router conventions with `route.ts` files. They use the Prisma client for database access and return `NextResponse` objects.

**Client-Side State**: The `QuoteContext` provides global state for the quote/cart functionality, wrapping the entire application in `layout.tsx`.

**Data Transformation**: API routes transform Prisma models into frontend-compatible types. JSON fields (like `includes`, `bestFor`, `accessories`) are parsed in API routes before sending to the client.

**Prisma Patterns**: 
- Singleton pattern for Prisma client to prevent multiple instances in development
- Dev environment uses SQLite with `file:./dev.db`
- Production can use PostgreSQL (Vercel Postgres recommended)

**Styling Approach**:
- Utility-first with Tailwind CSS
- Custom gradients and animations defined in `globals.css`
- Framer Motion for scroll-triggered animations (viewport-aware with `once: true`)
- Performance optimizations: `will-change-transform`, memoized schema data

### Environment Configuration

Required environment variables (see `.env.example`):
- `DATABASE_URL`: Database connection string
- `NODE_ENV`: Environment (development/production)

Optional:
- `NEXT_PUBLIC_APP_URL`: Application URL
- `NEXT_PUBLIC_CONTACT_EMAIL`: Contact email
- `NEXT_PUBLIC_PHONE`: Contact phone

### Database Seeding

The seed script (`prisma/seed.ts`) populates:
1. WalkiePackage configurations (6 standard sizes)
2. Legacy Package data for backwards compatibility

Run seeding with: `npx prisma db seed`

### Import Aliases

The project uses `@/*` path aliases (configured in `tsconfig.json`):
- `@/components/*` → `components/*`
- `@/lib/*` → `lib/*`
- `@/contexts/*` → `contexts/*`
- `@/app/*` → `app/*`

### Deployment Considerations

The `vercel.json` configuration:
- Runs `prisma generate` before build
- Sets API function timeouts to 10s with 1024MB memory
- Configures font caching for performance
- Targets `iad1` region (US East)

For production deployment:
1. Set up production database (Vercel Postgres recommended)
2. Configure `DATABASE_URL` environment variable
3. Deploy to Vercel (auto-detects Next.js)
4. Run migrations: `npx prisma migrate deploy`

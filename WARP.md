# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
- `npm run dev` - Start development server at http://localhost:3000
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing and Quality
This project currently doesn't have test configurations. When adding tests, consider:
- Jest for unit testing
- Playwright or Cypress for E2E testing
- Testing components in isolation

## Architecture Overview

### Technology Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v3 with custom primary colors (#2563eb)
- **Icons**: Lucide React
- **Deployment**: Static export ready

### Application Structure
This is a marketing website for walkie talkie rentals with a simple, clean architecture:

**Pages & Routing (App Router)**:
- `/` (homepage) - Hero, features, popular packages, FAQ
- `/packages` - Full rental package listings  
- `/contact` - Contact form and quote requests
- `/packages/[id]` - Individual package detail pages (implied by routing)

**Data Management**:
- Static data in `data/packages.ts` with TypeScript interfaces
- No external APIs or database connections
- Package data includes pricing, specifications, and use cases

**Component Architecture**:
- `components/Header.tsx` - Fixed navigation with logo and CTA
- `components/Footer.tsx` - Site footer
- `components/Hero.tsx` - Homepage hero section with features and CTAs
- Layout components use consistent styling patterns

**Styling System**:
- Custom Tailwind config with primary colors
- CSS custom properties in `app/globals.css`
- Consistent hover states and transitions
- Mobile-first responsive design

### Key Patterns

**Data Structure**: 
The `Package` interface in `data/packages.ts` is the core data model:
```typescript
interface Package {
  id: string;
  name: string; 
  description: string;
  dailyRate: number;
  weeklyRate: number;
  includes: string[];
  bestFor: string[];
  specifications: {
    range: string;
    channels: number;
    batteryLife: string;
    accessories: string[];
  };
}
```

**Component Patterns**:
- Consistent use of Lucide React icons
- Tailwind utility classes with custom primary colors
- Link components for navigation between pages
- Grid layouts for responsive design

**Path Aliases**: 
The project uses `@/*` aliases mapping to the root directory for cleaner imports.

## Development Workflow

### File Organization
- New components go in `components/` directory
- Page components use App Router in `app/` directory  
- Static data and types in `data/` directory
- Global styles in `app/globals.css`

### Styling Guidelines
- Use the defined primary colors: `primary` (#2563eb) and `primary-hover` (#1d4ed8)
- Follow mobile-first responsive patterns established in existing components
- Maintain consistent spacing and typography scales
- Use Lucide React icons for consistency

### Content Management
- Package data is managed in `data/packages.ts`
- The `popularPackages` export shows the first 3 packages on homepage
- All content is static and embedded in components
- Update company information in Header and Footer components

### Adding New Features
- Follow the established TypeScript patterns with proper interfaces
- Use the existing responsive grid layouts
- Maintain the professional blue color scheme
- Ensure mobile responsiveness matches existing patterns

## Business Context

This is a walkie talkie rental business website featuring:
- 6 rental packages targeting different use cases (events, construction, hospitality, etc.)
- Pricing structure with daily and weekly rates
- Professional-grade equipment focus
- Nationwide shipping model
- Customer support and technical assistance

The site serves as a marketing tool and lead generator, directing users to contact forms or package detail pages for quotes and bookings.
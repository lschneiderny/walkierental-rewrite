# WalkieRentals - Simple Site

A simple, clean walkie talkie rental website built with Next.js, TypeScript, and Tailwind CSS.

## Features

✨ **User Features**
- Browse rental packages with detailed specifications
- Professional hero section with clear value proposition
- How it works section explaining the rental process
- Comprehensive contact form with quote request
- FAQ section with common questions
- Responsive design for mobile and desktop

🎨 **Design Features**
- Modern, clean design with Tailwind CSS
- Professional blue color scheme
- Lucide React icons throughout
- Hover effects and smooth transitions
- Mobile-first responsive layout

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
walkierental-simple/
├── app/                    # Next.js App Router
│   ├── contact/           # Contact page
│   ├── packages/          # Packages listing page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # React components
│   ├── Header.tsx         # Site header
│   ├── Footer.tsx         # Site footer
│   └── Hero.tsx           # Hero section
├── data/                  # Sample data
│   └── packages.ts        # Package data and types
└── public/                # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Sample Data

The site includes 6 sample rental packages:

1. **Basic Starter Package** - $15/day - Perfect for small events
2. **Professional Event Package** - $35/day - Commercial-grade for medium events  
3. **Production Pro Package** - $65/day - High-end for film/TV productions
4. **Construction Heavy Duty** - $45/day - Rugged for harsh environments
5. **Long Range Outdoor** - $25/day - Maximum range for outdoor areas
6. **Hospitality Discreet** - $30/day - Low-profile for customer-facing businesses

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **Icons**: Lucide React
- **Build Tool**: Next.js built-in

## Customization

To customize the site for your business:

1. Update company information in `components/Header.tsx` and `components/Footer.tsx`
2. Modify package data in `data/packages.ts`
3. Update contact information in `app/contact/page.tsx`
4. Customize colors in `tailwind.config.js` and `app/globals.css`
5. Replace placeholder content with your actual business details

## License

This project is for educational and demonstration purposes.
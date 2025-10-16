import { prisma } from '@/lib/prisma'
import HomeHero from '@/components/HomeHero'
import HomeContent from '@/components/HomeContent'
import PackageList from '@/components/PackageList'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  // Fetch packages at build time / on revalidation
  const packages = await prisma.walkiePackage.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      walkieCount: 'asc',
    },
  })

  // Transform the data to match the WalkiePackage type
  const transformedPackages = packages.map((pkg) => ({
    ...pkg,
    description: pkg.description ?? undefined,
    walkieCount: pkg.walkieCount as 6 | 8 | 12 | 16 | 24 | 32,
    batteriesPerWalkie: pkg.batteriesPerWalkie as 2,
    headsetsPerWalkie: pkg.headsetsPerWalkie as 1,
    headsetDistribution: JSON.parse(pkg.headsetDistribution),
  }))

  // Structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "WalkieRentals",
    "url": "https://walkierentals.com",
    "logo": "https://walkierentals.com/logo.png",
    "description": "Professional production communication equipment rental for film, TV, and live event productions. Production-ready equipment with knowlagable technical support.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-212-555-5555",
      "contactType": "Customer Service",
      "email": "info@walkierentals.com",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "sameAs": []
  }

  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": transformedPackages.map((pkg, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": pkg.name,
        "description": pkg.description,
        "offers": {
          "@type": "Offer",
          "price": pkg.dailyRate,
          "priceCurrency": "USD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": pkg.dailyRate,
            "priceCurrency": "USD",
            "unitText": "DAY"
          }
        }
      }
    }))
  }

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productsSchema) }}
      />

      <div>
        <HomeHero />
        <HomeContent />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PackageList packages={transformedPackages} />
        </div>
      </div>
    </>
  )
}

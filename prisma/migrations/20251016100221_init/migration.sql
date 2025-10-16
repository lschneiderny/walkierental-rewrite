-- CreateTable
CREATE TABLE "WalkiePackage" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "walkieCount" INTEGER NOT NULL,
    "batteriesPerWalkie" INTEGER NOT NULL DEFAULT 2,
    "headsetsPerWalkie" INTEGER NOT NULL DEFAULT 1,
    "dailyRate" DOUBLE PRECISION NOT NULL,
    "weeklyRate" DOUBLE PRECISION NOT NULL,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "headsetDistribution" TEXT NOT NULL DEFAULT '{}',

    CONSTRAINT "WalkiePackage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "walkiePackageId" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "totalCost" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "customHeadsetDistribution" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_walkiePackageId_fkey" FOREIGN KEY ("walkiePackageId") REFERENCES "WalkiePackage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "WalkiePackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "walkieCount" INTEGER NOT NULL,
    "batteriesPerWalkie" INTEGER NOT NULL DEFAULT 2,
    "headsetsPerWalkie" INTEGER NOT NULL DEFAULT 1,
    "dailyRate" REAL NOT NULL,
    "weeklyRate" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "headsetDistribution" TEXT NOT NULL DEFAULT '{}'
);

-- CreateTable
CREATE TABLE "Walkie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "condition" TEXT NOT NULL DEFAULT 'excellent',
    "lastServiced" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Battery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL DEFAULT 'Motorola CP200 LiOn Battery',
    "serialNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "condition" TEXT NOT NULL DEFAULT 'excellent',
    "lastServiced" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Charger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "model" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "bankCount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "condition" TEXT NOT NULL DEFAULT 'excellent',
    "lastServiced" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Headset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'available',
    "condition" TEXT NOT NULL DEFAULT 'excellent',
    "lastServiced" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packageId" TEXT,
    "walkiePackageId" TEXT,
    "inventoryItemId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "totalCost" REAL NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Booking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Booking_walkiePackageId_fkey" FOREIGN KEY ("walkiePackageId") REFERENCES "WalkiePackage" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Booking_inventoryItemId_fkey" FOREIGN KEY ("inventoryItemId") REFERENCES "InventoryItem" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("createdAt", "customerEmail", "customerName", "customerPhone", "endDate", "id", "inventoryItemId", "notes", "packageId", "startDate", "status", "totalCost", "updatedAt") SELECT "createdAt", "customerEmail", "customerName", "customerPhone", "endDate", "id", "inventoryItemId", "notes", "packageId", "startDate", "status", "totalCost", "updatedAt" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE TABLE "new_Package" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "dailyRate" REAL NOT NULL,
    "weeklyRate" REAL NOT NULL,
    "walkieCount" INTEGER NOT NULL DEFAULT 0,
    "includes" TEXT NOT NULL,
    "bestFor" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "channels" INTEGER NOT NULL,
    "batteryLife" TEXT NOT NULL,
    "accessories" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Package" ("accessories", "batteryLife", "bestFor", "channels", "createdAt", "dailyRate", "description", "id", "includes", "isActive", "name", "range", "updatedAt", "weeklyRate") SELECT "accessories", "batteryLife", "bestFor", "channels", "createdAt", "dailyRate", "description", "id", "includes", "isActive", "name", "range", "updatedAt", "weeklyRate" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Walkie_serialNumber_key" ON "Walkie"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Battery_serialNumber_key" ON "Battery"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Charger_serialNumber_key" ON "Charger"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Headset_serialNumber_key" ON "Headset"("serialNumber");

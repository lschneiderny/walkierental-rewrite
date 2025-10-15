-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WalkiePackage" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "walkieCount" INTEGER NOT NULL,
    "batteriesPerWalkie" INTEGER NOT NULL DEFAULT 2,
    "headsetsPerWalkie" INTEGER NOT NULL DEFAULT 1,
    "dailyRate" REAL NOT NULL,
    "weeklyRate" REAL NOT NULL,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "headsetDistribution" TEXT NOT NULL DEFAULT '{}'
);
INSERT INTO "new_WalkiePackage" ("batteriesPerWalkie", "createdAt", "dailyRate", "description", "headsetDistribution", "headsetsPerWalkie", "id", "isActive", "name", "updatedAt", "walkieCount", "weeklyRate") SELECT "batteriesPerWalkie", "createdAt", "dailyRate", "description", "headsetDistribution", "headsetsPerWalkie", "id", "isActive", "name", "updatedAt", "walkieCount", "weeklyRate" FROM "WalkiePackage";
DROP TABLE "WalkiePackage";
ALTER TABLE "new_WalkiePackage" RENAME TO "WalkiePackage";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

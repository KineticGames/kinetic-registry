/*
  Warnings:

  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Package` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PackageVersion" (
    "packageName" TEXT NOT NULL,
    "versionMajor" INTEGER NOT NULL,
    "versionMinor" INTEGER NOT NULL,
    "versionPatch" INTEGER NOT NULL,
    "release" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("packageName", "versionMajor", "versionMinor", "versionPatch"),
    CONSTRAINT "PackageVersion_packageName_fkey" FOREIGN KEY ("packageName") REFERENCES "Package" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_PackageVersion" ("packageName", "versionMajor", "versionMinor", "versionPatch") SELECT "packageName", "versionMajor", "versionMinor", "versionPatch" FROM "PackageVersion";
DROP TABLE "PackageVersion";
ALTER TABLE "new_PackageVersion" RENAME TO "PackageVersion";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("email", "id", "name") SELECT "email", "id", "name" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Package" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "url" TEXT,
    "obsolete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Package" ("description", "name", "obsolete", "url") SELECT "description", "name", "obsolete", "url" FROM "Package";
DROP TABLE "Package";
ALTER TABLE "new_Package" RENAME TO "Package";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

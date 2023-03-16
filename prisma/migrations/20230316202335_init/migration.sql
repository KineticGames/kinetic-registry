-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Package" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "url" TEXT,
    "obsolete" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "PackageVersion" (
    "packageName" TEXT NOT NULL,
    "versionMajor" INTEGER NOT NULL,
    "versionMinor" INTEGER NOT NULL,
    "versionPatch" INTEGER NOT NULL,

    PRIMARY KEY ("packageName", "versionMajor", "versionMinor", "versionPatch"),
    CONSTRAINT "PackageVersion_packageName_fkey" FOREIGN KEY ("packageName") REFERENCES "Package" ("name") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_PackageToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_PackageToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Package" ("name") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_PackageToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PackageToUser_AB_unique" ON "_PackageToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PackageToUser_B_index" ON "_PackageToUser"("B");

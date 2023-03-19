-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "name" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT,
    "obsolete" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "PackageVersion" (
    "packageName" TEXT NOT NULL,
    "versionMajor" INTEGER NOT NULL,
    "versionMinor" INTEGER NOT NULL,
    "versionPatch" INTEGER NOT NULL,
    "release" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PackageVersion_pkey" PRIMARY KEY ("packageName","versionMajor","versionMinor","versionPatch")
);

-- CreateTable
CREATE TABLE "_PackageToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_PackageToUser_AB_unique" ON "_PackageToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PackageToUser_B_index" ON "_PackageToUser"("B");

-- AddForeignKey
ALTER TABLE "PackageVersion" ADD CONSTRAINT "PackageVersion_packageName_fkey" FOREIGN KEY ("packageName") REFERENCES "Package"("name") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PackageToUser" ADD CONSTRAINT "_PackageToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Package"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PackageToUser" ADD CONSTRAINT "_PackageToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

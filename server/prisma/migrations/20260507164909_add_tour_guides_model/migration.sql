-- CreateEnum
CREATE TYPE "AdminPermission" AS ENUM ('MANAGE_USERS', 'MANAGE_TOURS', 'MANAGE_BOOKINGS', 'VIEW_ANALYTICS', 'MANAGE_PAYMENTS', 'SUPER_ADMIN_ACCESS');

-- CreateTable
CREATE TABLE "Tour_Guide" (
    "tourId" TEXT NOT NULL,
    "guideId" TEXT NOT NULL,

    CONSTRAINT "Tour_Guide_pkey" PRIMARY KEY ("tourId","guideId")
);

-- CreateTable
CREATE TABLE "AdminProfile" (
    "id" TEXT NOT NULL,
    "permissions" "AdminPermission"[],
    "isSuperAdmin" BOOLEAN NOT NULL DEFAULT false,
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "bloodGroup" TEXT,
    "emergencyContactPhone" TEXT,
    "emergencyContactRelation" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_userId_key" ON "AdminProfile"("userId");

-- AddForeignKey
ALTER TABLE "Tour_Guide" ADD CONSTRAINT "Tour_Guide_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tour_Guide" ADD CONSTRAINT "Tour_Guide_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

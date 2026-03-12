/*
  Warnings:

  - You are about to drop the column `latitude` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Destination` table. All the data in the column will be lost.
  - You are about to alter the column `averageCost` on the `Destination` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - The `bestSeason` column on the `Destination` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `currency` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lat` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lng` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overview` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transportation` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Destination` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `Destination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `averageCost` on table `Destination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rating` on table `Destination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `continent` on table `Destination` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "lng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "overview" TEXT NOT NULL,
ADD COLUMN     "transportation" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "averageCost" SET NOT NULL,
ALTER COLUMN "averageCost" SET DATA TYPE INTEGER,
DROP COLUMN "bestSeason",
ADD COLUMN     "bestSeason" TEXT[],
ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "continent" SET NOT NULL;

-- CreateTable
CREATE TABLE "TopAttraction" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "destinationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TopAttraction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TopAttraction" ADD CONSTRAINT "TopAttraction_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

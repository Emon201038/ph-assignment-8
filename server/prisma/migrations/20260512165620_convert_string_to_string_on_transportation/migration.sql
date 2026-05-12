/*
  Warnings:

  - The `transportation` column on the `Destination` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "transportation",
ADD COLUMN     "transportation" TEXT[];

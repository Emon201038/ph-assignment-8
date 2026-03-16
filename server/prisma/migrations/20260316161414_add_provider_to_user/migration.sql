-- CreateEnum
CREATE TYPE "AuthProvider" AS ENUM ('GOOGLE', 'FACEBOOK', 'CREDENTIALS');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "AuthProvider",
ADD COLUMN     "providerId" TEXT,
ALTER COLUMN "password" DROP NOT NULL;

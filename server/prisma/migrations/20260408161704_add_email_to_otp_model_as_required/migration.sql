/*
  Warnings:

  - Added the required column `email` to the `OTP` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TwoFactorMethod" AS ENUM ('TOTP', 'EMAIL', 'SECURITY_KEY');

-- AlterTable
ALTER TABLE "OTP" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TwoFactorAuth" ADD COLUMN     "email" TEXT,
ADD COLUMN     "method" "TwoFactorMethod" NOT NULL DEFAULT 'EMAIL';

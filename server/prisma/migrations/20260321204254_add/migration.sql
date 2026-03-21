-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "GuideProfile" ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "emergencyContactPhone" TEXT,
ADD COLUMN     "emergencyContactRelation" TEXT,
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'MALE';

-- AlterTable
ALTER TABLE "TravelerProfile" ADD COLUMN     "bloodGroup" TEXT,
ADD COLUMN     "emergencyContactPhone" TEXT,
ADD COLUMN     "emergencyContactRelation" TEXT,
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'MALE';

/*
  Warnings:

  - You are about to drop the column `activityStatus` on the `activities` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "status" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "activities" DROP COLUMN "activityStatus",
ADD COLUMN     "status" "status" NOT NULL DEFAULT 'ACTIVE';

-- DropEnum
DROP TYPE "ActivityStatus";

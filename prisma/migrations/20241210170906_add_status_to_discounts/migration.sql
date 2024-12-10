/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Discount` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Discount` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "discountStatus" AS ENUM ('unused', 'used', 'expired');

-- AlterTable
ALTER TABLE "Discount" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "status" "discountStatus" NOT NULL DEFAULT 'unused',
ADD COLUMN     "value" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Discount_code_key" ON "Discount"("code");

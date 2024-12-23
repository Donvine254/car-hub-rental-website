/*
  Warnings:

  - The values [unused] on the enum `discountStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `value` on the `Discount` table. All the data in the column will be lost.
  - Added the required column `percent` to the `Discount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "discountStatus_new" AS ENUM ('valid', 'used', 'expired');
ALTER TABLE "Discount" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Discount" ALTER COLUMN "status" TYPE "discountStatus_new" USING ("status"::text::"discountStatus_new");
ALTER TYPE "discountStatus" RENAME TO "discountStatus_old";
ALTER TYPE "discountStatus_new" RENAME TO "discountStatus";
DROP TYPE "discountStatus_old";
ALTER TABLE "Discount" ALTER COLUMN "status" SET DEFAULT 'valid';
COMMIT;

-- AlterTable
ALTER TABLE "Discount" DROP COLUMN "value",
ADD COLUMN     "max_amount" INTEGER,
ADD COLUMN     "metadata" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "min_amount" INTEGER,
ADD COLUMN     "percent" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'valid';

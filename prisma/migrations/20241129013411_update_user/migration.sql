/*
  Warnings:

  - You are about to drop the column `noOfSeats` on the `Car` table. All the data in the column will be lost.
  - Added the required column `seats` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "status" SET DEFAULT 'ongoing';

-- AlterTable
ALTER TABLE "Car" DROP COLUMN "noOfSeats",
ADD COLUMN     "seats" INTEGER NOT NULL;

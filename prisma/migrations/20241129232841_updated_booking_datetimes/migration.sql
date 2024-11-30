/*
  Warnings:

  - You are about to drop the column `dropoffTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `pickupTime` on the `Booking` table. All the data in the column will be lost.
  - You are about to alter the column `fuelConsumption` on the `Car` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "dropoffTime",
DROP COLUMN "pickupTime";

-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "fuelConsumption" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "metadata" JSONB DEFAULT '{"emailVerified": false, "phoneVerified": false, "provider": "email"}',
ADD COLUMN     "preferences" JSONB DEFAULT '{"notifications": {"discounts": true, "newProducts": true, "monthlyReports": true, "dailyReports": false}}';

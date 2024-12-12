/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `Car` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[modelName,year]` on the table `Car` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Car_image_key" ON "Car"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Car_modelName_year_key" ON "Car"("modelName", "year");

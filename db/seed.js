const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cars = require("../public/cars.json");
async function main() {
  try {
    await prisma.car.createMany({
      data: cars,
      skipDuplicates: true, // Ensures duplicates are skipped to avoid errors
    });

    console.log("Database seeded");
  } catch (error) {
    console.error("Error seeding the database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();

export const testimonials = [
  {
    description:
      "Excellent service! The car was clean and in perfect condition. The rental process was quick and hassle-free.",
    name: "Donvine",
  },
  {
    description:
      "I had a wonderful experience with this car rental company. The staff was friendly, and the prices were reasonable. I highly recommend them!",
    name: "Jane Smith",
  },
  {
    description:
      "The variety of cars available is impressive. I found the perfect car for my trip, and the entire rental process was smooth.",
    name: "Mike Johnson",
  },
  {
    description:
      "Great customer service! The team went above and beyond to accommodate my needs. I will definitely rent from them again.",
    name: "Emily Davis",
  },
  {
    description:
      "The online reservation system is user-friendly, and the pickup/drop-off process was quick. I'm satisfied with the overall service.",
    name: "Chris Brown",
  },
  {
    description:
      "I rented a car for a road trip, and it was a fantastic experience. The car was comfortable, and the rental rates were competitive.",
    name: "Samantha White",
  },
  {
    description:
      "I appreciate the flexibility in rental options. Whether it's a short trip or a long-term rental, they have choices to suit every need.",
    name: "David Clark",
  },
  {
    description:
      "Professional and courteous staff. They made sure I understood all the terms and conditions. I felt confident renting from them.",
    name: "Anna Taylor",
  },
  {
    description:
      "The rental process was straightforward, and the car was in great condition. I had a seamless experience from start to finish.",
    name: "Robert Miller",
  },
  {
    description:
      "Outstanding service! The team was helpful and friendly. I will recommend this car rental company to friends and family.",
    name: "Jennifer Wilson",
  },
  {
    description:
      "Carhub has the cheapest prices for the most exclusive rides in town, and the cars are fully insured!",
    name: "Jane Wanjiku",
  },
];

export type Order = {
  id: string;
  car: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  returnDate: string;
  status: "completed" | "scheduled" | "cancelled";
};
export const orders: Order[] = [
  {
    id: "#01236",
    car: "Jeep Renegade",
    pickupLocation: "Nairobi",
    dropoffLocation: "Eldoret",
    pickupDate: "March 2, 2023",
    returnDate: "March 10, 2023",
    status: "completed",
  },
  {
    id: "#01263",
    car: "Mini Cooper",
    pickupLocation: "Kisumu",
    dropoffLocation: "Nairobi",
    pickupDate: "March 8, 2023",
    returnDate: "March 10, 2023",
    status: "cancelled",
  },
  {
    id: "#01245",
    car: "Ferrari Enzo",
    pickupLocation: "Mombasa",
    dropoffLocation: "Nairobi",
    pickupDate: "March 6, 2023",
    returnDate: "March 10, 2023",
    status: "scheduled",
  },
  {
    id: "#01287",
    car: "Hyundai Staria",
    pickupLocation: "Eldoret",
    dropoffLocation: "Thika",
    pickupDate: "March 13, 2023",
    returnDate: "March 10, 2023",
    status: "completed",
  },
  {
    id: "#01216",
    car: "Toyota Rav 4",
    pickupLocation: "Thika",
    dropoffLocation: "Kisumu",
    pickupDate: "March 7, 2023",
    returnDate: "March 10, 2023",
    status: "scheduled",
  },
  {
    id: "#01322",
    car: "Ford Mustang",
    pickupLocation: "Nairobi",
    dropoffLocation: "Mombasa",
    pickupDate: "February 15, 2023",
    returnDate: "February 20, 2023",
    status: "completed",
  },
  {
    id: "#01345",
    car: "Honda CR-V",
    pickupLocation: "Kisumu",
    dropoffLocation: "Thika",
    pickupDate: "January 25, 2023",
    returnDate: "January 28, 2023",
    status: "cancelled",
  },
  {
    id: "#01401",
    car: "Tesla Model 3",
    pickupLocation: "Mombasa",
    dropoffLocation: "Eldoret",
    pickupDate: "March 5, 2023",
    returnDate: "March 15, 2023",
    status: "completed",
  },
  {
    id: "#01416",
    car: "Mazda CX-5",
    pickupLocation: "Eldoret",
    dropoffLocation: "Nairobi",
    pickupDate: "March 10, 2023",
    returnDate: "March 12, 2023",
    status: "cancelled",
  },
  {
    id: "#01435",
    car: "Mercedes-Benz GLE",
    pickupLocation: "Thika",
    dropoffLocation: "Kisumu",
    pickupDate: "February 28, 2023",
    returnDate: "March 4, 2023",
    status: "completed",
  },
];

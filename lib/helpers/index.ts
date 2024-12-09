//helper functions should be defined here
//Formatting data for UI, API wrappers.
//function to convert number to E164
export function toE164(phoneNumber: number) {
  // Convert to string and clean non-numeric characters
  let phoneString = phoneNumber.toString().replace(/\D/g, "");
  return `+${phoneString}`;
}

export function formatDate(inputDate: string): string {
  const dateObj = new Date(inputDate);
  const now = new Date();
  // Midnight boundaries for today and tomorrow
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  if (dateObj >= today && dateObj < tomorrow) {
    // If the date is today, include "Today" and time
    return `Today, ${dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  const nextDay = new Date(today);
  nextDay.setDate(today.getDate() + 2);
  if (dateObj >= tomorrow && dateObj < nextDay) {
    // If the date is tomorrow, include "Tomorrow" and time
    return `Tomorrow, ${dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }

  // For other dates, return full date and time
  return dateObj.toLocaleString([], {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function isCarAvailable(
  isRented: boolean,
  rentedUntil: string | any
): boolean {
  if (!isRented || !rentedUntil) {
    return false;
  }

  const currentDate = new Date();
  const rentalEndDate = new Date(rentedUntil);
  if (currentDate > rentalEndDate) {
    return false;
  }

  return true;
}
//call lib action function to update car if: isRented is true but rentedUntill is past current date

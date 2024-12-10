//helper functions should be defined here
//Formatting data for UI, API wrappers.
//function to convert number to E164
export function toE164(phoneNumber: number) {
  // Convert to string and clean non-numeric characters
  let phoneString = phoneNumber.toString().replace(/\D/g, "");
  return `+${phoneString}`;
}
export function getISODateString(date: string, time: string) {
  // Split date and time
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  const localDate = new Date(year, month - 1, day, hours, minutes);
  const isoDateString = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, '0')}-${String(localDate.getDate()).padStart(2, '0')}T${String(localDate.getHours()).padStart(2, '0')}:${String(localDate.getMinutes()).padStart(2, '0')}:00Z`;

  return isoDateString;
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

//function to format ISO date
export function formatISODate(isoDate: string) {
  const date = new Date(isoDate);
  const day = date.getUTCDate();
  const month = date.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  });
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const daySuffix = (day: any) => {
    if (day >= 11 && day <= 13) return `${day}th`;
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };

  return `${daySuffix(
    day
  )} ${month}, ${year} at ${formattedHours}:${formattedMinutes}${period}`;
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

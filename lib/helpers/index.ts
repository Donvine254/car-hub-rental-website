//helper functions should be defined here
//Formatting data for UI, API wrappers.
//function to convert number to E164
export function toE164(phoneNumber: number) {
    // Convert to string and clean non-numeric characters
    let phoneString = phoneNumber.toString().replace(/\D/g, "");
    return `+${phoneString}`;
  }
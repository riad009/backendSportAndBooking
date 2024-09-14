// bookingUtils.ts

// Utility function to convert time strings to minutes since midnight
export const parseTimeToMinutes = (timeStr: string): number => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || hours > 23 || minutes < 0 || minutes > 59) {
    throw new Error('Invalid time format');
  }
  return hours * 60 + minutes;
};

// Utility function to calculate total hours and payable amount
export const calculatePayableAmount = (startTime: string, endTime: string, ratePerHour: number): number => {
  let startMinutes = parseTimeToMinutes(startTime);
  let endMinutes = parseTimeToMinutes(endTime);

  // Handle booking that spans into the next day
  if (endMinutes <= startMinutes) {
    endMinutes += 24 * 60; // Add 24 hours in minutes
  }

  // Calculate the total hours and payable amount
  const diffInMinutes = endMinutes - startMinutes;
  const totalHours = diffInMinutes / 60;
  const payableAmount = totalHours * ratePerHour;

  return payableAmount;
};

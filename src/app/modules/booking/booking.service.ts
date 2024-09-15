import { Facility } from "../facility/facility.model";
import { User } from "../user/user.model";
import { TBooking } from "./booking.interface";
import { booking } from "./booking.router";
import { Booking } from "./bookingmodel";

// Define a custom error class
class FacilityUnavailableError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FacilityUnavailableError";
  }
}

const createBookingIntoDB = async (bookingDataWithPayable: TBooking) => {
  console.log('bookingDataWithPayable', bookingDataWithPayable);

  // Destructure the booking data
  const { facility, date, startTime, endTime } = bookingDataWithPayable;

  // Check if the facility is already booked for the given date and time slot
  const existingBooking = await Booking.findOne({
    facility,
    date,
    $or: [
      {
        startTime: { $lt: endTime },  // Existing startTime is before the new endTime
        endTime: { $gt: startTime }   // Existing endTime is after the new startTime
      }
    ]
  });

  if (existingBooking) {
    // Throw a custom error if the facility is already booked
    throw new FacilityUnavailableError('Facility is booked for the selected time slot');
  }

  // Create a new booking record in the database
  const result = await Booking.create(bookingDataWithPayable);
  console.log('result', result);
  return result;
};


// const getAllBookingInDb = async (user_id: TBooking) => {
//     const result = await Booking.find(); 
//     return result;
//   };
const getAllBookingInDb = async (user_id: TBooking) => {
    try {
        // Step 1: Find all bookings for the given user_id
        const bookings = await Booking.find({  });


         
        // Return the formatted bookings
        return {
            success: true,
            statusCode: 200,
            message: "Bookings retrieved successfully",
            data: bookings
        };
    } catch (error) {
        console.error('Error fetching bookings or user:', error);
        throw error;
    }
};
const getAllBookingByUserInDb = async (user_id: TBooking) => {
    try {
        // Step 1: Find all bookings for the given user_id
        const bookings = await Booking.find({ user: user_id });

      

        // Extract facility IDs from the bookings
        const facilityIds = bookings.map(booking => booking.facility);

        // Step 3: Find all facilities for the given facility IDs
        const facilities = await Facility.find({ _id: { $in: facilityIds } });

        // Map facility IDs to facility objects for easy lookup
        const facilityMap = new Map(facilities.map(facility => [facility._id.toString(), facility]));

        // Format the bookings with their corresponding facility and user details
        const formattedBookings = bookings.map(booking => {
            const facility = facilityMap.get(booking.facility.toString()) || null;  // Handle missing facilities

            return {
                _id: booking._id,
                facility: facility ? {
                    _id: facility._id,
                    name: facility.name,
                    description: facility.description,
                    pricePerHour: facility.pricePerHour,
                    location: facility.location,
                    isDeleted: facility.isDeleted
                } : {},  // Return an empty object if facility is not found
                date: booking.date,
                startTime: booking.startTime,
                endTime: booking.endTime,
            
                payableAmount: booking.payableAmount,
                isBooked: booking.isBooked
            };
        });

        // Return the formatted bookings
        return {
            success: true,
            statusCode: 200,
            message: "Bookings retrieved successfully",
            data: formattedBookings
        };
    } catch (error) {
        console.error('Error fetching bookings or user:', error);
        throw error;
    }
};

const deleteBookingInDb = async (user_id: string, bookingId: string) => {
  try {
    // Step 1: Find the booking by user ID and booking ID
   
    const booking = await Booking.findOneAndUpdate(
      { _id: bookingId },
      { isBooked: 'canceled' },
      { new: true }
    );
    
    if (!booking) {
      return {
        success: false,
        statusCode: 404,
        message: "Booking not found",
      };
    }

    // Step 2: Delete the booking
    await Booking.deleteOne({ _id: bookingId });

    // Return success response
    return {
     
      data:booking
    };
  } catch (error) {
    console.error('Error deleting booking:', error);
    throw error;
  }
};
const getbookingAvailabilityIntoDb = async (date: { date: string }) => {
  console.log('Received date:', date);

  // Extract the date from the provided object
  const dateString = date.date;

  // Perform the query to find bookings with the matching date
  const bookings = await Booking.find({ date: dateString });

  // Format the result to match the required structure
  const formattedBookings = bookings.map(booking => ({
    startTime: booking.startTime,
    endTime: booking.endTime
  }));

  // Construct the response object
  const response = {

    data: formattedBookings
  };

  return response;
};


  
export const Bookingservice = {
  createBookingIntoDB,
  getAllBookingInDb,
  getAllBookingByUserInDb,
  deleteBookingInDb,
  getbookingAvailabilityIntoDb,
};

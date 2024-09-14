import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

import { Bookingservice } from './booking.service';

const parseTime = (time: string) => {
  // Convert time to 24-hour format if it's in 12-hour format
  const [hourMinute, period] = time.split(' ');
  let [hours, minutes] = hourMinute.split(':').map(Number);

  if (period === 'PM' && hours < 12) hours += 12;
  if (period === 'AM' && hours === 12) hours = 0;

  return new Date(1970, 0, 1, hours, minutes);
};

const createBooking: RequestHandler = catchAsync(async (req, res) => {
  const BookingData = req.body; // Extract booking data from request body
  const { facility, date, startTime, endTime } = BookingData;

  // Convert times to 24-hour format and create Date objects
  const start = parseTime(startTime);
  const end = parseTime(endTime);

  if (end <= start) {
    return sendResponse(res, {
      statusCode: httpStatus.BAD_REQUEST,
      success: false,
      message: 'End time must be after start time',
      data: null, // Adding the data property, even if it is null or an empty object
    });
  }

  // Calculate duration in hours
  const diffInMilliseconds = end.getTime() - start.getTime();
  const totalHours = diffInMilliseconds / (1000 * 60 * 60);
  const payableAmount = totalHours * 20;

  const user_id = req.user?._id;

 
  const bookingDataWithPayable = {
    user: user_id,
    facility,
    date,
    startTime,
    endTime,
    payableAmount,
    isBooked: 'confirmed',
  };

  const result = await Bookingservice.createBookingIntoDB(
    bookingDataWithPayable as any,
  );

  sendResponse(res, {
    statusCode: 200, // Include statusCode in the response
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

const getBooking: RequestHandler = catchAsync(async (req, res) => {
  const user_id = req.user?._id;
  
  // Get bookings from the service
  const result = await Bookingservice.getAllBookingInDb(user_id);
    console.log('result',result)
  // Check if no bookings were found
  if (result.data.length === 0) {
      return res.status(httpStatus.NOT_FOUND).json({
          success: false,
          statusCode: httpStatus.NOT_FOUND,
          message: 'No Data Found',
          data: [],
      });
  }
  
  // Directly send the result from the service without additional wrapping
  sendResponse(res, result); // Assuming sendResponse formats and sends the response appropriately
});

const getBookingByUser: RequestHandler = catchAsync(async (req, res) => {
  const user_id = req.user?._id;

  // Get bookings from the service
  const result = await Bookingservice.getAllBookingByUserInDb(user_id);

  // Check if the result is empty
  if (!result || result.data.length === 0) {
      return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "No Data Found",
          data: []
      });
  }

  // Directly send the result if data exists
  sendResponse(res, result); // Assuming sendResponse formats and sends the response appropriately
});


// Delete Booking Controller
const deleteBooking: RequestHandler = catchAsync(async (req, res) => {
  const user_id = req.user?._id; // Get the user ID from the request (auth middleware)
  const bookingId = req.params.id; // Assuming the booking ID is passed in the request parameters
  console.log('bookingId',bookingId)
  // Delete the booking using the service
  const result = await Bookingservice.deleteBookingInDb(user_id, bookingId);

  // Send the result from the service directly
  sendResponse(res, {
    statusCode: 200, // Include statusCode in the response
    success: true,
    message: 'Facility added successfully',
    data: result,
  });
});

//

const getbookingAvailability: RequestHandler = catchAsync(async (req, res) => {

  const id= req.params
  
  const result = await Bookingservice.getbookingAvailabilityIntoDb(id as any);

  if (result.data.length === 0) {
    return res.status(httpStatus.NOT_FOUND).json({
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: 'No Data Found',
      data: [],
    });
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility are retrieved successfully',
    data: result,
  });
});


export const bookingController = {
  createBooking,
  getBooking,
  getBookingByUser,
  deleteBooking,
  getbookingAvailability,
};

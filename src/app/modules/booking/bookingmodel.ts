import { Schema, model, Model, Types } from 'mongoose';
import { TBooking } from './booking.interface';

// Define the schema for the Booking model
const bookingSchema = new Schema<TBooking>({
  date: { type: String,},
  startTime: { type: String, },
  endTime: { type: String, },
  user: { type: String }, // Reference to the User model
  facility: { type: String, }, // Reference to the Facility model
  payableAmount: { type: Number,  },
  isBooked: { type: String, enum: ['confirmed', 'unconfirmed', 'canceled'], }
});

// Define the BookingModel interface
export interface BookingModel extends Model<TBooking> {
  // Custom methods or static methods can be added here if needed
}

// Create and export the Booking model
export const Booking = model<TBooking, BookingModel>('Bosoking3', bookingSchema);

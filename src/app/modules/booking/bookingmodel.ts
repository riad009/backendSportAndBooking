import { Schema, model, Model, Types } from 'mongoose';
import { TBooking } from './booking.interface';

// Define the schema for the Booking model
const bookingSchema = new Schema<TBooking>({
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User model
  facility: { type: Schema.Types.ObjectId, ref: 'Facility', required: true }, // Reference to the Facility model
  payableAmount: { type: Number, required: true },
  isBooked: { type: String, enum: ['confirmed', 'unconfirmed', 'canceled'], required: true }
});

// Define the BookingModel interface
export interface BookingModel extends Model<TBooking> {
  // Custom methods or static methods can be added here if needed
}

// Create and export the Booking model
export const Booking = model<TBooking, BookingModel>('Booking', bookingSchema);

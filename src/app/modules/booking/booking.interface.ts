import { Document, Model, Types } from 'mongoose';

// Define the TBooking interface
export interface TBooking extends Document {
  date: Date; // The date of the booking
  startTime: Date; // The start time of the booking
  endTime: Date; // The end time of the booking
  user: Types.ObjectId; // Reference to the user who made the booking
  facility: Types.ObjectId; // Reference to the booked facility
  payableAmount: number; // The calculated amount payable for the booking
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled'; // Status of the booking
}

// Define additional methods or static methods here if needed
export interface BookingModel extends Model<TBooking> {
  // Custom methods or static methods can be added here
}

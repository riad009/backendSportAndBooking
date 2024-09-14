import { Document, Model, Types } from 'mongoose';

// Define the TBooking interface
export interface TBooking extends Document {
  date: String; // The date of the booking
  startTime: String; // The start time of the booking
  endTime: String; // The end time of the booking
  user: String; // Reference to the user who made the booking
  facility: String; // Reference to the booked facility
  payableAmount: String; // The calculated amount payable for the booking
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled'; // Status of the booking
}

// Define additional methods or static methods here if needed
export interface BookingModel extends Model<TBooking> {
  // Custom methods or static methods can be added here
}

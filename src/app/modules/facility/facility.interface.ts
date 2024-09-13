import { Document } from 'mongoose';

// Define the TFacility interface
export interface TFacility extends Document {
  name: string; // The title of the facility
  description: string; // A brief description of the facility
  pricePerHour: number; // The cost of booking the facility per hour
  location: string; // The physical location of the facility
  isDeleted: boolean; // Boolean indicating if the facility is marked as deleted (false means not deleted)
}

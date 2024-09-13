import { Schema, model, Model } from 'mongoose';
import { TFacility } from './facility.interface';

// Define the schema for the Facility model
const facilitySchema = new Schema<TFacility>({
  name: { type: String,},
  description: { type: String, },
  pricePerHour: { type: Number, },
  location: { type: String,  },
  isDeleted: { type: Boolean, default: false } // Default to false, indicating not deleted
});

// Define the FacilityModel interface
export interface FacilityModel extends Model<TFacility> {
  // Custom methods or static methods can be added here if needed
}

// Create and export the Facility model
export const Facility = model<TFacility, FacilityModel>('Facility', facilitySchema);

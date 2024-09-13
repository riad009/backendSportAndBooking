import { Schema, model, Model } from 'mongoose';

// Define the TUser type
export type TUser = {
  name: string; // The name of the user
  email: string; // The contact email address
  password: string; // The account password (must be hashed)
  phone: string; // The contact phone number
  role: 'admin' | 'user'; // The role of the user
  address: string; // The physical address
};

// Define the schema for the User model
const userSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], required: true },
  address: { type: String, required: true }
});

// Define the UserModel interface
export interface UserModel extends Model<TUser> {
  // You can add custom methods or static methods here if needed
}

// Create and export the User model
export const User = model<TUser, UserModel>('Student', userSchema);

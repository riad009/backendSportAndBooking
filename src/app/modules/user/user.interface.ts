import { Model, Types } from 'mongoose';

export type TUser = {
  name: string; // The name of the user
  email: string; // The contact email address
  password: string; // The account password (must be hashed)
  phone: string; // The contact phone number
  role: 'admin' | 'user'; // The role of the user
  address: string; // The physical address
};

export interface UserModel extends Model<TUser> {
 
}



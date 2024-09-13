import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
 

  const isUserExists = await User.findOne({
    $and: [{ email: payload?.email }, { password: payload?.password }],
  });

  if (!isUserExists) {
    throw new Error(`Error ${httpStatus.NOT_FOUND}: This user is not found!`);
  }

  // if password match then create JWT and send to the client
  const email = isUserExists.email;
  const role = isUserExists.role;
  
  const jwtPayload = {
    email,
    role
  };
  const accessToken = jwt.sign(jwtPayload, config.JWT_ACCESS_SECRET as string,
    {
      expiresIn: '10d'
    }
  );

  return {accessToken,isUserExists};
};
const signupUser = async (payload: TLoginUser) => {
  // Create a new student record in the database
  const result = await User.create(payload);
  return result;
};

export const AuthServices = {
  loginUser,
  signupUser,
};

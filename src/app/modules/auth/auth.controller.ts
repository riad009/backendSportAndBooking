import httpStatus from 'http-status';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';

import { AuthServices } from './auth.service';


const sendResponse = (res: any, responseObj : any) => {
  const { statusCode, success, message, token, data, } = responseObj; // Explicitly destructure 'name' first
  res.status(statusCode).json({
    success,
    message,
    token,   
    data,

  });
};


const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, isUserExists } = result;
  console.log('accessToken', accessToken);

  sendResponse(res, {
    statusCode: 200, // Include statusCode in the response
    success: true,
    message: 'User logged in successfully',
    token: accessToken,
    anotherField: 'Your custom value', // Another custom field
    data: {
      _id: isUserExists._id,
      name: isUserExists.name,
      email: isUserExists.email,
      role: isUserExists.role,
      phone: isUserExists.phone,
      address: isUserExists.address,
    },
  });
});


const signupUser = catchAsync(async (req, res) => {
  const result = await AuthServices.signupUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: {
      _id: result._id,
      name: result.name,
      email: result.email,
      role: result.role,
      phone: result.phone,
      address: result.address,
    },
  });
});

export const AuthControllers = {
  loginUser,
  signupUser,
};

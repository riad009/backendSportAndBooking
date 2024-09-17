import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';

import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/Apperror';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Token not provided or incorrect format!');
    }

    // Extracting the token by removing 'Bearer ' prefix
    const token = authHeader.split(' ')[1];

    try {
      // Verifying the token
      const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET as string) as JwtPayload;

      const { role, userId, iat } = decoded;

      // Checking if the user's role is allowed for this route
      if (requiredRoles.length && !requiredRoles.includes(role as TUserRole)) {
        throw new AppError(httpStatus.FORBIDDEN, 'You have no access to this route');
      }

      // Storing user data in the request object
      req.user = decoded;

      next();
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!');
    }
  });
};

export default auth;

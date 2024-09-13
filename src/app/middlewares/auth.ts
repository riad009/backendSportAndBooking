import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';



const auth = () => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
    // await schema.parseAsync({
    //   body: req.body,
    //   cookies: req.cookies,
    // });

    // if the toekn is send from the client
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ error: 'Token not sent' });
    }

    // check the token is match
    // invalid token
    jwt.verify(
      token,
      config.JWT_ACCESS_SECRET as string,
      function (err, decoded) {
        if (err) {
          return res
            .status(401)
            .json({ error: 'Unauthorized: you are Unauthorized' });
        }

        req.user = decoded as JwtPayload;

        console.log('decoded', decoded);
        // decoded undefined
      },
    );

    next();
  });
};

export default auth;

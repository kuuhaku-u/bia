import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
export default class jwtMiddleware {
  public auth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const accessTokenSecret: string = process.env['JWT_SECRET'] || '';
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, accessTokenSecret, (err: any, user: any) => {
        if (err) {
          return res.send({code:403, msg:"Error Processing Token"});
        }
        req.body.username = user;
        next();
      });
    } else {
      res.send({code:401, msg:"Forbidden"})    }
  }
}

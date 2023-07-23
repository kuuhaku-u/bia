import express, { Router, Request, Response } from 'express';
import helperClass from '../../utils/authorize';
import jwtMiddleware from '../middleware/authJWT';

export default class TestRoute {
  private router: Router;
  private helper!: helperClass;
  private jwtMiddlewareInstance: jwtMiddleware;

  constructor() {
    this.jwtMiddlewareInstance = new jwtMiddleware();
    this.helper = new helperClass();
    this.router = express.Router();
    this.test();
  }

  private test() {
    this.router.post('/test', this.jwtMiddlewareInstance.auth, (req: Request, res: Response) => {
      const { username, password } = req.body;
      const token = this.helper.createToken(username);
      res.send({ KEY: 'Test Route', TOKEN: token });
    });
  }

  public getRouter(): Router {
    return this.router;
  }
}


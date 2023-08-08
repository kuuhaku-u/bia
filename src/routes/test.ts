import express, { Router, Request, Response } from 'express';
import helperClass from '../../utils/authorize';
import jwtMiddleware from '../middleware/authJWT';
import users from '../model/users';
export default class TestRoute {
  private router: Router;
  private helper!: helperClass;
  private jwtMiddlewareInstance: jwtMiddleware;
  constructor() {
    this.jwtMiddlewareInstance = new jwtMiddleware();
    this.helper = new helperClass();
    this.router = express.Router();
    this.test();
    this.signUp();
    this.logIn();
  }
  private test() {
    this.router.post('/test', this.jwtMiddlewareInstance.auth, (req: Request, res: Response) => {
      const { username, password } = req.body;
      const token = this.helper.createToken(username);
      res.send({ KEY: 'Test Route', TOKEN: token });
    });
  }
  private signUp() {
    this.router.post('/signup', async (req: Request, res: Response) => {
      const { username, password } = req.body;
      const token = this.helper.createToken(username);
      try {
        const createUser = new users({
          username: username,
          password: password,
          token
        });
        await createUser.save();
        res.status(200).json(createUser);
      } catch (err) {
        res.status(500).send(err);
      }
    });
  }
  private logIn() {
    this.router.post(
      '/login',
      this.jwtMiddlewareInstance.auth,
      async (req: Request, res: Response) => {
        const { username, password } = req.body;
        const token = this.helper.createToken(username);
        const createUser = await users.find()
        res.send({ data: createUser, code: 200, status: true });
      },
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}

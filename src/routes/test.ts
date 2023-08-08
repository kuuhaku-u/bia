import express, { Router, Request, Response } from 'express';
import helperClass from '../../utils/authorize';
import jwtMiddleware from '../middleware/authJWT';
import users from '../model/users';
import multer from 'multer';
import path from 'path';
import axios from 'axios';
export default class TestRoute {
  private router: Router;
  private helper!: helperClass;
  private jwtMiddlewareInstance: jwtMiddleware;
  upload: any;
  storage: any;
  constructor() {
    this.jwtMiddlewareInstance = new jwtMiddleware();
    this.helper = new helperClass();
    this.router = express.Router();
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, './data');
      },
      filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString()}_ ${path.extname(file.originalname)}`);
      },
    });
    this.upload = multer({ storage: this.storage });
    this.test();
    this.signUp();
    this.logIn();
    this.image();
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
          token,
        });
        await createUser.save();
        res.status(200).json({ code: 200, msg: 'Created Successfully' });
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
        const { username, id, password } = req.body;
        const createUser = await users.findById(id);
        if (createUser?.password == password) {
          res.send({ code: 200, status: true, user: createUser, msg: 'Good' });
        } else {
          res.send({ code: 401, status: false, user: {}, msg: 'Wrong Password or SOmething IDK' });
        }
      },
    );
  }
  private image() {
    this.router.post(
      '/image',
      this.upload.single('file'),
      // this.jwtMiddlewareInstance.auth,
      async (req: Request, res: Response) => {
        const { username } = req.body;
        try {
          const flaskRes = await axios.post('http://127.0.0.1:5000/', { username: 'username' });
          res.send({ code: 200, msg: 'upload', prediction: flaskRes.data });
        } catch (error) {
          console.error('Error communicating with Flask:', error);
          res.status(500).send({ code: 500, msg: 'Error communicating with Flask' });
        }
      },
    );
  }
  public getRouter(): Router {
    return this.router;
  }
}


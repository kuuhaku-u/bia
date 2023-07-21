import express, { Router, Request, Response } from 'express';
export default class TestRoute {
  private router: Router;
  constructor() {
    this.router = express.Router();
    this.test();
  }
  private test() {
    this.router.post('/test', (req: Request, res: Response) => {
      const { username, password } = req.body;
      res.send('Test Route');
    });
  }
  public getRouter(): Router {
    return this.router;
  }
}


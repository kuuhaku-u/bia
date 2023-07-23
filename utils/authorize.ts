import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
export default class helperClass {
  constructor() {
    dotenv.config();
  }
  public createToken(username: string): string {
    const secret = process.env['JWT_SECRET'] ?? '';
    const accessToken: string =
      jwt.sign({ username: username }, secret, { expiresIn: '20s' }) ?? '';
    return accessToken;
  }
}

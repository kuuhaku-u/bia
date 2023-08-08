// import { configDotenv } from 'dotenv';
import dotenv from 'dotenv';
import express, { Application } from 'express';
import TestRoute from './routes/test';
import dbConnect from './db_connection';
class Server {
    private app: Application;
    constructor() {
        dotenv.config();
        const PORT: number = Number(process.env["PORT"]) ?? 8000;
        this.app = express();
        this.app.use(express.json());
        this.initializeRoutes();
        const db = new dbConnect();
        db.initializeConnection();
        this.app.listen(PORT, () => console.log('Server running on port 8000'));
    }
    private initializeRoutes() {
        const test = new TestRoute();
        this.app.use('/', test.getRouter());
    }
}
new Server();
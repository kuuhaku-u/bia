import express, { Application } from 'express';
import TestRoute from './routes/test';
import dbConnect from './db_connection';
class Server {
    private app: Application;
    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.initializeRoutes();
        const db = new dbConnect();
        db.initializeConnection();
        this.app.listen(8000, () => console.log('Server running on port 8000'));
    }
    private initializeRoutes() {
        const test = new TestRoute();
        this.app.use('/', test.getRouter());
    }
}
new Server();

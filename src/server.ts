import express, { Application, Router } from 'express';

class Server {
    private app!: Application;
    private router!: Router;

    constructor() {
        this.app = express();
        this.test();
        this.app.use('/', this.router);
        this.app.listen(8000, () => console.log('Server running on port 8000'));
    }

    test() {
        this.router = express.Router();
        this.router.get('/test', (req: any, res: any) => {
            res.send("Test Route");
        });
    }
}

new Server();

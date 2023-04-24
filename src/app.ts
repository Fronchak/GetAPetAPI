import express from 'express';

class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.errorHandler();
    }

    private middlewares() {
        this.server.use(express.json());
    }

    private routes() {
    }

    private errorHandler() {
    }
}

export default App;
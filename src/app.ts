import express from 'express';
import cors from 'cors';
import errorHandler from './error-handling/error-handler';

//Routes
import authRoutes from './routes/auth-routes';
import userRoutes from './routes/user-routes';

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
        this.server.use(cors({
            credentials: true,
            origin: 'http://localhost:3000'
        }));
        this.server.use(express.static('src/public'));
    }

    private routes() {
        this.server.use('/auth', authRoutes);
        this.server.use('/users', userRoutes);
    }

    private errorHandler() {
        this.server.use(errorHandler);
    }
}

export default App;
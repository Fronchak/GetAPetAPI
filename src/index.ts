import * as dotenv from 'dotenv';
dotenv.config();
import App from './app';
import { connect } from './db/conn';

const PORT = process.env.PORT || 3000;

connect().then(() => {
    console.log('Connection to database with success');
    new App().server.listen(PORT, () => {
        console.log(`Server listen on port ${PORT}`);
    });
}).catch((e) => console.error(e));

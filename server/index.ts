import * as dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import router from './routes';
import errorHandler from './middleware/error-handling.middleware';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', router);
app.use(errorHandler);

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server start on ${PORT} port: http://localhost:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
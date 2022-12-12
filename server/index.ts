import 'dotenv/config';
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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
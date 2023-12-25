import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

import router from './router/router';

const app = express();
const PORT = 3000

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Server is running on port '+ PORT);
});

const MONGO_URL = "mongodb+srv://hrushikeshvibhute:YXWgVDZt6vEH5jfz@cluster0.7bw3en3.mongodb.net/?retryWrites=true&w=majority"  //YXWgVDZt6vEH5jfz

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => console.log(err));

app.use('/', router());
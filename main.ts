// console.log(`A`)
import express from "express";
import expressSession from 'express-session'
import { userRoutes } from './routes/userRoute'
import dotenv from 'dotenv';
import { Client } from 'pg';
import grant from 'grant';
import { groceriesRoute } from "./routes/groceriesRoute";
import { friendsRoute } from "./routes/friendsRoute";
import fs from "fs";
import { uploadDir } from './utils/upload'
import cors from "cors";

// import formidable from 'formidable'
// import jsonfile from 'jsonfile';
// import path from 'path';
// import fetch from 'cross-fetch';
export const app = express();
const PORT = 8000;


app.use(express.json());

let bodyParser = require('body-parser')
app.use(bodyParser.text({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cors())
app.use(
    expressSession({
        secret: 'what to buy',
        resave: true,
        saveUninitialized: true,
    }),
)


// declare module 'express-session' {
//     interface SessionData {
//         name?: String,
//         user: any,
//         grant: any,
//         location?: any,
//         // food_category: any,
//         profile_pic?: String,
//     }
// }

// connect DB 


dotenv.config();

export const client = new Client({
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
});

client.connect();

// Google Login
const grantExpress = grant.express({
    "defaults": {
        "origin": "http://localhost:8080", // To be changed to the elastic IP if not working on AWS server
        "transport": "session",
        "state": true,
    },
    "google": {
        "key": process.env.GOOGLE_CLIENT_ID || "",
        "secret": process.env.GOOGLE_CLIENT_SECRET || "",
        "scope": ["profile", "email"],
        "callback": "/user/login/google"
    }
});


app.use(grantExpress as express.RequestHandler);

fs.mkdirSync(uploadDir, { recursive: true })

app.use('/user', userRoutes)
app.use('/groceries', groceriesRoute);
app.use('/friends', friendsRoute)

app.use(express.static('public'));
app.use("/uploads", express.static('uploads'))

app.use((req, res) => {
    res.redirect('/404.html')
})
// console.log(`B`)
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})

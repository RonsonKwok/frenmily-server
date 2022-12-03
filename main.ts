// console.log(`A`)
import express from "express";
import expressSession from "express-session";
import { userRoutes } from "./routes/userRoute";
import { Request, Response } from "express";
import dotenv from "dotenv";
import grant from "grant";
import { groupsRoute } from "./routes/groupsRoute";
import { friendsRoute } from "./routes/friendsRoute";
import { goodsRoute } from "./routes/goodsRoute";
import fs from "fs";
import initFormidable, { uploadDir } from "./utils/upload";
import cors from "cors";
import IncomingForm from "formidable/Formidable";
import { uploadToS3 } from "./utils/aws-s3-upload";
import { File } from "formidable";
import { receiptsRoute } from "./routes/receiptsRoute";

// import formidable from 'formidable'
// import jsonfile from 'jsonfile';
// import path from 'path';
// import fetch from 'cross-fetch';
export const app = express();
const PORT = 8000;// To be changed to 8080 AWS server

app.use(express.json());

let bodyParser = require("body-parser");
app.use(bodyParser.text({ limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(
    expressSession({
        secret: "what to buy",
        resave: true,
        saveUninitialized: true,
    })
);

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

// upload to S3
app.post("/file", async function (req: Request, res: Response) {
    console.log("upload to S3");

    const form: IncomingForm = initFormidable();

    form.parse(req, async (err, fields, files) => {
        console.log("CP3");
        req.body = fields;

        // console.log({fields})
        // console.log({ files });

        let file: File = Array.isArray(files.image)
            ? files.image[0]
            : files.image;
        let fileName = file ? file.newFilename : undefined;

        // Upload file to AWS S3
        const accessPath = await uploadToS3({
            Bucket: "iconandreceipt",
            Key: `${fileName}`,
            Body: fs.readFileSync(file.filepath!),
        });

        // Insert accessPath to your table

        console.log("accessPath :", accessPath);
        res.json({ accessPath: accessPath });
    });
});

dotenv.config();

// Google Login
const grantExpress = grant.express({
    defaults: {
        origin: "http://localhost:8000", // To be changed to the elastic IP if not working on AWS server
        transport: "session",
        state: true,
    },
    google: {
        key: process.env.GOOGLE_CLIENT_ID || "",
        secret: process.env.GOOGLE_CLIENT_SECRET || "",
        scope: ["profile", "email"],
        callback: "/user/login/google",
    },
});

app.use(grantExpress as express.RequestHandler);

fs.mkdirSync(uploadDir, { recursive: true });
app.get('/ping',(_,res)=>{
    res.json('Server started')
})
app.use("/user", userRoutes);
app.use("/groups", groupsRoute);
app.use("/friends", friendsRoute);
app.use("/goods", goodsRoute);
app.use("/receipts", receiptsRoute);

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

app.use((req, res) => {
    res.redirect("/404.html");
});
// console.log(`B`)
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

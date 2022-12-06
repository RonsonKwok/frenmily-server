// console.log(`A`)
import express from "express";
import expressSession from "express-session";
import { userRoutes } from "./routes/userRoute";
import dotenv from "dotenv";
import grant from "grant";
import { groupsRoute } from "./routes/groupsRoute";
import { friendsRoute } from "./routes/friendsRoute";
import { goodsRoute } from "./routes/goodsRoute";
import fs from "fs";
import { uploadDir } from "./utils/upload";
import cors from "cors";
import { receiptsRoute } from "./routes/receiptsRoute";

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
app.get('/ping', (_, res) => {
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
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

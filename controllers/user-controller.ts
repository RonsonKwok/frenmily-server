import express from "express";
import { UserService } from "../services/user-service";
import { checkPassword } from "../utils/hash";
// import fetch from "cross-fetch";
// import crypto from "crypto";
import { User } from "../model/User";
// import { formParse } from "../utils/upload";
// import fs from "fs";
// import path from "path";
import jwtSimple from "jwt-simple";
import jwt from "../token/jwt";
import IncomingForm from "formidable/Formidable";
import initFormidable from "../utils/upload";
import { File } from "formidable";
import { uploadToS3 } from "../utils/aws-s3-upload";
import fs from "fs";






export const outdatedTokens: string[] = [];

export class UserController {
    constructor(private userService: UserService) { }

    me = async (req: express.Request, res: express.Response) => {
        try {
            res.json({
                message: "Success retrieve user",
                data: {
                    user: req.session["user"] ? req.session["user"] : null,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    username = async (req: express.Request, res: express.Response) => {
        try {
            let currentUsername = req.session["user"]["username"];
            res.json({
                username: currentUsername,
            });
        } catch (e) {
            console.log(e);
        }
    };

    login = async (req: express.Request, res: express.Response) => {
        try {
            const { username, password } = req.body;

            // Check input
            if (!username || !password) {
                res.status(400).json({
                    message: "Empty input for username or password",
                });
                return;
            }

            // Check DB
            let userResult = await this.userService.getUserByUsername(username);
            let dbUser: User = userResult.rows[0];
            console.log("dbUser: ", dbUser);

            if (!dbUser) {
                res.status(400).json({
                    message: "No such user",
                });
                return;
            }

            // If such username exists, and the password matches with the hashedPassword
            let isValid = await checkPassword(password, dbUser["password"]!);

            if (isValid) {
                console.log("correct password");
                console.log(username, "has logged in");

                // delete dbUser['password']

                // 登入成功就生成一個token
                const payload = {
                    userId: dbUser.id,
                    username: dbUser.username,
                    gender: dbUser.gender,
                    mobile: dbUser.mobile,
                    email: dbUser.email,
                    profilePicture: dbUser.profile_picture
                    // time: new Date().toLocaleTimeString()
                };
                const token = jwtSimple.encode(payload, jwt.jwtSecret);
                console.log("payload: ", payload);
                console.log("token: ", token);
                res.status(200).json({
                    message: "login successfully",
                    token: token,
                });
            } else {
                res.status(401).json({
                    message: "login failed",
                });
            }
        } catch (e) {
            console.log(e);
        }
    };

    location = async (req: express.Request, res: express.Response) => {
        const latitude = req.body.latitude;
        const longitude = req.body.longitude;
        console.log(latitude);
        console.log(longitude);
        const location = { x: latitude, y: longitude };
        req.session["location"] = location;
        res.json({ message: "end" });
    };

    // getDistrict = async (req: express.Request, res: express.Response) => {
    //     if (req.session['location']?.x == undefined) {
    //         res.json("N/A")
    //         return
    //     }
    //     let result = await this.userService.getDistrict(req.session['location'].x, req.session['location'].y)
    //     let userDistrict = result.rows[0].district_id
    //     let districtName = await this.userService.getDistrictName(userDistrict)
    //     res.json(districtName.rows[0].name)
    // }

    // loginGoogle = async (req: express.Request, res: express.Response) => {
    //     try {
    //         const accessToken = req.session?.["grant"].response.access_token;
    //         console.log("accessToken: ", accessToken);
    //         const fetchRes = await fetch(
    //             "https://www.googleapis.com/oauth2/v2/userinfo",
    //             {
    //                 method: "get",
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             }
    //         );
    //         const result = await fetchRes.json();
    //         console.log("google result:", result);

    //         // Create a random password for Google users
    //         const randomString = crypto.randomBytes(32).toString("hex");

    //         const username = result.email;
    //         const password = randomString;
    //         const email = result.email;

    //         let userResult = await this.userService.getUserByUsername(username);
    //         let dbUser: User = userResult.rows[0];
    //         req.session["user"] = dbUser;
    //         if (dbUser) {
    //             res.redirect("/homepage.html");
    //             return;
    //         }
    //         await this.userService.createUser(username, password, email);
    //         res.redirect("/homepage.html");
    //     } catch (e) {
    //         console.log(e);
    //     }
    // };

    register = async (req: express.Request, res: express.Response) => {
        try {
            const normalMobileNumberLength = 8;
            console.log("server side receives signal");
            console.log("request body: ", req.body);
            const { username, password, mobile, email } = req.body;

            console.log(username, password, mobile, email);

            if (
                !username ||
                !password ||
                username.length > 12 ||
                password.length > 12
            ) {
                res.status(400).json({
                    message: "Invalid username or password.",
                });
                return;
            }

            if (!mobile || mobile.length != normalMobileNumberLength) {
                res.status(400).json({
                    message: "Invalid mobile number format.",
                });
                return;
            }
            if (!email || !email.includes('@') || !email.includes('.')) {
                res.status(400).json({
                    message: "Invalid email address format.",
                });
                return;
            }
            let usernameResult = await this.userService.getUserByUsername(
                username
            );
            let dbUserByUsername: User = usernameResult.rows[0];
            if (dbUserByUsername) {
                console.log("user found in DB");
                console.log(dbUserByUsername);
                res.status(400).json({
                    message: "User already exists.",
                });
                return;
            }

            let mobileResult = await this.userService.getUserByMobileNumber(
                mobile
            );
            let dbUserByMobile: User = mobileResult.rows[0];
            if (dbUserByMobile) {
                console.log("user found in DB");
                console.log(dbUserByMobile);
                res.status(400).json({
                    message: "This mobile number is already in use.",
                });
                return;
            }

            let emailResult = await this.userService.getUserByEmail(
                email
            );
            let dbUserByEmail: User = emailResult.rows[0];
            if (dbUserByEmail) {
                console.log("user found in DB");
                console.log(dbUserByEmail);
                res.status(400).json({
                    message: "This email address is already in use.",
                });
                return;
            }
            const dummyPicArray = [
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/gorilla.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/bear+(1).png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/bear.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/squid.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/donatello.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/fox.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/dog.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/elephant.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/goat.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/hungry.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/owl-cartoon.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/rabbit.png"
            ]

            const randomPic = dummyPicArray[Math.floor(Math.random() * dummyPicArray.length)];

            let result = await this.userService.createUser(
                username,
                password,
                mobile,
                email,
                randomPic
            );
            let newDBuser: User = result[0];

            req.session["user"] = newDBuser;

            res.status(200).json({ message: "Create successfully" });
        } catch (err) {
            console.log(err);
        }
    };

    updateGender = async (req: express.Request, res: express.Response) => {
        try {
            const { username, gender } = req.body;
            console.log("info received at server: ", username, gender);

            await this.userService.updateGender(username, gender);

            // 改資料成功就重新生成一個token
            let userResult = await this.userService.getUserByUsername(username);
            let dbUser: User = userResult.rows[0];

            console.log(
                "dbUser get after successfully changing gender setting: ",
                dbUser
            );

            const payload = {
                userId: dbUser.id,
                username: dbUser.username,
                gender: dbUser.gender,
                mobile: dbUser.mobile,
                email: dbUser.email,
                // time: new Date().toLocaleTimeString()
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            console.log("payload: ", payload);
            console.log("token: ", token);

            res.status(200).json({
                message: "Update gender successfully",
                token: token,
            });
        } catch (e) {
            console.log(e);
        }
    };

    updateMobileNumber = async (
        req: express.Request,
        res: express.Response
    ) => {
        try {
            const { username, mobile } = req.body;
            console.log(username, mobile);

            await this.userService.updateUserMobileNumber(username, mobile);

            // 改資料成功就重新生成一個token
            let userResult = await this.userService.getUserByUsername(username);
            let dbUser: User = userResult.rows[0];

            console.log(
                "dbUser get after successfully changing gender setting: ",
                dbUser
            );

            const payload = {
                userId: dbUser.id,
                username: dbUser.username,
                gender: dbUser.gender,
                mobile: dbUser.mobile,
                email: dbUser.email,
                // time: new Date().toLocaleTimeString()
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            console.log("payload: ", payload);
            console.log("token: ", token);

            res.status(200).json({
                message: "Update mobile number successfully",
                token: token,
            });
        } catch (e) {
            console.log(e);
        }
    };

    updateEmail = async (req: express.Request, res: express.Response) => {
        try {
            const { username, email } = req.body;
            console.log(username, email);
            await this.userService.updateEmail(username, email);

            // 改資料成功就重新生成一個token
            let userResult = await this.userService.getUserByUsername(username);
            let dbUser: User = userResult.rows[0];
            console.log("userResult: ", userResult)
            console.log(
                "dbUser get after successfully changing gender setting: ",
                dbUser
            );

            const payload = {
                userId: dbUser.id,
                username: dbUser.username,
                gender: dbUser.gender,
                mobile: dbUser.mobile,
                email: dbUser.email,
                // time: new Date().toLocaleTimeString()
            };
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            console.log("payload: ", payload);
            console.log("token: ", token);

            res.status(200).json({
                message: "Update email address successfully",
                token: token,
            });
        } catch (e) {
            console.log(e);
        }
    };

    updateProfilePicture = async (req: express.Request, res: express.Response) => {
        try {
            // TODO: complete the backend logic
            console.log("received request")
            const form: IncomingForm = initFormidable();

            form.parse(req, async (err, fields, files) => {
                req.body = fields;
                let userID = req.body.userID;

                let file: File = Array.isArray(files.image) ? files.image[0] : files.image;

                let fileName = file ? file.newFilename : undefined;

                // Upload file to AWS S3
                const accessPath = await uploadToS3({
                    Bucket: "iconandreceipt",
                    Key: `${fileName}`,
                    Body: fs.readFileSync(file.filepath!),
                });

                // Insert accessPath to database
                let userResult = await this.userService.changeProfilePicture(
                    userID,
                    accessPath,
                );
                console.log("userResult: ", userResult)
                let dbUser: User = userResult.rows[0];

                console.log(
                    "dbUser get after successfully changing profile picture: ",
                    dbUser
                );

                const payload = {
                    userId: dbUser.id,
                    username: dbUser.username,
                    gender: dbUser.gender,
                    mobile: dbUser.mobile,
                    email: dbUser.email,
                    profilePicture: dbUser.profile_picture
                };
                const token = jwtSimple.encode(payload, jwt.jwtSecret);
                console.log("payload: ", payload);
                console.log("token: ", token);

                res.status(200).json({
                    message: "Update profile picture successfully",
                    token: token,
                });

            });

        } catch (e) {
            console.log(e);
            res.json({
                message: "failed to receive new profile picture"
            });
        }
    };

    getUserName = async (req: express.Request, res: express.Response) => {
        try {
            const user_id = req.body.user_id
            let userResult = await this.userService.getUserName(user_id);
            console.log(userResult);
            res.json(userResult)


        } catch (e) {
            console.log(e);
        }
    };

    disableAccount = async (req: express.Request, res: express.Response) => {
        try {
            console.log("disableAccount API");
            console.log("req.body: ", req.body);
            const username = req.body
            console.log("username: ", username)
            let randomString = "";
            randomString += Math.random();
            randomString += Math.random();
            randomString += Math.random();
            console.log("randomString: ", randomString);

            await this.userService.changePasswordToRandom(username, randomString);
            res.json({
                message: "server has disabled the account"
            })


        } catch (e) {
            console.log(e);
        }
    };


    // Update profile picture
    //     changeProfilePicture = async (
    //         req: express.Request,
    //         res: express.Response
    //     ) => {
    //         try {
    //             let { files } = await formParse(req);
    //             console.log("files: ", files);

    //             // get username to use it as filename
    //             const OLD_FILE_NAME = files["image"]["newFilename"];
    //             const NEW_FILE_NAME = req.session["user"]["username"] + ".png";

    //             let oldFilePath = path.join(
    //                 __dirname,
    //                 `../uploads/${OLD_FILE_NAME}`
    //             );
    //             console.log({ oldFilePath });
    //             let newFilePath = path.join(
    //                 __dirname,
    //                 `../uploads/${NEW_FILE_NAME}`
    //             );
    //             console.log({ newFilePath });

    //             fs.rename(oldFilePath, newFilePath, function (err) {
    //                 if (err) throw err;
    //                 console.log("File Renamed.");
    //             });

    //             res.status(200).json({
    //                 message: "received profile picture",
    //             });
    //         } catch (e) {
    //             console.log(e);
    //         }
    //     };
}

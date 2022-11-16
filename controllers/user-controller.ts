import express from "express"
import { UserService } from "../services/user-service"
import { checkPassword } from "../utils/hash"
import fetch from "cross-fetch"
import crypto from "crypto"
import { User } from "../model/User"
import { formParse } from "../utils/upload"
import fs from "fs"
import path from "path"
import jwtSimple from 'jwt-simple'
import jwt from "../token/jwt";

export const outdatedTokens: string[] = []


export class UserController {
    constructor(private userService: UserService) { }

    me = async (req: express.Request, res: express.Response) => {
        res.json({
            message: 'Success retrieve user',
            data: {
                user: req.session['user'] ? req.session['user'] : null
            }
        })
    }

    username = async (req: express.Request, res: express.Response) => {
        let currentUsername = req.session['user']['username']
        res.json({
            username: currentUsername
        })
    }

    login = async (req: express.Request, res: express.Response) => {
        const { username, password } = req.body

        // Check input
        if (!username || !password) {
            res.status(400).json({
                message: 'Empty input for username or password'
            })
            return
        }



        // Check DB
        let userResult = await this.userService.getUserByUsername(username)
        let dbUser: User = userResult.rows[0]
        console.log("dbUser: ", dbUser)

        if (!dbUser) {
            res.status(400).json({
                message: 'No such user'
            })
            return
        }

        // If such username exists, and the password matches with the hashedPassword
        let isValid = await checkPassword(password, dbUser["password"]!)

        if (isValid) {
            console.log('correct password')
            console.log(username, 'has logged in')

            // delete dbUser['password']

            // 登入成功就生成一個token
            const payload = {
                userId: dbUser.id,
                username: dbUser.username,
                isMale: dbUser.isMale,
                mobile: dbUser.mobile,
                email: dbUser.email,
                // time: new Date().toLocaleTimeString()
            }
            const token = jwtSimple.encode(payload, jwt.jwtSecret);
            console.log("payload: ", payload)
            console.log("token: ", token)
            res.status(200).json({
                message: "login successfully",
                token: token
            });
        }
        else {
            res.status(401).json({
                message: "login failed"
            })
        }
    }

    location = async (req: express.Request, res: express.Response) => {
        const latitude = req.body.latitude
        const longitude = req.body.longitude
        console.log(latitude)
        console.log(longitude)
        const location = { x: latitude, y: longitude }
        req.session['location'] = location
        res.json({ message: "end" })
    }

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

    loginGoogle = async (req: express.Request, res: express.Response) => {
        const accessToken = req.session?.['grant'].response.access_token;
        console.log("accessToken: ", accessToken)
        const fetchRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: "get",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const result = await fetchRes.json();
        console.log("google result:", result)

        // Create a random password for Google users
        const randomString = crypto.randomBytes(32).toString("hex")

        const username = result.email
        const password = randomString
        const email = result.email

        let userResult = await this.userService.getUserByUsername(username)
        let dbUser: User = userResult.rows[0]
        req.session['user'] = dbUser
        if (dbUser) {
            res.redirect('/homepage.html')
            return
        }
        await this.userService.createUser(username, password, email)
        res.redirect('/homepage.html')

    }

    register = async (req: express.Request, res: express.Response) => {
        try {
            const normalMobileNumberLength = 8
            console.log("server side receives signal")
            console.log("request body: ", req.body)
            const { username, password, mobile } = req.body

            console.log(username, password, mobile)

            if (!username || !password || username.length > 12 || password.length > 12) {
                res.status(400).json({
                    message: 'Invalid username or password.'
                })
                return
            }

            if (!mobile || mobile.length != normalMobileNumberLength) {
                res.status(400).json({
                    message: 'Invalid mobile number format.'
                })
                return
            }

            let usernameResult = await this.userService.getUserByUsername(username)
            let dbUserByUsername: User = usernameResult.rows[0]
            if (dbUserByUsername) {
                console.log("user found in DB")
                console.log(dbUserByUsername)
                res.status(400).json({
                    message: 'User already exists.'
                })
                return
            }

            let mobileResult = await this.userService.getUserByMobileNumber(mobile)
            let dbUserByMobile: User = mobileResult.rows[0]
            if (dbUserByMobile) {
                console.log("user found in DB")
                console.log(dbUserByMobile)
                res.status(400).json({
                    message: 'This mobile number is already in use.'
                })
                return
            }



            let result = await this.userService.createUser(username, password, mobile)
            let newDBuser: User = result[0]

            req.session['user'] = newDBuser

            res.status(200).json({ message: 'Create successfully' })

        }
        catch (err) {
            console.log(err)
        }
    }

    //logout
    logout = async (req: express.Request, res: express.Response) => {
        req.session.destroy(() => {
            console.log('user logged out')
        })
        res.redirect('/index.html')
    }

    // Update profile picture
    changeProfilePicture = async (req: express.Request, res: express.Response) => {

        let { files } = await formParse(req)
        console.log("files: ", files)



        // get username to use it as filename
        const OLD_FILE_NAME = files["image"]["newFilename"]
        const NEW_FILE_NAME = req.session['user']['username'] + ".png"

        let oldFilePath = path.join(__dirname, `../uploads/${OLD_FILE_NAME}`)
        console.log({ oldFilePath });
        let newFilePath = path.join(__dirname, `../uploads/${NEW_FILE_NAME}`)
        console.log({ newFilePath });

        fs.rename(oldFilePath, newFilePath, function (err) {
            if (err) throw err;
            console.log('File Renamed.');
        })


        res.status(200).json({
            message: "received profile picture"
        })
    }


}

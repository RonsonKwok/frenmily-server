import { NextFunction, Request, Response } from "express"
import { Bearer } from 'permit';
import { outdatedTokens } from "../controllers/user-controller";
import jwtSimple from 'jwt-simple';
import jwt from "../token/jwt";
import { UserService } from "../services/user-service";


const permit = new Bearer({
    query: "access_token"
})

export async function isLoggedIn(req: Request, res: Response, next: NextFunction) {

    try {
        // Check request中有沒有帶著token(前面Login成功的時候server派給了browser)
        const token = permit.check(req)
        if (!token) {
            return res.status(401).json({ msg: "Missing Token" });
        }
        console.log("token: ", token)

        console.log("outdatedTokens: ", outdatedTokens)

        if (outdatedTokens.includes(token)) {
            return res.status(401).json({ msg: "Your token is outdated. Please login again." });
        }

        // 拆Token，取得 payload中的 userId
        const payload = jwtSimple.decode(token, jwt.jwtSecret);
        const userId = payload.user_id
        console.log(userId)

        // Check DB
        // TODO: add DB checking logic
        const userResult = await UserService.getUserByUsername(payload.username)

        const users = userRecords.filter(user => user.id == userId)
        if (users.length == 1) {
            req.user = users[0]
            req.token = token


            return next();
        } else {
            return res.status(401).json({ msg: "Permission Denied" });
        }
    } catch (e) {
        return res.status(401).json({ msg: "Wrong Token" });
    }

}
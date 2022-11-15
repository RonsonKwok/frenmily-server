import { Request, Response } from "express";
import { FriendsService } from "../services/friends-service";
// import { formParse } from "../utils/upload"
export class FriendsController {
    constructor(private friendsService: FriendsService) {}

    getUserFriends = async (req: Request, res: Response) => {
        try {
            console.log("getUserFriends API");

            //change userID
            const user_id = 1;
            const result = await this.friendsService.getUserFriends(user_id);
            console.log(result);
            const uniqueIds: any = [];

            const unique = result.filter((element: any) => {
                const isDuplicate = uniqueIds.includes(element.id);
                if (!isDuplicate) {
                    uniqueIds.push(element.id);
                    return true;
                }
                return false;
            });

            res.json(unique);
            return;
        } catch (e) {
            console.log(e);

            res.status(400).send("Upload Fail");
            return;
        }
    };

    checkFriend = async (req: Request, res: Response) => {
        try {
            console.log("checkFriend API");
            let searchBar = req.body.searchBar;
            let userID = req.body.userID;
            console.log(searchBar);
            console.log(userID);

            // check if user exists in table 'users'
            const result = await this.friendsService.searchFriend(searchBar);
            console.log(result);
            if (result.length == 0) {
                res.status(400).json({
                    type: 1,
                    message: "No such user",
                });
                return;
            }

            if (result[0].id == userID) {
                res.status(400).json({
                    type: 2,
                    message: "cannot add yourself",
                });
                return;
            }

            // check if they are already friend or not
            const result1 = await this.friendsService.friendOrNot(
                result[0].id,
                userID
            );
            console.log("result1 :", result1);
            if (result1.length > 0) {
                res.status(400).json({
                    type: 3,
                    message: "they are friend already",
                });
                return;
            }

            console.log("targetID :", result[0].id);
            console.log("userID :", userID);

            res.status(200).json({
                type: 4,
                message: "ready to add",
                userDetails: result[0],
            });
            return;
        } catch (e) {
            console.log(e);

            res.status(400).send("Upload Fail");
            return;
        }
    };

    addFriend = async (req: Request, res: Response) => {
        try {
            console.log("addFriend API");
            let targetID = req.body.targetID;
            let userID = req.body.userID;
            console.log(targetID);
            console.log(userID);

            // add friend each other
            await this.friendsService.addFriend(targetID, userID);

            res.json({ message: "add success" });
            return;
        } catch (e) {
            console.log(e);

            res.status(400).send("add friend Fail");
            return;
        }
    };

    //////////////////////////////////////// from BAD project

    // me = async (req: Request, res: Response) => {
    //     res.json({
    //         message: 'Success retrieve user',
    //         data: {
    //             user: req.session['user'] ? req.session['user'] : null
    //         }
    //     })
    // }

    // //uploadToAlbum + pass photo to model
    // uploadToAlbum = async (req: Request, res: Response) => {
    //     try {
    //         let currentUser = req.session['user']
    //         let { files } = await formParse(req)
    //         for (let fieldName in files) {
    //             await this.albumService.uploadToAlbum((files[fieldName] as any).newFilename, currentUser.id)
    //         }
    //         const albumResult = await this.albumService.getAlbum(currentUser.id);

    //         res.json(albumResult)

    //         return
    //     } catch (e) {
    //         console.log(e);

    //         res.status(400).send("Upload Fail")
    //         return
    //     }
    // }

    // getAlbum = async (req: Request, res: Response) => {
    //     let currentUser = req.session['user']
    //     const albumResult = await this.albumService.getAlbum(currentUser.id);

    //     res.json([albumResult, currentUser])

    //     return
    // }

    // deletePhotoFromAlbum = async (req: Request, res: Response) => {
    //     try {
    //         const photoName = req.body.index
    //         console.log(photoName)

    //         await this.albumService.deletePhoto(photoName)

    //         res.json({
    //             message: 'del success'
    //         })
    //     } catch (e) {
    //         console.log('error : ' + e)
    //         res.status(500).json({
    //             message: 'del fail'
    //         })
    //     }
    // }
}

import { Request, Response } from "express"
import { FriendsService } from "../services/friends-service"
// import { formParse } from "../utils/upload"
export class FriendsController {
    constructor(private friendsService: FriendsService) { }

    getUserFriends = async (req: Request, res: Response) => {
        try {
            console.log("getUserFriends API");
            

            //change userID
            const user_id = 1
            const albumResult = await this.friendsService.getUserFriends(user_id);
            console.log(albumResult)

            res.json(albumResult)
            return
        } catch (e) {
            console.log(e);

            res.status(400).send("Upload Fail")
            return
        }
    }






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
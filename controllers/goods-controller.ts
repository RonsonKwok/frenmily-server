import { Request, Response } from "express";
import { GoodsService } from "../services/goods-service";
// import { formParse } from "../utils/upload"
export class GoodsController {
    constructor(private goodsService: GoodsService) {}

    getAllGoodsCategories = async (req: Request, res: Response) => {
        try {
            console.log("getting all goods...");

            // const results = await this.goodsService.getAllGoodsCategories();
            const top5Listing = await this.goodsService.getTop5();
            const randomListing = await this.goodsService.getRandom();

            res.json({ 
                // results :results, 
                data: {
                    top5:top5Listing,
                    random:randomListing
                }
                // randomResults: randomResults,
             });

            return;
        } catch (e) {
            console.log(e);

            res.status(400).send("add friend Fail");
            return;
        }
    };

    getGoodsByCat = async (req: Request, res: Response) => {
        try {
            console.log("getGoodsByCat...");

            // TODO: let catId = req.body.catId;
            let catId = 7;
            console.log(catId);

            const resultsByCat = await this.goodsService.getGoodsByCat(catId);
            console.log(resultsByCat);

            const topResultsByCat = await this.goodsService.getTopGoodsByCat(
                catId
            );
            console.log(topResultsByCat);

            res.json({
                resultsByCat: resultsByCat,
                topResultsByCat: topResultsByCat,
            });

            return;
        } catch (e) {
            console.log(e);

            res.status(400).send("getGoodsByCat Fail");
            return;
        }
    };

    // addFriend = async (req: Request, res: Response) => {
    //     try {
    //         console.log("addFriend API");
    //         let targetID = req.body.targetID;
    //         let userID = req.body.userID;
    //         console.log(targetID);
    //         console.log(userID);

    //         // add friend each other
    //         await this.friendsService.addFriend(targetID, userID);

    //         res.json({ message: "add success" });
    //         return;
    //     } catch (e) {
    //         console.log(e);

    //         res.status(400).send("add friend Fail");
    //         return;
    //     }
    // };

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

import { Request, Response } from "express";
import { GoodsService } from "../services/goods-service";
// import { formParse } from "../utils/upload"
export class GoodsController {
    constructor(private goodsService: GoodsService) { }

    getAllGoodsCategories = async (req: Request, res: Response) => {
        try {
            console.log("getting all goods...");

            // const results = await this.goodsService.getAllGoodsCategories();
            const top5Listing = await this.goodsService.getTop5();
            const randomListing = await this.goodsService.getRandom();

            res.json({
                // results :results, 
                data: {
                    top5: top5Listing,
                    random: randomListing
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

    // TODO: HAPPY CASE: 分10次fetch 
    getProductByBatch = async (req: Request, res: Response) => {
        try {
            console.log("Receipt Request of getProductByBatch");
            const { qtyInOneBatch, ItemsToBeSkipped } = req.body
            // FIXME: Frontend 要比兩個param
            // qtyInOneBatch 一直為 10
            // ItemsToBeSkipped 是 0, 10, 20, 30 ...90

            const result = await this.goodsService.getProductByBatch(qtyInOneBatch, ItemsToBeSkipped);


            res.status(200).json({
                message: `successfully get ${qtyInOneBatch} products from DB`,
                result: result
            });

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("getProductByBatch Fail");
            return;
        }
    };

    getProductByBatchAndCatId = async (req: Request, res: Response) => {
        try {
            console.log("Receipt Request of getProductByBatch");
            const { catIds, qtyInOneBatch, ItemsToBeSkipped } = req.body
            // FIXME: Frontend 要比三個param
            // carIds 是number array，例如 [1,2,3]
            // qtyInOneBatch 一直為 10
            // ItemsToBeSkipped 是 0, 10, 20, 30 ...90

            console.log({ catIds, qtyInOneBatch, ItemsToBeSkipped })
            const result = await this.goodsService.getProductByBatchAndCatId(catIds, qtyInOneBatch, ItemsToBeSkipped);


            res.status(200).json({
                message: `successfully get ${qtyInOneBatch} products from DB`,
                result: result
            });

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("getProductByBatchAndCatId Fail");
            return;
        }
    };

    userLiked = async (req: Request, res: Response) => {
        try {
            console.log("userLiked API");
            const { user_id, goods_id, category_id } = req.body
            
            await this.goodsService.insertUserLiked(user_id, goods_id, category_id);


            res.status(200).json({
                message: `successfully insert product (goods_id:${goods_id}) from DB`,
            });

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("userLiked API Fail");
            return;
        }
    };

    addToCart = async (req: Request, res: Response) => {
        try {
            console.log("addToCart API");
            const { user_id, goods_id, quantity } = req.body
            console.log(user_id, goods_id, quantity )
            
            await this.goodsService.addToCart(user_id, goods_id, quantity);


            res.status(200).json({
                message: `User ${user_id} successfully add goods_id(${goods_id}) amount: ${quantity} to cart`,
            });

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("addToCart API Fail");
            return;
        }
    };

    getInitNum = async (req: Request, res: Response) => {
        try {
            console.log("getInitNum API");
            const { user_id, goods_id} = req.body
            console.log(user_id, goods_id)
            
            const quantity = await this.goodsService.getInitNum(user_id, goods_id);


            res.status(200).json({
                quantity: quantity
            });

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("getInitNum API Fail");
            return;
        }
    };

    getShoppingCartInitNum = async (req: Request, res: Response) => {
        try {
            console.log("getShoppingCartInitNum API");
            const user_id = req.body.user_id
            console.log(user_id)
            
            const quantity = await this.goodsService.getShoppingCartInitNum(user_id);


            res.status(200).json({
                shoppingCartInit: quantity
            });

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("getShoppingCartInitNum API Fail");
            return;
        }
    };



    
}

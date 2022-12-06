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

    searchKeyword = async (req: Request, res: Response) => {
        try {
            console.log("Searching goods...");
            const name = req.body.name
            console.log(name);


            const searchResult = await this.goodsService.searchKeyword(name);

            res.json({
                searchResult: searchResult
            });

            return;
        } catch (e) {
            console.log(e);

            res.status(400).send("Search Keyword Fail");
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

            const id = req.body.catIds
            console.log(id);

            // console.log("@@@@@@ Receipt Request of getProductByBatch");
            // console.log("req.body=", req.body)
            const { catIds, qtyInOneBatch, ItemsToBeSkipped } = req.body


            // console.log({ catIds, qtyInOneBatch, ItemsToBeSkipped })
            const result = await this.goodsService.getProductByBatchAndCatId(catIds, qtyInOneBatch, ItemsToBeSkipped);


            res.status(200).json({
                message: `successfully get ${qtyInOneBatch} products from DB`,
                result: result
            });

            // console.log("#### result of getProductByBatchAndCatId: ", result)

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
            // console.log(user_id, goods_id, quantity)

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
            const { user_id, goods_id } = req.body
            // console.log(user_id, goods_id)

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
            // console.log(user_id)

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

    getShoppingListItems = async (req: Request, res: Response) => {
        try {
            console.log("getShoppingListItems API");
            const user_id = req.body.user_id
            // console.log(user_id)

            const items = await this.goodsService.getShoppingListItems(user_id);


            res.status(200).json({ shoppingList: items });

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("getShoppingListItems API Fail");
            return;
        }
    };

    assignToGroup = async (req: Request, res: Response) => {
        try {
            console.log("assignToGroup API");
            const user_id = req.body.userId
            const groupId = req.body.groupId
            // console.log("user_id :", user_id)
            // console.log("groupId :", groupId)

            const items = await this.goodsService.assignToGroup(user_id, groupId);


            res.status(200).json({ shoppingList: items });

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("assignToGroup API Fail");
            return;
        }
    };

    assignToGroupFromAnother = async (req: Request, res: Response) => {
        try {
            console.log("assignSpecificProductToGroup API");
            const { userId, groupId, productIds } = req.body

            for (let productId of productIds) {
                await this.goodsService.assignToGroupFromAnother(userId, groupId, productId);
            }


            res.status(200);
            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("assignSpecificProductToGroup API Fail");
            return;
        }
    };


    getAssignedItems = async (req: Request, res: Response) => {
        try {
            console.log("getAssignedItems API");
            const groupId = req.body.groupId
            // console.log("groupId :", groupId)

            const results = await this.goodsService.getAssignedItems(groupId);


            res.status(200).json(results);

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("getAssignedItems API Fail");
            return;
        }
    };

    changeIsCompleted = async (req: Request, res: Response) => {
        try {
            console.log("changeIsCompleted API");
            const cart_id = req.body.cart_id
            const user_id = req.body.user_id
            // console.log("cart_id :", cart_id)
            // console.log("user_id :", user_id)

            const results = await this.goodsService.changeIsCompleted(cart_id, user_id);


            res.status(200).json(results);

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("changeIsCompleted API Fail");
            return;
        }
    };

    clearCart = async (req: Request, res: Response) => {
        try {
            console.log("clearCart API");
            const user_id = req.body.user_id
            // console.log("user_id :", user_id)

            await this.goodsService.clearCart(user_id);


            res.status(200)

            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("clearCart API Fail");
            return;
        }
    };





}

import express from "express";
import { GoodsController } from "../controllers/goods-controller";
import { GoodsService } from "../services/goods-service";
import { knex } from "../utils/db";

export const goodsRoute = express.Router();

let goodsService = new GoodsService(knex);
let goodsController = new GoodsController(goodsService);

goodsRoute.get("/categories", goodsController.getAllGoodsCategories);
goodsRoute.post("/productByBatchAndCatId", goodsController.getProductByBatchAndCatId);
goodsRoute.post("/userLiked", goodsController.userLiked);
goodsRoute.post("/searchKeyword", goodsController.searchKeyword);
goodsRoute.post("/addToCart", goodsController.addToCart);
goodsRoute.post("/getInitNum", goodsController.getInitNum);
goodsRoute.post("/getShoppingCartInitNum", goodsController.getShoppingCartInitNum);
goodsRoute.post("/getShoppingListItems", goodsController.getShoppingListItems);
goodsRoute.post("/assignToGroup", goodsController.assignToGroup);
goodsRoute.post("/assignToGroupFromAnother", goodsController.assignToGroupFromAnother);
goodsRoute.post("/getAssignedItems", goodsController.getAssignedItems);
goodsRoute.post("/changeIsCompleted", goodsController.changeIsCompleted);
goodsRoute.post("/clearCart", goodsController.clearCart);

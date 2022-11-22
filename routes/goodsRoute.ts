import express from "express";
import { GoodsController } from "../controllers/goods-controller";
import { GoodsService } from "../services/goods-service";
import { knex } from "../utils/db";
// import { isLoggedIn } from '../utils/guard';

export const goodsRoute = express.Router();

let goodsService = new GoodsService(knex);
let goodsController = new GoodsController(goodsService);

goodsRoute.get("/categories", goodsController.getAllGoodsCategories);
goodsRoute.post("/getGoods", goodsController.getGoodsByCat);
goodsRoute.post("/productByBatch", goodsController.getProductByBatch);
goodsRoute.post("/productByBatchAndCatId", goodsController.getProductByBatchAndCatId);
// goodsRoute.post(
//     "/addFriend",
//     // isLoggedIn,
//     goodsController.addFriend
// );

// from BAD project

// friendsRoute.post('/me', albumController.me);
// friendsRoute.get('/', albumController.getAlbum);
// friendsRoute.delete('/', isLoggedIn, albumController.deletePhotoFromAlbum);

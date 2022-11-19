import express from "express";
import { ReceiptsController } from "../controllers/receipts-controller";
import { ReceiptsService } from "../services/receipts-services";
import { knex } from "../utils/db";
// import { isLoggedIn } from '../utils/guard';

export const receiptsRoute = express.Router();

let receiptsService = new ReceiptsService(knex);
let receiptsController = new ReceiptsController(receiptsService);

receiptsRoute.post("/", receiptsController.uploadReceipt);

// goodsRoute.post(
//     "/addFriend",
//     // isLoggedIn,
//     goodsController.addFriend
// );

// from BAD project

// friendsRoute.post('/me', albumController.me);
// friendsRoute.get('/', albumController.getAlbum);
// friendsRoute.delete('/', isLoggedIn, albumController.deletePhotoFromAlbum);

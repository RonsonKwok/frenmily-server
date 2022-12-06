import express from "express";
import { ReceiptsController } from "../controllers/receipts-controller";
import { ReceiptsService } from "../services/receipts-services";
import { knex } from "../utils/db";

export const receiptsRoute = express.Router();

let receiptsService = new ReceiptsService(knex);
let receiptsController = new ReceiptsController(receiptsService);

receiptsRoute.post("/", receiptsController.uploadReceipt);
receiptsRoute.post("/settle", receiptsController.settle);
receiptsRoute.post("/getAllReceipts", receiptsController.getAllReceipts);
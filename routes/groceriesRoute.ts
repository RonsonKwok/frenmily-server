import express from 'express'
import { GroceriesController } from "../controllers/groceries-controller"
import { GroceriesService } from "../services/groceries-service"
import { knex } from '../utils/db';


export const groceriesRoute = express.Router();

let groceriesService = new GroceriesService(knex)
let groceriesController = new GroceriesController(groceriesService)


// groceriesRoute.get('/category', groceriesController.getByCategory);
groceriesRoute.get('/location', groceriesController.getByLocation);
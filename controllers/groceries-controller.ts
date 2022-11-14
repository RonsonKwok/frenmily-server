import express from "express"
import { GroceriesService } from "../services/groceries-service"

export class GroceriesController {
    constructor(private groceriesService: GroceriesService) { }

    // getByCategory = async (req: express.Request, res: express.Response) => {
    //     let userCategory = await this.groceriesService.getUserCategory(req.session['user'].id)
    //     let category_idtemp = userCategory.rows[0].category_id
    //     console.log(`getting rest by category_id = ${category_idtemp}`)

    //     //add logic to change user category
    //     let cardResults = await this.groceriesService.getGroceriesInfoByCategory(category_idtemp)
    //     let result = cardResults.rows
    //     res.json({ result })
    // }

    getByLocation = async (req: express.Request, res: express.Response) => {
        // console.log(`getting rest by location... latitude: ${req.session['location'].x},longitude: ${req.session['location'].y}`)
        let result = await this.groceriesService.getTheNearestDistrict(req.session['location'].x, req.session['location'].y)
        let userDistrict = result.rows[0].district_id
        console.log(`getting rest by district_id ${userDistrict}`)

        let cardResults = await this.groceriesService.getGroceriesInfoByLocation(userDistrict)
        let finalResult = cardResults.rows
        res.json([finalResult])
    }

    getGoodsByGoodsName = async (req: express.Request, res: express.Response) => {

        //TODO: insert logic

        res.json({
            message: "Goods info is here"
        })
    }
}
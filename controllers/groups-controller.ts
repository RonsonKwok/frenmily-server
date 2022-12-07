import express from "express";
import IncomingForm from "formidable/Formidable";
import { GroupsService } from "../services/groups-service";
import initFormidable from "../utils/upload";
import { File } from "formidable";
import fs from "fs";
import { uploadToS3 } from "../utils/aws-s3-upload";

export class GroupsController {
    constructor(private groupsService: GroupsService) { }

    createGroup = async (req: express.Request, res: express.Response) => {
        try {
            console.log("group-controller");
            const form: IncomingForm = initFormidable();

            form.parse(req, async (err, fields, files) => {
                req.body = fields;
                let groupName = req.body.groupName;
                let is_family_group = req.body.is_family_group;
                let groupMemberId = req.body.groupMemberId;
                let userID = req.body.userID;
                let tempArray = groupMemberId.split(',').map(function (item: any) {
                    return parseInt(item, 10);
                });
                const dummyPicArray = [
                    "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/groupPic.jpeg"
                ]
                const randomPic = dummyPicArray[Math.floor(Math.random() * dummyPicArray.length)];

                // insert to table groups
                let rowID = await this.groupsService.createGroup(
                    groupName,
                    is_family_group,
                    randomPic
                );

                // insert to table group_member
                await this.groupsService.insertGroupMember(
                    rowID,
                    tempArray,
                    parseInt(userID)
                );

                // all members add friends together
                await this.groupsService.addFriendsTogether(tempArray);
            });

            res.json({
                message: "Create group successfully",
            });
        } catch (e) {
            console.log(e);
            res.status(400).send("Create group failed");
            return;
        }
    };

    getGroups = async (req: express.Request, res: express.Response) => {
        try {
            console.log("getGroups API");
            const user_id = req.body.userID;
            const result = await this.groupsService.getGroups(user_id);
            res.json(result);
            return;
        } catch (e) {
            console.log(e);
            res.status(400).send("get group failed");
            return;
        }
    };

    getGroupMembers = async (req: express.Request, res: express.Response) => {
        try {
            console.log("getUserFriends API");
            let groupID = req.body.groupID;

            // get group members with paid amount
            let result = await this.groupsService.getGroupMembers(groupID);

            res.json(result);
            return;
        } catch (e) {
            console.log(e);

            res.status(400).send("get group members failed");
            return;
        }
    };

    getGroupName = async (req: express.Request, res: express.Response) => {
        try {
            console.log("getGroupName API");
            let groupID = req.body.groupID;

            // get group members with paid amount
            let result = await this.groupsService.getGroupName(groupID);

            res.json(result);
            return;
        } catch (e) {
            console.log(e);

            res.status(400).send("get group members failed");
            return;
        }
    };

    getGroupBuyingRecord = async (req: express.Request, res: express.Response) => {
        try {
            console.log("received request on getGroupBuyingRecord");
            let { groupId, month, year } = req.body

            // get group members with paid amount
            const NUMBER_OF_CATEGORY = 10
            const CATEGORIES_NAME = [
                "Bakery and Breakfast",
                "Dairy Products",
                "Snacks And Dessert",
                "Staples",
                "Noodles",
                "Beverages",
                "Alcohol",
                "Household",
                "Personal Care",
                "Frozen Food"
            ]
            const CATEGORY_ICON = [
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/bakery.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/dairy.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/snacks.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/staples.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/noodles.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/beverage.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/alcohol.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/household.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/personalcare.png",
                "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/fronzen.png"
            ]

            let categorizedResult: any[] = []

            for (let catId = 1; catId <= NUMBER_OF_CATEGORY; catId++) {
                let resultBefore = await this.groupsService.getBuyingRecord(groupId, catId, month, year);

                let result = resultBefore.filter(function (e: any) {
                    if (e.aeon_price == null && e.dch_price == null && e.jasons_price == null && e.parknshop_price == null && e.wellcome_price == null && e.mannings_price == null && e.watsons_price == null && e.ztore_price == null) {
                        return false
                    }
                    return true
                });
                categorizedResult.push({
                    categoryId: catId,
                    categoryName: CATEGORIES_NAME[catId - 1],
                    categoryIcon: CATEGORY_ICON[catId - 1],
                    result: result
                })
            }
            res.json(categorizedResult);
            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("getGroupBuyingRecord failed");
            return;
        }
    };

    getAnotherGroupShoppingList = async (req: express.Request, res: express.Response) => {
        try {
            console.log("received request on getAnotherGroupShoppingList");
            let { groupId } = req.body
            let anotherGroupShoppingList = await this.groupsService.getAnotherGroupShoppingList(groupId);

            res.json(anotherGroupShoppingList);
            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("getAnotherGroupShoppingList failed");
            return;
        }
    };

    deleteItemInShoppingList = async (req: express.Request, res: express.Response) => {
        try {
            console.log("deleteItemInShoppingList API");
            let cart_id = req.body.cart_id;

            // delete item from shopping list
            await this.groupsService.deleteItemInShoppingList(cart_id);

            res.json({ status: "ok" })
            return;
        } catch (e) {
            console.log(e);

            res.status(400).send("deleteItemInShoppingList failed");
            return;
        }
    };

    editGroupIcon = async (req: express.Request, res: express.Response) => {
        try {
            console.log("editGroupIcon API");
            const form: IncomingForm = initFormidable();

            form.parse(req, async (err, fields, files) => {
                req.body = fields;
                let group_id = req.body.group_id;

                let file: File = Array.isArray(files.image)
                    ? files.image[0]
                    : files.image;
                let fileName = file ? file.newFilename : undefined;

                // Upload file to AWS S3
                const accessPath = await uploadToS3({
                    Bucket: "iconandreceipt",
                    Key: `${fileName}`,
                    Body: fs.readFileSync(file.filepath!),
                });

                // edit to table groups
                await this.groupsService.editGroupIcon(
                    group_id,
                    accessPath
                );
            });

            res.json({
                message: "Create group successfully",
            });
        } catch (e) {
            console.log(e);
            res.status(400).send("Create group failed");
            return;
        }
    };

    deleteEmptyGroup = async (req: express.Request, res: express.Response) => {
        try {
            console.log("deleteGroup API");
            let groupId = req.body.groupID;
            let getGroupResult = await this.groupsService.getDeletableGroups(groupId);

            if (getGroupResult.shoppingListResult.length > 0 || getGroupResult.receiptResult.length > 0) {
                res.status(400).json({
                    message: "This group cannot be deleted"
                })
                return
            }

            let deleteGroupResult = await this.groupsService.deleteGroup(groupId)
            res.status(200).json({
                message: "This group is deleted",
                deleteGroupResult: deleteGroupResult
            });


        } catch (e) {
            console.log(e);
            res.status(400).send("Delete group failed");
            return;
        }
    };

    instantAdd = async (req: express.Request, res: express.Response) => {
        try {
            console.log("instantAdd API");
            let user_id = req.body.user_id
            let group_id = req.body.group_id;
            let goods_id = req.body.goods_id;
            let quantity = req.body.quantity;

            const result = await this.groupsService.instantAdd(user_id, group_id, goods_id, quantity);

            res.status(200).json({
                message: "added items",
                result: result
            });


        } catch (e) {
            console.log(e);
            res.status(400).send("instantAdd failed");
            return;
        }
    };

    deleteAllToBuy = async (req: express.Request, res: express.Response) => {
        try {
            console.log("deleteAllToBuy API");
            let group_id = req.body.group_id;
            console.log("group_id :", group_id)

            const result = await this.groupsService.deleteAllToBuy(group_id);

            res.status(200).json({
                message: "deleted items",
                result: result
            });


        } catch (e) {
            console.log(e);
            res.status(400).send("deleteAllToBuy failed");
            return;
        }
    };

    changeGroupName = async (req: express.Request, res: express.Response) => {
        try {
            console.log("changeGroupName API");
            let groupName = req.body.groupName;
            let groupId = req.body.groupId;
            console.log("groupName :", groupName)
            console.log("groupId :", groupId)

            const result = await this.groupsService.changeGroupName(groupName, groupId);

            res.status(200).json({
                message: "deleted items",
                result: result
            });


        } catch (e) {
            console.log(e);
            res.status(400).send("changeGroupName failed");
            return;
        }
    };
}

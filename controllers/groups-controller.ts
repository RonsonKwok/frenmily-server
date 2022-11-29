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
                console.log("groupName :", groupName)
                console.log(is_family_group)
                console.log(groupMemberId)
                console.log([groupMemberId])
                let tempArray = groupMemberId.split(',').map(function (item: any) {
                    return parseInt(item, 10);
                });
                console.log("tempArray :", tempArray);

                console.log(userID)


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

                // insert to table groups
                let rowID = await this.groupsService.createGroup(
                    groupName,
                    is_family_group,
                    accessPath
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
            console.log(user_id);

            const result = await this.groupsService.getGroups(user_id);
            console.log(result);
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
            console.log("groupID :", groupID);

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
            console.log("groupID :", groupID);

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

    // getByLocation = async (req: express.Request, res: express.Response) => {
    //     // console.log(`getting rest by location... latitude: ${req.session['location'].x},longitude: ${req.session['location'].y}`)
    //     let result = await this.groceriesService.getTheNearestDistrict(req.session['location'].x, req.session['location'].y)
    //     let userDistrict = result.rows[0].district_id
    //     console.log(`getting rest by district_id ${userDistrict}`)

    //     let cardResults = await this.groceriesService.getGroceriesInfoByLocation(userDistrict)
    //     let finalResult = cardResults.rows
    //     res.json( [finalResult] )
    // }


    getGroupBuyingRecord = async (req: express.Request, res: express.Response) => {
        try {
            console.log("received request on getGroupBuyingRecord");

            let { groupId, month, year } = req.body
            console.log("groupId: ", groupId, "month :", month, "year: ", year);

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
                let result = await this.groupsService.getBuyingRecord(groupId, catId, month, year);

                categorizedResult.push({
                    categoryId: catId,
                    categoryName: CATEGORIES_NAME[catId - 1],
                    categoryIcon: CATEGORY_ICON[catId - 1],
                    result: result
                })
            }
            console.log("The categorized result: ", categorizedResult)
            res.json(categorizedResult);
            return;

        } catch (e) {
            console.log(e);
            res.status(400).send("getGroupBuyingRecord failed");
            return;
        }
    };

    // to get each family's money saved
    // to get the quantity of family group 
    // getFamilyMoneySaved = async (req: express.Request, res: express.Response) => {
    //     try {

    //         res.json({
    //             message: "fetch family data successfully"
    //         });
    //         return;

    //     } catch (e) {
    //         console.log(e);
    //         res.status(400).send("getFamilyMoneySaved failed");
    //         return;
    //     }
    // };


}

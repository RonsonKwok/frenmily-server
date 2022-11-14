import express from "express";
import { GroupsService } from "../services/groups-service";

export class GroupsController {
    constructor(private groupsService: GroupsService) {}

    createGroup = async (req: express.Request, res: express.Response) => {
        try {
            console.log("group-controller");
            const groupName = req.body.groupName;
            const is_family_group = req.body.is_family_group;
            const profile_picture = req.body.profile_picture;
            const groupMemberId = req.body.groupMemberId;
            console.log(groupName);
            console.log(is_family_group);
            console.log(profile_picture);
            console.log(groupMemberId);

            // insert to table groups
            let rowID = await this.groupsService.createGroup(
                groupName,
                is_family_group,
                profile_picture
            );

            // insert to table group_member
            await this.groupsService.insertGroupMember(rowID, groupMemberId);

            // all members add friends together
            await this.groupsService.addFriendsTogether(groupMemberId);

            res.json({
                message: "Create group successfully",
            });
        } catch (error) {
            console.log(error);
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
}

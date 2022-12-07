import express from "express";
import { GroupsController } from "../controllers/groups-controller";
import { GroupsService } from "../services/groups-service";
import { knex } from "../utils/db";

export const groupsRoute = express.Router();

let groupsService = new GroupsService(knex);
let groupsController = new GroupsController(groupsService);

groupsRoute.post("/", groupsController.createGroup);
groupsRoute.post("/getGroups", groupsController.getGroups);
groupsRoute.post("/getGroupMembers", groupsController.getGroupMembers);
groupsRoute.post("/getGroupName", groupsController.getGroupName);
groupsRoute.post("/groupBuyingRecord", groupsController.getGroupBuyingRecord);
groupsRoute.post("/deleteItemInShoppingList", groupsController.deleteItemInShoppingList);
groupsRoute.post("/editGroupIcon", groupsController.editGroupIcon);
groupsRoute.post("/deleteEmptyGroup", groupsController.deleteEmptyGroup);
groupsRoute.post("/instantAdd", groupsController.instantAdd);
groupsRoute.post("/anotherGroupShoppingList", groupsController.getAnotherGroupShoppingList);
groupsRoute.delete("/deleteAllToBuy", groupsController.deleteAllToBuy);
groupsRoute.put("/changeGroupName", groupsController.changeGroupName);



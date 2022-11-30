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
// groupsRoute.post("/familyMoneySaved", groupsController.getFamilyMoneySaved);
// groceriesRoute.get('/category', groceriesController.getByCategory);
// groceriesRoute.get('/location', groceriesController.getByLocation);
groupsRoute.post("/deleteItemInShoppingList", groupsController.deleteItemInShoppingList);
groupsRoute.post("/editGroupIcon", groupsController.editGroupIcon);


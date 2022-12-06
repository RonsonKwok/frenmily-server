import express from "express";
import { UserController } from "../controllers/user-controller";
import { UserService } from "../services/user-service";
import { knex } from "../utils/db";

export const userRoutes = express.Router();

let userService = new UserService(knex);
let userController = new UserController(userService);

userRoutes.get("/me", userController.me);
userRoutes.post("/login", userController.login);
userRoutes.post("/register", userController.register);
userRoutes.get("/username", userController.username);
userRoutes.post("/updateGender", userController.updateGender);
userRoutes.post("/updateMobileNumber", userController.updateMobileNumber);
userRoutes.post("/updateEmail", userController.updateEmail);
userRoutes.post("/updateProfilePicture", userController.updateProfilePicture);
userRoutes.post("/getUserName", userController.getUserName);
userRoutes.post("/disableAccount", userController.disableAccount);

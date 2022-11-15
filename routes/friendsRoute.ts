import express from 'express'
import { FriendsController } from '../controllers/friends-controller';
import { FriendsService } from '../services/friends-service';
import { knex } from '../utils/db';
// import { isLoggedIn } from '../utils/guard';


export const friendsRoute = express.Router();

let friendsService = new FriendsService(knex)
let friendsController = new FriendsController(friendsService)

friendsRoute.get('/', 
// isLoggedIn, 
friendsController.getUserFriends);





// from BAD project

// friendsRoute.post('/me', albumController.me);
// friendsRoute.get('/', albumController.getAlbum);
// friendsRoute.delete('/', isLoggedIn, albumController.deletePhotoFromAlbum);



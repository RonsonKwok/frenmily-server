import { Knex } from "knex";

export class FriendsService {
    constructor(private knex: Knex) {}

    async getUserFriends(user_id: number): Promise<any> {
        const results = await this.knex.raw(
            "select * from user_friends inner join users on user_friend_id = users.id where user_id = ?",
            [user_id]
        );
        return results.rows;
    }

    async searchFriend(searchBar: string): Promise<any> {
        const results = await this.knex.raw(
            "select * from users where mobile = ?",
            [searchBar]
        );
        console.log("results.rows :", results.rows);
        // [
        //     {
        //       id: 8,
        //       username: '888',
        //       is_male: false,
        //       email: '888',
        //       mobile: '888',
        //       password: '888',
        //       profile_picture: '888',
        //       created_at: 2022-11-15T13:55:53.704Z,
        //       updated_at: 2022-11-15T13:55:53.704Z
        //     }
        //   ]

        const emailResult = await this.knex.raw(
            "select * from users where email = ?",
            [searchBar]
        );
        // console.log("results.rowsEmail :", emailResult.rows);

        results.rows.push(emailResult.rows[0]);
        console.log("combineResult :", results.rows);

        return results.rows;
    }

    async friendOrNot(targetUserID: number, userID: number): Promise<any> {
        const results = await this.knex.raw(
            "select * from user_friends where user_id = ? and user_friend_id = ?",
            [userID, targetUserID]
        );
        return results.rows;
    }

    async addFriend(targetUserID: number, userID: number): Promise<any> {
        await this.knex.raw(
            `INSERT INTO user_friends
            (user_id, user_friend_id) 
            VALUES (?,?)`,
            [userID, targetUserID]
        );
        await this.knex.raw(
            `INSERT INTO user_friends
          (user_id, user_friend_id) 
          VALUES (?,?)`,
            [targetUserID, userID]
        );
    }

    //////////////////////////////////////// from BAD project

    // async uploadToAlbum(image_source: string, user_id: number): Promise<any> {
    //     return (await this.knex.insert({ image_source, user_id}).into("user_album_images"))
    // }

    // async getAlbum(user_id: number): Promise<any> {

    //     const results = await this.knex.select("*").from("user_album_images").where("user_id", "=", user_id);

    //     return results;
    // }

    // async deletePhoto(image_source:string){
    //     await this.knex.raw('delete from user_album_images where image_source = ?', [image_source])
    // }

    // async updateCategory(user_id: number, category_id: number): Promise<any> {
    //     console.log("into service")

    //     await this.knex.raw(`
    //     DELETE from user_food_category where user_id = ${user_id}
    //     `)

    //     await this.knex.raw(`
    //         INSERT INTO user_food_category
    //         (user_id, category_id)
    //         VALUES (?,?)
    //     `,
    //         [user_id, category_id])
    // }
}

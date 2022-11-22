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

    async calculateMoney1(
        user_id: number,
        user_friend_id: number
    ): Promise<any> {
        // check有冇人差呢個user錢
        const result = await this.knex.raw(
            `select * from transcations 
            where is_settled = false 
            AND creditor_id = ? 
            AND debitor_id = ?`,
            [user_id, user_friend_id]
        );
        if (user_friend_id == 5) {
            console.log("result5 :", result.rows);
        }

        return result.rows;
    }

    async calculateMoney2(
        user_id: number,
        user_friend_id: number
    ): Promise<any> {
        // check有冇人差呢個user錢
        const result = await this.knex.raw(
            `select * from transcations 
            where is_settled = false 
            AND debitor_id = ?
            AND creditor_id = ?`,
            [user_id, user_friend_id]
        );
        console.log("HERERERER: ", result.rows);
        return result.rows;
    }
}

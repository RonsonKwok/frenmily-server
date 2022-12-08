import { Knex } from "knex";

export class GroupsService {
    constructor(private knex: Knex) { }

    async createGroup(
        groupName: string,
        is_family_group: boolean,
        randomPic: string
    ): Promise<any> {
        let id = await this.knex.raw(
            `
            INSERT INTO groups
            (group_name, profile_picture, is_family_group) 
            VALUES (?,?,?) RETURNING id
        `,
            [groupName, randomPic, is_family_group]
        );

        return id.rows[0].id;
    }

    async insertGroupMember(
        rowID: number,
        groupMemberIdArray: number[],
        user_id: number
    ): Promise<any> {
        groupMemberIdArray.push(user_id);

        for (let i = 0; i < groupMemberIdArray.length; i++) {
            console.log(groupMemberIdArray[i]);
            await this.knex.raw(
                `
            INSERT INTO group_member
            (group_id, user_id) 
            VALUES (?,?)
        `,
                [rowID, groupMemberIdArray[i]]
            );
        }
    }

    async addFriendsTogether(groupMemberIdArray: number[]): Promise<any> {
        let tempArray = [];
        console.log(groupMemberIdArray);

        for (let i = 0; i < groupMemberIdArray.length; i++) {
            for (let y = 0; y < groupMemberIdArray.length; y++) {
                if (groupMemberIdArray[i] != groupMemberIdArray[y]) {
                    tempArray.push([
                        groupMemberIdArray[i],
                        groupMemberIdArray[y],
                    ]);
                }
            }
        }
        for (let i = 0; i < tempArray.length; i++) {
            await this.knex.raw(
                `
            INSERT INTO user_friends
            (user_id, user_friend_id) 
            VALUES (?,?)
            `,
                [tempArray[i][0], tempArray[i][1]]
            );
        }
    }

    async getGroups(user_id: number): Promise<any> {
        let result = await this.knex.raw(
            `
            select groups.id, group_name, profile_picture, is_family_group, group_id ,groups.updated_at from groups inner join group_member 
            on group_member.group_id = groups.id 
            where group_member.user_id = ?
            order by updated_at desc
        `,
            [user_id]
        );
        return result.rows;
    }

    async getGroupMembers(groupID: number): Promise<any> {
        let results = await this.knex.raw(
            `
            select * from group_member where group_id = ?
        `,
            [groupID]
        );
        let tempUserIDArray = []
        for (let result of results.rows) {
            tempUserIDArray.push(result.user_id)
        }
        let tempUserInfoArray = []

        for (let userID of tempUserIDArray) {
            let memberResult = await this.knex.raw(
                `
                select id,username,profile_picture from users where id = ?
            `,
                [userID]
            );
            tempUserInfoArray.push(memberResult.rows[0])
        }
        for (let tempUserInfo of tempUserInfoArray) {
            let result = await this.knex.raw(
                `
                select SUM(amount) from paid_records where group_id = ? and user_id = ? and is_valid = true
            `,
                [groupID, tempUserInfo.id]
            );
            tempUserInfo['paid'] = result.rows[0].sum
        }

        return tempUserInfoArray;
    }

    async getGroupName(groupID: number): Promise<any> {
        let result = await this.knex.raw(
            `
            select group_name,profile_picture  from "groups" where id = ?
        `,
            [groupID]
        );

        return result.rows[0];
    }

    async getBuyingRecord(groupId: number, catId: number, month: number, year: number): Promise<any> {
        try {
            console.log("DATABASE: getBuyingRecord");
            let result = await this.knex.raw(/*sql*/
                `
                select 
                extract (day from shopping_lists.updated_at) as day,
                extract (month from shopping_lists.updated_at) as month,
                extract (year from shopping_lists.updated_at) as year,
                groups.id as group_id, 
                group_name, 
                carts.goods_id,
                carts.id,
                carts.quantity, 
                goods.name as goods_name, 
                goods.category_id, 
                goods_categories.goods_categories_picture as category_icon,
                goods.goods_picture, 
                aeon_price, 
                dch_price, 
                jasons_price, 
                parknshop_price, 
                wellcome_price, 
                mannings_price, 
                watsons_price, 
                ztore_price, 
                report_lower_price
                from groups
                inner join shopping_lists
                on shopping_lists.group_id = groups.id
                inner join carts
                on carts.id = shopping_lists.cart_id 
                inner join goods
                on goods.id = carts.goods_id 
                inner join goods_categories
                on goods_categories.id = goods.category_id 
                where group_id = ? and
                is_completed = true and 
                goods.category_id = ? and
                is_family_group =true and 
                extract(month from shopping_lists.updated_at)=? and 
                extract(year from shopping_lists.updated_at)=?
                `,
                [groupId, catId, month, year]
            );

            return result.rows;
        }
        catch (e) {
            console.log(e);
        }

    }

    async getAnotherGroupShoppingList(groupId: number): Promise<any> {
        try {
            console.log("DATABASE: getBuyingRecord");
            let result = await this.knex.raw(/*sql*/
                `
                select 
                extract (day from shopping_lists.updated_at) as day,
                extract (month from shopping_lists.updated_at) as month,
                extract (year from shopping_lists.updated_at) as year,
                groups.id as group_id, 
                group_name, 
                carts.goods_id,
                goods.name as goods_name, 
                goods.category_id,
                goods.goods_picture
                from groups
                inner join shopping_lists
                on shopping_lists.group_id = groups.id
                inner join carts
                on carts.id = shopping_lists.cart_id 
                inner join goods
                on goods.id = carts.goods_id 
                inner join goods_categories
                on goods_categories.id = goods.category_id 
                where group_id = ?
                order by shopping_lists.updated_at desc
                `,
                [groupId]
            );

            return result.rows;
        }
        catch (e) {
            console.log(e);
        }

    }

    async deleteItemInShoppingList(cart_id: number): Promise<any> {
        await this.knex.raw(
            `
            delete from shopping_lists where cart_id = ?
        `,
            [cart_id]
        );
    }

    async editGroupIcon(
        group_id: number,
        profile_picture: string
    ): Promise<any> {
        try {
            await this.knex.raw(
                `
                UPDATE "groups"
                SET profile_picture=?
                WHERE id= ?
            `,
                [profile_picture, group_id]
            );

        } catch (err) {
            console.log(err)
        }

    }

    async getDeletableGroups(groupId: number): Promise<any> {
        try {
            let result1 = await this.knex.raw(/*sql*/
                `
                select * 
                from groups
                inner join shopping_lists
                on groups.id = shopping_lists.group_id 
                where groups.id = ?
            `,
                [groupId]

            )

            let result2 = await this.knex.raw(/*sql*/
                `
                select * 
                from groups
                inner join paid_records
                on paid_records.group_id = groups.id
                where groups.id = ? and is_valid=true 
            `,
                [groupId]

            )

            let result3 = await this.knex.raw(/*sql*/
                `
                select * 
                from transcations
                where group_id = ? and is_settled = false 
            `,
                [groupId]
            )



            let shoppingListResult = result1.rows
            let receiptResult = result2.rows
            let transactionResult = result3.rows

            return {
                shoppingListResult,
                receiptResult,
                transactionResult
            }


        } catch (err) {
            console.log(err);
        }

    }





    async deleteGroup(groupId: number): Promise<any> {
        try {

            await this.knex.raw(/*sql*/
                `
            delete from 
            transcations
            where group_id = ? 
            `,
                [groupId]
            )

            await this.knex.raw(/*sql*/
                `
            delete from 
            paid_records
            where group_id = ? 
            `,
                [groupId]
            )

            let result1 = await this.knex.raw(
                `
                delete from shopping_lists 
                where group_id = ?
                `,
                [groupId]
            )

            let result2 = await this.knex.raw(
                `
                delete from paid_records  
                where group_id = ?
                `,
                [groupId]
            )
            let result3 = await this.knex.raw(
                `
                delete from group_member 
                where group_id = ?
                `,
                [groupId]
            )
            let result4 = await this.knex.raw(
                `
                delete from groups 
                where id = ?
                `,
                [groupId]
            )

            return {
                result1,
                result2,
                result3,
                result4,
            }

        } catch (err) {
            console.log(err);
        }

    }

    async instantAdd(user_id: number, group_id: number, goods_id: number, quantity: number): Promise<any> {
        try {
            console.log("DATABASE: instantAdd1");
            const id = await this.knex.raw(
                `INSERT INTO carts (users_id, goods_id, quantity, is_assigned) VALUES(?, ?, ?, ?) RETURNING id;`,
                [user_id, goods_id, quantity, true]
            );

            await this.knex.raw(
                `INSERT INTO shopping_lists (group_id, cart_id, is_completed, assignee_id, buyer_id)VALUES(?, ?, ?, ?, ?);`,
                [group_id, id.rows[0].id, false, user_id, null]
            );

        }
        catch (e) {
            console.log(e);
        }

    }

    async deleteAllToBuy(group_id: number): Promise<any> {
        try {
            console.log("DATABASE: instantAdd1");
            await this.knex.raw(
                `DELETE FROM shopping_lists WHERE group_id = ? and is_completed = false`,
                [group_id]
            );

        }
        catch (e) {
            console.log(e);
        }

    }

    async changeGroupName(groupName: string, groupId: number): Promise<any> {
        try {
            console.log("DATABASE: changeGroupName");
            await this.knex.raw(
                `UPDATE groups SET group_name = ? where id = ?`,
                [groupName, groupId]
            );

        }
        catch (e) {
            console.log(e);
        }

    }
}

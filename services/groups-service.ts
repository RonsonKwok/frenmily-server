import { Knex } from "knex";

export class GroupsService {
    constructor(private knex: Knex) { }

    async createGroup(
        groupName: string,
        is_family_group: boolean,
        profile_picture: string
    ): Promise<any> {
        let id = await this.knex.raw(
            `
            INSERT INTO groups
            (group_name, profile_picture, is_family_group) 
            VALUES (?,?,?) RETURNING id
        `,
            [groupName, profile_picture, is_family_group]
        );

        return id.rows[0].id;
    }

    async insertGroupMember(
        rowID: number,
        groupMemberIdArray: number[],
        user_id: number
    ): Promise<any> {
        console.log("groupMemberIdArray :", groupMemberIdArray);
        console.log("user_id :", user_id)
        groupMemberIdArray.push(user_id);
        console.log("groupMemberIdArray :", groupMemberIdArray);

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
            console.log(groupMemberIdArray[i]);
            for (let y = 0; y < groupMemberIdArray.length; y++) {
                if (groupMemberIdArray[i] != groupMemberIdArray[y]) {
                    tempArray.push([
                        groupMemberIdArray[i],
                        groupMemberIdArray[y],
                    ]);
                }
            }
        }
        console.log(tempArray);
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
        console.log("testing")
        // let result = await this.knex.raw(
        //     `
        //     select * from groups inner join group_member 
        //     on group_member.group_id = groups.id 
        //     where group_member.user_id = ?
        // `,
        //     [user_id]
        // );
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
                select SUM(amount) from paid_records where group_id = ? and user_id = ?
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
            select group_name from "groups" where id = ?
        `,
            [groupID]
        );

        return result.rows[0].group_name;
    }

    async getBuyingRecord(month: number, year: number): Promise<any> {
        try {
            console.log("DATABASE: getBuyingRecord");
            let result = await this.knex.raw(/*sql*/
                `
                select 
                extract (month from shopping_lists.updated_at) as month,
                extract (year from shopping_lists.updated_at) as year,
                groups.id as group_id, 
                group_name, 
                carts.goods_id , 
                goods.name as goods_name, 
                goods.category_id, 
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
                where is_completed = true and 
                is_family_group =true and 
                extract(month from shopping_lists.updated_at)=? and 
                extract(year from shopping_lists.updated_at)=?
                `,
                [month, year]
            );

            return result.rows[0];
        }
        catch (e) {
            console.log(e);
        }

    }

}

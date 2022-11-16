import { Knex } from "knex";

export class GroupsService {
    constructor(private knex: Knex) {}

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
        groupMemberIdArray.push(user_id);
        console.log(groupMemberIdArray);

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
        let result = await this.knex.raw(
            `
            select * from groups inner join group_member 
            on group_member.group_id = groups.id 
            where group_member.user_id = ?
        `,
            [user_id]
        );
        return result.rows;
    }

    // async getGroceriesInfoByLocation(district_id: number): Promise<any> {
    //     let cardResults = (
    //         await this.knex.raw(/*sql*/`
    //         SELECT *
    //         FROM groceries
    //         WHERE district_id  = ${district_id}
    //     `,
    //         ))
    //     return cardResults
    // }

    // async getTheNearestDistrict(x: any, y: any): Promise<any> {
    //     let locationResult = (
    //         await this.knex.raw(/*sql*/`
    //         with
    //         distinct_district as (
    //             select
    //             distinct (district_id)as  district_id
    //             from groceries r order by district_id
    //         ),
    //         distriect_rand_resto as (
    //           select district_id,
    //           (select id from groceries where groceries.district_id  = distinct_district.district_id limit 1 ) as groceries_id
    //           from distinct_district
    //         )
    //         select * from distriect_rand_resto join groceries r on r.id = distriect_rand_resto.groceries_id
    //         ORDER BY coordinates <-> point '(${x}, ${y})' LIMIT 1
    //     `,
    //         ))
    //     return locationResult
    // }

    // async getUserCategory(user_id: any): Promise<any> {
    //     let result = (
    //         await this.knex.raw(`
    //         select * from user_food_category where user_id = ${user_id};
    //     `
    //         ))
    //     return result
    // }
}

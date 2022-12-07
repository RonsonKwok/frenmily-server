import { Knex } from "knex";
import { hashPassword } from "../utils/hash"



export class UserService {
    static
        //               select district_id, 
        //               (select id from restaurants where restaurants.district_id  = distinct_district.district_id limit 1 ) as restaurant_id  
        //               from distinct_district
        //             )
        //             select * from distriect_rand_resto join restaurants r on r.id = distriect_rand_resto.restaurant_id
        //             ORDER BY coordinates <-> point '(${x}, ${y})' LIMIT 1
        //         `,
        //             ))
        //         return locationResult
        //     }
        //     async getDistrictName (district_id: number): Promise<any> {
        //         let districtResult = (
        //             await this.knex.raw(`
        //             select name from districts where id = ${district_id}
        //         `,
        //             ))
        //         return districtResult
        //     }
        //     async getFavouriteCatID (user_id: number): Promise<any> {
        //         let districtResult = (
        //             await this.knex.raw(`
        //             select category_id from user_food_category where user_id = ${user_id}
        //         `,
        //             ))
        //         return districtResult
        //     }
        //     async getFoodCat (cat_id: number): Promise<any> {
        //         let result = (
        //             await this.knex.raw(`
        //             select name from food_categories where id = ${cat_id}
        //         `,
        //             ))
        //         return result
        //     }
        getUserByUsername(username: any) {
        throw new Error("Method not implemented.");
    }
    constructor(private knex: Knex) { }

    async getUserByUsername(username: string): Promise<any> {
        try {
            let userResult = (
                await this.knex.raw(/*sql*/`
            SELECT * 
            FROM users 
            WHERE username = ?
        `,
                    [username])
            )
            return userResult
        } catch (error) {
            console.log(error)
        }

    }

    async getUserByMobileNumber(mobile: string): Promise<any> {
        try {
            let userResult = (
                await this.knex.raw(/*sql*/`
                SELECT * 
                FROM users 
                WHERE mobile = ?
            `,
                    [mobile])
            )
            return userResult

        } catch (error) {
            console.log(error)
        }
    }

    async getUserByEmail(email: string): Promise<any> {
        try {
            let userResult = (
                await this.knex.raw(/*sql*/`
                SELECT * 
                FROM users 
                WHERE email = ?
            `,
                    [email])
            )
            return userResult

        } catch (error) {
            console.log(error)
        }
    }

    async updateGender(username: string, gender: string) {
        try {
            let userResult = (
                await this.knex.raw(/*sql*/`
                UPDATE users 
                SET gender = ? 
                WHERE username = ?
            `,
                    [gender, username])
            )
            return userResult

        } catch (error) {
            console.log(error)
        }
    }

    async updateUserMobileNumber(username: string, mobile: string) {
        try {
            let userResult = (
                await this.knex.raw(/*sql*/`
            UPDATE users 
            SET mobile = ? 
            WHERE username = ?
        `,
                    [mobile, username])
            )
            return userResult
        } catch (error) {
            console.log(error)
        }

    }

    async updateEmail(username: string, email: string) {
        try {
            let userResult = (
                await this.knex.raw(/*sql*/`
                UPDATE users 
                SET email = ? 
                WHERE username = ?
            `,
                    [email, username])
            )
            console.log("userResult:", userResult)
            return userResult

        } catch (error) {
            console.log(error)
        }
    }


    async createUser(username: string, password: string, mobile: string, email: string, randomPic: string): Promise<any> {
        try {
            let hashedPassword = await hashPassword(password)


            let result = await this.knex.insert({
                username: username,
                password: hashedPassword,
                mobile: mobile,
                email: email,
                profile_picture: randomPic
            }).into("users").returning('*');

            return result;

        } catch (error) {
            console.log(error)
        }
    }

    async initBeginnerGroup(groupName: string, is_family_group: boolean, dummyGroupPicArray: string): Promise<any> {
        let id = await this.knex.raw(/*sql*/
            `
            INSERT INTO groups
            (group_name, profile_picture, is_family_group) 
            VALUES (?,?,?) RETURNING id
        `,
            [groupName, dummyGroupPicArray, is_family_group]
        );

        return id.rows[0].id;
    }

    async insertBeginnerGroupMember(rowID: number, newUserId: number): Promise<any> {

        await this.knex.raw(/*sql*/
            `
            INSERT INTO group_member
            (group_id, user_id) 
            VALUES (?,?)
        `,
            [rowID, newUserId]
        );

    }

    async changeProfilePicture(userID: number, accessPath: string) {
        try {
            console.log("DATABASE: Received new profile picture");

            console.log("userID:", userID)
            console.log("accessPath:", accessPath)

            let userResult = (
                await this.knex.raw(/*sql*/`
                    UPDATE users 
                    SET profile_picture  = ? 
                    WHERE id = ?
                    returning *
                `,
                    [accessPath, userID])
            )
            console.log("userResult:", userResult)
            return userResult

        }
        catch (e) {
            console.log(e)
        }
    }

    async getUserName(userID: number) {
        try {
            console.log("DATABASE: getUserName");

            let userResult = (
                await this.knex.raw(`select username from users where id = ?`, [userID])
            )
            console.log("userResult:", userResult.rows[0])
            return userResult.rows[0]

        }
        catch (e) {
            console.log(e)
        }
    }

    async changePasswordToRandom(username: string, randomString: string) {
        try {
            console.log("DATABASE: changePasswordToRandom");
            console.log("username: ", username)
            console.log("randomString: ", randomString)
            await this.knex.raw(/*sql*/`
                UPDATE users 
                SET password = ?, mobile = ?, email = ?
                WHERE username = ?;
                `,
                [randomString, randomString, randomString, username])


        }
        catch (e) {
            console.log(e)
        }
    }


}
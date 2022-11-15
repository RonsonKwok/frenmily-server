import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw(`TRUNCATE  users  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  groups  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  group_member  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  user_friends  RESTART IDENTITY CASCADE`)

    // Inserts seed entries

    await knex.insert([
        {
            username: 111,
            is_male: true,
            email: 111,
            mobile: 111,
            password: 111,
            profile_picture: 111
        },
        {
            username: 222,
            is_male: false,
            email: 222,
            mobile: 222,
            password: 222,
            profile_picture: 222
        },
        {
            username: 333,
            is_male: true,
            email: 333,
            mobile: 333,
            password: 333,
            profile_picture: 333
        },
        {
            username: 444,
            is_male: false,
            email: 444,
            mobile: 444,
            password: 444,
            profile_picture: 444
        },
        {
            username: 555,
            is_male: true,
            email: 555,
            mobile: 555,
            password: 555,
            profile_picture: 555
        },
        {
            username: 666,
            is_male: false,
            email: 666,
            mobile: 666,
            password: 666,
            profile_picture: 666
        },
        {
            username: 777,
            is_male: true,
            email: 777,
            mobile: 777,
            password: 777,
            profile_picture: 777
        },
        {
            username: 888,
            is_male: false,
            email: 888,
            mobile: 888,
            password: 888,
            profile_picture: 888
        },
        {
            username: 999,
            is_male: true,
            email: 999,
            mobile: 999,
            password: 999,
            profile_picture: 999
        }
    ]).into('users');

    await knex.insert([
        {
            group_name: "singK",
            profile_picture: "111",
            is_family_group: true
        },
        {
            group_name: "partyRoom",
            profile_picture: "222",
            is_family_group: false
        }
    ]).into('groups');

    await knex.insert([
        {
            group_id: "1",
            user_id: "1",
        },
        {
            group_id: "1",
            user_id: "2",
        },
        {
            group_id: "1",
            user_id: "3",
        },
        {
            group_id: "1",
            user_id: "4",
        },
        {
            group_id: "1",
            user_id: "5",
        },
        {
            group_id: "2",
            user_id: "6",
        },
        {
            group_id: "2",
            user_id: "7",
        },
        {
            group_id: "2",
            user_id: "8",
        },
        {
            group_id: "2",
            user_id: "9",
        }
    ]).into('group_member');

    await knex.insert([
        {
            user_id: "1",
            user_friend_id: "2",
        },
        {
            user_id: "2",
            user_friend_id: "1",
        },
        {
            user_id: "1",
            user_friend_id: "3",
        },
        {
            user_id: "1",
            user_friend_id: "4",
        },
        {
            user_id: "1",
            user_friend_id: "5",
        },
        {
            user_id: "1",
            user_friend_id: "6",
        },
        {
            user_id: "1",
            user_friend_id: "7",
        }
    ]).into('user_friends');




};

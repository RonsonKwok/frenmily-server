import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw(`TRUNCATE  users  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  groups  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  group_member  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  user_friends  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  goods_categories  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  supermarkets  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  carts  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  goods  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  supermarket_goods  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  user_liked  RESTART IDENTITY CASCADE`)
    // await knex.raw(`TRUNCATE  user_friends  RESTART IDENTITY CASCADE`)
    // await knex.raw(`TRUNCATE  user_friends  RESTART IDENTITY CASCADE`)
    // await knex.raw(`TRUNCATE  user_friends  RESTART IDENTITY CASCADE`)
    // await knex.raw(`TRUNCATE  user_friends  RESTART IDENTITY CASCADE`)


    // Inserts seed entries

    await knex.insert([
        {
            username: 111,
            gender: "Male",
            email: 111,
            mobile: 111,
            password: 111,
            profile_picture: 111
        },
        {
            username: 222,
            gender: "Female",
            email: 222,
            mobile: 222,
            password: 222,
            profile_picture: 222
        },
        {
            username: 333,
            gender: "Female",
            email: 333,
            mobile: 333,
            password: 333,
            profile_picture: 333
        },
        {
            username: 444,
            gender: "Male",
            email: 444,
            mobile: 444,
            password: 444,
            profile_picture: 444
        },
        {
            username: 555,
            gender: "Male",
            email: 555,
            mobile: 555,
            password: 555,
            profile_picture: 555
        },
        {
            username: 666,
            gender: "Female",
            email: 666,
            mobile: 666,
            password: 666,
            profile_picture: 666
        },
        {
            username: 777,
            gender: "Female",
            email: 777,
            mobile: 777,
            password: 777,
            profile_picture: 777
        },
        {
            username: 888,
            gender: "Male",
            email: 888,
            mobile: 888,
            password: 888,
            profile_picture: 888
        },
        {
            username: 999,
            gender: "Female",
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

    //DO NOT DELETE 'goods_categories' seed!
    await knex.insert([
        {
            name: "Bakery and Breakfast1",
            goods_categories_picture: "https://img.myloview.com/posters/bread-color-line-icon-bakery-and-breakfast-loaf-sign-vector-graphics-editable-stroke-filled-outline-icon-eps-10-700-231214360.jpg"
        },
        {
            name: "Diary Products2",
        },
        {
            name: "Snacks And Dessert3",
        },
        {
            name: "Staples4",
        },
        {
            name: "Noodles5",
        },
        {
            name: "Beverages6",
        },
        {
            name: "Alcohol7",
        },
        {
            name: "Household8",
        },
        {
            name: "Personal Care9",
        },
        {
            name: "Frozen Food10",
        },

    ]).into('goods_categories');

    //DO NOT DELETE 'supermarkets' seed!
    await knex.insert([
        {
            name: "Wellcome1",
        },
        {
            name: "PARKnSHOP2",
        },
        {
            name: "Market Place by Jasons3",
        },
        {
            name: "Aeon4",
        },
        {
            name: "Mannings5",
        },
        {
            name: "Watsons6",
        },
        {
            name: "DCH Foods7",
        },
        {
            name: "Ztore8",
        },

    ]).into('supermarkets');

    await knex.insert([
        {
            name: "桂格 Quaker - 即食燕麥片 - 袋裝 800克",
            barcode: "9556174902219",
            category_id: "1",
        },
        {
            name: "維記 Kowloon Dairy - 鮮牛奶 946毫升",
            barcode: "4893318633116",
            category_id: "2",
        },
        {
            name: "健達 Kinder - 繽紛樂 Bueno 朱古力 (T2) 43克",
            barcode: "8000500066027",
            category_id: "3",
        },
        {
            name: "金象牌 Golden Elephant Brand - 頂上茉莉香米 5公斤",
            barcode: "4899668101053",
            category_id: "4",
        },
        {
            name: "公仔 Doll - 公仔麵 - 雞蓉味 103克 x 5",
            barcode: "4892333100528",
            category_id: "5",
        },
        {
            name: "可口可樂 Coca Cola - 可樂 - 樽裝 500毫升",
            barcode: "4890008100231",
            category_id: "6",
        },
        {
            name: "朝日 Asahi - 啤酒 - 罐裝 330毫升 x 12",
            barcode: "4901004021137",
            category_id: "7",
        },
        {
            name: "花王潔霸 Kao Attack - 超濃縮洗衣粉 - (全能5合1) 2.25公斤",
            barcode: "4898888546101",
            category_id: "8",
        },
        {
            name: "Nonio - 無口氣牙膏 - 清涼薄荷味 130克",
            barcode: "4895149207214",
            category_id: "9",
        },
        {
            name: "淘大 Amoy - 蝦肉燒賣 130克",
            barcode: "078024954098",
            category_id: "10",
        },


    ]).into('goods');

    await knex.insert([
        // 桂格 Quaker - 即食燕麥片 - 袋裝 800克
        {
            supermarkets_id: "1",
            goods_id: "1",
            goods_price: "33.00",
        },
        {
            supermarkets_id: "2",
            goods_id: "1",
            goods_price: "29.90",
        },
        {
            supermarkets_id: "3",
            goods_id: "1",
            goods_price: "33.00",
        },
        {
            supermarkets_id: "6",
            goods_id: "1",
            goods_price: "29.90",
        },
        {
            supermarkets_id: "7",
            goods_id: "1",
            goods_price: "29.90",
        },

        // 維記 Kowloon Dairy - 鮮牛奶 946毫升
        {
            supermarkets_id: "2",
            goods_id: "2",
            goods_price: "29.50",
        },
        {
            supermarkets_id: "3",
            goods_id: "2",
            goods_price: "32.00",
        },

        // 健達 Kinder - 繽紛樂 Bueno 朱古力 (T2) 43克
        {
            supermarkets_id: "1",
            goods_id: "3",
            goods_price: "11.00",
        },
        {
            supermarkets_id: "2",
            goods_id: "3",
            goods_price: "10.50",
        },
        {
            supermarkets_id: "3",
            goods_id: "3",
            goods_price: "12",
        },
        {
            supermarkets_id: "6",
            goods_id: "3",
            goods_price: "9.90",
        },

        // 金象牌 Golden Elephant Brand - 頂上茉莉香米 5公斤
        {
            supermarkets_id: "1",
            goods_id: "4",
            goods_price: "78.90",
        },
        {
            supermarkets_id: "2",
            goods_id: "4",
            goods_price: "63.00",
        },
        {
            supermarkets_id: "3",
            goods_id: "4",
            goods_price: "78.90",
        },
        {
            supermarkets_id: "6",
            goods_id: "1",
            goods_price: "78.90",
        },

        // 公仔 Doll - 公仔麵 - 雞蓉味 103克 x 5
        {
            supermarkets_id: "1",
            goods_id: "5",
            goods_price: "19.00",
        },
        {
            supermarkets_id: "2",
            goods_id: "5",
            goods_price: "16.90",
        },
        {
            supermarkets_id: "3",
            goods_id: "5",
            goods_price: "19",
        },

        // 可口可樂 Coca Cola - 可樂 - 樽裝 500毫升
        {
            supermarkets_id: "1",
            goods_id: "6",
            goods_price: "9.00",
        },
        {
            supermarkets_id: "2",
            goods_id: "6",
            goods_price: "9.00",
        },
        {
            supermarkets_id: "3",
            goods_id: "6",
            goods_price: "9.00",
        },
        {
            supermarkets_id: "6",
            goods_id: "6",
            goods_price: "9.00",
        },

        // 朝日 Asahi - 啤酒 - 罐裝 330毫升 x 12
        {
            supermarkets_id: "1",
            goods_id: "7",
            goods_price: "85.00",
        },
        {
            supermarkets_id: "2",
            goods_id: "7",
            goods_price: "95.00",
        },
        {
            supermarkets_id: "3",
            goods_id: "7",
            goods_price: "85.00",
        },

        // 花王潔霸 Kao Attack - 超濃縮洗衣粉 - (全能5合1) 2.25公斤
        {
            supermarkets_id: "1",
            goods_id: "8",
            goods_price: "41.90",
        },
        {
            supermarkets_id: "2",
            goods_id: "8",
            goods_price: "41.90",
        },
        {
            supermarkets_id: "3",
            goods_id: "8",
            goods_price: "41.90",
        },
        {
            supermarkets_id: "4",
            goods_id: "8",
            goods_price: "46.90",
        },

        // Nonio - 無口氣牙膏 - 清涼薄荷味 130克
        {
            supermarkets_id: "1",
            goods_id: "9",
            goods_price: "33",
        },
        {
            supermarkets_id: "2",
            goods_id: "9",
            goods_price: "32.90",
        },
        {
            supermarkets_id: "3",
            goods_id: "9",
            goods_price: "34.00",
        },
        {
            supermarkets_id: "4",
            goods_id: "9",
            goods_price: "32.90",
        },
        {
            supermarkets_id: "5",
            goods_id: "9",
            goods_price: "32.90",
        },

        // 淘大 Amoy - 蝦肉燒賣 130克
        {
            supermarkets_id: "1",
            goods_id: "10",
            goods_price: "23.00",
        },
        {
            supermarkets_id: "2",
            goods_id: "10",
            goods_price: "18.00",
        },
        {
            supermarkets_id: "3",
            goods_id: "10",
            goods_price: "23.00",
        },
        {
            supermarkets_id: "7",
            goods_id: "10",
            goods_price: "16.90",
        },

    ]).into('supermarket_goods');

    await knex.insert([
        // 桂格 Quaker - 即食燕麥片 - 袋裝 800克
        {
            user_id: "1",
            goods_id: "5",
        },
        {
            user_id: "1",
            goods_id: "5",
        },        {
            user_id: "1",
            goods_id: "5",
        },        {
            user_id: "1",
            goods_id: "5",
        },        {
            user_id: "1",
            goods_id: "5",
        },
        {
            user_id: "1",
            goods_id: "4",
        },
        {
            user_id: "1",
            goods_id: "4",
        },
        {
            user_id: "1",
            goods_id: "4",
        },
        {
            user_id: "1",
            goods_id: "4",
        },
        {
            user_id: "1",
            goods_id: "3",
        },
        {
            user_id: "1",
            goods_id: "3",
        },
        {
            user_id: "1",
            goods_id: "3",
        },
        {
            user_id: "1",
            goods_id: "2",
        },
        {
            user_id: "1",
            goods_id: "2",
        },
        {
            user_id: "1",
            goods_id: "1",
        },

    ]).into('user_liked');

};

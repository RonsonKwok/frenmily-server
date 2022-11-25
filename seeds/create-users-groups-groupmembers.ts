import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex.raw(`TRUNCATE  users  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  groups  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  group_member  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  user_friends  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  goods_categories  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  goods  RESTART IDENTITY CASCADE`)
    await knex.raw(`TRUNCATE  user_liked  RESTART IDENTITY CASCADE`)
    // await knex.raw(`TRUNCATE  carts  RESTART IDENTITY CASCADE`)


    // Inserts seed entries

    await knex.insert([
        {
            username: 111,
            gender: "Male",
            email: 111,
            mobile: 111,
            password: 111,
            profile_picture: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/gorilla.png"
        },
        {
            username: 222,
            gender: "Female",
            email: 222,
            mobile: 222,
            password: 222,
            profile_picture: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/bear+(1).png"
        },
        {
            username: 333,
            gender: "Female",
            email: 333,
            mobile: 333,
            password: 333,
            profile_picture: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/bear.png"
        },
        {
            username: 444,
            gender: "Male",
            email: 444,
            mobile: 444,
            password: 444,
            profile_picture: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/squid.png"
        },
        {
            username: 555,
            gender: "Male",
            email: 555,
            mobile: 555,
            password: 555,
            profile_picture: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/donatello.png"
        },
        {
            username: 666,
            gender: "Female",
            email: 666,
            mobile: 666,
            password: 666,
            profile_picture: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/fox.png"
        },
        {
            username: 777,
            gender: "Female",
            email: 777,
            mobile: 777,
            password: 777,
            profile_picture: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/gorilla.png"
        },
        {
            username: 888,
            gender: "Male",
            email: 888,
            mobile: 888,
            password: 888,
            profile_picture: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/donatello.png"
        },
        {
            username: 999,
            gender: "Female",
            email: 999,
            mobile: 999,
            password: 999,
            profile_picture: "https://iconandreceipt.s3.ap-southeast-1.amazonaws.com/squid.png"
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


    await knex.insert([
        {
            name: "桂格 Quaker - 即食燕麥片 - 袋裝 800克",
            barcode: "9556174902219",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/Quaker-Instant-Oatmeal-Foil-800g-114013.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMDQ5MjJ8aW1hZ2UvanBlZ3xoZmIvaDFjLzkzMTg3OTYxNjUxNTAvUXVha2VyIEluc3RhbnQgT2F0bWVhbCBGb2lsIDgwMGctMTE0MDEzLmpwZ3wyY2FmYThhMTcwNzUzMjRhOGViNzgwNTg5MTc5ZTQ0ZWE2ZTNlMzYxNzAzOTJiM2EyZjQyZGZmNWRkODA2ZmE1",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "維記 Kowloon Dairy - 鮮牛奶 946毫升",
            barcode: "4893318633116",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/FRESH-MILK-120648.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NzYzNzd8aW1hZ2UvanBlZ3xoOGQvaDE5LzkzMTk0NjE1ODQ5MjYvRlJFU0ggTUlMSy0xMjA2NDguanBnfDVjMmVhNDk1ZGRiNGQ4MjhlNmEyODJjZGZhY2E5MjZhZTE4NTQyN2Y0ODljN2Q3N2ZmNDllMDMxNDQzNmRjNGI",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "健達 Kinder - 繽紛樂 Bueno 朱古力 (T2) 43克",
            barcode: "8000500066027",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/BUENO-CHOCOLATE-BAR-114929.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3NTcwMHxpbWFnZS9qcGVnfGg4Ni9oMzYvOTMxODU3NjQ1NTcxMC9CVUVOTyBDSE9DT0xBVEUgQkFSLTExNDkyOS5qcGd8NTU4YjdkMTkzNzhmOGFmMjczN2JhMWI5NDAyNzBhMzM4ZTg0NjZmNTZhMTZlMDQ1MzFmODZjODI2M2JmZjdlYQ",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "可口可樂 Coca Cola - 可樂 - 樽裝 500毫升",
            barcode: "4890008100231",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/zoom-front-119341.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMDUzMzN8aW1hZ2UvanBlZ3xoZDkvaGExLzk0NDE3NDI0NTQ4MTQvUE5TSEstMTE5MzQxLWZyb250LmpwZ3wwMjgzYjMxMTQ2ZjkyZDUyMDdmM2E5ZWRiZWJlNGE3NjcxZTFjMmNiMmU2OGFhZmVlZDc5NjA5MDVjZDdlNTkw",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "朝日 Asahi - 啤酒 - 罐裝 330毫升 x 12",
            barcode: "4901004021137",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/Beer-Can-12S-388705.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNTEzODB8aW1hZ2UvanBlZ3xoMzgvaGE1LzkzMTg0MzA2MzgxMTAvQmVlciBDYW4gMTJTLTM4ODcwNS5qcGd8Y2JjZGJmOTNjMjI0NmM3ODZlM2Q2MGVjNzQwNjgzYzE2NWUzZjk0MjI1ZmM1YjNmMzU2N2ZhNjRhZTJkMWU2Nw",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "花王潔霸 Kao Attack - 超濃縮洗衣粉 - (全能5合1) 2.25公斤",
            barcode: "4898888546101",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/Attack-5in1-Conc-Powder-Laundry-Detergent-225kg-177567.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2NDk4MzZ8aW1hZ2UvanBlZ3xoZTEvaDViLzkzMTg4NTIwNjczNTgvQXR0YWNrIDVpbjEgQ29uYyBQb3dkZXIgTGF1bmRyeSBEZXRlcmdlbnQgMjI1a2ctMTc3NTY3LmpwZ3xmMDM0ODUxY2E4MjY4NjhhMzc4NDhlNDQ1ZDc5MGI5ZGQ1NzY5MDQyODBlMjk4NzlhZjliZTk3MTAzZmJlOGQw",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "Nonio - 無口氣牙膏 - 清涼薄荷味 130克",
            barcode: "4895149207214",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/TOOTHPASTE-CLEAR-HERB-MINT-449368.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNzU5NTN8aW1hZ2UvanBlZ3xoNjYvaDFmLzkzMjMyMTcyODkyNDYvVE9PVEhQQVNURSBDTEVBUiBIRVJCIE1JTlQtNDQ5MzY4LmpwZ3w1MDc0NjJlZjc1MTJkNzA0MTVlMzg3YzUxNmEzZDBhNjY4YjI0MjZkNmFiYTMxNzM0OWRiMDM3ZjQ3NTIwYWQ2",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "淘大 Amoy - 蝦肉燒賣 130克",
            barcode: "078024954098",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/SHRIMP-SHOAMAI-Packaging-random-delivery-190637.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4NzAzM3xpbWFnZS9qcGVnfGhjYS9oZmYvOTMxODU4NjI4NjExMC9TSFJJTVAgU0hPQU1BSSBQYWNrYWdpbmcgcmFuZG9tIGRlbGl2ZXJ5IC0xOTA2MzcuanBnfDBlZWFhNTJkNTE4N2RiZjZmZmNiNzBiMzBiN2JiOTA3ZWY2NjZiZTQxNjkyZWVlOGI4YzRjY2U4NmM1YmVhNjY",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        //Bakery and Breakfast1
        {
            name: "嘉頓 Garden 孖寶蛋糕 - 櫻桃提子 75克",
            barcode: "089782040015",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/MARBO-CAKE-CHERRY-RAISIN-BP-120010.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0OTM1NXxpbWFnZS9qcGVnfGgyYS9oZWUvOTMzNzIyMTcwOTg1NC9NQVJCTyBDQUtFIC0gQ0hFUlJZICBSQUlTSU4tQlBfMTIwMDEwLmpwZ3w5ZjBlMDRlZTE0NjMzZWVkYjM3N2IzZThiZDI0MmRmNGJlYjNmMjEwNDhiMDUxOTA5NTEzMWM2MmM4OTY0MmVl",
            aeon_price: "9.5",
            dch_price: "7.9",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 迷你瑞士卷 - 朱古力 56克",
            barcode: "089782040206",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/MINI-SWISS-ROLL-CHOC-BP-124851.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNzE3OHxpbWFnZS9qcGVnfGgwMC9oYTIvOTMzNzIyNTA4NDk1OC9NSU5JIFNXSVNTIFJPTEwgLSBDSE9DLUJQXzEyNDg1MS5qcGd8YmI5MGFhMTM3Yjk4ZTY5NWRiZDgwNjA4OTdiOTJiMDU4MjdkOWFmN2E0ZDVmNWFkNmI1YzZjYmRmMjg1OTJlZQ",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 迷你瑞士卷 - 檸檬 56克",
            barcode: "089782040848",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/MINI-SWISS-ROLL-LEMON-BP-120006.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzODE4NnxpbWFnZS9qcGVnfGhiNS9oMmQvOTMzNzIwMjQ0MjI3MC9NSU5JIFNXSVNTIFJPTEwtTEVNT04tQlBfMTIwMDA2LmpwZ3xmOTIzZTAyMmJmNDQ3NjJlOTY3ZDBhNmQ1MGU2YmNlMzA5YThjOWQxNTg1OTc5OTEwYWVjZjEzNjk1ZDkwODVj",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 牛油方包 6片",
            barcode: "089782038579",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/BETTER-SANDWICH-BREAD-BUTTER-BP-190815.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NDE1NXxpbWFnZS9qcGVnfGg5MS9oZDkvOTMzNzIyNjgyMTY2Mi9CRVRURVIgU0FORFdJQ0ggQlJFQUQgLSBCVVRURVItQlBfMTkwODE1LmpwZ3wzMzRmNjIxODg1YzRmZWI0NWI5YTJkNjFjYmRmNzBmZTZkYTQ5NjYxMGUxYTYxZDNlMDY3NjBlNTViNGJkM2E0",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "嘉頓 Garden 幼麥方包 6片",
            barcode: "089782038586",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/BETTER-SANDWI-BREAD-WHOLEWHEAT-BP-190816.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4NDY0OXxpbWFnZS9qcGVnfGhlMS9oNDEvOTMzNzIyNDMzMTI5NC9CRVRURVIgU0FORFdJIEJSRUFELVdIT0xFV0hFQVQtQlBfMTkwODE2LmpwZ3xhM2Q3OWI0YTUwZWUyYzhhZmNjZmY5ZTEwOTE3ZWEyNmJiNjVlY2Q0MDRiNDA3ZDhjMzI1ZGM1MWQyYTc0ZDRj",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "嘉頓 Garden 切皮三文治方包 6片",
            barcode: "089782030078",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/CRUSTLESS-SANDWICH-BREAD-12-SLICES-BP-490220.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3NjM4OHxpbWFnZS9qcGVnfGg2My9oYTAvOTMzOTM2Njg2Njk3NC9DUlVTVExFU1MgU0FORFdJQ0ggQlJFQUQgMTIgU0xJQ0VTLUJQXzQ5MDIyMC5qcGd8MmJjNWIzMTFiNGRlYWI3Zjc0Nzc0ZWY2MDkwZGZhNmViNzE2MWEwMTIzMDk5MmYwODQ0NzQwZWU0YjA3MTE2MQ",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "嘉頓 Garden 原條方包 18片",
            barcode: "089782031006",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/GIANT-SANDWICH-BREAD-BP-120016.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3MTg5NnxpbWFnZS9qcGVnfGhlYy9oZjAvOTMzNjg5NDA2MjYyMi9HSUFOVCBTQU5EV0lDSCBCUkVBRC1CUF8xMjAwMTYuanBnfDAzYTk3NmExYTk1NjVmNWEzZTBjMjhkNDFmMzBmYTljN2EzNjBmMjg0ZThiZjdiMjJjMTJhNGE4MzRkMmY4OWI",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "嘉頓 Garden 高鈣方包 6片",
            barcode: "089782035745",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/HI-CALCIUM-SANDWICH-BREAD-BP-127031.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MTMxOXxpbWFnZS9qcGVnfGg2OS9oYTUvOTMzNzIyNTE4MzI2Mi9ISS1DQUxDSVVNIFNBTkRXSUNIIEJSRUFELUJQXzEyNzAzMS5qcGd8MzA1MGIzY2I0OThhNDFiNjNjZGQ4NzYwNDZmYjI5YWFiN2JkNTZiZGE4OTBiMjI2YzljMjdlYmUwNWJhMmIwMg",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "生命麵包 - 含蛋白質 14片",
            barcode: "089782032881",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/LIFE-BREAD-CONTAINS-PROTEIN-BP-129496.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3OTk4N3xpbWFnZS9qcGVnfGhhMC9oNDUvOTMzNzIyNDQ2MjM2Ni9MSUZFIEJSRUFEIC0gQ09OVEFJTlMgUFJPVEVJTi1CUF8xMjk0OTYuanBnfGNhZDA5MzIyY2NlOTUyODMwMWFmNTZlNDdlYThjOWZlZGIwYTQ1NTk0YzU2NTQ3NzQ4ZmE1ODRkZTZiMmJiOTY",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 生命麵包 - 蜜糖雞蛋 14片",
            barcode: "089782031075",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/BETTER-SANDWICH-HONEY-EGG-BP-477383.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NTkxOXxpbWFnZS9qcGVnfGhjMi9oYjMvOTMzOTMzNzQ0MTMxMC9CRVRURVIgU0FORFdJQ0ggLSBIT05FWSAgRUdHLUJQXzQ3NzM4My5qcGd8ZDQ3Y2M5YTc1ZmE5YmU0Njc1Yjg4ZjNjNGE4MTFjZWUwYmM3NmYwZDExMWRhYjU1YjRkYTc0NTE1M2ZmMzAwNw",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 生命麵包 14片",
            barcode: "089782030016",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/LIFE-BREAD-BP-120007.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1NzA0NHxpbWFnZS9qcGVnfGhkMy9oNmEvOTMzNjkzMjE3MTgwNi9MSUZFIEJSRUFELUJQXzEyMDAwNy5qcGd8OTY1MWE2Y2JkOGYwNTViZWUyZjA5NTIyYjYwNjY1NjY3ODQyODM0MDg3ZDQxNzBmMGJlNzA4MGMwN2Y5MDQ0YQ",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 純麥包 430克",
            barcode: "089782031181",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/ORIGINAL-WHOLEMEAL-BP-126864.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MjI0N3xpbWFnZS9qcGVnfGg5Zi9oYjIvOTMzNzIyNTU0MzcxMC9PUklHSU5BTCBXSE9MRU1FQUwtQlBfMTI2ODY0LmpwZ3xkYTNmZTFiYTI0Y2ViNTM3MDI5NmI3MTAyMDAzMWU3ZDMwMWNkZjdhMWM5Y2FmMDE0NzU1MjhlMWZlNTI4Yzg4",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "嘉頓 Garden 方包 8片",
            barcode: "089782031556",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/-SANDWICH-BREAD-BP-120029.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4ODE3OXxpbWFnZS9qcGVnfGhlYS9oZTcvOTMzNjQxMjgzMTc3NC8gU0FORFdJQ0ggQlJFQUQtQlBfMTIwMDI5LmpwZ3wyYTFmYmMzY2FjY2JlODNjYmNlYTRjM2JmZjYyNjViNDJlZjA2MGVkN2IwOWY3MjliY2U5ODAwNjAyYWMxMjcx",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 厚切方包 6片",
            barcode: "089782031334",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/THICK-TOAST-SANDWICH-BREAD-BP-191921.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4Nzc3MnxpbWFnZS9qcGVnfGgwMC9oMzgvOTMzNzIyNDA2OTE1MC9USElDSyBUT0FTVCBTQU5EV0lDSCBCUkVBRC1CUF8xOTE5MjEuanBnfGNlYzFkNzViNDE3MzI0ZTRiNzIzNTg2Yzg5YzM1MGRjYjEwYTQ5MDRhNGQwYzM1MDFlMWNjZTU0ZGUxY2Y0NGE",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "嘉頓 Garden 方麥包 8片",
            barcode: "089782030191",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/-THICK-WHEAT-SANDWICH-BREAD-BP-477382.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w5Nzk4OXxpbWFnZS9qcGVnfGg0OS9oNDEvOTMzOTM2NzUyMjMzNC8gVEhJQ0sgV0hFQVQgU0FORFdJQ0ggQlJFQUQtQlBfNDc3MzgyLmpwZ3wxOTNiOWYxOWJkODcwMjVkMjA5ODc4MzFkOTdhYzNkNWQ0ZjQyZTNlMWE3YjI0NmYyYmZmODU1Yjk4NDVhNGZm",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {

            name: "嘉頓 Garden 小餐包 8個",
            barcode: "0897820303282",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/-COCKTAIL-BUN-BP-124657.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2NzE1NXxpbWFnZS9qcGVnfGg5OS9oODAvOTMzNzIyNzM0NTk1MC8gQ09DS1RBSUwgQlVOLUJQXzEyNDY1Ny5qcGd8NmVmMjZhZTNiODNiMjBiYmU5Mzk4ZGEyMTNiMDNkYTllODE4MGUxYTAzMThlMGM5MDg4YWFlMTQ3NTVjZDliMg",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 忌廉檳 - 花生味 1個",
            barcode: "089782031235",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/PEANUT-FLAVOURED-CREAM-BUN-BP-120033.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2NDQyMHxpbWFnZS9qcGVnfGg1OC9oZWEvOTMzNzIyMTg0MDkyNi9QRUFOVVQgRkxBVk9VUkVEIENSRUFNIEJVTi1CUF8xMjAwMzMuanBnfDBiODU5YTY0MDMwNWRlOWRlZDc2OTQ4OWUwNWNkY2MxYjI5ZmMyMjk2YzMyOTliYzlmOWNiNDc5ODM0MWYzN2M",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 忌廉檳 - 雲呢嗱味 1個",
            barcode: "089782030658",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/VANILLA-FLAVOUR-CREAM-BUN-BP-120032.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2NDgwMHxpbWFnZS9qcGVnfGhmNi9oMjkvOTMzNzIwMjU3MzM0Mi9WQU5JTExBIEZMQVZPVVIgQ1JFQU0gQlVOLUJQXzEyMDAzMi5qcGd8Mzk3NTQyNGY0YjkzYjE0YmEzNjg5YTFlM2U3ZTMzMGM5NWFkNzA2YjM5MzYxMDlhMGEwNzc5OTU4NGNlYzM5OQ",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 排包 210克",
            barcode: "089782033796",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/MILK-BAR-BUN-BP-134391.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MDY3OHxpbWFnZS9qcGVnfGgxMC9oYTgvOTMzNzIyNTIxNjAzMC9NSUxLIEJBUiBCVU4tQlBfMTM0MzkxLmpwZ3xhODdhMTk3ZTdiNWY0NWE0Njk4MzJkMTQwMjhjYzRjZTFjOTg2YjMyNDJjYmEzZWIyOGM5NzdkNjA1MzIxZTZh",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 奶餐包 4個",
            barcode: "0897820320506",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/MILK-BUN-BP-162138.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4MDU2NXxpbWFnZS9qcGVnfGhhOC9oZjAvOTMzNzIyNjE5OTA3MC9NSUxLICBCVU4tQlBfMTYyMTM4LmpwZ3w2YmY5YWIxY2U5MjRiNzk0NzIwM2JlNzA2YWExNTA2NGU5ZmQzOGVlYTI3NjEyMTc3ZmExNzIyYjQ2OWIwZTJi",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 提子餐包 4個",
            barcode: "089782032010",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/RAISIN-BUN-BP-129497.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w5NDQ5N3xpbWFnZS9qcGVnfGgwYS9oZTAvOTMzNzIyNjY1NzgyMi9SQUlTSU4gQlVOLUJQXzEyOTQ5Ny5qcGd8NWQ0MTg2OTYxZWMyMzc3MjY0NjQ3ZjZkZjA1MWVhZjNkMjUxNDFmNjIzYzA5NjExYTMyZmY1ZDE3MzNhMjEwNA",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 牛油軟包 4個",
            barcode: "089782033802",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/SOFT-BUTTER-BUN-BP-134392.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w5MjE5fGltYWdlL2pwZWd8aDMzL2g3YS85MzM3MjI3NTA5NzkwL1NPRlQgQlVUVEVSIEJVTi1CUF8xMzQzOTIuanBnfDJjYTdmZmJhZTQyMzU1MGI3NWFmNWUxOTc4MzM4MmIzNzAwNmFjNTczMjcyZmI5NTljNTU3YjkzOWZhNzAwNjY",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {

            name: "嘉頓 Garden 法國牛角酥 4個",
            barcode: "089782040213",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/FRENCH-CROISSANT-BP-126862.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MjM0NHxpbWFnZS9qcGVnfGgzZi9oNTYvOTMzNzIyNDkyMTExOC9GUkVOQ0ggQ1JPSVNTQU5ULUJQXzEyNjg2Mi5qcGd8YjhmMjE2YWNjN2MzNWVmMmQ3YWZhYTlhYmU1MWZkYzRmMWJmMjc2MzRkMjhmZTk1MjZmZmFkYTIwNjRkYmUxMg",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "嘉頓 Garden 英式鬆餅 4個",
            barcode: "089782032782",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/ENGLISH-MUFFINS-BP-120200.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2OTA1NnxpbWFnZS9qcGVnfGg0ZC9oMmEvOTMzNzIwMjU0MDU3NC9FTkdMSVNIIE1VRkZJTlMtQlBfMTIwMjAwLmpwZ3wyZjlmM2E1NzI2M2U5NGIyNzkwNTk3MmNiMTBlOGQ3MDNlMThiY2RlYWU4N2U1NjEzMzJmMjI1Y2M5NTUxNjgy",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {

            name: "桂格 Quaker 即食燕麥片 - 罐裝 800克",
            barcode: "9556174902110",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/INSTANT-OATMEAL-TIN-BP-128579.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzMjY3MHxpbWFnZS9qcGVnfGg4Ni9oYmYvOTMzNjMyMjg1MDg0Ni9JTlNUQU5UIE9BVE1FQUwgVElOLUJQXzEyODU3OS5qcGd8NjNmODgxN2Y1NDU3NTAxM2RhNzZiNDg4NjU2MmMzY2VhZDBhZDU5ZTNmYTEzYmE0NjM2NWE4ZDZiOGJlOGU3Yg",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "桂格 Quaker 快熟燕麥片 - 袋裝 800克",
            barcode: "9556174902202",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/QUICK-COOKING-OATMEAL-FOIL-BP-117188.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MTY0NHxpbWFnZS9qcGVnfGgyOS9oMDEvOTMzNjkzMTE4ODc2Ni9RVUlDSyBDT09LSU5HIE9BVE1FQUwgRk9JTC1CUF8xMTcxODguanBnfGYzM2M1ZDNlNjA2MzY5YWQ3ZDFmYWMzOWIyNmY4NDU1OGQwODE5NjM0OTdiNWNlYjRlNzUyNzUzZWY3MDhjZjc",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "桂格 Quaker 原片大燕麥 (快熟) 800克",
            barcode: "4892347004386",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/WHOLE-ROLLED-OATS-BP-318836.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MDc3OXxpbWFnZS9qcGVnfGhjMC9oZGMvOTMzNjQwOTU4Nzc0Mi9XSE9MRSBST0xMRUQgT0FUUy1CUF8zMTg4MzYuanBnfDcyM2QwZTUxNTM2MGJjMmYwMDQwMjUxNWY4MWVhYzk2YmY1YTI1YzlkZDQ1MTRhMzIwZmZmZjA1ZjA3MjA0NzI",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "歐寶 Alpen 營養麥 (不另加糖) Swiss Style Muesli - No Added Sugar 560克",
            barcode: "5010029201246",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/MUESLI-NO-SUGAR-ADDED-BP-114981.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MzQ1OHxpbWFnZS9qcGVnfGhlZS9oMjQvOTMzNjg4NDE5OTQ1NC9NVUVTTEkgTk8gU1VHQVIgQURERUQtQlBfMTE0OTgxLmpwZ3w1NTY4MDAyOTc2Y2RkZWUxOTQzNGM4OGY4N2Y2M2Y0ZTk0YWEzNDRkNDE2OTYxZTRjYzU5OGU4YTQ3ZjE3MmRk",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "家樂氏 原味玉米片 (粟米片) Classic Corn Flakes 170克",
            barcode: "6916883117886",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/CLASSIC-CORN-FLAKES-BP-101257.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0OTk3N3xpbWFnZS9qcGVnfGhjYS9oMTkvOTMzNjU1ODI1NjE1OC9DTEFTU0lDIENPUk4gRkxBS0VTLUJQXzEwMTI1Ny5qcGd8MGM5OTRmMmQ1OTAwZDFiMGZlMTVlNmUwZjY3ZDc0YWM1MDY1OGYyNDQ4MTViZGFjMzFhMGY2NzVjNzg3NWJlMw",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "家樂氏 原味玉米片 (粟米片) Classic Corn Flakes 340克",
            barcode: "6916883134883",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/CLASSIC-CORN-FLAKES-BP-101258.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3NDU0OHxpbWFnZS9qcGVnfGgxZC9oYWIvOTMzNjQ4MjAzNzc5MC9DTEFTU0lDIENPUk4gRkxBS0VTLUJQXzEwMTI1OC5qcGd8NWQxZTg5NzUxNGJhNTc5ODEwYTJmNzFlNzJlOTIyZGM3ZTg3MTA2YjAyYjFhOWEyNmJiYmI2ZWE4ZTQyNDAxMg",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "家樂氏 可可米 Coco Pops 190克",
            barcode: "9310055411241",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/COCO-POPS-BP-153898.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MjgxMnxpbWFnZS9qcGVnfGg5Mi9oZDIvOTMzNjU2OTY1OTQyMi9DT0NPIFBPUFMtQlBfMTUzODk4LmpwZ3xjOTMyYjM4NWI5YjJiY2ZhNTM3MGQ5YjE3MGI1ZDVkNWU4YjJkNzU4YmI0MjlhOTAwZjM5OWEzZDY5MDllNmJi",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "家樂氏 什錦果麥 Mueslix - 葡萄乾、杏仁果口味 375克",
            barcode: "038000080203",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/MUESLIX-HARVEST-FRUIT-BP-119152.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2Njk5NnxpbWFnZS9qcGVnfGhjZi9oZmIvOTMzNjg0OTU2MzY3OC9NVUVTTElYIEhBUlZFU1QgRlJVSVQtQlBfMTE5MTUyLmpwZ3xjYTcxNTFkMTQ3ZTBiZjRjMGZkOTcwNDBhMTgyNTc2NTUyMTNhZGJiZGVhMzExYTc3YzUzMWYzYWYwZWM3ODIx",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "家樂氏 香甜玉米片 (粟米片) Frosties 250克",
            barcode: "6916883005848",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/FROSTIES-BP-111069.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0Nzc5OXxpbWFnZS9qcGVnfGg5OS9oOTQvOTMzNjgyNzY3NDY1NC9GUk9TVElFUy1CUF8xMTEwNjkuanBnfGI3NWEzOGQxZmUxOWE3N2Q3ZDM5MThjMzZjYWU1NTg1NDkyYzhhMjJiYzAwYTc0ZGNmZDdkNGJhMjk3MzI0NzU",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "家樂氏 Special K 香脆麥米片 370克",
            barcode: "8852756304299",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/SPECIAL-K-BP-305138.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0Mzk3M3xpbWFnZS9qcGVnfGg0YS9oMjkvOTMzNjUxMjE4NDM1MC9TUEVDSUFMIEstQlBfMzA1MTM4LmpwZ3w2NWViNWVjM2IxNWQwNTdmZDdmNmExNDZkNTNmMWQ4YzIzOWI3MzliZGFiYThiNzc5NjQ0M2U5OWNjMDNjOTRm",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "雀巢 Nestle 蜂蜜星星 Honey Stars 150克",
            barcode: "4800361002936",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/HONEY-STARS-BP-119150.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NDE0NHxpbWFnZS9qcGVnfGhhZC9oZWIvOTMzNjY4NzI2Mzc3NC9IT05FWSBTVEFSUy1CUF8xMTkxNTAuanBnfGUxNzExZWVlMjY3MTNmOWRkZjkxOTNjMTMzZDUyMGJiNjY0YTIzNmQyMzVkOWM3ODhlYWE3OThiYzI5MWFlYTI",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "雀巢 Nestle 可可脆片 Koko Krunch 170克",
            barcode: "4800361346429",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/KOKO-KRUNCH-BP-119148.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1NDI0N3xpbWFnZS9qcGVnfGhkMC9oNTYvOTMzNjQ1MjgwODczNC9LT0tPIEtSVU5DSC1CUF8xMTkxNDguanBnfGFjY2ZjYzM1MDg0YWQ4ZmQ4MWY3MGU1MzlkM2M4ODNlZGQxODkxZGQ3M2QxZDhlMjUwZjgwOWFhNmZlYjBkMzE",
            aeon_price: "3.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"

        },
        {
            name: "雀巢 Nestle 可可脆片 Koko Krunch 330克",
            barcode: "4800361000239",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/KOKO-KRUNCH-BP-141725.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1ODgyMHxpbWFnZS9qcGVnfGhkOS9oYzIvOTMzNjQ5NjgxNjE1OC9LT0tPIEtSVU5DSC1CUF8xNDE3MjUuanBnfDMyMDdhNzNhYmIwNWIwYzBiOWU2MTdiYWIyZDQxZTE4MGM5MDEwNWE5NjMyZjNjNWRhZGViYzRhNjE1NTJhMGE",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "桂格 Quaker 燕麥方脆穀類早餐 - 原味 (14.5安士) 411克",
            barcode: "038527591039",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/OATMEAL-SQUARES-BP-124941.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2MDM4MnxpbWFnZS9qcGVnfGgyOS9oYTQvOTMzNjYwNDMyNzk2Ni9PQVRNRUFMIFNRVUFSRVMtQlBfMTI0OTQxLmpwZ3w4NTVmZGY3YmUwZjNhNTU2OWQ5YzJmZmZiZmVmYzYxNDY0NTFlNTNjZjA4MTY5OWNkNGM5YTk4Nzg5NzYwMzJj",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "盛美家 果醬 - 藍莓 340克",
            barcode: "051500051153",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/BLUEBERRY-PRESERVES-BP-152312.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NTg3N3xpbWFnZS9qcGVnfGg2Mi9oZjQvOTMzNjgyODM5NTU1MC9CTFVFQkVSUlkgUFJFU0VSVkVTLUJQXzE1MjMxMi5qcGd8NzE1NDI5NmY4NjQ5NTkwMGE2OTk4MmU0N2ViODljOThjZDJjYzYzNDU0MTc2MWQ1MTNiOTUzYjMzMzAxYTM2NA",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "盛美家 果醬 - 士多啤梨 340克",
            barcode: "051500051085",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/STRAWBERRY-PRESERVES-BP-119287.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MTg3MnxpbWFnZS9qcGVnfGhhOC9oMDEvOTMzNjQ1NjgzOTE5OC9TVFJBV0JFUlJZIFBSRVNFUlZFUy1CUF8xMTkyODcuanBnfDAwMTc0ZDhiOTNkMzRjYWE3YWYwZTgyNjdiNTM2YWFiMThhOGE2NmJhYjIxNDRhMmM1NWRkNDBiMWNkNmZkYTM",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "美味牌 沙律味吞拿魚醬 95克",
            barcode: "4891329663054",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/TUNA-SALAD-GREEN-LABEL-BP-117660.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMDM0NHxpbWFnZS9qcGVnfGhmYS9oMDcvOTMzNzE5MjQ4MDc5OC9UVU5BIFNBTEFEIEdSRUVOIExBQkVMLUJQXzExNzY2MC5qcGd8YjhjMjc0ZWVmZTRkMjFiZTAzZTJjY2Q2MDM1OWMyZTQyODBlM2JkOWY2YmNkNjQ1OTBkNDdkNzYyYzU5ZWMzNA",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },
        {
            name: "能多益 Ferrero Nutella 榛子果仁醬 350克",
            barcode: "80177173",
            category_id: "1",
            goods_picture: "https://api.parknshop.com/medias/HAZELNUT-SPREAD-WITH-COCOA-BP-451817.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMzUyMHxpbWFnZS9qcGVnfGgzNy9oNTcvOTMzNzIwODczMzcyNi9IQVpFTE5VVCBTUFJFQUQgV0lUSCBDT0NPQS1CUF80NTE4MTcuanBnfDVkMDM2ZWI1ZDY5NjZlMWFlYzU0YzY4NmEyMDVlOTNiNDdkODhkMjMzNjBmMjJlNzhiMTA2ZmY5MDZiODYxNWQ",
            aeon_price: "9.5",
            dch_price: "79",
            jasons_price: "5",
            parknshop_price: "3.8",
            wellcome_price: "4"
        },

        //Diary Products2
        {
            name: "伊美瑞士特級特級低脂牛奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/SWISS-PREM-SEMI-SKIMMED-MILK-BP-445810.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NjkwM3xpbWFnZS9qcGVnfGg0NC9oOTIvOTMzNzQ0NTA1NjU0Mi9TV0lTUyBQUkVNIFNFTUkgU0tJTU1FRCBNSUxLLUJQXzQ0NTgxMC5qcGd8YTUwNjlhNmQyMGFmYjY3M2VlZjNiYTM4ZWU2OTlhOTc1MWUzMzYwYTI1ZWM1MjQxODE4ZjUyYTdhODJkOWU0MQ",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "黑白全脂淡奶450毫升",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/FULL-CREAM-EVAPORATED-MILK-BP-491777.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzMTMwMHxpbWFnZS9qcGVnfGgwNC9oY2IvOTMzOTQ5MTA1NzY5NC9GVUxMIENSRUFNIEVWQVBPUkFURUQgTUlMSy1CUF80OTE3NzcuanBnfDE2Y2U4NmUxZjhmOWIzZTg4MmY0OWRjYjhiZWU5MWJkM2MxZDYyZmZjNDE0M2YwMWRlNWFhODllZTY1ODdkOWI",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "伊美瑞士特級牛奶3.5%脂肪",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/SWISS-PREMIUM-MILK-BP-347866.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NjYwMHxpbWFnZS9qcGVnfGg4Yy9oYjAvOTMzNjg0NTE3Mjc2Ni9TV0lTUyBQUkVNSVVNIE1JTEstQlBfMzQ3ODY2LmpwZ3xiZWNlNzU1OTViM2YzMjNmYThjMDZhOWRhNTFmZDk2MDI0YTg1ZjUxNTY3MTQ5YjJmYzdhMGE3ZjlmY2M4ZTA3",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "三花減脂淡奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/REDUCED-FAT-EVAPORATED-MILK-BP-151061.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1OTAzMXxpbWFnZS9qcGVnfGhlMS9oMmIvOTMzNjg2MzYyMTE1MC9SRURVQ0VEIEZBVCBFVkFQT1JBVEVEIE1JTEstQlBfMTUxMDYxLmpwZ3w2NTg5ZTMzMjM4MzIzYTBlZWYyOGFjZmFjYjYxOGMxYTkyODVlNjY1YjgyNjI2ZDliMTRlZGQ3MGEzYWJiZGE2",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "黑白全脂淡奶 160毫升 (170克)",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/FULL-CREAM-EVAPORATED-MILK-BP-421146.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3MjY2N3xpbWFnZS9qcGVnfGg2Ny9oNGEvOTMzNjc5NTc5MTM5MC9GVUxMIENSRUFNIEVWQVBPUkFURUQgTUlMSy1CUF80MjExNDYuanBnfDNhMWMxNmYyZGY0NzZiNjg0ZjBjN2MxNGViMGYzNDQxOWU5NGMxZjQwOTRiMmQwYmNjNWQ4MzIzMDcwODc2YTE",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "子母士多啤梨味乳酪飲品 4 x 110毫升",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-496401.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3MTMwNTN8aW1hZ2UvanBlZ3xoYjAvaDk4Lzk1MjA2Mjk2NzgxMTAvUE5TSEstQlBfNDk2NDAxLWZyb250LmpwZ3xkY2U3MzM0OTg2MDMyZWU3ZDAxNTI5YTk2ZDZhZDBhODExN2I5OGFiYjM4MGU5OGZjZjk0ZTkzYThkZWM0ZGRi",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "三花全脂淡奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/FULL-CREAM-EVAPORATED-MILK-BP-454609.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w5ODQzfGltYWdlL2pwZWd8aDcyL2g3Yi85MzM3NDM5ODEzNjYyL0ZVTEwgQ1JFQU0gRVZBUE9SQVRFRCBNSUxLLUJQXzQ1NDYwOS5qcGd8NDY4ZTZmOGVkMzhmY2U2NjI0YzljNDJmYTQwMjMyZmVkOGU5ODRlYmY1NDM1MGIxYjdjNjU0YzU0OTJhNjcwOA",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "黑白純牛奶1公升",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/-UHT-MILK-BP-487709.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MTA4OHxpbWFnZS9qcGVnfGg3Mi9oMGMvOTMzOTEzMDE1MDk0Mi8gVUhUIE1JTEstQlBfNDg3NzA5LmpwZ3xiMmMxYzEyYWE3ODg1NzhkN2U1M2FmNTdlYWJmYTYzYTZlZDNiZTYxYjhiZmQ1NTlkNWEyMmY4ZWE3OTNiZTM5",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "維他朱古力牛奶飲品",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/CHOCOLATE-MILK-BEVERAGE-BP-159169.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2MjU4OXxpbWFnZS9qcGVnfGgyMS9oM2QvOTMzNjUxNzIzMDYyMi9DSE9DT0xBVEUgTUlMSyBCRVZFUkFHRS1CUF8xNTkxNjkuanBnfDhjNzc1NGZlMWQ5YjQ5MTIxMWQ2OTRhYTZhODUyM2VkMjNjN2M3MWE2M2M0Yzc0NDFjMDI0ZTIwNzQyZDJmNzI",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "子母原味牛奶飲品 6 x 225毫升",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-463118.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMDgyMTM1fGltYWdlL2pwZWd8aDIwL2g0Yy85NTEyMzYxNTkwODE0L1BOU0hLLUJQXzQ2MzExOC1mcm9udC5qcGd8NjQzZTM1OTcwMTJmMWFiNDZmNTU3NDk4MzMwZWU4NjQyNTVjOWYzMjQ2M2JkNDI1ZWFkNzZmMGE2MmJhNTk3ZA",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "鷹嘜煉奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/SWEETENED-CONDENSED-MILK-BP-371251.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyNDg1NHxpbWFnZS9qcGVnfGg5Zi9oNWQvOTMzNjM2Njc1OTk2Ni9TV0VFVEVORUQgQ09OREVOU0VEIE1JTEstQlBfMzcxMjUxLmpwZ3w0ZTIwMWQ3ZTQ3NDJiOGQwNjg3OTIwNjllNTRkMGNiYTY3MjRhZGMxZGI1YzI4YTM5MDQzZmQ4NTE1YmZjZTA2",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "DEVONDALE 全脂奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/UHT-FULL-CREAM-MILK-BP-448822.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzOTk2M3xpbWFnZS9qcGVnfGhkNy9oODIvOTMzNzQ2ODQ4NTY2Mi9VSFQgIEZVTEwgQ1JFQU0gTUlMSy1CUF80NDg4MjIuanBnfGIxNTMyNTM0NjdjOTFkNGQxN2RkMzMwNDY5Y2IzODRiZDVlYjBhMTYwOGFmYTgzOTRmMDhjZGQ2Y2E3NWIzOTc",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "哈維鮮奶純牛奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/UHT-FULL-CREAM-MILK-BP-199429.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MjE5N3xpbWFnZS9qcGVnfGgzOC9oYmUvOTMzNjkyMTYyMDUxMC9VSFQgRlVMTCBDUkVBTSBNSUxLLUJQXzE5OTQyOS5qcGd8YmU5MGM3Njg4M2Y5OTVhNjNmZWY2ZmYwMmQwNWM5NjQ0YjYxMDkzM2ZkMmFlMmFiZmMyNTcxODNhOTJmZTJjMw",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "壽星公植脂淡奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/EVAPORATED-FILLED-MILK-BP-385788.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNzg2M3xpbWFnZS9qcGVnfGhlMi9oODEvOTMzNjU4MTYxOTc0Mi9FVkFQT1JBVEVEIEZJTExFRCBNSUxLLUJQXzM4NTc4OC5qcGd8Y2ExMjZjMmJlOGFhZDQ4YjNlNjVkYWJhZTNkMWRmNzcxMmEyMDg5MDViZWViMGIzYjEzMWRmOGVhMWRmODIwMQ",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "鷹嘜支裝煉奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/SWEETENED-CONDENSED-MILK-TUBE-BP-116762.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzOTg0NHxpbWFnZS9qcGVnfGgzMS9oMGEvOTMzNjY4OTY4ODYwNi9TV0VFVEVORUQgQ09OREVOU0VEIE1JTEsgVFVCRS1CUF8xMTY3NjIuanBnfDYxNzQ1ODNmODYyMWY3NjY4Y2EwOGVhOTM3ZWU0OWJkMDQ4ZTBlOTIyZTU5MTY5MWU3NGE0ZDI0YmEzNWQwZmI",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "FRED CHLOE 全脂牛奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/FULL-CREAM-MILK-BP-370400.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyODUwNnxpbWFnZS9qcGVnfGgzYi9oZTgvOTMzNjc2ODcyNTAyMi9GVUxMIENSRUFNIE1JTEstQlBfMzcwNDAwLmpwZ3xlY2MxMzBjMjdkYWYwNmE2MzhmNjc1NGMzMWJmN2ViNDc1Nzc4OTgxODlmZjJjYjU2NTFhZjU4MmVkZjAzMjlm",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "壽星公甜奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/SWEETENED-MILK-SPREAD-BP-385787.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MDAyM3xpbWFnZS9qcGVnfGg3Ny9oNGEvOTMzNjQ0NDM4NzM1OC9TV0VFVEVORUQgTUlMSyBTUFJFQUQtQlBfMzg1Nzg3LmpwZ3w0MjVlZjQ0MmVlZjQ2YWVjMWYyZWMyYzNmMTc1NTM5YWE3ZDQwMGRkNzEyNjlkYTQxMWViNDUzM2NiOWQ5ZTA3",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "子母原味乳酪飲品 4 x 110毫升",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-496400.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3MTE5NTV8aW1hZ2UvanBlZ3xoN2YvaDlhLzk1MTIzOTI5ODI1NTgvUE5TSEstQlBfNDk2NDAwLWZyb250LmpwZ3wzYzI5NmQ2YjUzMmE3YTQyYzJjM2I3NzkyNDA5ZmRmYTQ3Mzg3ZWQ3ZDlhMDBjNmZhZjE2MTQ3MWVmOTc3NzEy",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "子母DHA牛奶飲品 4 x 180毫升",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-413117.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4ODUzNTd8aW1hZ2UvanBlZ3xoM2UvaDkyLzk1MTIzNDc2NjQ0MTQvUE5TSEstQlBfNDEzMTE3LWZyb250LmpwZ3w3N2I5ZWQwZTI4N2VjNWIxMTAzYWU3NzM3YTg4YmM3ZWI1YWY5YzI4ZDUyMzllYzY0ZDgzMDMyZDRmODdkMGUx",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "蒙牛特侖蘇純牛奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/MILK-DELUXE-PURE-MILK-BP-371260.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMzU3ODF8aW1hZ2UvanBlZ3xoMzUvaGQ0LzkzMzY0Mzg2NTI5NTgvTUlMSyBERUxVWEUgUFVSRSBNSUxLLUJQXzM3MTI2MC5qcGd8NzIyMmJmMmMxOWY5YjE0YjAxMGIxN2NiZWMyNjUxN2Q2NWU1NTE3ZjdlZDNiYzI1YWRlNTc5ZjNhZjJiODhkZA",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "黑白全脂淡奶獨立裝 12x13毫升",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/FULL-CREAM-EVAPORATED-MILK-BP-491778.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MjIxMnxpbWFnZS9qcGVnfGhjNi9oMDAvOTMzOTY1NjU2ODg2Mi9GVUxMIENSRUFNIEVWQVBPUkFURUQgTUlMSy1CUF80OTE3NzguanBnfDE3MmY5ZmFhMzM0YjU3NDdlMGFiNDljMjAyODlkZGRhNWU4ZDI5NDE3OTcwOGE4ODlmMTJkMTAwY2Y0ZTVjNTQ",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "HOT KID 奶類飲品",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/MILK-BEVERAGE-BP-383574.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNjM4OXxpbWFnZS9qcGVnfGg1NS9oNjMvOTMzNjM5NzAzNzU5OC9NSUxLIEJFVkVSQUdFLUJQXzM4MzU3NC5qcGd8NzgzOGQxMTQxYzEyYzQ2NDIzYmViNjhkNjQxMTlkODczM2RiMDY5ZGZkYWUzMDZhMWVhNmEyNmFjNWNmNDNhMA",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "純甄乳酪飲品 原味",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/DRINKING-YOGHURT-ORIGINAL-FLAVOUR-BP-400619.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMjkyMjV8aW1hZ2UvanBlZ3xoNzMvaDQwLzkzNDAxOTM5NjQwNjIvRFJJTktJTkcgWU9HSFVSVCBPUklHSU5BTCBGTEFWT1VSLUJQXzQwMDYxOS5qcGd8YzE2OWZmNzU1ZDVlMjNkMzgzMDIxNTVmNjYzZDRhOGU3MjI0YzRlNDE0MGYzYzE3NTRhM2JkNjA2Y2E5NTU3ZA",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "雅培金裝加營素呍呢嗱味 900克",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/ENSURE-VANILLA-BP-233066.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNzM3MHxpbWFnZS9qcGVnfGg4NC9oMDkvOTMzOTg2ODYxMDU5MC9FTlNVUkUgVkFOSUxMQS1CUF8yMzMwNjYuanBnfGIxZGIwZGUzMDk2YjI2YjRjNjAxODE4ZThhNTc3MWI3NjIwMzQyZTYzMWQwYjMyNWY1MjM3ODYwZjYyZTJlZDQ",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "牛欄牌MILK+180毫升4包裝",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/CG-MILK-180MLX4-BP-224426.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMTYxMDR8aW1hZ2UvanBlZ3xoZGQvaDAzLzkzMzkzNTAzNTE5MDIvQ0cgTUlMSyAxODBNTFg0LUJQXzIyNDQyNi5qcGd8MTQzZjk0YTcxYTc0OGEyMGE3MDQzMDJlYmVmODIwMjc0MTkxNmZmZDkwMmNkNjdmMzIyZTFkZjJiM2Y1MTFhYw",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "鷹嘜輕盈配方甜奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/LIGHT-SCM-TUBE-BP-369707.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxOTQyOXxpbWFnZS9qcGVnfGhhYi9oMzAvOTMzNjc1ODA3NTQyMi9MSUdIVCBTQ00gVFVCRS1CUF8zNjk3MDcuanBnfGMyZDJjZTFjNTFiOGNlNzAwNDExNTllZTE2ZDZjMDFmMjg0NjFkOTQyY2IzMGIxZTE5YjJlZjg2YTY4YTk4YTM",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "蒙牛純牛奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/PURE-MILK-BP-358217.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MjYyMXxpbWFnZS9qcGVnfGg1ZC9oMzYvOTMzNjg2Mzk0ODgzMC9QVVJFIE1JTEstQlBfMzU4MjE3LmpwZ3xlMjFkY2RhODgxYjU2ZDcxMWU4NjU1YzY0ZWE5ZGZkMjIwZWYzNzY1N2ZjZmI5NjI3NGJmMDUzNmEyNWFmMjRm",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "子母純牛奶 470毫升",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-413708.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNjA0NjV8aW1hZ2UvanBlZ3xoNDUvaGYxLzk1MTIzNDgzMTk3NzQvUE5TSEstQlBfNDEzNzA4LWZyb250LmpwZ3xiMDVkNzBjMWI4ZDgyOTM0NjZhYTg2ZTAyODg4YzMwOWI5ZWU3ZTg4NjJkMjlmYjY0MTZiNzlkMzIxNzM3Yzhm",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "霧島山麓牛乳",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/KIRISHIMA-MILK-BP-348939.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2ODQ5MXxpbWFnZS9qcGVnfGhiMy9oMTYvOTMzNjgwNTMyNjg3OC9LSVJJU0hJTUEgTUlMSy1CUF8zNDg5MzkuanBnfGVkNDFhNTZhYjI5NDk5NjU1YjY3MGIwYzNjYTVkOTNlZDdiMmIwMzc5MjI4MmFlMTA5MzY5MTM4YjJiZDUyNGU",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "鷹嘜煉奶直立支裝",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/SCM-SQUEEZE-BOTTLE-BP-171755.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzOTQ2OHxpbWFnZS9qcGVnfGgxOC9oMzkvOTMzNjUzMzM1MjQ3OC9TQ00gU1FVRUVaRSBCT1RUTEUtQlBfMTcxNzU1LmpwZ3xjMmY0MjcxYzE4NmIyODRiYzdiMDAzNWE4YzhlZmE5YTI1NThjNzcwYjVhZTM5ODA3NDJiYjhlODRjY2Y3YTY5",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "黑白全脂加糖煉奶397克",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/FULL-CREAM-SWT-CONDENSED-MILK-BP-451878.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzOTUzNnxpbWFnZS9qcGVnfGhjMi9oNmIvOTMzNzE5Mzc1ODc1MC9GVUxMIENSRUFNIFNXVCBDT05ERU5TRUQgTUlMSy1CUF80NTE4NzguanBnfDA5ZmM3MDQyMThhNjQ1NDVlYmUwNzdjYTEyMWY2MDNmMTkxMjdjN2Y0MjdmNjVhYzkyZmVkN2ZmOGE1NDc2MzM",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "大公司高鈣低脂牛奶飲品",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/UHT-HI-CALCIUM-LOW-FAT-MILK-BEVERAGE-BP-406266.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyOTE0N3xpbWFnZS9qcGVnfGg3YS9oZWQvOTM0MTA2NDU3NzA1NC9VSFQgSEkgQ0FMQ0lVTSBMT1cgRkFUIE1JTEsgQkVWRVJBR0UtQlBfNDA2MjY2LmpwZ3w2ODA1M2Y0OGQzM2YzMzUwNGRmOTJlNDA5N2ZmOTlhMTU0YjJiOGJhMDhkOGVhYjJhY2JhYzRhMDdjMTU0OGFm",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "蘭特超高溫消毒低脂牛奶飲品",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/UHT-LOW-FAT-MILK-BEVERAGE-BP-421137.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MTQ5NnxpbWFnZS9qcGVnfGhkYi9oMDYvOTMzNzAwODM5MDE3NC9VSFQgTE9XIEZBVCBNSUxLIEJFVkVSQUdFLUJQXzQyMTEzNy5qcGd8MDFmY2JmMzk2MjY2MTU4OTFkMThjOWUxMWRjZTBkMzAyYzQzYWQ5NjFlMzc0MjM0NGFhOWZmN2FmMTQ4OGE2ZA",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "蒙牛純牛奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/PURE-MILK-BP-358216.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0ODkyOXxpbWFnZS9qcGVnfGhmZC9oOTAvOTMzNjgyOTg3MDExMC9QVVJFIE1JTEstQlBfMzU4MjE2LmpwZ3xjOWYzMTdjNjFiOTk0MGQ3YjFhNjJlZjE5NDQ2ZWVhNWZhY2UzZmNhMzJkYTFmZDVlNDZjZGE3OWE4YWVkNTYz",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "安佳即溶全脂奶粉",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/INSTANT-FULL-CREAM-MILK-POWDER-BP-111317.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1OTA5MnxpbWFnZS9qcGVnfGhkZC9oN2IvOTMzNjQ1NTM5NzQwNi9JTlNUQU5UIEZVTEwgQ1JFQU0gTUlMSyBQT1dERVItQlBfMTExMzE3LmpwZ3wyYzhkMzM5NzEwMjFkYzY0NjRiMmNhNTZjMThlZWYzYzdlZTU2M2Y1OTU3NDUyYTZhNTY5MjE5OWQwM2QzNGVj",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "蒙牛低脂高鈣奶類飲品",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/LOW-FAT-HIGH-CALCIUM-MILK-BP-358215.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyMTI3MzB8aW1hZ2UvanBlZ3xoZmUvaDM4LzkzMzY4NDY1ODE3OTAvTE9XIEZBVCBISUdIIENBTENJVU0gTUlMSy1CUF8zNTgyMTUuanBnfGNhNzhkNjZhYjQzOTcyZWQ4YmU3NzkyZGM4NDQwNDM0ZTE5Y2NlODg4Y2VlOGMwMGY5OGFjMzM0NTg5ODU4Y2U",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "雅培低糖加營素850克",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/ENSURE-LOW-SUGAR-BP-233065.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNjgxNXxpbWFnZS9qcGVnfGhmYy9oN2MvOTMzOTg2NzM2NTQwNi9FTlNVUkUgTE9XIFNVR0FSLUJQXzIzMzA2NS5qcGd8ODQwMGQ1ZmNkZTVmMDFiNmEzMTc3OTUxMzNmNTE2YTI5MjhiZWIwNmNmOGQ4NDU3MTBkYzhkODgwZWY0NjNiYQ",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "保利士多啤梨味牛奶飲品",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/STRAWBERRY-FLAVOURED-MILK-BEV-BP-421130.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w5NTYzMnxpbWFnZS9qcGVnfGhmYS9oYWQvOTMzNjU5MjM2NzY0Ni9TVFJBV0JFUlJZIEZMQVZPVVJFRCBNSUxLIEJFVi1CUF80MjExMzAuanBnfDM1YTVkMGYwMTQwYWE4MWRiMzQ2ZDMxNTM2ZGU5NjQzZDdiMTllYTA4YmFiMjVmYTQxNzJiNDUwZTkxODEyMDA",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "雅培怡保康 (粉裝)",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-342509.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNDMyMzd8aW1hZ2UvanBlZ3xoZTUvaGNlLzk0NDk2NTYzMjAwMzAvUE5TSEstQlBfMzQyNTA5LWZyb250LmpwZ3w0N2U2OGM2NzUzYjU5ZmQ5NWY0MzJlOGVhM2I4MDY4ODYzYjRlNDU2ZmIwMzFmMGVhZTRiNjRiNWEzNGE1MzY4",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "子母即溶全脂奶粉",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-418320.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3MDMwNzF8aW1hZ2UvanBlZ3xoOWIvaGY5Lzk1MTIzNDg5NzUxMzQvUE5TSEstQlBfNDE4MzIwLWZyb250LmpwZ3w1ZjllYmMxZTIzODBkZmNkMjFjNGMyY2NkNzg2ZTRkNTEzMTM4ZTg0NTQ3MTU4ZjAyYTc4MWU2NTgzYTViYTZl",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "KAM CHA 植脂淡奶",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/EVAPORATED-FILLED-MILK-BP-403919.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNjk1NHxpbWFnZS9qcGVnfGg3NS9oMzAvOTM0MDE3NzI4NTE1MC9FVkFQT1JBVEVEIEZJTExFRCBNSUxLLUJQXzQwMzkxOS5qcGd8YTc2M2YzMjQyY2VhNGJhMjRkODdlNTc4NGE1YzRjZDM4MWQzYmIxMDQyOTk1YjA4ZDY5M2VkMWNkYmQyOTc5Nw",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "安怡高鈣低脂奶粉800克裝",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/ACTIVE-HIGH-CAL-LF-MILK-POWDER-BP-115989.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MTExN3xpbWFnZS9qcGVnfGgyYi9oMWUvOTMzNjU3NDM0NTI0Ni9BQ1RJVkUgSElHSCBDQUwgTEYgTUlMSyBQT1dERVItQlBfMTE1OTg5LmpwZ3wwOTQ2MDExODBkMjRkMzYwNjA0M2YzNTk3MTdiNDM5OGU5ZTI1ODhhYTA5MGI2ZmRkZTZlM2ZlMWI2YjAxYjkx",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "三花柏齡健心高鈣較低脂奶粉",
            category_id: "2",
            goods_picture: "https://api.parknshop.com/medias/OMEGA-36-HICAL-MILK-POWDER-BP-116754.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MDEwN3xpbWFnZS9qcGVnfGg1NC9oZWUvOTMzNjg3MzI1NDk0Mi9PTUVHQSAzNiBISUNBTCBNSUxLIFBPV0RFUi1CUF8xMTY3NTQuanBnfGI5Nzg5ZTFlYzU5ZjBiYWJlZTY5NmYwZGJmY2Q4OWVjODc2NmEwYTc4YTU3NmM2MmEyMzQ4Njk2ZWM5ZDc4NjE",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        // Snacks And Dessert3
        {
            name: "日本樂天朱古力小熊餅４連包",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/KOALAS-MARCH-CHOCOLATE-BISCUIT-4-PACK-BP-460757.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNzExNHxpbWFnZS9qcGVnfGgzYi9oNmEvOTMzOTM0MzExMDE3NC9LT0FMQVMgTUFSQ0ggQ0hPQ09MQVRFIEJJU0NVSVQgNCBQQUNLLUJQXzQ2MDc1Ny5qcGd8YzgwNWJhMWJmODhhNTg0YTA3ZWYxNzAwYzQ3YTYxMmI4MTQyNTkzNzQ4YTEzMjU5ZjQ5OWRkODA5NjIzN2E4Nw",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"

        },
        {
            name: "樂天杏仁朱古力餅棒",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-105651.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMDMwODF8aW1hZ2UvanBlZ3xoMDcvaDBjLzk2MjUwOTcyMDc4MzgvUE5TSEstQlBfMTA1NjUxLWZyb250LmpwZ3w1NjdmMGJhOTQxNmM5ZGQ1YzcyMjdhNzlkYzRkMWFiZTI1N2I5MDdkMmU3YzllZTAwNjRlMTdlYzJkMWU5YWNk",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {

            name: "樂天白朱古力曲奇餅棒",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/PEPERO-WHITE-COOKIE-BP-436159.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NDYyNHxpbWFnZS9qcGVnfGhkYi9oMzIvOTMzNzQ5MzAyODg5NC9QRVBFUk8tV0hJVEUgQ09PS0lFLUJQXzQzNjE1OS5qcGd8ZmY5NGM4MDMyOTBmNDNmNjU3ODI0YmRkOWU2OWUxYWExOWFjYTYwMDcwZjVmZjBkNmRiNTIwNTZiMzYxYTMyZg",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {
            name: "日本樂天鬆脆批朱古力",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/PIE-NO-MI-RICH-CHOCOLATE-BP-393827.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NzI0MnxpbWFnZS9qcGVnfGg3OS9oYjUvOTM0MTIxOTgzMTgzOC9QSUUgTk8gTUkgUklDSCBDSE9DT0xBVEUtQlBfMzkzODI3LmpwZ3w2OWNiYzRiODFlNjRkY2JlN2JmMTYwZjcxMzdkOTZlMzBkZTI1YmQxYjY5NGJjNjZiOTgwNjdlODdhMGYzODgz",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "能得利 果汁軟糖 3\u0027S",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/FRUIT-PASTILLES-BP-119503.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzODY2MXxpbWFnZS9qcGVnfGhhYi9oYjIvOTMzNjgwMzYyMjk0Mi9GUlVJVCBQQVNUSUxMRVMtQlBfMTE5NTAzLmpwZ3w5MzI0Mzk5NzVhZDQ5YzNjMTU5YjQ1MThlNWM0Y2RjMDFiZTZiNGY2MTYzZTNlYjVkYmU1NzNlNzQzMzAxNjVh",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "樂天脆米朱古力餅棒",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/CRUNKY-PEPERO-BP-420576.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzOTQxN3xpbWFnZS9qcGVnfGhkZi9oODQvOTM0MDk3NzQ0Njk0Mi9DUlVOS1kgUEVQRVJPLUJQXzQyMDU3Ni5qcGd8ODZlNjkwMjRjMjJiOTA0ZTk0ZTk0M2E3NjZkMjEwMDZiNzBmZDRlZTBlM2U2OTZkYTA1YWM3ZmU0NDUwNDY0NA",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "樂天白朱古力杏仁餅棒",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/SNOWY-ALMOND-PEPERO-BP-420578.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNTg5NHxpbWFnZS9qcGVnfGhjNC9oOTIvOTM0MDk3NzAyMDk1OC9TTk9XWSBBTE1PTkQgUEVQRVJPLUJQXzQyMDU3OC5qcGd8NTRmNjdmMzllYzc0YjkwY2M3MmJiYWJmZjg0ZTI3MmFhOTU1YjYwYTU3YmViMzg0OWViZDk4ZTljYTZmYmQ5YQ",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {
            name: "樂天朱古力曲奇餅棒",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-333789.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMzE4MTF8aW1hZ2UvanBlZ3xoMWQvaDljLzkzNjk3MzU1OTQwMTQvUE5TSEstQlBfMzMzNzg5LWZyb250LmpwZ3wyNzE1ZTFiZTA5MjQ1MTk2NTJiZTM4YzFmNjE1NTdiYTdlNTQzNjMwNzQxNTBiODNmNTBjZmRmNjEyZjg1MzAy",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "奧利奧朱古力味迷你夾心曲奇餅杯裝",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/MINI-OREO-CHOCOLATE-BP-413697.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2NDM5MnxpbWFnZS9qcGVnfGhkZS9oYWUvOTMzNzg4MjgzNzAyMi9NSU5JIE9SRU8gQ0hPQ09MQVRFLUJQXzQxMzY5Ny5qcGd8MDc4MmYzYmU2NWZhNjFlMjUwMmI2Nzg5ODQwNGY3ZDcyYTcwN2YyNzQ3YTcxODA1ZDIxOWUwNzc5OTQ5NjViNA",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "樂天花生朱古力餅棒",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-332252.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMTg3MzF8aW1hZ2UvanBlZ3xoMzUvaDI3LzkzNjk3MzQyMTc3NTgvUE5TSEstQlBfMzMyMjUyLWZyb250LmpwZ3xlNmZlYTBiNjVmZDMxOTc4ZDQ0NWE1NThkODg1ZTExZjQzNGFkNDEwZjQyZDdlM2M3NDRiODAyNzIxMDE1Nzg2",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {

            name: "費列羅金莎朱古力48粒家庭裝",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/ROCHER-T3-OUTER-BP-354903.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MjE4NXxpbWFnZS9qcGVnfGhmOS9oMGIvOTMzNzIwNzkxNDUyNi9ST0NIRVIgVDMgT1VURVItQlBfMzU0OTAzLmpwZ3xiOGQyODY5ODdhODhlZjBlNTA4Y2RkNzQ5ODI3Y2M5YTliODc4NDgyOTExYjhjMjVkZGRkNmZmMDY1MzE0ZTYx",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "金龜嘜印尼萬里脆花生",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/ROASTED-SALTED-PEANUT-BP-125936.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MjU4OXxpbWFnZS9qcGVnfGhkOS9oMGQvOTMzNjkzNjAwNTY2Mi9ST0FTVEVEICBTQUxURUQgUEVBTlVULUJQXzEyNTkzNi5qcGd8ZDhkZGUxZjE2NmI2YmFkZWFjOTczMWQyNTA5N2FmYjVkNDFkYjYzNWJiMDNjMjg2OTBkMjk5MDdkNmFmMmM4Yg",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "KIMNORI原味韓國紫菜",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/SEASONED-SEAWEEDORIGINAL-FLV-BP-476755.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1ODUyN3xpbWFnZS9qcGVnfGg1ZS9oYjkvOTMzODYzODQwMTU2Ni9TRUFTT05FRCBTRUFXRUVET1JJR0lOQUwgRkxWLUJQXzQ3Njc1NS5qcGd8ZDU1MzJjYjgzYzU0MGE0NTRhMzE2ZDIyZWIxZTFkNzQ1YjI4ZjIyNjUyOTg0NjE0NjVlZDMzOTFlNDdlY2IyNw",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "奧利安魚仔餅紫菜味",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/KOREPAD-SNACKSEAWEED-FLAVOUR-BP-189179.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzOTcxOHxpbWFnZS9qcGVnfGhmZC9oOTkvOTMzNjc2MjY2Mjk0Mi9LT1JFUEFEIFNOQUNLU0VBV0VFRCBGTEFWT1VSLUJQXzE4OTE3OS5qcGd8YjcwNjMzN2Q1YTBlNzhiZjY1NDE1ZWY4YzgyNWM2NjAwYjczNmJmZGNiN2I3OWE0MjdhMWUyZDA4MDcyODcyMw",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "費列羅金莎朱古力禮盒16粒裝",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/ROCHER-T16-BP-111277.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2MDEzOHxpbWFnZS9qcGVnfGhlZi9oNjUvOTMzNjQyODkyMDg2Mi9ST0NIRVIgVDE2LUJQXzExMTI3Ny5qcGd8YWJmNWM3MmM4ZTYwN2U3NzE5YTkyNzEwMjQzNzkwNzE5MDNiNjEwM2ZkYzZmOTU3MjI5ODY5Zjc5MWIxODRlMw",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {

            name: "費列羅金莎朱古力金鑽禮盒24粒",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-154828.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyNTEzNzB8aW1hZ2UvanBlZ3xoZDEvaDg3Lzk0NjY1ODI3Mjg3MzQvUE5TSEstQlBfMTU0ODI4LWZyb250LmpwZ3w3ZDQ4NWExY2M3NjRmNTY4ZmRjMzdiZDk4OGRmYTlmZjk5NGQ1Mjk0NzU5MWUxNjlkYjJmN2YyYTU4Nzc4OWRk",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "金龜嘜印尼萬里脆花生",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/ROASTED-SALTED-PEANUT-BP-125935.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MTEwNXxpbWFnZS9qcGVnfGg3OC9oNzEvOTMzNjY4ODcwNTU2Ni9ST0FTVEVEICBTQUxURUQgUEVBTlVULUJQXzEyNTkzNS5qcGd8ZDgwMWE0Y2Q1MWNjZmVkNmY5OTU3ZGUwMDVmODk4ZWIwOTM0ODE1MmExNWM0YTg5MzJmYTI2NDg0Yjc0NjZmNg",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "珍珍醬燒豬仔骨味薯片",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-465773.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxOTA2MDJ8aW1hZ2UvanBlZ3xoNWEvaDdmLzk0NjE1ODE2NzY1NzQvUE5TSEstQlBfNDY1NzczLWZyb250LmpwZ3xjOGY3NDVkOTEwZGM0NDM4OGRkZWZlNjI2MzRjMTNlYTg5MzU0ZjU1NjYwMjhhMDJmNzY2ZDVmYzZhNjExYjNj",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {

            name: "益達無糖香口珠-薄荷口味超量裝75克",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/Peppermint-Flavour-Gum-Mega-Bag-BP-248915.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNjYzMXxpbWFnZS9qcGVnfGhkMi9oMjUvOTMzNjg2MzQ5MDA3OC9QZXBwZXJtaW50IEZsYXZvdXIgR3VtIE1lZ2EgQmFnLUJQXzI0ODkxNS5qcGd8NDUxNDA1MzQ1YTBiNzY0NTFlM2Y5NWY0N2U0NjczMTU2YThlYTQwYWE0MjBjZTRiYzNjZTBhMmVjOTZlOTRmYQ",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "珍珍燒烤味薯片優惠裝",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/POTATO-CHIP-FUN-PACK-BP-113489.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNjQxM3xpbWFnZS9qcGVnfGhmOS9oNjQvOTMzNzI5ODQ1MjUxMC9QT1RBVE8gQ0hJUCBGVU4gUEFDSy1CUF8xMTM0ODkuanBnfDgzYTliNmE0OGVmZTU1ZGVjZjhiZTBlMTZlNmI4NjVjODhlMjU4NzllODJhY2YzNzAyODUzODNhODk3NzEyZWY",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "HARIBO 哈瑞寶快樂可樂橡皮糖",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-469069.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxODQ0NTl8aW1hZ2UvanBlZ3xoMGMvaDNjLzk2Mjg4NzMyNjEwODYvUE5TSEstQlBfNDY5MDY5LWZyb250LmpwZ3w5MjdjN2NiN2QyN2VmZDk0MTg2ZTBlNDE2YTI2NGM4ZDUzZGNiMGRmN2JlNmU3NmJhMDEyNjcyYWM0M2UzZTk0",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {
            name: "益達無糖香口珠－檸檬薄荷味",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/LEMON-MINT-FLAVOUR-CHEWING-GUM-BP-332974.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzMjU1M3xpbWFnZS9qcGVnfGgyNy9oODMvOTMzNjkxNjYzOTc3NC9MRU1PTiBNSU5UIMKgRkxBVk9VUiBDSEVXSU5HIEdVTS1CUF8zMzI5NzQuanBnfDJlYTM0NDM5NTMyZjY3MjQ3YTViMjI1NjRjZTBiZDI3ZjZlOWM1M2U0Y2FhNThkN2U3YmM4NGI4ZDM3OTQ5NDE",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {

            name: "特醇海鹽朱古力100克",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/EXCELLENCE-SEA-SALT-100G-BP-300805.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MTQwNnxpbWFnZS9qcGVnfGg2Ny9oOGEvOTMzNjk5Nzk2OTk1MC9FWENFTExFTkNFIFNFQSBTQUxUIDEwMEctQlBfMzAwODA1LmpwZ3w5MTlhNmY3MTI2MmM1N2IwNzA1MjZiOGFkZTNkOGU5MzRmZjBmZjU3ODg1YTIyMTAyNDhkNjMxMGFjNjAyZGQ4",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {

            name: "味覺 Shigekix 超酸提子味橡皮糖",
            category_id: "3",
            goods_picture: "https://api.parknshop.com/medias/SHIGEKIX-GUMMY-GRAPE-FLAVOR-BP-215685.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzMTUzOHxpbWFnZS9qcGVnfGgxNi9oMTkvOTMzNjU0NTY3MzI0Ni9TSElHRUtJWCBHVU1NWSAtIEdSQVBFIEZMQVZPUi1CUF8yMTU2ODUuanBnfDA3NWMxNDcyOTEwZDNhYzdiNWQ4ZTYzMDRkMmQ3ZGI0OTlkZDNkYTRkM2Q0YTNjNGVmMjI2N2NkZmU3OTYyMWY",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        // Staples4
        {
            name: "金鳳牌純正泰國頂級香米",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/THAI-HOM-MALI-FRAGRANT-RICE-BP-116362.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MTc0NHxpbWFnZS9qcGVnfGgxMS9oN2QvOTMzNjQ2MzQyNTU2Ni9USEFJIEhPTSBNQUxJIEZSQUdSQU5UIFJJQ0UtQlBfMTE2MzYyLmpwZ3xhYjQ5NmNjOGI4NjMwN2UxY2FmMjNmZjliMzEwNGY1YWQ0NTJiYTIwMWZhZDc4NTExMmRkOWJhYzNiM2UxZTVm",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {
            name: "金象牌頂上茉莉香米",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/PREMIUM-JASMINE-RICE-BP-150007.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1NzI4OXxpbWFnZS9qcGVnfGg2MC9oZWIvOTMzNjk1NDU1MjM1MC9QUkVNSVVNIEpBU01JTkUgUklDRS1CUF8xNTAwMDcuanBnfDlmMTg3ZDBjMjZiYTE1MGY5YzVkYmZhMGU1ZGFkZWI4N2VhOTU5YzQzMzFjNTA5ODZmZTIxZDhlZDI3MzE0MWY",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"

        },

        {
            name: "刀嘜純正芥花籽油",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/PURE-CANOLA-OIL-BP-128520.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1Mzg2MnxpbWFnZS9qcGVnfGgwZi9oYjEvOTMzNjc3NTkzMzk4Mi9QVVJFIENBTk9MQSBPSUwtQlBfMTI4NTIwLmpwZ3w3MmEwMDllZGRhYjk1M2I4MGI4OTFhMThjNTk2NDk5ZjEwOGQxMmE1ZjYwYTZiYTc3NTYzMGMyNWIxYTk0N2Mx",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"

        },

        {
            name: "獅球嘜初搾橄欖芥籽油",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-135196.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0ODYxMzl8aW1hZ2UvanBlZ3xoZDQvaGM2Lzk1MzQ2MTEyOTIxOTAvUE5TSEstQlBfMTM1MTk2LWZyb250LmpwZ3wwZmUwYWI4YjU5MmI3ZDRlYWE0NjJlNTQxMjY2ZmU5ZTAyYTVlNTlkZTZjZjMxMzMwNGQ3NzM1NjU3MWY3NjA1",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {
            name: "刀嘜金裝濃香花生油",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/SUPREME-PEANUT-OIL-BP-437663.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1OTEzNXxpbWFnZS9qcGVnfGgyNy9oODkvOTMzNjkzNzU0NTc1OC9TVVBSRU1FIFBFQU5VVCBPSUwtQlBfNDM3NjYzLmpwZ3wzYzRhNGQzOWRmNDIwMzBjYjZhNmIwNGViZTdhMTQ4OGZhYmY0YzY2NzRiODIwM2IxNjdiNTViY2E3N2Y1ZmJm",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {

            name: "ROBERTSONS啫喱粉80克(雜味)",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/JELLY-POWDER-ASSORTED-FLAVOUR-BP-102241.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3MTgyOHxpbWFnZS9qcGVnfGgyZi9oY2MvOTMzNjQ3NTgxMTg3MC9KRUxMWSBQT1dERVIgQVNTT1JURUQgRkxBVk9VUi1CUF8xMDIyNDEuanBnfGMwZmRiYjRlOTZhNTZiM2Y3ZTY2MjU3ZjYzN2QwZjZhZTNkMjI1MGIzZjI4OWE1OTM5M2U2Y2JiMTBjZGI5Y2Q",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {
            name: "金御膳火腿豬肉",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/CHOPPED-HAM-AND-PORK-BP-437380.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1NTE5NnxpbWFnZS9qcGVnfGgzMC9oMzUvOTMzNjgyNTkzNzk1MC9DSE9QUEVEIEhBTSBBTkQgUE9SSy1CUF80MzczODAuanBnfGUzNzg2NDIxMThiNDgyMWE3MThmOWZjMzRkYTQzMjQzN2NmNTlhMjI5ZGM0ODQxNDBiZDY1ZWE4Mjk3OGU0ZmM",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {
            name: "李錦記紅燒臻選鮑魚６隻裝",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/SUP-ABA-IN-RED-BRAISING-SAUCE-6S-BP-465620.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNjU0OHxpbWFnZS9qcGVnfGhkNy9oOTYvOTM0MTYyNDIyMTcyNi9TVVAgQUJBIElOIFJFRCBCUkFJU0lORyBTQVVDRSA2Uy1CUF80NjU2MjAuanBnfDM2MGZmNDE5MWY3OWQ0ODMwODIzOWRjY2QzOTFmMzNjYmJkYjVmOGUxYTRiMTE4ZGViYmM1OTQ2ZTU1NGVhYjc",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {

            name: "淘大頭遍生抽",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/FIRST-EXTRACT-LIGHT-SOY-SAUCE-BP-183058.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MzEzNHxpbWFnZS9qcGVnfGg3Yy9oZTQvOTMzNjc2ODg1NjA5NC9GSVJTVCBFWFRSQUNUIExJR0hUIFNPWSBTQVVDRS1CUF8xODMwNTguanBnfDcyZjg1ZjUxZDE5ZWNlNzAyOTFmNzcwZmI4Y2YyMGNkZTYxZGE4ZDQ4YWFkOTg1YzUxNzk4ZDYwZDRkNDRiMjA",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {

            name: "李錦記叉燒醬",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/CHAR-SIU-SAUCE-BP-113052.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2NDU4M3xpbWFnZS9qcGVnfGhkMC9oOTQvOTMzNjgyOTczOTAzOC9DSEFSIFNJVSBTQVVDRS1CUF8xMTMwNTIuanBnfDYzY2FjZmJhYzU3MGZiNjNkYWYyOTljMTE3ODY4ZGUwODBiMmE5NGRhNDVkODUwNjZmZGQ4NzRiNGY0MzIzNTA",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },
        {

            name: "家樂牌雞湯粒",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-305085.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMjU5NzN8aW1hZ2UvanBlZ3xoMDIvaGUxLzk0MTY2NzAzNDcyOTQvUE5TSEstQlBfMzA1MDg1LWZyb250LmpwZ3xmMDg5YTFmNmNjNWEzZGNiMGVjYzJiM2YwYjc4ZmRhNDJkMjk5ZjE4Y2JlMDBmMzUwODk3MGI3MzIzODU0Njgx",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },

        {

            name: "李錦記潮洲辣椒油",
            category_id: "4",
            goods_picture: "https://api.parknshop.com/medias/CHIU-CHOW-CHILI-OIL-BP-119639.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2Nzk5NXxpbWFnZS9qcGVnfGg2Mi9oZjkvOTMzNjYwMzkzNDc1MC9DSElVIENIT1cgQ0hJTEkgT0lMLUJQXzExOTYzOS5qcGd8N2IxYzVmZTcyNTY1ZWZmOTU4NDVhMzA0ODYxNTlhYjM2NTgzMmIxY2NiZGYwNTU5Mzg0YjE4MDRiMmZhMzgzMw",
            aeon_price: "8.3",
            dch_price: "7.5",
            jasons_price: "5.5",
            parknshop_price: "7.8",
            wellcome_price: "7"
        },


        // Noodles5
        {

            name: "家樂牌鮮雞湯快熟通心粉",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-383615.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNTQ3MTZ8aW1hZ2UvanBlZ3xoN2EvaGY3LzkzNjMyOTI4MTUzOTAvUE5TSEstQlBfMzgzNjE1LWZyb250LmpwZ3w3YjA0ZDdiOTc3OGViNjliODE4MjE0Y2U2ZDRjMTcwMTk0ZjRkMjRjY2E4ZDM2NTUyNWE3ODJmZGM3YWFmNDI1",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {
            name: "農心韓國黑版辛辣麵四包裝",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/SHIN-BLACK-SPICY-NOODLE-4S-BP-492166.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1NDY2M3xpbWFnZS9qcGVnfGhhYS9oMzYvOTM0MDA5MTU2NDA2Mi9TSElOIEJMQUNLIFNQSUNZIE5PT0RMRSA0Uy1CUF80OTIxNjYuanBnfDIwY2I1N2FiY2QwMTk4YzMyOWExNWJkZWVmMGZjOTkxOTJmYmU5NTVkYTE4MmIwYTA3N2RhYTU3YjY0ZDJiY2U",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {
            name: "出前一丁香辣海鮮味即食麵",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/INST-NOODLE-SPICY-SEAFOOD-BP-125154.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3NTgyNXxpbWFnZS9qcGVnfGg4Ni9oZjIvOTMzNjg1NzkxOTUxOC9JTlNUIE5PT0RMRSAtIFNQSUNZIFNFQUZPT0QtQlBfMTI1MTU0LmpwZ3w0OTBlOWVkNGNhZWVlYTMyYzVhNjVmMGViNzI4NGUzNTQ1NWQ3MWZkMzE2NWVkMmU2MDJiNzhmODgyNTZjOTYw",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "日清合味道杯麵-冬蔭功味",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/CUP-NOODLE-TOM-YUM-GOONG-BP-426729.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MDE1M3xpbWFnZS9qcGVnfGhmMS9oNmUvOTMzNjQ2ODM3MzUzNC9DVVAgTk9PRExFIC0gVE9NIFlVTSBHT09ORy1CUF80MjY3MjkuanBnfDA2NDM4NzliM2NmZWEzZTAxNmJhZmU2NGViZmQ5OTEzZDg0NmE2OWIyYmMyMjY4NWY2NDcyOTY0ZDgzMTMwOTk",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "出前一丁咖喱味即食麵",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/INST-NOODLE-CURRY-BP-104260.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3NTM0NHxpbWFnZS9qcGVnfGgyMy9oYTAvOTMzNjg1NjgwNTQwNi9JTlNUIE5PT0RMRSAtIENVUlJZLUJQXzEwNDI2MC5qcGd8MWEzZmI4OTc4OWQ1OTg5YmY3OTE3YjdiMmMzZDk0YjViMzU3MWFlOGFiYWViM2FiMmMyNjIzMzRlNTQ1OWI5OA",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "出前一丁黑蒜油豬骨湯味杯麵",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-362158.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNTQ1MTF8aW1hZ2UvanBlZ3xoZWEvaGYxLzk0MzE3NTQwODAyODYvUE5TSEstQlBfMzYyMTU4LWZyb250LmpwZ3xiMDk4MDNhYjE2ODEzMGZhYTEwYmNlYjA5OWU4ZDZiMDFjYWVmM2NmMGQwN2M3NmJkN2VmNDAxNjRmNjZiMTcw",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "出前一丁沙嗲味即食麵",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/INST-NOODLE-SATAY-BP-109354.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2ODE3MXxpbWFnZS9qcGVnfGgyZC9oZWYvOTMzNjg3ODc5MjczNC9JTlNUIE5PT0RMRSAtIFNBVEFZLUJQXzEwOTM1NC5qcGd8ZmZmNzdiOTM4M2Y1NWI5N2Q5Y2NmYjRkNzc1ZjFjZGQ0ZmJmZDE4MWQwYTI1NjFmMWE3ZmQxNWRmNGMwOTA5Yg",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {

            name: "福字上湯伊麵",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/SUPERIOR-SOUP-INSTANT-NOODLE-BP-116117.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2MzI4NXxpbWFnZS9qcGVnfGhiZS9oZWEvOTMzNjk3MDc3MjUxMC9TVVBFUklPUiBTT1VQIElOU1RBTlQgTk9PRExFLUJQXzExNjExNy5qcGd8NDdhN2ZlMzNjZDhkYzdhZjc4OWRjOTQwNTUwODA1YjIxNjZhOTQ2YmVkZjJmYmY5Mjc0NmUxYWIxNjM4M2I1YQ",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {

            name: "出前一丁黑蒜油豬骨湯味碗麵",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/BOWL-NDL-BLK-GAR-OIL-TON-FLV-BP-369505.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2NDYxN3xpbWFnZS9qcGVnfGgwYi9oMGEvOTMzNjk2MDI4Njc1MC9CT1dMIE5ETC1CTEsgR0FSIE9JTCBUT04gRkxWLUJQXzM2OTUwNS5qcGd8NjQzNTY0YjY2ZGY1OGJhZDZlYTFjYWI4MjhkYTU0NTYwYTRlNDMzZTgxYmVjYzI3NTA5NTUyZDgyNzA0NzViMw",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "公仔碗麵麻油上素味",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/Doll-Bowl-Noodle-Vegetarian-Flavour-with-Sesame-Oil-BP-127887.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNjMxNXxpbWFnZS9qcGVnfGg0Ny9oYTcvOTMzNjY3MDAyNzgwNi9Eb2xsIEJvd2wgTm9vZGxlIFZlZ2V0YXJpYW4gRmxhdm91ciB3aXRoIFNlc2FtZSBPaWwtQlBfMTI3ODg3LmpwZ3xjMWVkMzUxNGNjMWI5OTNlMDA3YTlkYmExYmExMjM5OGI4YTg3Nzc1NTRjZDRhMzI3YmU3MjlhYmYyNmY3OTZk",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "家樂牌鮑魚雞味快熟通心粉",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-383614.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNjAwNTR8aW1hZ2UvanBlZ3xoYzIvaDNjLzkzNjMyODc0NzQyMDYvUE5TSEstQlBfMzgzNjE0LWZyb250LmpwZ3xkMWU1ZjI2MWVjOGQzMzRlMjNkNDIxYTIyMjA3ODYwZjcyOGFjNzMzMWRhMjZlNTllZjliZDUwM2EwYjQzZGM5",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {

            name: "台酒花雕雞麵（碗裝）",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/SHAOXING-WINE-CHICKEN-INST-NDL-BP-426716.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4NzgxNHxpbWFnZS9qcGVnfGg0NC9oZmMvOTM0MDE5NTI3NDc4Mi9TSEFPWElORyBXSU5FIENISUNLRU4gSU5TVCBOREwtQlBfNDI2NzE2LmpwZ3xlMzllYWNiZmJlNzA1OTg4OWQ5ZjMyM2UwMjU1NjNiNTNhZTgwNTUwZTc1ZTdjOWNjMTA1MWEzMGVkNTRmNGUx",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {

            name: "媽咪胡椒湯麵",
            category_id: "5",
            goods_picture: "https://api.parknshop.com/medias/PEPPER-NOODLE-BP-327912.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNDM3MnxpbWFnZS9qcGVnfGgwZC9oYTAvOTMzNjQzMjE2NDg5NC9QRVBQRVIgTk9PRExFLUJQXzMyNzkxMi5qcGd8M2U0ZDQyM2VmNTg2OGIxMTgxYzI4ZjVlOTMzNDE0NjMxZmE4ZjA5MDdhY2Y0YmY4NGYzMzJiZGI5NGNkZDcyMQ",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        // Beverages6


        {
            name: "維他奶純低糖黑豆漿 250mlX6",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/PURE-LOWSUGAR-BLACK-SOYABEAN-EXTRACT-BP-383575.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MzI0NnxpbWFnZS9qcGVnfGg2OC9oNmIvOTMzNjM1ODIwNzUxOC9QVVJFIExPV1NVR0FSIEJMQUNLIFNPWUFCRUFOIEVYVFJBQ1QtQlBfMzgzNTc1LmpwZ3xmMGRkNDUzNDgzNDg3NGRkYTI4ZmEzNDZkZmZmZTJjN2EwYTJkY2M5NDliMjVhYmJhMWJjMTBkOThhZGU5YmMx",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {
            name: "可口可樂",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/COKE-BP-123871.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNjYyNzZ8aW1hZ2UvanBlZ3xoZTcvaDJiLzkzMzY1ODIwNzg0OTQvQ09LRS1CUF8xMjM4NzEuanBnfDFkMWUxZTI0MzllN2IzNTJiMmUwNDVkZmRiYWJmN2RhMWFlN2VlMmFkZDY5ZDkxM2I0ODZmZjE3MGJhOTA2ZjM",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {
            name: "維他冷泡無糖香片茶飲品6包裝",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-496042.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNjE0MjZ8aW1hZ2UvanBlZ3xoYWQvaDY3LzkzNzAxMDE4MDkxODIvUE5TSEstQlBfNDk2MDQyLWZyb250LmpwZ3xiZmRlODI4YWYzZDUwZjk2NzlhYTBmNzYxNmU0ZmNmMDBlNjA3OWQxMjYzMWMzM2MyNzY1MDcyNmQ0MTlmZDVi",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {
            name: "四洲香濃咖啡罐裝",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/PREMIUM-COFFEE-CAN-BP-388510.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNzMwNnxpbWFnZS9qcGVnfGg1Ni9oOGMvOTM0MDE3MzM1Mjk5MC9QUkVNSVVNIENPRkZFRSBDQU4tQlBfMzg4NTEwLmpwZ3wzY2RkNGU1NTJiYWIyZDI2NzViMDllYzE0YzA1NzJjMDc5YTMxYzc2OWYzYWEyMzRlYjEwYzEzODM0YmVjMGIy",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {
            name: "無糖可口可樂汽水迷你罐裝",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-348207.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMDYyODR8aW1hZ2UvanBlZ3xoYjYvaDU5Lzk2MDYyNzc0MzEzMjYvUE5TSEstQlBfMzQ4MjA3LWZyb250LmpwZ3w4YTg5YTdkNTQxZmI2YmJmMTM3ZDI0NWU3OTNiMTZlMzhkMmMwZmY1NzQ1OWVlYmUwMWU5OTJkMjNmMGEzOWY0",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {
            name: "伊美瑞士特級特級低脂牛奶",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/SWISS-PREM-SEMI-SKIMMED-MILK-BP-445810.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NjkwM3xpbWFnZS9qcGVnfGg0NC9oOTIvOTMzNzQ0NTA1NjU0Mi9TV0lTUyBQUkVNIFNFTUkgU0tJTU1FRCBNSUxLLUJQXzQ0NTgxMC5qcGd8YTUwNjlhNmQyMGFmYjY3M2VlZjNiYTM4ZWU2OTlhOTc1MWUzMzYwYTI1ZWM1MjQxODE4ZjUyYTdhODJkOWU0MQ",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {

            name: "陽光檸檬茶",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/LEMON-TEA-BP-188168.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3MDAxN3xpbWFnZS9qcGVnfGhiYi9oYjQvOTMzNjk0NzE0Njc4Mi9MRU1PTiBURUEtQlBfMTg4MTY4LmpwZ3w0YzRkYTUxMjI0MmQxM2MzNGU0ZmZmMTBkN2NlZTkzYWJmN2Q0YzU1MDM3MjRhNzFmYTMxOGY3NzNmODFkYTU1",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {
            name: "玉泉青檸味有氣水",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/LIME-FLAVOURED-SPARKLING-WATER-BP-317714.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MTYwMXxpbWFnZS9qcGVnfGgwMS9oNGIvOTMzOTY0NDA4NDI1NC9MSU1FIEZMQVZPVVJFRCBTUEFSS0xJTkcgV0FURVItQlBfMzE3NzE0LmpwZ3xjYTY3MDBjYTg4N2IxZTBlYWMzZjhiMTJjZWIzZTVkYzI2MjUyZjdjM2EzMmZkMWNkZTc4YTgyMjMxN2M4MTA5",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {
            name: "菓汁先生 - 100%天然椰青水",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-108450.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2OTU0MXxpbWFnZS9qcGVnfGg5Yy9oMDYvOTU5MjkzMjgyNzE2Ni9QTlNISy1CUF8xMDg0NTAtZnJvbnQuanBnfDJlODVmNmE3NjNjNjgzMTRhNjVhYzE1MjNhMWY4YjNmNTI3MzU4NzBkNDI5NmRlZjExMTAwODhmNWU5Mjg5NWE",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {
            name: "法國巴黎礦泉水天然有氣-原味",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/PET-REGULAR-BP-105009.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNjU3NnxpbWFnZS9qcGVnfGg0MS9oZmYvOTMzNjc5MjM4MzUxOC9QRVQgUkVHVUxBUi1CUF8xMDUwMDkuanBnfGIxYjE5MjY0Yjk5YjkzNWM0MDFhODkxN2ZlN2U2NjRiNDJjZDNiY2YzZDJlMDk0NjlkNzNkZGY0ODc3YzdhZmI",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {
            name: "OATLY有機燕麥奶",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/ORGANIC-OAT-MILK-BP-467944.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzMDIyNXxpbWFnZS9qcGVnfGhjYi9oZDMvOTM0MDQ0MTgyMTIxNC9PUkdBTklDIE9BVCBNSUxLLUJQXzQ2Nzk0NC5qcGd8MmVhYjE2MTA3YTcxNjI2OWEyMjUzZTE4OGMwYjAzOWY0NGE4M2U0ZWI4Y2M3MGY4M2QxNDg4OTQ0YzIzOTQyOA",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {
            name: "星巴克™ House Blend Nespresso 咖啡粉囊",
            category_id: "6",
            goods_picture: "https://api.parknshop.com/medias/HOUSE-BLEND-COFFEE-CAPSULES-BP-106615.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyNDc3NXxpbWFnZS9qcGVnfGg2OS9oNmEvOTM0MTA0MDA2NjU5MC9IT1VTRSBCTEVORCBDT0ZGRUUgQ0FQU1VMRVMtQlBfMTA2NjE1LmpwZ3xkNjNjNTZlNTZjYjc1YmYwZDg0OGNjMmU4M2M4Yzk1Y2Y2NjhjYzgzNDBiMTBlOTgwNjZmYjQxZTRiYjViN2Iw",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },






        // Alcohol7
        {
            name: "人頭馬XO特優香檳干邑70cl",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/-XO-COGNAC-BP-124047.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2OTM0OXxpbWFnZS9qcGVnfGg3Yi9oNGQvOTMzNjg4OTg2ODMxOC8gWE8gQ09HTkFDLUJQXzEyNDA0Ny5qcGd8OTkxMTc1YjFiNmVkOWUwYTQyYTYyYTM4ODczZGYyNGUyYzBlMmVjNDRiYjc3NzZiNWNlMGUzMTk1MWM1OGI3OA",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "日本盛清酒（大）",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/SAKE-L-BP-124420.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyODc4MXxpbWFnZS9qcGVnfGhmNi9oZDUvOTMzNjk3MDE0OTkxOC9TQUtFIEwtQlBfMTI0NDIwLmpwZ3xjZmYzNDQ0MGExMDIwYjgwZWRhN2I5MTk5OGRiNzU2N2NlMTA0YTI2NDY1Zjg5MTNiYzU0NjIxNzI4ZGE2ZmQy",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "青島啤酒十二罐裝",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/BEER-12-CAN-BP-163144.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1MjU0NHxpbWFnZS9qcGVnfGhiNS9oMWIvOTMzNjg1NTA2ODcwMi9CRUVSIDEyIENBTi1CUF8xNjMxNDQuanBnfGM5MDVhNDc0Y2Q2NzJkMzg2YjRhNTZmOTdhYjhmMzZjOTM1YmI3OWYzOWExNDRmMjZlMDU4NGYzOTU3YmM5N2U",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "白鶴上撰清酒",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/JYOSEN-BP-486114.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzMjU4OXxpbWFnZS9qcGVnfGhmYi9oYjQvOTMzOTUzMDMxMzc1OC9KWU9TRU4tQlBfNDg2MTE0LmpwZ3wyOTljZjA3YzcwOTU1ZmU2MmQwMGNmNjY4MzY3MzYzNzZjOWNkZmNlNzIzNTJjYTNmOWNjYTJhMDE0MTRiYzhm",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "獅威十二罐裝啤酒",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-139904.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyNTgxNDd8aW1hZ2UvanBlZ3xoMzMvaDk0Lzk0NDE4NDQxOTk0NTQvUE5TSEstQlBfMTM5OTA0LWZyb250LmpwZ3wxMmQwY2UzODExZTYzYzhiZTNhNjNmNDVmNjY1M2FiOWZlZTAzOWY2ODdiN2YyNjU2ZjQ4NjI2YTQxOTQ0NGU2",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "白雪特級清酒",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/JYOSEN-BLUE-PACK-SAKE-2L-BP-198392.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzODQ4NXxpbWFnZS9qcGVnfGg1Yi9oM2EvOTMzNjUwNDU0OTQwNi9KWU9TRU4gQkxVRSBQQUNLIFNBS0UgMkwtQlBfMTk4MzkyLmpwZ3xlN2I5YjZiNDM5YzE4M2QyY2E0NTM5NWYxZWYyY2I2NGQ2NzcxYjY1Mjk5MTZiMzFjODNlOTBmNjcyOWFkYjRk",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "藍冰啤酒十二罐裝",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/BEER-12S-CAN-BP-148405.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzODI5MTcxfGltYWdlL2pwZWd8aDM0L2hiZC85MzM2OTE4MDgxNTY2L0JFRVIgMTJTIENBTi1CUF8xNDg0MDUuanBnfGVmYjNjN2Q0NzkwNjJhMDdkODY4MDNiZTc0Y2NmYTFhMDJhZmRlYjZlZGJhNzQwOTA4OWRkOGY3ZGNmODY5NGQ",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "朝日啤酒十二罐裝",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/BEER-CAN-BP-388705.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2MzE3NXxpbWFnZS9qcGVnfGhkYi9oNzcvOTMzNjk0MDY1ODcxOC9CRUVSIENBTi1CUF8zODg3MDUuanBnfGQ5N2E0OTg3NzZlYTFmNTViZDE2NTg5YWFmMGUyNzI1NWUyZmEzMzBjNjAwNDg1ODJmMmQ5ZmVmYzUyMmUyYTU",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "人頭馬CLUB特優香檳干邑 70cl",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/CLUB-DE-REMY-BP-126457.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyMDM3NXxpbWFnZS9qcGVnfGhmNi9oMjgvOTMzNjYxMzk5NDUyNi9DTFVCIERFIFJFTVktQlBfMTI2NDU3LmpwZ3w2MmU4ZmM5MDdhYzQ5NmJjOGVhODI0MmMyM2ZkYWE0NzdhMTRmNDI2MzdlYzliMDVlMTc5MzZhMTgxOWM3OTgy",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "軒尼詩X.O.干邑 ",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-129411.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzMTQ3NTF8aW1hZ2UvanBlZ3xoNmMvaDMwLzk1MzQ2MDk5ODE0NzAvUE5TSEstQlBfMTI5NDExLWZyb250LmpwZ3xlYzg1YzAxOTljYzNmMjc3NGQyZDMzNzRjNjFlNzNlNGFiZjljOGQwMmUxMWZkNDIxMzcxYjY2ODE2YmZkZjE0",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {
            name: "HIGHLAND PARK 12YO SINGLE MALT SCOTCH WHISKY",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/12YO-SINGLE-MALT-SCOTCH-WHISKY-BP-372912.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzOTQwOXxpbWFnZS9qcGVnfGhkOS9oMWMvOTMzNzM4MzQ4NTQ3MC8xMllPIFNJTkdMRSBNQUxUIFNDT1RDSCBXSElTS1ktQlBfMzcyOTEyLmpwZ3w4ZmFkZmY3YTNlNjIzMDA3ZDY1YzgyNDZkY2RkZmNlZTQwYzBmNzZlNzlhMWI2Yzg4YmI0NmYzODlhMDhmNDA0",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {
            name: "鬼佬ＩＰＡ",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/GWEILO-IPA-BP-454058.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3OTg5NnxpbWFnZS9qcGVnfGhiOS9oOGIvOTMzNzQzOTM4NzY3OC9HV0VJTE8gSVBBLUJQXzQ1NDA1OC5qcGd8NTJlMmRiYTE3YWVkMzg0MGM4YTExMDA4NWNhYTlmM2VjN2ZkZjNlZTZkYTVmODQ5MGJkYjUxY2MxYjg2MjQxOA",
            aeon_price: "4.5",
            dch_price: "6.9",
            jasons_price: "8",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {

            name: "澳洲奔富 BIN2SHIRAZ MOURVEDRE/ MATARO",
            category_id: "7",
            goods_picture: "https://api.parknshop.com/medias/BIN-2-SHIRAZ-MATARO-BP-354377.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyMzA5NnxpbWFnZS9qcGVnfGg2NS9oYWEvOTMzNjYwNzgzNDE0Mi9CSU4gMiBTSElSQVogTUFUQVJPLUJQXzM1NDM3Ny5qcGd8YzcwZTIwMWE4NjczOTQ2MjI4MTMxNTc1YjNmNGNhZWY2MDQxNTE3YTk4MjM3N2ZmNjdmZDUzMWE1ZGU5ZDczMA",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        // Household8
        {
            name: "祝君早安白毛巾13X30吋孖裝",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/WHITE-FACE-TOWEL-13X30INCH-BP-182480.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNjc2M3xpbWFnZS9qcGVnfGg4OC9oNGIvOTMzNjMyNjA2MjExMC9XSElURSBGQUNFIFRPV0VMIDEzWDMwSU5DSC1CUF8xODI0ODAuanBnfDRjODI2MjJmNDA4ZTRkOGM1YmQ1ZDQ3ZjE0NmY2MDI2ZDhmZjAzNTVmZTcyOTE5MmFkMTE2M2Q3YTk3YTA3YTc",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {
            name: "維達 卷裝廚房紙巾6卷裝",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/KITCHEN-TOWEL-Random-Pick-for-Cartoon-Normal-Pack-BP-426508.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1Mjg5NXxpbWFnZS9qcGVnfGhmYS9oMTgvOTMzNjUzNzU0Njc4Mi9LSVRDSEVOICBUT1dFTCBSYW5kb20gUGljayBmb3IgQ2FydG9vbiBOb3JtYWwgUGFjay1CUF80MjY1MDguanBnfDc2Nzg3YTcxYjc3MzA1ZmQyNjA3NmYzYTliOGMwNTRlZmY0NjBmMDQ5NjFmZDBhNzk2ODc5ODA1MTQ1NzU0YTM",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "皇冠３層棉柔舒適衛生紙１０卷裝",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/Comfort-Soft-Bath-Tissue-3ply-10R-BP-397139.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1OTg1N3xpbWFnZS9qcGVnfGg2Ny9oMzMvOTMzNjg2NzQ1NTAwNi9Db21mb3J0IFNvZnQgQmF0aCBUaXNzdWUgM3BseSAxMFItQlBfMzk3MTM5LmpwZ3w2ZTYxOWEzM2JlOTVkNTVkODkwYTQ5NjQ5Y2IzNDEzNzg1YmNiNTE1NzlmNmFkODNlZjljOTE1NDMwZTgwNmRl",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "殺菌消毒噴霧－柔香",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-153442.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxOTcyNTV8aW1hZ2UvanBlZ3xoNzQvaDMxLzk0ODU1MjA3NjQ5NTgvUE5TSEstQlBfMTUzNDQyLWZyb250LmpwZ3xhOWM4ZDM0ZWQyNTUwMjYzYWZkYjEyNzUyYTcxMTYxMWIwZDcwYTVjZTNhZGRiMTQ0YTYyNjZmZDY3ZDI4NTJj",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "盒裝面紙 超柔版",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/SOFTEST-FACIAL-TISSUE-Random-Pick-for-Cartoon-Normal-Pack-BP-184040.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzODEzNXxpbWFnZS9qcGVnfGgwMi9oYTMvOTMzNjY2MjA2NTE4Mi9TT0ZURVNUIEZBQ0lBTCBUSVNTVUUgUmFuZG9tIFBpY2sgZm9yIENhcnRvb24gTm9ybWFsIFBhY2stQlBfMTg0MDQwLmpwZ3xiMmYxOTMxNjQwMjNhNWY1OWQxY2RmY2VkNjFmZTc5NGU2ZjkyY2ZiODAyYTk2ZDQ4ZWZiMDM0NWQxNjc2MDNm",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "斧頭牌 檸檬 維他命E 護膚  洗潔精 泵裝 1300克",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-195449.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4NzI0OXxpbWFnZS9qcGVnfGgwYy9oMDYvOTM2Njk4MjIzMDA0Ni9QTlNISy1CUF8xOTU0NDktZnJvbnQuanBnfGUwZDEzY2Q1NTZmOTY0MWY4NzYwMGMxOWM4YTJlYzZmMGY5NWIwNWQzYzhjZDYxOWNjOTQwNzBkY2IyMTlmOTk",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "潔柔 高級衛生紙",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/ULTRA-TOILET-ROLL-BP-128669.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNTM1MHxpbWFnZS9qcGVnfGg1YS9oOTAvOTMzNjUzMTY0ODU0Mi9VTFRSQSBUT0lMRVQgUk9MTC1CUF8xMjg2NjkuanBnfDlkM2ZmNDcxNTk2ZjY4NWU4OWZjOWY0OTlhNmFkMDAzYjY2YjY0ZDMyY2I2OGY4ZWQzNzUxZmU4MGQ2YWNkNTg",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {
            name: "佳能食物保鮮袋(大袋)",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/FOOD-BAG-LARGE-BP-382452.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzMTc0NnxpbWFnZS9qcGVnfGhiMy9oZmQvOTMzNjk5NjUyODE1OC9GT09EIEJBRyBMQVJHRS1CUF8zODI0NTIuanBnfDUzMGIwNjMwYzQ1YTJjNDc3MTRlZDdlMDkwZTgxZTQwZWFhNjc5NTA3ZWQ5Y2Q3MzA2ZDUwZjM4NmE4NDU5MDI",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {
            name: "維達４Ｄ立體壓花４層盒裝面紙４盒",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/4D-DELUXE-4PLY-NEUTRAL-FT-4S-BP-345655.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzODg3MnxpbWFnZS9qcGVnfGg5MS9oZmIvOTMzOTgwMzU5ODg3OC80RCBERUxVWEUgNFBMWSBORVVUUkFMIEZUIDRTLUJQXzM0NTY1NS5qcGd8OGI0MTBjZmU4MjI2ZjE4N2UwNWVlNzA1ZDQ4OTYzOTE1OWM2YjBlOGM3MTkzMzliZGE0ZWI2MTQ4ZjhhZjJiYQ",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "勞工牌 檸檬洗潔精 2L (補充裝)",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/LEMON-LIQUID-DETERGENT-BP-113155.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0ODQzMnxpbWFnZS9qcGVnfGg4Ni9oMWIvOTMzNjUyOTM4NzU1MC9MRU1PTiBMSVFVSUQgREVURVJHRU5ULUJQXzExMzE1NS5qcGd8ZjVjOWQ2ZTBjZmQ5YjVmM2VhZGE1OWE2MDVkZTE2OWMyMmM0NGM3ODQ3MTA2ZWU1YzAzYWI0ODY2YWE2MDY5Mw",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {
            name: "威露士多用途消毒濕巾綠茶84片",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/DISINFECTANT-WIPES-84S-GREEN-TEA-BP-410755.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMjY4OTR8aW1hZ2UvanBlZ3xoNGQvaGM3LzkzNDEyNTUwNTc0MzgvRElTSU5GRUNUQU5UIFdJUEVTIDg0UyBHUkVFTiBURUEtQlBfNDEwNzU1LmpwZ3w3MmUzNzQxZjI0MWY4YjU1MjM2YjEwOTExY2FkNTAyMTdjODlhNDMyOWU1OTk3YjNlODRlNzliODk0MmFkYWY0",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {
            name: "威潔33超濃縮洗衣粉",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/SUPER-CON-LAUNDRY-DETERGENT-BP-145907.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4Nzc4MnxpbWFnZS9qcGVnfGg2YS9oMmQvOTMzNjYyNjQ0NjM2Ni9TVVBFUiBDT04gTEFVTkRSWSBERVRFUkdFTlQtQlBfMTQ1OTA3LmpwZ3wzMzNkZTJjNzVhZTViZTFjMDhjZGI3OGFjYzczNzdhN2JkNDVlN2RmYTVmNDAwNWI1ZDQwNDk5M2EwNzBjYzEy",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        {
            name: "威猛先生通渠泡沫",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/SINK-DRAIN-FOAMER-BP-334711.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyNTgyNjYxfGltYWdlL2pwZWd8aDkwL2hmYy85MzM2NDEyMDEyNTc0L1NJTksgIERSQUlOIEZPQU1FUi1CUF8zMzQ3MTEuanBnfGIwYTAwNzc4MjQ2NWI3OWMwMTdlYTEwZTcxZjg5ZWEzZTUyM2QxZTQ3ZjNkMDIwZmE2MjljY2VkMDQwNzgwMzc",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },
        {
            name: "WEBER環保燒烤炭",
            category_id: "8",
            goods_picture: "https://api.parknshop.com/medias/CHARCOAL-BRIQUETTES-BP-401904.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNTgyNnxpbWFnZS9qcGVnfGhjNi9oOWEvOTM0MDA2MzU0NzQyMi9DSEFSQ09BTCBCUklRVUVUVEVTLUJQXzQwMTkwNC5qcGd8MGQ5NjAxODk3YzUyNmU4NTdkODQwMzQ1ZDdjNTA0M2Y1NGMyZmMxMWFkMjBmYjM5MTY3ZmJhZTkzNDFhNzQzZg",
            aeon_price: "9.5",
            parknshop_price: "7.8",
            wellcome_price: "9"
        },

        // Personal Care9

        {

            name: "便利妥立體型成人口罩中碼綠盒-白色",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/3D-FACE-MASK-ADULT-SIZE-M-G-BP-410846.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3NjMwMHxpbWFnZS9qcGVnfGg4ZS9oMDUvOTM0MDUxNzQ0OTc1OC8zRCBGQUNFIE1BU0sgQURVTFQgU0laRSBNIEctQlBfNDEwODQ2LmpwZ3xiOWRhM2NiMDg1YzRjOGU5Y2JjZGVjOTQ0NDg0OTY0ZDJhYzY5MzJkZDdmZjczZjhiMDQ4OTU5OGQ1NWJhNWI5",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {
            name: "護舒寶超柔護墊16cm 22片",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/ULTRA-SOFT-LINER-16CM-BP-409975.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzOTY3NXxpbWFnZS9qcGVnfGgzMS9oNjMvOTM0MTI4MzA3NDA3OC9VTFRSQSBTT0ZUIExJTkVSIDE2Q00tQlBfNDA5OTc1LmpwZ3w5NDZmODY2NGMwMjdmOWI1ZjI0MTY5ZDFjMWRlZmIyY2Q3MWM3OGVjN2Q1NWU5ZGI2ODI5Nzg3MTE3NTljNzQw",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {

            name: "高露潔抗敏強健琺瑯質牙膏",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/COL-TP-SSTVE-ENAMEL-PROTECT-BP-462040.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzMzI0MXxpbWFnZS9qcGVnfGg2Yy9oOGIvOTMzNzY4ODY4NjYyMi9DT0wgVFAgU1NUVkUgRU5BTUVMIFBST1RFQ1QtQlBfNDYyMDQwLmpwZ3w1ZTU5OTYwMzNhMzk0ZTJjZGE0NWZkZDM1ZTNmMmIxNTM2MGYxNGUxMDMzMGNlMWUzZWIxMTdiMDk0NzFjZWU1",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {
            name: "舒適達抗敏速效牙膏",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/RAPID-RELIEF-BP-488409.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NDI0NXxpbWFnZS9qcGVnfGgzOS9oOTEvOTMzOTEzODcwMzM5MC9SQVBJRCBSRUxJRUYtQlBfNDg4NDA5LmpwZ3xiMTAyNzBlNTJmMzgxMTBjMjM3Nzk2YzZiMGVjNjhlMTA1YjNjY2RkNzUyZDBiMjllOTcyNTVlOTkzMjYwNmY4",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {

            name: "高露潔全效專業美白牙膏",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/COL-TOTAL-PROF-WHITE-TP-BP-234867.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0NDAxM3xpbWFnZS9qcGVnfGhhMy9oY2EvOTMzOTYxNjg4NjgxNC9DT0wgVE9UQUwgUFJPRiBXSElURSBUUC1CUF8yMzQ4NjcuanBnfGYzYmZkOTg1NzcxN2VmMTc4ZTQ1ZjA0YmZhY2UxMzQwYzdkNmNmZTIzOTM4MDQyY2E2Yzc5N2E5MzBkNWYzMTE",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {

            name: "舒適達專業修復美白牙膏",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/REPAIR-PROTECT-WHITENING-TP-BP-245896.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0MDE5NnxpbWFnZS9qcGVnfGhjZS9oNzMvOTMzNjU3MzkxOTI2Mi9SRVBBSVIgIFBST1RFQ1QgV0hJVEVOSU5HIFRQLUJQXzI0NTg5Ni5qcGd8ZDM2ZTdjMGEzODExZTRlZGFlMDQ4OTAwMDQ2M2FhNjFjNDJiN2I3NmVjODJlMDQ0OTgxNjFhNTBhOTRlN2RmOQ",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {

            name: "滴露親膚深層保濕潔手液3支裝蘆薈茉莉花香",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-409817.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNDI3ODA2fGltYWdlL2pwZWd8aGUyL2gxYi85NTI0NDc5MDY2MTQyL1BOU0hLLUJQXzQwOTgxNy1mcm9udC5qcGd8YTMzYzZjY2E2MTc3MjFkMTYyODVjYzgzY2U0NGNiZjdkZTcyOWQyNTY2MTFjZTJiZjg3NDM3ZDkzMDAzNmZhMg",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {

            name: "高露潔三重功效牙膏２００克３支裝",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/TRIPLE-ACTION-200GX3-BP-378544.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2NDYzNnxpbWFnZS9qcGVnfGhkZC9oMmMvOTM0MDA5MDcxMjA5NC9UUklQTEUgQUNUSU9OIDIwMEdYMy1CUF8zNzg1NDQuanBnfDg3OGFlMjU2ODQxMGQ5NmQ5NjA0ODA4NzMxODg5MTNkZDY5ZjQ1MTY1YTE5YTY2YzJjYjViMWRmMmU0NTg4M2Y",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {

            name: "強生PH5.5沐浴露",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/BODY-WASH-BP-145943.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNDE4NXxpbWFnZS9qcGVnfGg5Yy9oN2YvOTMzNjQ1NTI2NjMzNC9CT0RZIFdBU0gtQlBfMTQ1OTQzLmpwZ3w5MzFmZDAxYTUzMzYzNGQxOThkMjY0YzgzODgyZjMwYmQ0OGE5YWZhN2E2OTRiZWUwMjU3YzlmM2RlOTY2ODcy",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {

            name: "獅王兒童牙膏（２—６歲）",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/KODOMO-CHILDREN-TP-AGE-2-6-BP-370749.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0ODg0MXxpbWFnZS9qcGVnfGg2Yi9oOTEvOTM0MDE0NDY4MDk5MC9LT0RPTU8gQ0hJTERSRU4gVFAgQUdFIDItNi1CUF8zNzA3NDkuanBnfDUxYTJiOWE0YjVmYzI5MjZiZjU1ZTU2MmU1MjE1ZGUzYjAzYjNkZDU1MzhmY2E5YjU0ZTYxODBjM2I4MWU5NjM",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {

            name: "岡本0.01水性聚氨酯 4片裝",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/OKAMOTO-001-HYDRO-PU-CONDOM-BP-235656.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4NDY2MDl8aW1hZ2UvanBlZ3xoMDgvaDlhLzkzNDA5MDkyODk1MDIvT0tBTU9UTyAwMDEgSFlEUk8gUFUgQ09ORE9NLUJQXzIzNTY1Ni5qcGd8Zjg4NjU5ZWNmOGIwODU2YWVmYzU0MWRlNThmYTA4ZDBmNDA2M2M5YzkwYWE0M2Y2YzRmMTRjYTg3ZTA2OTY2MQ",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {

            name: "杜蕾斯雙保險裝衛生套18片",
            category_id: "9",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-189325.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w2MjA5MDF8aW1hZ2UvanBlZ3xoYjYvaDBlLzk1MzgyOTQxODYwMTQvUE5TSEstQlBfMTg5MzI1LWZyb250LmpwZ3wwM2U5ZTg0NzI2MDAzODYwMzA5NDE0ZDRhZmVhYzk0NDE5YTAzZTU1OTZmZjI4YmYwM2VlZWY2YmFmYmU1Y2E3",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        // Frozen Food10

        {
            name: "DREYER皇牌曲奇妙趣雪糕",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/GRAND-COOKIES-CREAM-ICE-CREAM-BP-346560.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNzMzNHxpbWFnZS9qcGVnfGg2NC9oZDQvOTMzOTY4MjkxNDMzNC9HUkFORCBDT09LSUVTICBDUkVBTSBJQ0UgQ1JFQU0tQlBfMzQ2NTYwLmpwZ3w0OTU3ZmM1ODFiMDgzOWQ3MDA1OGUyZTM2NTYwMjEyNjk1NmMyZjdiMGE4MjRlZDFhMzI2ZTg5MWY2MjI2ZGVj",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {

            name: "日本樂天北海道雲呢拿味雪條",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/HOKKAIDO-VANILLA-BAR-BP-471362.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4MjkzNnxpbWFnZS9qcGVnfGg0OC9oNDYvOTM0MDE1NTE2Njc1MC9IT0tLQUlETyBWQU5JTExBIEJBUi1CUF80NzEzNjIuanBnfDgxMDU2ZmEyY2Y3MmUwZmY4ZTYzZDU4NDZiODhiMDQ5OTcxOWZkMTYzMmZlMGU1ODdiNzlkZTViZjA2Njc2Mzc",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {

            name: "明治4.3特濃牛奶",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/43-DELUXE-MILK-BP-364783.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w0Mzg1NnxpbWFnZS9qcGVnfGg4My9oZDYvOTMzNjQ4MzY0MzQyMi80MyBERUxVWEUgTUlMSy1CUF8zNjQ3ODMuanBnfGU1MDAxZWQ2NDc2ZTkwNTFjYmYzYjRiYWIzMTU0ZGJjOTRhYWFiMjZjZDNhZDA3OTU1NDc4MDUyODM0ZTAwN2U",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {

            name: "LESS IS MORE泰國無添加激素雞中翼",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/cat-front-BP-62767.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxNDcwNjV8aW1hZ2UvanBlZ3xoMTUvaDRiLzk1MjI4ODYxODA4OTQvUE5TSEstQlBfNjI3NjctZnJvbnQuanBnfDM4MDFiNmQzMzM5YjliYjAxMTc0Yjk5YTVhMGIyM2E5ODk3ZjQ2Y2QyZGYzMTRiNmIzNGJkNWExMzg0NjQxNDg",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {
            name: "HAAGEN-DAZS士多啤梨雪糕家庭裝",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/STRAWBERRY-ICE-CREAM-BP-134317.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w1NDgzNnxpbWFnZS9qcGVnfGhmMS9oNzMvOTMzNzE1NDQzNzE1MC9TVFJBV0JFUlJZIElDRSBDUkVBTS1CUF8xMzQzMTcuanBnfGQ2NmU1NGQ0NmJiMGY5YWViMjgxOTllMDM0NmNhYjNmZDNjNDFlYTUzZDQ1MDkzZmRmOTJkODE0NzU1NDJmMTE",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {

            name: "小寧波黑芝麻湯圓",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/SESAME-TONG-YUEN-BP-356042.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w4NTE2MXxpbWFnZS9qcGVnfGgzYy9oYTAvOTMzODE4MTI4Nzk2Ni9TRVNBTUUgVE9ORyBZVUVOLUJQXzM1NjA0Mi5qcGd8OWM2NzE4MDVmNTI5OTYxY2VkOTAzNTM5MzYwYjY2YWNhY2ZkZmZjZjI2OTFhODEzZmRkN2UyNmIyOTI2NGRlZQ",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {
            name: "DREYER皇牌石板街雪糕",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/GRAND-ROCKY-ROAD-ICE-CREAM-BP-346683.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wzNjQ4OHxpbWFnZS9qcGVnfGhjYS9oZDkvOTMzOTY4MzIwOTI0Ni9HUkFORCBST0NLWSBST0FEIElDRSBDUkVBTS1CUF8zNDY2ODMuanBnfDE4NWQxYjA2YzkzNDRiNTViM2VlZjc0OWRmY2VhOWZiOWNiN2EzNTNhZDBkYzUwMGQxNDE2NDQzZTlhNWFmZTA",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {
            name: "HAAGEN-DAZS抹茶杏仁脆皮雪糕批",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/GREEN-TEA-AND-ALMOND-BP-461076.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3w3ODU2M3xpbWFnZS9qcGVnfGhlOC9oOWMvOTMzNzY5NjI4ODc5OC9HUkVFTiBURUEgQU5EIEFMTU9ORC1CUF80NjEwNzYuanBnfDc3NzYzNzJiMGIyYmMxYjJlYTJiMTE3Y2FhZTFhYjk2ZWQ5NDk0MDU3MzIwNjgzMjZjM2RhNGI1YzQxYzdiMTY",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

        {
            name: "淘大叉燒包",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/CHAR-SIU-BUN-BP-163929.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wxMjA2MDB8aW1hZ2UvanBlZ3xoYzQvaDY0LzkzMzcxOTE4MjU0MzgvQ0hBUiBTSVUgQlVOLUJQXzE2MzkyOS5qcGd8MWRhODUwMzA0NDliYjU5NGE1NjMxZGFlZDcxMjM4MDMxMjcwYTI4MmU2OGE4NTFiMjhlMTI2YTkyY2FiMmE5MA",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },
        {

            name: "東東鮮蝦雲吞8粒裝",
            category_id: "10",
            goods_picture: "https://api.parknshop.com/medias/SHRIMP-WONTON-BP-193550.jpg?context=bWFzdGVyfHBuc2hrL2ltYWdlc3wyNjY2OXxpbWFnZS9qcGVnfGhhYy9oNDEvOTMzNzMzNDU5NTYxNC9TSFJJTVAgV09OVE9OLUJQXzE5MzU1MC5qcGd8MGZmMjk5ZmJhODY2NGE3MTc2ZmMzODQwYTQ0NmZkMGYzYTNlYjZkMGU0OTliYzI5ZThjOGE4MmNhN2JkYTBjMw",
            aeon_price: "8.5",
            dch_price: "5.9",
            jasons_price: "12",
            parknshop_price: "5.8",
            wellcome_price: "7"
        },

    ]).into('goods');


    await knex.insert([
        {
            user_id: "1",
            goods_id: "195",
            category_id: 10
        },
        {
            user_id: "2",
            goods_id: "195",
            category_id: 10
        },
        {
            user_id: "3",
            goods_id: "195",
            category_id: 10
        },
        {
            user_id: "4",
            goods_id: "195",
            category_id: 10
        },
        {
            user_id: "5",
            goods_id: "195",
            category_id: 10
        },
        {
            user_id: "6",
            goods_id: "194",
            category_id: 10
        },
        {
            user_id: "7",
            goods_id: "194",
            category_id: 10
        },
        {
            user_id: "8",
            goods_id: "194",
            category_id: 10
        },
        {
            user_id: "9",
            goods_id: "194",
            category_id: 10
        },
        {
            user_id: "1",
            goods_id: "203",
            category_id: 10
        },
        {
            user_id: "2",
            goods_id: "203",
            category_id: 10
        },
        {
            user_id: "3",
            goods_id: "203",
            category_id: 10
        },
        {
            user_id: "4",
            goods_id: "202",
            category_id: 10
        },
        {
            user_id: "5",
            goods_id: "202",
            category_id: 10
        },
        {
            user_id: "6",
            goods_id: "201",
            category_id: 10
        },
        // Cat 9
        {
            user_id: "1",
            goods_id: "185",
            category_id: 9
        },
        {
            user_id: "2",
            goods_id: "185",
            category_id: 9
        },
        {
            user_id: "3",
            goods_id: "185",
            category_id: 9
        },
        {
            user_id: "4",
            goods_id: "185",
            category_id: 9
        },
        {
            user_id: "5",
            goods_id: "185",
            category_id: 9
        },
        {
            user_id: "6",
            goods_id: "184",
            category_id: 9
        },
        {
            user_id: "7",
            goods_id: "184",
            category_id: 9
        },
        {
            user_id: "8",
            goods_id: "184",
            category_id: 9
        },
        {
            user_id: "9",
            goods_id: "184",
            category_id: 9
        },
        {
            user_id: "1",
            goods_id: "183",
            category_id: 9
        },
        {
            user_id: "2",
            goods_id: "183",
            category_id: 9
        },
        {
            user_id: "3",
            goods_id: "183",
            category_id: 9
        },
        {
            user_id: "4",
            goods_id: "182",
            category_id: 9
        },
        {
            user_id: "5",
            goods_id: "182",
            category_id: 9
        },
        {
            user_id: "6",
            goods_id: "193",
            category_id: 9
        },

        // Cat 8
        {
            user_id: "1",
            goods_id: "175",
            category_id: 8
        },
        {
            user_id: "2",
            goods_id: "175",
            category_id: 8
        },
        {
            user_id: "3",
            goods_id: "175",
            category_id: 8
        },
        {
            user_id: "4",
            goods_id: "175",
            category_id: 8
        },
        {
            user_id: "5",
            goods_id: "175",
            category_id: 8
        },
        {
            user_id: "6",
            goods_id: "174",
            category_id: 8
        },
        {
            user_id: "7",
            goods_id: "174",
            category_id: 8
        },
        {
            user_id: "8",
            goods_id: "174",
            category_id: 8
        },
        {
            user_id: "9",
            goods_id: "174",
            category_id: 8
        },
        {
            user_id: "1",
            goods_id: "173",
            category_id: 8
        },
        {
            user_id: "2",
            goods_id: "173",
            category_id: 8
        },
        {
            user_id: "3",
            goods_id: "173",
            category_id: 8
        },
        {
            user_id: "4",
            goods_id: "172",
            category_id: 8
        },
        {
            user_id: "5",
            goods_id: "172",
            category_id: 8
        },
        {
            user_id: "6",
            goods_id: "171",
            category_id: 8
        },
        // Cat 7
        {
            user_id: "1",
            goods_id: "165",
            category_id: 7
        },
        {
            user_id: "2",
            goods_id: "165",
            category_id: 7
        },
        {
            user_id: "3",
            goods_id: "165",
            category_id: 7
        },
        {
            user_id: "4",
            goods_id: "165",
            category_id: 7
        },
        {
            user_id: "5",
            goods_id: "165",
            category_id: 7
        },
        {
            user_id: "6",
            goods_id: "164",
            category_id: 7
        },
        {
            user_id: "7",
            goods_id: "164",
            category_id: 7
        },
        {
            user_id: "8",
            goods_id: "164",
            category_id: 7
        },
        {
            user_id: "9",
            goods_id: "164",
            category_id: 7
        },
        {
            user_id: "1",
            goods_id: "163",
            category_id: 7
        },
        {
            user_id: "2",
            goods_id: "163",
            category_id: 7
        },
        {
            user_id: "3",
            goods_id: "163",
            category_id: 7
        },
        {
            user_id: "4",
            goods_id: "162",
            category_id: 7
        },
        {
            user_id: "5",
            goods_id: "162",
            category_id: 7
        },
        {
            user_id: "6",
            goods_id: "161",
            category_id: 7
        },
        // Cat 6
        {
            user_id: "1",
            goods_id: "145",
            category_id: 6
        },
        {
            user_id: "2",
            goods_id: "145",
            category_id: 6
        },
        {
            user_id: "3",
            goods_id: "145",
            category_id: 6
        },
        {
            user_id: "4",
            goods_id: "145",
            category_id: 6
        },
        {
            user_id: "5",
            goods_id: "145",
            category_id: 6
        },
        {
            user_id: "6",
            goods_id: "144",
            category_id: 6
        },
        {
            user_id: "7",
            goods_id: "144",
            category_id: 6
        },
        {
            user_id: "8",
            goods_id: "144",
            category_id: 6
        },
        {
            user_id: "9",
            goods_id: "144",
            category_id: 6
        },
        {
            user_id: "1",
            goods_id: "143",
            category_id: 6
        },
        {
            user_id: "2",
            goods_id: "143",
            category_id: 6
        },
        {
            user_id: "3",
            goods_id: "143",
            category_id: 6
        },
        {
            user_id: "4",
            goods_id: "148",
            category_id: 6
        },
        {
            user_id: "5",
            goods_id: "148",
            category_id: 6
        },
        {
            user_id: "6",
            goods_id: "149",
            category_id: 6
        },
        // Cat 5
        {
            user_id: "1",
            goods_id: "135",
            category_id: 5
        },
        {
            user_id: "2",
            goods_id: "135",
            category_id: 5
        },
        {
            user_id: "3",
            goods_id: "135",
            category_id: 5
        },
        {
            user_id: "4",
            goods_id: "135",
            category_id: 5
        },
        {
            user_id: "5",
            goods_id: "135",
            category_id: 5
        },
        {
            user_id: "6",
            goods_id: "134",
            category_id: 5
        },
        {
            user_id: "7",
            goods_id: "134",
            category_id: 5
        },
        {
            user_id: "8",
            goods_id: "134",
            category_id: 5
        },
        {
            user_id: "9",
            goods_id: "134",
            category_id: 5
        },
        {
            user_id: "1",
            goods_id: "3",
            category_id: 5
        },
        {
            user_id: "2",
            goods_id: "133",
            category_id: 5
        },
        {
            user_id: "3",
            goods_id: "133",
            category_id: 5
        },
        {
            user_id: "4",
            goods_id: "2",
            category_id: 5
        },
        {
            user_id: "5",
            goods_id: "132",
            category_id: 5
        },
        {
            user_id: "6",
            goods_id: "131",
            category_id: 5
        },
        // Cat 4
        {
            user_id: "1",
            goods_id: "125",
            category_id: 4
        },
        {
            user_id: "2",
            goods_id: "125",
            category_id: 4
        },
        {
            user_id: "3",
            goods_id: "125",
            category_id: 4
        },
        {
            user_id: "4",
            goods_id: "125",
            category_id: 4
        },
        {
            user_id: "5",
            goods_id: "125",
            category_id: 4
        },
        {
            user_id: "6",
            goods_id: "124",
            category_id: 4
        },
        {
            user_id: "7",
            goods_id: "124",
            category_id: 4
        },
        {
            user_id: "8",
            goods_id: "124",
            category_id: 4
        },
        {
            user_id: "9",
            goods_id: "124",
            category_id: 4
        },
        {
            user_id: "1",
            goods_id: "123",
            category_id: 4
        },
        {
            user_id: "2",
            goods_id: "123",
            category_id: 4
        },
        {
            user_id: "3",
            goods_id: "123",
            category_id: 4
        },
        {
            user_id: "4",
            goods_id: "122",
            category_id: 4
        },
        {
            user_id: "5",
            goods_id: "122",
            category_id: 4
        },
        {
            user_id: "6",
            goods_id: "121",
            category_id: 4
        },
        // Cat 3
        {
            user_id: "1",
            goods_id: "115",
            category_id: 3
        },
        {
            user_id: "2",
            goods_id: "115",
            category_id: 3
        },
        {
            user_id: "3",
            goods_id: "115",
            category_id: 3
        },
        {
            user_id: "4",
            goods_id: "115",
            category_id: 3
        },
        {
            user_id: "5",
            goods_id: "115",
            category_id: 3
        },
        {
            user_id: "6",
            goods_id: "114",
            category_id: 3
        },
        {
            user_id: "7",
            goods_id: "114",
            category_id: 3
        },
        {
            user_id: "8",
            goods_id: "114",
            category_id: 3
        },
        {
            user_id: "9",
            goods_id: "114",
            category_id: 3
        },
        {
            user_id: "1",
            goods_id: "113",
            category_id: 3
        },
        {
            user_id: "2",
            goods_id: "113",
            category_id: 3
        },
        {
            user_id: "3",
            goods_id: "113",
            category_id: 3
        },
        {
            user_id: "4",
            goods_id: "112",
            category_id: 3
        },
        {
            user_id: "5",
            goods_id: "112",
            category_id: 3
        },
        {
            user_id: "6",
            goods_id: "111",
            category_id: 3
        },
        // Cat 2
        {
            user_id: "1",
            goods_id: "85",
            category_id: 2
        },
        {
            user_id: "2",
            goods_id: "85",
            category_id: 2
        },
        {
            user_id: "3",
            goods_id: "85",
            category_id: 2
        },
        {
            user_id: "4",
            goods_id: "85",
            category_id: 2
        },
        {
            user_id: "5",
            goods_id: "85",
            category_id: 2
        },
        {
            user_id: "6",
            goods_id: "84",
            category_id: 2
        },
        {
            user_id: "7",
            goods_id: "84",
            category_id: 2
        },
        {
            user_id: "8",
            goods_id: "84",
            category_id: 2
        },
        {
            user_id: "9",
            goods_id: "84",
            category_id: 2
        },
        {
            user_id: "1",
            goods_id: "73",
            category_id: 2
        },
        {
            user_id: "2",
            goods_id: "73",
            category_id: 2
        },
        {
            user_id: "3",
            goods_id: "73",
            category_id: 2
        },
        {
            user_id: "4",
            goods_id: "62",
            category_id: 2
        },
        {
            user_id: "5",
            goods_id: "62",
            category_id: 2
        },
        {
            user_id: "6",
            goods_id: "51",
            category_id: 2
        },
        // Cat 1
        {
            user_id: "1",
            goods_id: "36",
            category_id: 1
        },
        {
            user_id: "2",
            goods_id: "36",
            category_id: 1
        },
        {
            user_id: "3",
            goods_id: "36",
            category_id: 1
        },
        {
            user_id: "4",
            goods_id: "36",
            category_id: 1
        },
        {
            user_id: "5",
            goods_id: "36",
            category_id: 1
        },
        {
            user_id: "6",
            goods_id: "44",
            category_id: 1
        },
        {
            user_id: "7",
            goods_id: "44",
            category_id: 1
        },
        {
            user_id: "8",
            goods_id: "44",
            category_id: 1
        },
        {
            user_id: "9",
            goods_id: "44",
            category_id: 1
        },
        {
            user_id: "1",
            goods_id: "23",
            category_id: 1
        },
        {
            user_id: "2",
            goods_id: "23",
            category_id: 1
        },
        {
            user_id: "3",
            goods_id: "23",
            category_id: 1
        },
        {
            user_id: "4",
            goods_id: "12",
            category_id: 1
        },
        {
            user_id: "5",
            goods_id: "12",
            category_id: 1
        },
        {
            user_id: "6",
            goods_id: "11",
            category_id: 1
        },

    ]).into('user_liked');

};

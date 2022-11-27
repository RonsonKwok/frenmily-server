import { Knex } from "knex";

export class GoodsService {
    constructor(private knex: Knex) { }

    // async getAllGoodsCategories(): Promise<any> {
    //     console.log("getAllGoodsCategories")
    //     const results = await this.knex.raw(

    //         "select * from goods_categories",
    //     );
    //     console.log("results :", results.rows);

    //     return results.rows;
    // }

    async getTop5(): Promise<any> {
        try {
            console.log("getTop5");
            const results = await this.knex.raw(
                `select goods_id, count(*) as goods_count
            from user_liked
            group by goods_id
            order by goods_count desc 
            limit 5`
            );
            console.log("results :", results.rows);
            let tempArray = [];

            for (let result of results.rows) {
                console.log(result.goods_id);
                const eachItem = await this.knex.raw(
                    `select * from goods where id = ?`,
                    [result.goods_id]
                );
                tempArray.push(eachItem.rows[0]);
            }
            console.log("tempArray :", tempArray);

            return tempArray;
        }
        catch (e) {
            console.log(e);
        }

    }

    async getRandom(): Promise<any> {
        try {
            console.log("getRandom");
            const results = await this.knex.raw(
                `select * from goods
            ORDER BY RANDOM()
            limit 8`
            );
            console.log("results :", results.rows);

            return results.rows;
        }
        catch (e) {
            console.log(e);
        }

    }

    async getGoodsByCat(catId: number): Promise<any> {
        try {
            console.log("DATABASE: getGoodsByCat");
            const results = await this.knex.raw(
                `select * from goods where category_id = ?`,
                [catId]
            );
            // console.log("results :", results.rows);

            return results.rows;
        }
        catch (e) {
            console.log(e);
        }

    }

    async getTopGoodsByCat(catId: number): Promise<any> {
        try {
            console.log("DATABASE: getTopGoodsByCat");
            const results = await this.knex.raw(
                `with user_liked_cat as (select * from user_liked where category_id = ?)
            select goods_id, count(*) as goods_count
                        from user_liked_cat
                        group by goods_id
                        order by goods_count desc 
                        limit 5`,
                [catId]
            );

            console.log("results :", results.rows);

            return results.rows;
        }
        catch (e) {
            console.log(e);
        }

    }

    async getProductByBatch(qtyInOneBatch: number, ItemsToBeSkipped: number): Promise<any> {
        try {
            console.log("DATABASE: getProductByBatch");
            const results = await this.knex.raw(/*sql*/
                `SELECT * 
                FROM goods 
                LIMIT ? OFFSET ?`,
                [qtyInOneBatch, ItemsToBeSkipped]
            );
            console.log("results :", results.rows);

            return results.rows;
        }
        catch (e) {
            console.log(e);
        }

    }

    async getProductByBatchAndCatId(catIds: number[], qtyInOneBatch: number, ItemsToBeSkipped: number): Promise<any> {
        try {
            console.log("DATABASE: getProductByBatchAndCatId");
            const exploreResults = await this.knex
                .select("goods.id", "goods.name as goods_name", "barcode", "category_id", "goods_categories.name as category_name", "goods_picture", "aeon_price", "dch_price", "jasons_price", "parknshop_price", "wellcome_price", "mannings_price", "watsons_price", "ztore_price")
                .from("goods")
                .innerJoin('goods_categories', 'goods.category_id', 'goods_categories.id')
                .whereIn("category_id", catIds)
                .limit(qtyInOneBatch, { skipBinding: true })
                .offset(ItemsToBeSkipped)
                .returning("*")

            // console.log("DB explore results :", exploreResults);

            const top5Results = await this.knex
                .select("goods.id", "goods.name as goods_name", "barcode", "goods.category_id", "goods_categories.name as category_name", "goods_picture", "aeon_price", "dch_price", "jasons_price", "parknshop_price", "wellcome_price", "mannings_price", "watsons_price", "ztore_price")
                .count("goods.id")
                .from("goods")
                .innerJoin('goods_categories', 'goods.category_id', 'goods_categories.id')
                .innerJoin('user_liked', "goods.id", "user_liked.goods_id")
                .whereIn("goods.category_id", catIds)
                .groupBy("goods.id", "goods_categories.name")
                .orderBy("count", "desc")
                .limit(5, { skipBinding: true })
                .offset(ItemsToBeSkipped)
                .returning("*")

            // console.log("DB top5Results results :", top5Results);

            const results = {
                exploreResults,
                top5Results
            }
            return results;
        }
        catch (e) {
            console.log(e);
        }

    }

    async insertUserLiked(user_id: number, goods_id: number, category_id: number): Promise<any> {
        try {
            console.log("DATABASE: insertUserLiked");
            await this.knex.raw(/*sql*/
                `INSERT INTO user_liked
                (user_id, goods_id, category_id)
                VALUES(?, ?, ?);`,
                [user_id, goods_id, category_id]
            );
        }
        catch (e) {
            console.log(e);
        }

    }


    async searchKeyword(name: string): Promise<any> {
        try {
            console.log("DATABASE: Searching Keywords");
            const results = await this.knex.raw(
                `select * from goods
            where name ILIKE '%${name}%';
            
        `
            );
            console.log("results :", results.rows);

            return results.rows;
        }
        catch (e) {
            console.log(e);
        }

    }

    async addToCart(user_id: number, goods_id: number, quantity: number): Promise<any> {
        try {
            if (quantity == 0) {
                // Delete the result
                console.log("Delete the result")
                await this.knex.raw(
                    `DELETE FROM carts WHERE is_assigned = false and users_id = ? and goods_id = ?`, [user_id, goods_id]);

            } else {
                // Check if the record exist or not
                const result = await this.knex.raw(
                    `select * from carts where is_assigned = false and users_id = ? and goods_id = ?`, [user_id, goods_id]);

                if (result.rows.length == 0) {
                    // If no, add the record
                    console.log("add the record")
                    await this.knex.raw(
                        `INSERT INTO carts(users_id, goods_id, quantity, is_assigned)VALUES(?, ?, ?, ?)`, [user_id, goods_id, quantity, false]);

                } else {
                    // If yes, change the quantity
                    console.log("change the quantity")
                    await this.knex.raw(
                        `UPDATE carts
                    SET quantity=?
                    where is_assigned = false and users_id = ? and goods_id = ?;`
                        , [quantity, user_id, goods_id]);
                }
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    async getInitNum(user_id: number, goods_id: number): Promise<any> {
        try {
            console.log("DATABASE: insertUserLiked");
            const quantity = await this.knex.raw(
                `select * from carts where is_assigned = false AND users_id = ? and goods_id = ?`,
                [user_id, goods_id]
            );
            // console.log(quantity.rows[0].quantity)
            if (quantity.rows.length == 0) {
                console.log(0)
                return 0
            }
            console.log(quantity.rows[0].quantity)
            return quantity.rows[0].quantity
        }
        catch (e) {
            console.log(e);
        }

    }

    async getShoppingCartInitNum(user_id: number): Promise<any> {
        try {
            console.log("DATABASE: getShoppingCartInitNum");
            const quantity = await this.knex.raw(
                `select sum(quantity) from carts where is_assigned = false and users_id = ?`,
                [user_id]
            );
            return quantity.rows[0].sum
        }
        catch (e) {
            console.log(e);
        }

    }

    async getShoppingListItems(user_id: number): Promise<any> {
        try {
            console.log("DATABASE: getShoppingCartInitNum");
            const items = await this.knex.raw(
                `select * from carts inner join goods on carts.goods_id = goods.id where carts.is_assigned = false and carts.users_id = ?`,
                [user_id]
            );
            return items.rows
        }
        catch (e) {
            console.log(e);
        }

    }

    async assignToGroup(user_id: number, groupId: number): Promise<any> {
        try {
            console.log("DATABASE: assignToGroup");
            const items = await this.knex.raw(
                `select * from carts where is_assigned = false and users_id = ?`,
                [user_id]
            );
            console.log(items.rows)
            for (let item of items.rows) {
                await this.knex.raw(
                    `INSERT into shopping_lists(group_id, cart_id, is_completed, assignee_id, buyer_id)VALUES(?,?, false, ?, null)`, [groupId, item.id, user_id])
                await this.knex.raw(
                    `UPDATE carts SET is_assigned=true WHERE id = ?`, [item.id])
            }
            await this.knex.raw(
                `UPDATE groups SET updated_at=CURRENT_TIMESTAMP WHERE id=?`,
                [groupId]
            );
        }
        catch (e) {
            console.log(e);
        }

    }

    async getAssignedItems(groupId: number): Promise<any> {
        try {
            console.log("DATABASE: getAssignedItems");
            const result = await this.knex.raw(
                `select users_id, quantity, cart_id, is_completed, goods_id, buyer_id from shopping_lists inner join carts on shopping_lists.cart_id  = carts.id where shopping_lists.group_id = ? order by is_completed asc`,
                [groupId]
            );
            console.log("CP!:", result.rows);

            let goodsDetailsArray = []
            for (let item of result.rows) {
                const goodsDetails = await this.knex.raw(
                    `SELECT * FROM goods WHERE id = ?`, [item.goods_id]);

                goodsDetails.rows[0].quantity = item.quantity
                goodsDetails.rows[0].cart_id = item.cart_id
                goodsDetails.rows[0].is_completed = item.is_completed
                goodsDetails.rows[0].assignee_id = item.users_id
                goodsDetails.rows[0].buyer_id = item.buyer_id

                goodsDetailsArray.push(goodsDetails.rows[0]);

            }
            // for (let item of goodsDetailsArray) {
            //     for (let item2 of result.rows) {
            //         if (item.id == item2.goods_id) {
            //             item.quantity = item2.quantity
            //             item.cart_id = item2.cart_id
            //             item.is_completed = item2.is_completed
            //         }
            //     }
            // }
            console.log("goodsDetailsArray :", goodsDetailsArray)

            return goodsDetailsArray
        }
        catch (e) {
            console.log(e);
        }

    }
    async changeIsCompleted(cart_id: number, user_id: number): Promise<any> {
        try {
            // check if cart is completed
            let isCompleted = await this.knex.raw(
                `select buyer_id from shopping_lists where cart_id = ?`,
                [cart_id]
            );
            console.log("isCompleted :", isCompleted.rows[0].buyer_id)

            if (isCompleted.rows[0].buyer_id == null) {
                console.log("THIS IS NULL");
                // can change
                await this.knex.raw(/*sql*/
                    `UPDATE shopping_lists  
                    SET is_completed = NOT is_completed, 
                    updated_at = NOW(), 
                    buyer_id = ? 
                    where cart_id = ?`,
                    [user_id, cart_id]
                );
                return { isChanged: true, userID: user_id }

            } else if (isCompleted.rows[0].buyer_id == user_id) {
                // change back to null
                await this.knex.raw(
                    `UPDATE shopping_lists  SET is_completed = NOT is_completed, buyer_id = null where cart_id = ?`,
                    [cart_id]
                );
                return { isChanged: true, userID: null }
            } else if (isCompleted.rows[0].buyer_id != user_id) {
                // you cannot change
                return { isChanged: false }
            }

        }
        catch (e) {
            console.log(e);
        }
    }
    async clearCart(user_id: number): Promise<any> {
        try {
            console.log("DATABASE: clearCart");
            await this.knex.raw(
                `delete from carts where is_assigned = false and users_id = ?`,
                [user_id]
            );

        }
        catch (e) {
            console.log(e);
        }

    }

}

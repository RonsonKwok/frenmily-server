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
            // let catIdString = catIds.join(",")
            // console.log("catIdString: ", catIdString)

            // const results = await this.knex.raw(/*sql*/
            //     `SELECT goods.id, goods.name, barcode, category_id, goods_categories.name, goods_picture
            //     FROM goods 
            //     INNER JOIN goods_categories
            //     ON goods.category_id = goods_categories.id
            //     WHERE category_id IN (?)
            //     LIMIT ? OFFSET ?`,
            //     [catIdString, qtyInOneBatch, ItemsToBeSkipped]
            // );

            const results = await this.knex
                .select("goods.id", "goods.name", "barcode", "category_id", "goods_categories.name", "goods_picture",)
                .from("goods")
                .innerJoin('goods_categories', 'goods.category_id', 'goods_categories.id')
                .whereIn("category_id", catIds)
                .limit(qtyInOneBatch, { skipBinding: true })
                .offset(ItemsToBeSkipped)
                .returning("*")


            console.log("DB results :", results);

            return results;
        }
        catch (e) {
            console.log(e);
        }

    }
}

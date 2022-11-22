import { Knex } from "knex";

export class GoodsService {
    constructor(private knex: Knex) {}

    // async getAllGoodsCategories(): Promise<any> {
    //     console.log("getAllGoodsCategories")
    //     const results = await this.knex.raw(

    //         "select * from goods_categories",
    //     );
    //     console.log("results :", results.rows);

    //     return results.rows;
    // }

    async getTop5(): Promise<any> {
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

    async getRandom(): Promise<any> {
        console.log("getRandom");
        const results = await this.knex.raw(
            `select * from goods
            ORDER BY RANDOM()
            limit 8`
        );
        console.log("results :", results.rows);

        return results.rows;
    }

    async getGoodsByCat(catId: number): Promise<any> {
        console.log("DATABASE: getGoodsByCat");
        const results = await this.knex.raw(
            `select * from goods where category_id = ?`,
            [catId]
        );
        // console.log("results :", results.rows);

        return results.rows;
    }

    async getTopGoodsByCat(catId: number): Promise<any> {
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
}

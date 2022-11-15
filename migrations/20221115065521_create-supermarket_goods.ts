import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("supermarket_goods", (table) => {
        table.increments();
        table.integer("supermarkets_id").notNullable();
        table.foreign("supermarkets_id").references("supermarkets.id");
        table.integer("goods_id").notNullable();
        table.foreign("goods_id").references("goods.id");
        table.integer("goods_price");
        table.integer("report_lower_price");
        table.string("evidence_image");
        table.timestamps(false, true);
        //SET "evidence-image" NULL FOR TESTING STAGE
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("supermarket_goods");
}
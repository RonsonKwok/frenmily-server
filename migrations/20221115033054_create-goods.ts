import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("goods", (table) => {
        table.increments();
        table.string("name").notNullable();
        table.string("barcode")
        table.integer("category_id").notNullable();
        table.foreign("category_id").references("goods_categories.id");
        table.string("goods_picture");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("goods");
}




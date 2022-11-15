import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("goods_categories", (table) => {
        table.increments();
        table.string("name").notNullable();
        table.string("goods_categories_picture");

      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("goods_categories");
}


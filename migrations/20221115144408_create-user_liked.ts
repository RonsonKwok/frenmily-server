import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("user_liked", (table) => {
        table.increments();
        table.integer("user_id").notNullable();
        table.foreign("user_id").references("users.id");
        table.integer("goods_id").notNullable();
        table.foreign("goods_id").references("goods.id");
        table.integer("category_id").notNullable();
        table.foreign("category_id").references("goods_categories.id");
        table.timestamps(false, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_liked");
}
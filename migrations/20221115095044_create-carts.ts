import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("carts", (table) => {
        table.increments();
        table.integer("users_id").notNullable();
        table.foreign("users_id").references("users.id");
        table.integer("supermarket_goods_id").notNullable();
        table.foreign("supermarket_goods_id").references("supermarket_goods.id");
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("carts");
}


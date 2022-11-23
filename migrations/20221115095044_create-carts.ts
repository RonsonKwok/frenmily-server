import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("carts", (table) => {
        table.increments();
        table.integer("users_id").notNullable();
        table.foreign("users_id").references("users.id");
        table.integer("goods_id").notNullable();
        table.foreign("goods_id").references("goods.id");
        table.integer("quantity").notNullable();
        table.boolean("is_assigned").notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("carts");
}


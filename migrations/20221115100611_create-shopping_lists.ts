import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("shopping_lists", (table) => {
        table.increments();
        table.integer("group_id").notNullable();
        table.foreign("group_id").references("groups.id");
        table.integer("cart_id").notNullable();
        table.foreign("cart_id").references("carts.id");
        table.integer("estimated_amount").notNullable();
        table.integer("paid_records_id").notNullable();
        // table.foreign("paid_records_id").references("paid_records.id");
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("shopping_lists");
}


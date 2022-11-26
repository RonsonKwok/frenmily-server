import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("shopping_lists", (table) => {
        table.increments();
        table.integer("group_id").notNullable();
        table.foreign("group_id").references("groups.id");
        table.integer("cart_id").notNullable();
        table.foreign("cart_id").references("carts.id");
        table.boolean("is_completed").notNullable();
        table.integer("assignee_id").notNullable();
        table.foreign("assignee_id").references("users.id");
        table.integer("buyer_id");
        table.foreign("buyer_id").references("users.id");
        table.timestamps(false, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("shopping_lists");
}


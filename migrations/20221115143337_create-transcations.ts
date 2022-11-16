import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("transcations", (table) => {
        table.increments();
        table.integer("debitor_id").notNullable();
        table.foreign("debitor_id").references("user.id");
        table.integer("creditor_id").notNullable();
        table.foreign("creditor_id").references("users.id");
        table.integer("transcations_amount").notNullable();
        table.boolean("is_settled");
        table.timestamps(false, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("transcations");
}

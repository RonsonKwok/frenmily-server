import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("paid_records", (table) => {
        table.increments();
        table.integer("user_id").notNullable();
        table.foreign("user_id").references("user.id");
        table.integer("receipt_amount").notNullable();
        table.string("receipt_image").notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("paid_records");
}


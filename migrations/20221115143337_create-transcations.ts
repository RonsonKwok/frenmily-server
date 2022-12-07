import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("transcations", (table) => {
        table.increments();
        table.integer("debitor_id").notNullable();
        table.foreign("debitor_id").references("users.id");
        table.integer("creditor_id").notNullable();
        table.foreign("creditor_id").references("users.id");
        table.float("transcations_amount").notNullable();
        table.boolean("is_paid");
        table.boolean("is_settled");
        table.integer("group_id").notNullable();
        table.integer("paid_record_id").notNullable();
        table.foreign("paid_record_id").references("paid_records.id");
        table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("transcations");
}

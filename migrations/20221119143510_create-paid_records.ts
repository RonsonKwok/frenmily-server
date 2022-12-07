// import { Knex } from "knex";

// export async function up(knex: Knex): Promise<void> {
//     await knex.schema.createTable("paid_records", (table) => {
//         table.increments();
//         table.integer("user_id").notNullable();
//         table.foreign("user_id").references("users.id");
//         table.integer("group_id").notNullable();
//         table.foreign("group_id").references("groups.id");
//         table.string("receipt_image").notNullable();
//         table.float("amount").notNullable();
//         table.string("remarks");
//         table.timestamps(false, true);
//     });
// }

// export async function down(knex: Knex): Promise<void> {
//     await knex.schema.dropTableIfExists("paid_records");
// }

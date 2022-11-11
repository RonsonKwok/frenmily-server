import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("group_member", (table) => {
        table.increments();
        table.integer("group_id").notNullable();
        table.foreign("group_id").references("groups.id");
        table.integer("user_id").notNullable();
        table.foreign("user_id").references("users.id");
        table.timestamps(false, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("group_member");
}


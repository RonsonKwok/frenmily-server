import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("groups", (table) => {
        table.increments();
        table.string("group_name").notNullable();
        table.string("profile_picture");
        table.boolean("is_family_group");
        table.timestamps(false, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("groups");
}


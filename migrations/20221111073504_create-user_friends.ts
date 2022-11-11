import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("user_friends", (table) => {
        table.increments();
        table.integer("user_id").notNullable();
        table.foreign("user_id").references("users.id");
        table.integer("user_friend_id").notNullable();
        table.foreign("user_friend_id").references("users.id");
        table.timestamps(false, true);
      });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("user_friends");
}


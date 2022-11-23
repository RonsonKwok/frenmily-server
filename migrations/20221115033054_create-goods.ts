import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("goods", (table) => {
        table.increments();
        table.string("name").notNullable();
        table.string("barcode")
        table.integer("category_id").notNullable();
        table.foreign("category_id").references("goods_categories.id");
        table.text("goods_picture");
        table.string("aeon_price");
        table.string("dch_price");
        table.string("jasons_price");
        table.string("parknshop_price");       
        table.string("wellcome_price");
        table.string("mannings_price");
        table.string("watsons_price");
        table.string("ztore_price");
        table.string("report_lower_price").unsigned();
        table.string("evidence_image");
        table.timestamps(false, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("goods");
}

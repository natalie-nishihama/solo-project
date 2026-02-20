/*
リンクTB作成
 */
/**
 *
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//マイグレーション実行時に行われる内容
exports.up = (knex) => {
  return knex.schema.createTable("post_tags", (t) => {
    t.integer("post_id").notNullable();
    t.integer("tag_id").notNullable();

    t.primary(["post_id", "tag_id"]);

    t.foreign("post_id").references("posts.id");
    t.foreign("tag_id").references("tags.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//ロールバック実行時に行われる内容
exports.down = (knex) => {
  //TB削除
  return knex.schema.dropTable("post_tags");
};

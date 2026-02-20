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
  return knex.schema.createTable("links", (t) => {
    t.increments().primary;
    t.integer("post_id").notNullable();
    t.string("url", 1000).notNullable();
    t.string("description", 300);
    t.foreign("post_id").references("posts.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//ロールバック実行時に行われる内容
exports.down = (knex) => {
  //TB削除
  return knex.schema.dropTable("links");
};

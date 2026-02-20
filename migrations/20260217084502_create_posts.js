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
  return knex.schema.createTable("posts", (t) => {
    t.increments().primary;
    t.string("title", 100).notNullable();
    //文字数制限なしは「text」
    t.text("content").notNullable();
    t.integer("user_id").notNullable();
    t.timestamp("created_at").defaultTo(knex.fn.now());
    t.integer("like_count");
    t.foreign("user_id").references("users.id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//ロールバック実行時に行われる内容
exports.down = (knex) => {
  //TB削除
  return knex.schema.dropTable("posts");
};

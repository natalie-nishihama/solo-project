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
  return knex.schema.createTable("tags", (t) => {
    t.increments().primary;
    t.string("name", 30).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
//ロールバック実行時に行われる内容
exports.down = (knex) => {
  //TB削除
  return knex.schema.dropTable("tags");
};

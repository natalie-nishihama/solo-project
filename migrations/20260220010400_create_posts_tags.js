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

    t.foreign("post_id").references("posts.id").onDelete("CASCADE");
    t.foreign("tag_id").references("tags.id").onDelete("CASCADE");

    //.onDelete("CASCADE")をつけるといい。投稿削除された際に連動して消える
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

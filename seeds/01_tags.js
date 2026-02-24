/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // 既存データを削除
  await knex("tags").del();

  // 初期データを挿入
  await knex("tags").insert([
    { name: "REACT" },
    { name: "JavaScript" },
    { name: "TypeScript" },
    { name: "README" },
  ]);
};

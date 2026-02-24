/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const tags = ["REACT", "JavaScript", "TypeScript", "README"];

  for (const name of tags) {
    // 存在しなければ挿入
    const exists = await knex("tags").where({ name }).first();
    if (!exists) {
      await knex("tags").insert({ name });
    }
  }
};

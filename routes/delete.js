const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

/*

投稿削除
*/

app.delete("/posts/:id", async (req, res) => {
  //削除したい投稿のid取得
  const { id } = req.params;

  //投稿削除
  await knex("posts").where({ id }).del();

  //削除完了メッセージ
  res.json({ message: "Deleted" });
});

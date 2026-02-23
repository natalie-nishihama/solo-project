const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

//ユーザ情報全件取得
router.get("/", async (req, res) => {
  const users = await knex("users").select("*");
  res.json(users);
});

// ユーザー追加
router.post("/", async (req, res) => {
  const { name } = req.body;

  const [user] = await knex("users").insert({ name }).returning("*");

  res.json(user);
});

module.exports = router;

// routes/tags.js
const express = require("express");
const router = express.Router();
const knex = require("../db/knex");

router.get("/", async (req, res) => {
  try {
    const tags = await knex("tags").select("*");
    console.log("tagsssssssssss:", tags);
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "タグ取得失敗" });
  }
});

module.exports = router;

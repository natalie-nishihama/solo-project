//DB接続用

const knex = require("knex");
const config = require("../knexfile");
module.exports = knex(config.development);

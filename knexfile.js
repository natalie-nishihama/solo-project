// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    },
    migrations: {
      directory: "./migrations",
    },
  },

  // module.exports = {
  //   development: {
  //     client: "pg",
  //     connection: {
  //       filename: "./dev.sqlite3",
  //     },
  //   },

  production: {
    // コネクション書き方：https://knexjs.org/guide/migrations.html#basic-configuration
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./migrations",
    },
  },
};

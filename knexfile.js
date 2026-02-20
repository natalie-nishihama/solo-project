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
};

// module.exports = {
//   development: {
//     client: "pg",
//     connection: {
//       filename: "./dev.sqlite3",
//     },
//   },

//   production: {
//     client: "pg",
//     connection: {
//       database: "my_db",
//       user: "username",
//       password: "password",
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: "knex_migrations",
//     },
//   },
// };

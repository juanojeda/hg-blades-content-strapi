// Path: ./config/env/production/database.js
const parse = require("pg-connection-string").parse;
const { host, port, database, user: username, password } = process.env
  .DATABASE_URL
  ? parse(process.env.DATABASE_URL)
  : {};

const isProd = process.env.NODE_ENV === "production";

const devConfig = (env) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("DATABASE_HOST", "127.0.0.1"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "hg_blades_strapi"),
        username: env("DATABASE_USERNAME", "admin"),
        password: env("DATABASE_PASSWORD", "password"),
      },
      options: {},
    },
  },
});

const prodConfig = (env) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host,
        port,
        database,
        username,
        password,
        ssl: {
          rejectUnauthorized: false,
        },
      },
      options: {},
    },
  },
});

module.exports = ({ env }) => (isProd ? prodConfig(env) : devConfig(env));

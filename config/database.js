// Path: ./config/env/production/database.js
const parse = require("pg-connection-string").parse;
const { host, port, database, user: username, password } = parse(
  process.env.DATABASE_URL
);
const isProd = process.env.NODE_ENV === "production";

const devConfig = {
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
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {},
    },
  },
};

const prodConfig = {
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
        ssl: env.bool("DATABASE_SSL", false),
      },
      options: {},
    },
  },
};

module.exports = ({ env }) => (isProd ? prodConfig : devConfig);

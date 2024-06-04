const { Client } = require("pg");

require("dotenv").config();

const client = new Client(process.env.DB_URL);
//const client = new Client("postgres://localhost:54321/vinylstashdb");
module.exports = client;

const client = require("./client");

const dropTables = async () => {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS vinyls CASCADE;
    `);
  } catch (error) {
    console.log("error dropping tables");
    throw error;
  }
};

const createTables = async () => {
  try {
    console.log("Building All Tables...");
    await client.query(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(20) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name VARCHAR(20) NOT NULL
        );
        CREATE TABLE vinyls (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            artist VARCHAR(100) NOT NULL,
            image TEXT,
            genre VARCHAR(100),
            user_id INTEGER REFERENCES users(id) NOT NULL
        );
        `);
    console.log("Tables successfully created!");
  } catch (error) {
    console.log("error building tables");
    throw error;
  }
};

const buildDb = async () => {
  try {
    client.connect();
    await dropTables();
    await createTables();
  } catch (error) {
    console.error(error);
  } finally {
    client.end();
  }
};
buildDb();

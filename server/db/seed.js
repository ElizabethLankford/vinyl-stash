const client = require("./client");

async function dropTables() {
  try {
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS user CASCADE;
    DROP TABLE IF EXISTS vinyl CASCADE;
    `);
  } catch (error) {
    console.log("error dropping tables");
    throw error;
  }
}

async function createTables() {
  try {
    console.log("Building All Tables...");
    await client.query(`
        CREATE TABLE user (
            id SERIAL PRIMARY KEY,
            username VARCHAR(20) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            name VARCHAR(20) NOT NULL
        );
        CREATE TABLE vinyl (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            artist VARCHAR(100) NOT NULL,
            image TEXT,
            genre VARCHAT(50),
            user_id INTEGER REFERENCES user(id) NOT NULL
        );
        `);
    console.log("Tables successfully created!");
  } catch (error) {
    throw error;
  }
}

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

const client = require("../client");

const createUser = async ({ username, password, name }) => {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
          INSERT INTO users( username,
              password,
              name)
          VALUES($1, $2, $3)
          RETURNING *;
          `,
      [username, password, name]
    );
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = { createUser };

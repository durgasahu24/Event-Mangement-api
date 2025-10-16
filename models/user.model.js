import pool from "../db/db.js";

await pool.query(`
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
  );
`);

export const createUser = async (name, email) => {
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
};


export const getUserById = async (id) => {

  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  
  return result.rows[0];
};

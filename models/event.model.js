import pool from "../db/db.js";

await pool.query(`
  CREATE TABLE IF NOT EXISTS events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    date TIMESTAMP NOT NULL,
    location VARCHAR(100),
    capacity INT CHECK (capacity > 0 AND capacity <= 1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);

export const createEvent = async (title, date, location, capacity) => {
  const result = await pool.query(
    'INSERT INTO events (title, date, location, capacity) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, date, location, capacity]
  );
  return result.rows[0];
};

export const getEventById = async (id) => {
  const result = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
  return result.rows[0];
};

export const getUpcomingEvents = async () => {
  const result = await pool.query(`
    SELECT * FROM events
    WHERE date > NOW()
    ORDER BY date ASC, location ASC
  `);
  return result.rows;
};

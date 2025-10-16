
import pool from "../db/db.js";

await pool.query(`
  CREATE TABLE IF NOT EXISTS registrations (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    event_id INT REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE (user_id, event_id)
  );
`);

export const registerUserForEvent = async (userId, eventId) => {
  const result = await pool.query(
    'INSERT INTO registrations (user_id, event_id) VALUES ($1, $2) RETURNING *',
    [userId, eventId]
  );
  return result.rows[0];
};

export const cancelRegistration = async (userId, eventId) => {
  const result = await pool.query(
    'DELETE FROM registrations WHERE user_id = $1 AND event_id = $2 RETURNING *',
    [userId, eventId]
  );
  return result.rows[0];
};

export const countRegistrations = async (eventId) => {
  const result = await pool.query(
    'SELECT COUNT(*) FROM registrations WHERE event_id = $1',
    [eventId]
  );
  return parseInt(result.rows[0].count);
};

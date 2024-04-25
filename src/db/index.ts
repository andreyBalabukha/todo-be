import { Pool } from "pg";
import 'dotenv/config';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT)
});

const createTodoTableQuery = `
CREATE TABLE IF NOT EXISTS todo (
  id SERIAL PRIMARY KEY,
  guid UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

async function initializeDatabase() {
  const client = await pool.connect();
  try {
    await client.query(createTodoTableQuery);
    console.log('Todo table is successfully created or already exists');
  } catch (err) {
    console.error('Error during the creation of the todo table:', err.stack);
    throw err;
  } finally {
    client.release();
  }
}

(async () => {
  try {
    await initializeDatabase();
  } catch (err) {
    console.error('Failed to initialize the database:', err);
    process.exit(1);
  }
})();

export default pool;

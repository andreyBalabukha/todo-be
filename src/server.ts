"use strict";
import todoRoutes from './routes/todoRoutes';
import pool from './db';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

const server = express();

const PORT = process.env.BACKEND_PORT || 3001;
console.log('PORT:', process.env.BACKEND_PORT);

server.use(cors());
server.use(cors(corsOptions));
server.use(express.json());
server.use('/todo', todoRoutes);

const startServer = async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to DB successfully!');
    client.release();

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  }
};

startServer();

export default server;
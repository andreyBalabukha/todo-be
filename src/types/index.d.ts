import { Pool } from 'pg';
import 'index'; // Import the existing types for extension

declare module 'express-serve-static-core' {
  interface Request {
    pool?: Pool; // Add a pool property which is optional and of type Pool from 'pg'
  }
}

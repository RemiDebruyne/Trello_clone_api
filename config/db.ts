import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../src/db/schema.ts";
import 'dotenv/config'

export const connection: mysql.Connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

connection.connect();

export const db = drizzle(connection, { schema, mode:'default' });

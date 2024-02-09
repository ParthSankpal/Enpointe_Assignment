import mysql from "mysql2/promise"; // Import from mysql2/promise
import dotenv from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT, 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool
  .getConnection()
  .then((conn) => {
    console.log("Connected to SQL database");
    conn.release(); 
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

export const promisePool = pool;

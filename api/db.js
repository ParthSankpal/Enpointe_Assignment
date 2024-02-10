import mysql from "mysql2/promise"; // Import from mysql2/promise
import dotenv from "dotenv";
dotenv.config();


const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: parseInt(process.env.MYSQLPORT, 10),
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

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisePool as db } from "../db.js";


export const getAllAccounts = async (req, res) => {

    try {
        // console.log("INBACK");
        // console.log(req.user);
        // Ensure the requester has banker privileges
        if (!req.user.isBanker) {
          return res.status(403).send("Access denied.");
        }
    
        const [accounts] = await db.query(`
          SELECT accounts.AccountID, accounts.Balance, users.Username, users.UserID
          FROM accounts
          JOIN users ON accounts.UserID = users.UserID
        `);
    
        res.json(accounts);
        // console.log(accounts);
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
        res.status(500).send("Error fetching accounts");
      }

};


export const getTransaction = async (req, res) => {

  const AccountID = req.params.id;
  console.log(AccountID, "aCCOUNT ID");

  try {
    
    const transactionQuery = "SELECT * FROM transactions WHERE AccountID = ?";
  const [trasactionResults] = await db.query(transactionQuery, [
    AccountID,
  ]);

  res.json(trasactionResults);
  console.log(trasactionResults);
  } catch (error) {
    res
      .status(404)
      .json({ message: "transactions not found for the given account ID" });
 
  }

};
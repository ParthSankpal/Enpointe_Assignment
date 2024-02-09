import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisePool as db } from "../db.js";

export const getAccountDetails = async (req, res) => {
  // console.log(req.params.id, "PARAMS");
  const UserID = req.params.id;
  const query = "SELECT AccountID, Balance FROM accounts WHERE UserID = ?";

  try {
    const [results] = await db.query(query, [UserID]);
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).send("Account not found");
    }
  } catch (error) {
    res
      .status(500)
      .send({
        message: "Error fetching account details",
        error: error.message,
      });
  }
};

export const getTransactionDetails = async (req, res) => {
  const UserID = req.params.id;

  // console.log(UserID);

  const accountQuery = "SELECT AccountID FROM accounts WHERE UserID = ?";

  const [accountResults] = await db.query(accountQuery, [UserID]);
  // console.log(results[0].AccountID, "RESULTS");

  if (accountResults) {
    // if (accountError) {
    //   return res.status(500).json({ message: 'Error fetching account details', error: accountError.message });
    // }
    if (accountResults.length > 0) {
    const AccountID = accountResults[0].AccountID;
    // console.log(results[0].AccountID, "INLOOP");
    const transactionQuery = "SELECT * FROM transactions WHERE AccountID = ?";

    const [trasactionResults] = await db.query(transactionQuery, [
      accountResults[0].AccountID,
    ]);
    // console.log(trasactionResults, "Transaction Results");

    if (!trasactionResults) {
      return res
        .status(500)
        .json({
          message: "Error fetching transaction details",
          error: transactionError.message,
        });
    }
    res.json(trasactionResults);
    // console.log(trasactionResults, "RESULTS");

    // } else {
    //   res.status(404).json({ message: 'Account not found for the given user ID' });
    // }
  } else {
    res
      .status(404)
      .json({ message: "Account not found for the given user ID" });
  }
};}


export const addCurrentTransaction = async (req, res) => {
  const UserID = req.params.id;
  const { amount, type, description } = req.body;

  // First, get the account details for the user
  const accountQuery = "SELECT AccountID, Balance FROM accounts WHERE UserID = ?";
  try {
    const [accountResults] = await db.query(accountQuery, [UserID]);

    if (accountResults.length > 0) {
      const accountID = accountResults[0].AccountID;
      let newBalance;

      // Calculate the new balance based on the transaction type
      if (type === "deposit") {
        newBalance = parseFloat(accountResults[0].Balance) + parseFloat(amount);
      } else if (type === "withdrawal") {
        newBalance = parseFloat(accountResults[0].Balance) - parseFloat(amount);
      } else {
        return res.status(400).json({ message: "Invalid transaction type" });
      }

      // Insert the transaction into the Transactions table
      const insertQuery = `
        INSERT INTO transactions (AccountID, Type, Amount, Description)
        VALUES (?, ?, ?, ?)
      `;
      await db.query(insertQuery, [accountID, type, amount, description]);

      // Update the account's balance
      const updateBalanceQuery = "UPDATE accounts SET Balance = ? WHERE AccountID = ?";
      await db.query(updateBalanceQuery, [newBalance, accountID]);

      res.json({ success: true, message: "Transaction added and balance updated" });
    } else {
      res.status(404).json({ message: 'Account not found for the given user ID' });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error processing transaction",
      error: error.message,
    });
  }
};


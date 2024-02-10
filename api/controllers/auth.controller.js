import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisePool as db } from "../db.js";

export const registerUser = async (req, res) => {
  let { username, email, password, isBanker } = req.body;

  // Convert boolean isBanker to an integer (1 for true, 0 for false)
  isBanker = isBanker ? 1 : 0;

  try {
    // Check if user already exists
    const [user] = await db.query("SELECT * FROM users WHERE Email = ?", [email]);
    if (user.length > 0) {
      return res.status(409).send("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Start a transaction
    await db.query("START TRANSACTION");

    // Insert new user into database
    const result = await db.query(
      "INSERT INTO users (Username, Email, Password, IsBanker) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, isBanker]
    );

    const userId = result[0].insertId;

    if(isBanker === 0){ // Use the converted integer value for condition
        // Insert new account with initial balance
        const accountResult = await db.query(
          "INSERT INTO accounts (UserID, Balance) VALUES (?, ?)",
          [userId, 500.00]
        );

        const accountId = accountResult[0].insertId;

        // Insert initial deposit transaction
        await db.query(
          "INSERT INTO transactions (AccountID, Amount, Type, Description) VALUES (?, ?, ?, ?)",
          [accountId, 500, 'deposit', 'Initial deposit']
        );
    }

    // Commit the transaction
    await db.query("COMMIT");

    // Prepare the response, conditionally include accountId if isBanker is false
    const response = { message: "User registered successfully", userId };
    if (isBanker === 0) {
      response.accountId = accountId;
    }

    res.status(201).send(response);
  } catch (error) {
    // Rollback the transaction if an error occurs
    await db.query("ROLLBACK");
    res.status(500).send({ message: "Error registering user", error: error.message });
  }
};







export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
      const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) {
          return res.status(404).send('User not found');
      }

      const user = users[0];

      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
          return res.status(401).send('Invalid password');
      }

      const token = jwt.sign({ userId: user.UserID, email: user.Email }, process.env.JWT_SECRET, { expiresIn: '24h' });

      const { Password, ...userWithoutPassword } = user;

      res.cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
      res.status(500).send({ message: 'Error logging in', error: error.message });
  }
};


export const loginBanker = async (req, res) => {
  const { email, password } = req.body;

  try {
      const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      if (users.length === 0) {
          return res.status(404).send('User not found');
      }

      const user = users[0];
      // console.log(user.IsBanker, "USER IS BANKER");

      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
          return res.status(401).send('Invalid password');
      }

      const token = jwt.sign({
        userId: user.UserID,
        email: user.Email,
        isBanker: user.IsBanker 
      }, process.env.JWT_SECRET, { expiresIn: '24h' });
      const { Password, ...userWithoutPassword } = user;

      res.cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(userWithoutPassword);
  } catch (error) {
      res.status(500).send({ message: 'Error logging in', error: error.message });
  }
};

export const signout = async (req, res, next) => {
  try {

    console.log("INLOOOOOOOOP");
    res.clearCookie("access_token");
    res.status(200).json("User has been signed out");
  } catch (error) {
    next(error);
  }
};
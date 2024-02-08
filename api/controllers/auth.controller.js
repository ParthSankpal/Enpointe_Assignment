import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { promisePool as db } from "../db.js";

export const registerUser = async (req, res) => {
console.log('QOOOOOOOOOOOOOQoqoqoooooo');
  const { username, email, password, isBanker } = req.body;
  console.log(username, email, password, isBanker, "PPPPPPPPPPP");
  try {
    // Check if user already exists
    const [user] = await db.query("SELECT * FROM bank.users WHERE Email = ?", [
      email,
    ]);
    if (user.length > 0) {
      return res.status(409).send("User already exists");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);
    console.log(hashedPassword);

    // Insert new user into database
    const result = await db.query(
      "INSERT INTO users (Username, Email, Password, IsBanker) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, isBanker]
    );

    res
      .status(201)
      .send({
        message: "User registered successfully",
        userId: result[0].insertId,
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error registering user", error: error.message });
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

